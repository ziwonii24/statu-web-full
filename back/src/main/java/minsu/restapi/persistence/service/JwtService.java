package minsu.restapi.persistence.service;

import io.jsonwebtoken.*;
import minsu.restapi.persistence.model.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Map;

@Component

public class JwtService {
	
	@Value("${jwt.salt}")
	private String salt;
	
	@Value("${jwt.expmin}")
	private Long expireMin;
	
	/*
	로그인 성공 시 사용자 정보를 기반으로 JwTToken을 생성해서 반환.
	 */
	public String create(final User user) {
		//log.trace("time: {}", expireMin);
		final JwtBuilder builder = Jwts.builder();
		
		builder.setHeaderParam("typ", "JWT");
		builder.setSubject("로그인 토큰")
				.setExpiration(new Date(System.currentTimeMillis()+1000*60*expireMin))
				.claim("User", user).claim("second","부가정보");
		builder.signWith(SignatureAlgorithm.HS256, salt.getBytes());
		
		final String jwt = builder.compact();
		//log.debug("토큰발행 : {}", jwt);
		return jwt;
	}

	/*
	전달받은 토큰이 제대로 생성되었는지 확인하고 문제가 있다면 Runtime 예외를 발생시킨다.
	 */
	public void checkValid(final String jwt) {
		//log.trace("토큰 점검 : {}", jwt);
		Jwts.parser().setSigningKey(salt.getBytes()).parseClaimsJws(jwt);
	}

	/*
	jwt 토큰을 분석해서 필요한 정보를 반환한다.
	 */
	public Map<String, Object> get(final String jwt) {
		Jws<Claims> claims = null;
		try {
			claims = Jwts.parser().setSigningKey(salt.getBytes()).parseClaimsJws(jwt);
		} catch(final Exception e) {
			throw new RuntimeException();
		}
		
		//log.trace("claims: {}", claims);
		System.out.println(claims);
		System.out.println(claims.getSignature());
		System.out.println(claims.getBody());
		return claims.getBody();
	}
}
