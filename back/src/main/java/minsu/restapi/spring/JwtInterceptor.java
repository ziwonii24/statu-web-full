package minsu.restapi.spring;

import minsu.restapi.persistence.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/*
헤더에서 토큰을 꺼내 검사합니다.
true를 반환하면, 요청에 대한 루틴을 수행하라는 의미이고,
false는 요청을 수행하지 않고 Exception을 반환합니다.
 */
@Component
public class JwtInterceptor implements HandlerInterceptor{
	
	@Autowired
	private JwtService jwtService;
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
			if(request.getMethod().equals("OPTIONS")) {
					return true;
				} else {
					String token = request.getHeader("token");
					if(token != null && token.length() > 0) {
						return jwtService.checkValid(token);
					} else {
						throw new RuntimeException("인증토큰이 없습니다. ");
					}
			}
	}
}
