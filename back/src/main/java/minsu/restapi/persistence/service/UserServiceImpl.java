package minsu.restapi.persistence.service;

import minsu.restapi.persistence.dao.UserRepository;
import minsu.restapi.persistence.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    public static final String TOKEN_INVALID = "invalidToken";
    public static final String TOKEN_EXPIRED = "expired";
    public static final String TOKEN_VALID = "valid";

    public static String QR_PREFIX = "https://chart.googleapis.com/chart?chs=200x200&chld=M%%7C0&cht=qr&chl=";
    public static String APP_NAME = "SpringRegistration";

    // API

    public void save(User user){
        userRepository.save(user);
    }

    @Override
    public void deleteByEmail(String email) {
        System.out.println("check in service");
        System.out.println(email);
        userRepository.deleteByEmail(email);
        System.out.println("check in after repository");
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

}
