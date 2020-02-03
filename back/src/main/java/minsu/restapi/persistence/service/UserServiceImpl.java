package minsu.restapi.persistence.service;

import minsu.restapi.persistence.dao.UserRepository;
import minsu.restapi.persistence.model.User;
import minsu.restapi.spring.MailUtils;
import minsu.restapi.spring.TempKey;
import minsu.restapi.web.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JavaMailSender mailSender;

    public int save(User user) { //가입이 잘 되었으면 i = 1;

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        String email = user.getEmail();
        if (userRepository.existsByEmail(email)) return 0;
        else {
            userRepository.save(user);
            return 1;
        }
    }

//    public void save(User user){
//        userRepository.save(user);
//    }

    public User signin(String email, String password) {

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


        User user = userRepository.findByEmail(email);
        if (user != null) {
            if (passwordEncoder.matches(password, user.getPassword())) {
                System.out.println(password);
                System.out.println(user.getPassword());

                return user;
            }
        } else {
            throw new RuntimeException("아이디 또는 비밀번호가 틀립니다.");
        }
        return null;
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


    @Transactional
    public void sendEmail(User user) throws Exception {

        // 임의의 authkey 생성
        String authkey = new TempKey().getKey(50, false);

        user.setAuthKey(authkey);
        userRepository.save(user);

        // mail 작성 관련
        MailUtils sendMail = new MailUtils(mailSender);

        sendMail.setSubject("[Hoon's Board v2.0] 회원가입 이메일 인증");
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


}
