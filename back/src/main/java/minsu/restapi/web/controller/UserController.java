package minsu.restapi.web.controller;

import io.swagger.annotations.ApiOperation;
import minsu.restapi.persistence.model.*;
import minsu.restapi.persistence.service.FileUploadDownloadService;
import minsu.restapi.persistence.service.JwtService;
import minsu.restapi.persistence.service.UserService;
import minsu.restapi.web.dto.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.text.SimpleDateFormat;
import java.util.*;

@CrossOrigin(origins = {"*"})
@RestController
public class UserController {

    @Autowired
    private JwtService jwtService;

    @Autowired
    UserService userService;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    FileUploadDownloadService fileUploadDownloadService;

  /*  @ExceptionHandler
    public Map<String, String> errorHandler(Exception e){
        Map<String, String> map = new HashMap<>();
        map.put("result", "false");
        return map;
    }*/


  @GetMapping("/user/exp")
  public boolean checkExp(HttpServletRequest req){
      return jwtService.getExpToken(req.getHeader("token"));
  }
    @PostMapping("/user/signup")
    @ApiOperation("가입하기")
    public ResponseEntity<Map<String, Object>> postSignUp(@RequestBody UserDto userDto) throws Exception {

        SimpleDateFormat dateFormat = new SimpleDateFormat ( "yyyy-MM-dd");
        Date date = new Date();
        userDto.setId(null);
        User user = convertToEntity(userDto);
        try {
            user.setUserTypeCode("user");
            user.setStatusCode("not_checked");
            user.setRole(Role.GUEST);
            if(user.getImg()==null || userDto.getImg().equals("string")){
                user.setImg("default.png");
            }
            user.setRegDate(dateFormat.format(date));
            int i = userService.save(user);

            if (i == 1) {
                userService.sendEmail(user);

                return response(user, HttpStatus.CREATED, true);
            } else {
                return response("유효하지 않은 접근입니다.", HttpStatus.CONFLICT, false);
            }
        } catch (Exception e) {
            return response(e.getMessage(), HttpStatus.CONFLICT, false);
        }
    }

    //로그인
    @PostMapping("/user/signin")
    @ApiOperation("로그인하기")
    public ResponseEntity<Map<String, Object>> postSignIn(@RequestBody LoginDto loginDto, HttpServletResponse res) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;
        try {
            User reqUser = userService.signin(loginDto.getEmail(), loginDto.getPassword());

            if (reqUser != null) {
                UserResponseDto dto = convertToResponseDto(reqUser);
                //String token = jwtService.create(reqUser);
                String token = jwtService.create(dto);
                res.setHeader("token", token);
                resultMap.put("token",token);
                return response(resultMap, HttpStatus.ACCEPTED, true);
            } else {
                resultMap.put("message", "아이디 혹은 비밀번호가 틀렸습니다. 다시 시도해주세요");
                return response(resultMap, HttpStatus.ACCEPTED, true);
            }
        } catch (Exception e) {
            return response(e.getMessage(), HttpStatus.CONFLICT, false);
        }
    }

    @PostMapping("/user/social")
    @ApiOperation("소셜리다이렉트")
    public ResponseEntity<Map<String, Object>> postSocial(@RequestBody LoginDto loginDto, HttpServletResponse res) {
        Map<String, Object> resultMap = new HashMap<>();
        String email = loginDto.getEmail();
        try {
            if (userService.checkEmail(email)) {
                String userTypeCode = userService.findByEmail(email).getUserTypeCode();
                if(userTypeCode.equals("social")){
                    //그 자체로 인증됬으니 토큰생성후 return
                    User user = userService.findByEmail(email);
                    UserResponseDto dto = convertToResponseDto(user);
                    String token = jwtService.create(dto);
                    res.setHeader("token", token);
                    resultMap.put("token", token);
                    return response(resultMap, HttpStatus.ACCEPTED, true);
                } else { // 다시 return하여 로그인 하시오.
                    return response("중복된 이메일 입니다.", HttpStatus.CONFLICT, false);
                }
            } else {
                String name = loginDto.getName().trim() + userService.random(6);
                User user = new User(name, email, Role.GUEST);
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
                Date date = new Date();
                user.setImg("default.png");
                user.setRegDate(dateFormat.format(date));
                user.setStatusCode("use");
                user.setCategory1("");
                user.setCategory2("");
                user.setUserTypeCode("social");
                userService.save(user);
                user.setId(userService.findByEmail(email).getId());
                UserResponseDto dto = convertToResponseDto(user);
                String token = jwtService.create(dto);
                res.setHeader("token", token);
                resultMap.put("token", token);
                return response(resultMap, HttpStatus.ACCEPTED, true);
            }
        } catch (Exception e) {
            return response("알 수 없는 오류!", HttpStatus.CONFLICT, false);
        }
    }


    @GetMapping("/user/auth/exp")
    public boolean checkExpiration(HttpServletRequest req){
        return jwtService.getExpToken(req.getHeader("token"));
    }



    @GetMapping("/user")
    @ApiOperation("모든 유저 찾기")
    public List<UserResponseDto> findAll() {

        List<User> userList = userService.findAll();
        List<UserResponseDto> list = new ArrayList<>();
        for(int i=0; i<userList.size();i++){
            list.add(i,convertToResponseDto(userList.get(i)));
        }

        return list;
    }


    @GetMapping("/user/{option}/{search}")
    @ApiOperation("유저아이디 또는 이름으로 유저 찾기")
    public UserResponseDto findById(@PathVariable String option, @PathVariable String search) {
        User user=null;
        if(option.equals("id")){
            user= userService.findById(Long.parseLong(search));
      }else if(option.equals("name")){
            user = userService.findByName(search);
        }
        UserResponseDto userResponseDto = convertToResponseDto(user);
        return userResponseDto;
    }

    @GetMapping("/user/checkmail/{usermail}")
    @ApiOperation("유저메일 중복체크")
    public Map<String, String> checkmail(@PathVariable String usermail) {

        Map<String, String> map = new HashMap<>();
        if (userService.checkEmail(usermail)) {
            map.put("result", "true");
        } else {
            map.put("result", "false");
        }
        return map;
    }

    @GetMapping("/user/checkname/{name}")
    @ApiOperation("유저 이름 중복체크")
    public Map<String, String> checkname(@PathVariable String name) {
        Map<String, String> map = new HashMap<>();
        if (userService.checkName(name)) {
            map.put("result", "true");
        } else {
            map.put("result", "false");
        }
        return map;
    }



    @PutMapping("/user/modify")
    @ApiOperation("유저정보 수정")
    public ResponseEntity<Map<String, Object>> modify(@RequestBody UserUpdateDto userDto) throws Exception {
        Map<String, Object> resultMap = new HashMap<>();
        User user = updateToEntity(userDto);
        userService.modify(user);
        UserResponseDto dto = convertToResponseDto(user);
        String token = jwtService.create(dto);
        resultMap.put("token",token);
        return response(resultMap, HttpStatus.ACCEPTED, true);
    }


    @DeleteMapping("/user/auth/{email}")
    @ApiOperation("유저정보 삭제")
    public Map<String, String> deleteUser(@PathVariable("email") String email) {
        Map<String, String> map = new HashMap<>();
        userService.deleteByEmail(email);
        map.put("result", "success");
        return map;
    }

    @GetMapping(value="/joinConfirm/{id}/{auth}")
    @ApiOperation("유저 이메일 인증확인")
    public String  emailConfirm(@PathVariable Long id,@PathVariable String auth,HttpServletResponse response) throws Exception {
        User user = userService.findById(id);
        if (user.getAuthKey().compareTo(auth)==0) {
            user.setStatusCode("use");    // authstatus를 1로,, 권한 업데이트
            userService.modify(user);
            return "<h1>인증 성공</h1>" +
                    "<p>잠시뒤에 STATU페이지로 이동합니다</p>"+
                    "<meta http-equiv=\"refresh\" content=\"2; url=http://i02a302.p.ssafy.io/\">";
        } else {
            return "<h1>인증 실패</h1>";
        }

    }


    //mapper

    private UserResponseDto convertToResponseDto(User user){
          UserResponseDto userResponseDto = modelMapper.map(user, UserResponseDto.class);

          String[] temp = user.getCategory1().split(",");
          userResponseDto.setCategory1(temp);

          temp = user.getCategory2().split(",");
          userResponseDto.setCategory2(temp);
          return userResponseDto;
    }



    private User convertToEntity(UserDto userDto) throws Exception {

        User user = modelMapper.map(userDto, User.class);

        String temp="";
        if(userDto.getCategory1()!=null)
            for(int i=0; i<userDto.getCategory1().length; i++){
                temp+=userDto.getCategory1()[i]+",";
            }
        user.setCategory1(temp.substring(0,temp.length()-1));

        temp="";
        if(userDto.getCategory2()!=null)
            for(int i=0; i<userDto.getCategory2().length; i++){
                temp+=userDto.getCategory2()[i]+",";
            }
        user.setCategory2(temp.substring(0,temp.length()-1));

        return user;
    }


    private User updateToEntity(UserUpdateDto userUpdateDto) throws Exception {

        User origin = userService.findById(userUpdateDto.getId());
        origin.setName(userUpdateDto.getName());
        String temp="";
        if(userUpdateDto.getCategory1()!=null)
            for(int i=0; i<userUpdateDto.getCategory1().length; i++){
                temp+=userUpdateDto.getCategory1()[i]+",";
            }
        origin.setCategory1(temp.substring(0,temp.length()-1));

        temp="";
        if(userUpdateDto.getCategory2()!=null)
            for(int i=0; i<userUpdateDto.getCategory2().length; i++){
                temp+=userUpdateDto.getCategory2()[i]+",";
            }
        origin.setCategory2(temp.substring(0,temp.length()-1));

        return origin;
    }

    @PostMapping("/user/upload")
    public ResponseEntity<Map<String, Object>> uploadFile(@RequestParam(value = "file", required = false) MultipartFile file,
                           @RequestParam("email") String email) throws Exception {
        Map<String, Object> resultMap = new HashMap<>();
        User user = userService.findByEmail(email);
        if(file == null){
            return response(resultMap, HttpStatus.ACCEPTED, false);//이부분 모르겠는데 영연이형한테 물어봐야함 실패했을때 뭐리턴함?
        }
        File root = new File("./uploads");
        if(root.exists() && !user.getImg().equals("default.png")){ //파일존재여부
            File[] files = root.listFiles();
            for(File f : files){
                if(f.getName().equals(user.getImg())){
                    f.delete();
                }
            }
        }
        String fileName = fileUploadDownloadService.storeFile(file);

        user.setImg(fileName);
        userService.modify(user);
        UserResponseDto dto = convertToResponseDto(user);
        String token = jwtService.create(dto);
        resultMap.put("token",token);
        return response(resultMap, HttpStatus.ACCEPTED, true);
    }



    @DeleteMapping("/user/deletefile")
    public void deleteFile(@RequestParam("email") String email) throws Exception {
        userService.deleteImg(email);
    }

    private ResponseEntity<Map<String, Object>> response(Object data, HttpStatus httpstatus, boolean status) {
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("status", status);
        resultMap.put("data", data);
        return new ResponseEntity<Map<String, Object>>(resultMap, httpstatus);
    }
}
