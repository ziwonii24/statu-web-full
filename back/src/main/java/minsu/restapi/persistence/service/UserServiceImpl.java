package minsu.restapi.persistence.service;

import ch.qos.logback.core.net.SyslogOutputStream;
import lombok.Builder;
import minsu.restapi.persistence.dao.UserRepository;
import minsu.restapi.persistence.model.User;
import minsu.restapi.spring.MailUtils;
import minsu.restapi.spring.TempKey;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Random;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JavaMailSender mailSender;


    public int save(User user) { //가입이 잘 되었으면 i = 1;

        if(user.getPassword() == null || user.getPassword().equals("")) {
            userRepository.save(user);
            return 1;
        }
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            user.setPassword(passwordEncoder.encode(user.getPassword()));

        String email = user.getEmail();
        if (userRepository.existsByEmail(email)) return 0;
        else {
            userRepository.save(user);
            return 1;
        }
    }

    public User signin(String email, String password) {

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        User user = userRepository.fe(email);
        if (user != null) {
            if (passwordEncoder.matches(password, user.getPassword())) {
                return user;
            }
        }else {
            throw new RuntimeException("이메일 또는 비밀번호가 틀립니다.");
        }
        return user;
    }

    @Override
    public User findByEmail(String email){return userRepository.fe(email);}


    public void modify(User user) {
        userRepository.save(user);
    }


    @Override
    public void deleteByEmail(String email) {
        userRepository.deleteByEmail(email);
    }


    public boolean checkEmail(String email){
        boolean result = userRepository.existsByEmail(email);
        return result;
    }

    public boolean checkName(String name){
        boolean result = userRepository.existsByName(name);
        return result;

    }

    public List<User> findAll(){
        List<User> users =userRepository.findAll();
        return users;
    }

    public User findById(Long id){
        User user = userRepository.findById(id).get();
        return user;
    }

    public User findByName(String name){
        User user = userRepository.findByName(name);
        return user;
    }

    @Transactional
    public void sendEmail(User user) throws Exception {

        // 임의의 authkey 생성
        String authkey = new TempKey().getKey(50, false);

        user.setAuthKey(authkey);
        userRepository.save(user);

        // mail 작성 관련
        MailUtils sendMail = new MailUtils(mailSender);

        sendMail.setSubject("STATU 회원가입 이메일 인증");
        sendMail.setText(new StringBuffer().append("<h1>[이메일 인증]</h1>")
                .append("<p>아래 링크를 클릭하시면 이메일 인증이 완료됩니다.</p>")
                .append("<a href='http://13.124.208.26:8080/joinConfirm")
                .append("/")
                .append(user.getId())
                .append("/")
                .append(authkey)
                .append("' target='_blenk'>이메일 인증 확인</a>")
                .toString());
        sendMail.setFrom("ilovestudying302@gmail.com", "Statu");
        sendMail.setTo(user.getEmail());
        sendMail.send();
    }

    @Override
    public void deleteImg(String email){
        User user = userRepository.fe(email);
        user.setImg("default.png");
    }


    @Override
    public String random(int length) {
        char[] chars;
        StringBuilder buffer = new StringBuilder();
        for(char ch = '0'; ch <= '9'; ++ch) buffer.append(ch);
        for(char ch = 'a'; ch <= 'z'; ++ch) buffer.append(ch);
        for(char ch = 'A'; ch <= 'Z'; ++ch) buffer.append(ch);
        chars = buffer.toString().toCharArray();

        StringBuilder randomString = new StringBuilder();
        Random random = new Random();

        for(int i=0; i<length; i++){
            randomString.append(chars[random.nextInt(chars.length)]);
        }
        return randomString.toString();
    }

}
