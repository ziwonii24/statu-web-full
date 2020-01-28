package minsu.restapi.persistence.service;

import minsu.restapi.persistence.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    boolean checkEmail(String email);

    boolean checkName(String name);

    List<User> findAll();

    User findById(Long id);

    void save(User User);

    void deleteByEmail(String email);


}
