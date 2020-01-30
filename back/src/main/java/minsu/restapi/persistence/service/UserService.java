package minsu.restapi.persistence.service;

import minsu.restapi.persistence.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    public boolean checkEmail(String email);

    public boolean checkName(String name);

    public List<User> findAll();

    public User findById(Long id);

    public int save(User User);

    public void deleteByEmail(String email);

    public User signin(String email, String password);

}
