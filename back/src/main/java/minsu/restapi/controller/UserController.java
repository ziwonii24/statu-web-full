package minsu.restapi.controller;

import minsu.restapi.persistence.model.User;
import minsu.restapi.persistence.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = {"*"}, maxAge = 6000)
@RestController
public class UserController {

    @Autowired
    UserService userService;

  /*  @ExceptionHandler
    public Map<String, String> errorHandler(Exception e){
        Map<String, String> map = new HashMap<>();
        map.put("result", "false");
        return map;
    }*/

    @GetMapping("/user")
    public List<User> findAll(){
        return userService.findAll();
    }

    @GetMapping("/user/{id}")
    public User findById(@PathVariable Long id){
        return userService.findById(id);
    }

    @GetMapping("/user/checkmail/{usermail}")
    public Map<String, String> checkmail(@PathVariable String usermail){

        Map<String, String> map = new HashMap<>();
        if(userService.checkEmail(usermail)){
            map.put("result", "true");
        }else{
            map.put("result", "false");
        }
        return map;
    }

    @GetMapping("/user/checkname/{name}")
    public Map<String, String> checkname(@PathVariable String name){
        Map<String, String> map = new HashMap<>();
        if(userService.checkName(name)){
            map.put("result", "true");
        }else{
            map.put("result", "false");
        }
        return map;
    }


    //user 객체 받아올때 category id값만 보내주고 name은 안줘도 입력잘댐
    @PostMapping("/user")
    public Map<String, String> insertUser(@RequestBody User user){
        Map<String, String> map = new HashMap<>();
        userService.save(user);
        map.put("result", "success");
        return map;

    }


    @DeleteMapping("/user/{email}")
    public Map<String, String> deleteUser(@PathVariable String email){
        Map<String, String> map = new HashMap<>();
        userService.deleteByEmail(email);
        map.put("result", "success");
        return map;

    }
}
