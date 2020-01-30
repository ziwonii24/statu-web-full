package minsu.restapi.web.controller;

import io.swagger.annotations.ApiOperation;
import minsu.restapi.persistence.model.*;
import minsu.restapi.persistence.service.JwtService;
import minsu.restapi.persistence.service.UserService;
import minsu.restapi.web.dto.CalendarDto;
import minsu.restapi.web.dto.UserDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"*"}, maxAge = 6000)
@RestController
public class UserController {

    @Autowired
    private JwtService jwtService;

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

    //로그인
    @PostMapping("/user/signin")
    @ApiOperation("로그인하기")
    public ResponseEntity<Map<String, Object>> postSignIn(@RequestBody User user, HttpServletResponse res) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;
        try {
            User reqUser = userService.signin(user.getEmail(), user.getPassword());
            if(reqUser != null) {
                String token = jwtService.create(reqUser);
                System.out.println("token : " + token); // 이게 토큰
                res.setHeader("jwt-auth-token", token);
                System.out.println("get token 해보겠다.");
                jwtService.get(token);
                System.out.println("get token 끝났다.");
                resultMap.put("status", true);
                resultMap.put("data", reqUser);
                return response(resultMap, HttpStatus.ACCEPTED, true);
            } else {
                resultMap.put("message", "아이디 혹은 비밀번호가 틀렸습니다. 다시 시도해주세요");
                return response(resultMap, HttpStatus.ACCEPTED, true);
            }
        } catch (Exception e) {
            return response(e.getMessage(), HttpStatus.CONFLICT, false);
        }
    }


    //user 객체 받아올때 category id값만 보내주고 name은 안줘도 입력잘댐
//    @PostMapping("/user")
//    public Map<String, String> insertUser(@RequestBody UserDto userDto) throws Exception {
//        User user = convertToEntity(userDto);
//        userService.save(user);
//        Map<String, String> map = new HashMap<>();
//        map.put("result", "success");
//        return map;
//
//    }
    @PostMapping("/user/signup")
    @ApiOperation("가입하기")
    public ResponseEntity<Map<String, Object>> postSignUp(@RequestBody UserDto userDto) throws Exception {
        userDto.setId(null);
        User user = convertToEntity(userDto);
        try {

            int i = userService.save(user);

            if (i == 1) {
                return response(user, HttpStatus.CREATED, true);
            } else {
                return response("유효하지 않은 접근입니다.", HttpStatus.CONFLICT, false);
            }
        } catch (Exception e) {
            return response(e.getMessage(), HttpStatus.CONFLICT, false);
        }
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
    //    @PutMapping("/update")
//    @ApiOperation("회원정보 수정하기")
//    public ResponseEntity<Map<String, Object>> updateUser(@RequestBody User user) {
//        Map<String, Object> resultMap = new HashMap<>();
//        try {
//            int updateUser = service.updateUser(user);
//            if(updateUser == 1) {
//                return response(resultMap, HttpStatus.ACCEPTED, true);
//            } else {
//                return response("유효하지 않은 접근입니다.", HttpStatus.CONFLICT, false);
//            }
//        } catch (Exception e) {
//            return response(e.getMessage(), HttpStatus.CONFLICT, false);
//        }
//    }
//
//    @DeleteMapping("/remove")
//    @ApiOperation("회원정보 탈퇴하기")
//    public ResponseEntity<Map<String, Object>> deleteUser(@RequestParam String email) {
//        Map<String, Object> resultMap = new HashMap<>();
//        try {
//            int updateUser = service.deleteUser(email);
//            if(updateUser == 1) {
//                return response(resultMap, HttpStatus.ACCEPTED, true);
//            } else {
//                return response("유효하지 않은 접근입니다.", HttpStatus.CONFLICT, false);
//            }
//        } catch (Exception e) {
//            return response(e.getMessage(), HttpStatus.CONFLICT, false);
//        }
//    }
    private ResponseEntity<Map<String, Object>> response(Object data, HttpStatus httpstatus, boolean status) {
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("status", status);
        resultMap.put("data", data);
        System.out.println("data : " + data + ", status  : " + status + ", : httpstatus: " + httpstatus);
        return new ResponseEntity<Map<String, Object>>(resultMap, httpstatus);
    }
}
