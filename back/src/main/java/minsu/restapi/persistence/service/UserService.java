package minsu.restapi.persistence.service;

import minsu.restapi.persistence.model.User;

import java.util.List;
import java.util.Random;

public interface UserService {

    public boolean checkEmail(String email);

    public boolean checkName(String name);

    public List<User> findAll();

    public User findById(Long id);

    public User findByName(String name);

    public User findByEmail(String email);

    public int save(User User);

    public void modify(User User);

    public void deleteByEmail(String email);

    public User signin(String email, String password);

    public void sendEmail(User user) throws Exception;

    public String random(int length);

    public void deleteImg(String email);
}
