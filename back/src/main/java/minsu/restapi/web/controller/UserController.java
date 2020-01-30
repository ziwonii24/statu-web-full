package minsu.restapi.web.controller;

import minsu.restapi.persistence.model.*;
import minsu.restapi.persistence.service.UserService;
import minsu.restapi.web.dto.CalendarDto;
import minsu.restapi.web.dto.UserDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"*"}, maxAge = 6000)
@RestController
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    private ModelMapper modelMapper;

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
    public Map<String, String> insertUser(@RequestBody UserDto userDto) throws Exception {
        User user = convertToEntity(userDto);
        userService.save(user);
        Map<String, String> map = new HashMap<>();
        map.put("result", "success");
        return map;

    }

    @PutMapping("/user")
    public Map<String, String> modify(@RequestBody UserDto userDto) throws Exception {
        User user = convertToEntity(userDto);
        userService.save(user);
        Map<String, String> map = new HashMap<>();

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

    private User convertToEntity(UserDto userDto) throws Exception{

        User user = modelMapper.map(userDto, User.class);

        //set
        if(userDto.getCategory1()!=null){
            for (int i = 0; i < userDto.getCategory1().length; i++) {
                Category1 category1 = new Category1();
                category1.setId(userDto.getCategory1()[i]);
                user.getCategory1s().add(category1);
            }
        }

        if(userDto.getCategory2()!=null){
            for (int i = 0; i < userDto.getCategory2().length; i++) {
                Category2 category2 = new Category2();
                category2.setId(userDto.getCategory2()[i]);
                user.getCategory2s().add(category2);
            }
        }

        return user;
    }
}
