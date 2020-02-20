package minsu.restapi.web.controller;

import io.swagger.annotations.ApiOperation;
import minsu.restapi.persistence.model.Todo;
import minsu.restapi.persistence.service.SubTitleService;
import minsu.restapi.persistence.service.TodoService;
import minsu.restapi.web.dto.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = {"*"}, maxAge = 6000)
@RestController
public class TodoController {

    @Autowired
    TodoService todoService;

    @Autowired
    SubTitleService subTitleService;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping("/todo")
    @ApiOperation("모든 할일 가져오기")
    public List<TodoResponseDto> findAll(){

        List<Todo> todoList= todoService.findAll();
        List<TodoResponseDto> list = new ArrayList<>();

        for(int i=0; i<todoList.size(); i++){
            list.add(i,convertToResponseDto(todoList.get(i)));
        }

        return list;
    }

    @GetMapping("/todo/calendarid/{calendarid}")
    @ApiOperation("캘린더 아이디로 todo가져오기")
    public List<TodoResponseDto> findByCalendarId(@PathVariable Long calendarid){

        List<Todo> todoList= todoService.findByCalendarId(calendarid);
        List<TodoResponseDto> list = new ArrayList<>();

        for(int i=0; i<todoList.size(); i++){
            list.add(i,convertToResponseDto(todoList.get(i)));
        }

        return list;
    }


    @GetMapping("/todo/userid/{userid}")
    @ApiOperation("유저 아이디로 todo가져오기")
    public List<TodoResponseDto> findByUserId(@PathVariable Long userid){

        List<Todo> todoList= todoService.findByUserId(userid);
        List<TodoResponseDto> list = new ArrayList<>();

        for(int i=0; i<todoList.size(); i++){
            list.add(i,convertToResponseDto(todoList.get(i)));
        }

        return list;
    }


    @GetMapping("/todo/{today}/{calenderId}")
    @ApiOperation("캘린더 아이디와 오늘날짜로 todo 가져오기")
    public List<TodoResponseDto> findByDateCal(@PathVariable Date date, @PathVariable Long calenderId){
        List<Todo> todoList= todoService.findByDateCal(date,calenderId);
        List<TodoResponseDto> list = new ArrayList<>();

        for(int i=0; i<todoList.size(); i++){
            list.add(i,convertToResponseDto(todoList.get(i)));
        }
        return list;
    }

    @DeleteMapping("/todo/{todoId}")
    @ApiOperation("할일아이디로 할일 가져오기")
    public Map<String, String> deleteById(@PathVariable Long todoId){
        Map<String, String> map = new HashMap<>();
        todoService.deleteById(todoId);
        map.put("result", "success");
        return map;
    }

    @PostMapping("/todo")
    @ApiOperation("할일 저장")
    public Map<String, Object> save(@RequestBody TodoDto todoDto) throws Exception {
        todoDto.setId(null);
        Todo todo = convertToEntity(todoDto);
        Long id = todoService.save(todo);

        Map<String, Object> map = new HashMap<>();
        map.put("result", "success");
        map.put("id",id);
        return map;

    }

    @PutMapping("/todo")
    @ApiOperation("할일 수정")
    public Map<String, String> updateTodo(@RequestBody TodoDto todoDto) throws Exception {
        Todo todo = convertToEntity(todoDto);
        todoService.save(todo);
        Map<String, String> map = new HashMap<>();
        map.put("result", "success");
        return map;

    }

    //mapper

    private TodoResponseDto convertToResponseDto(Todo todo){
        TodoResponseDto todoResponseDto = modelMapper.map(todo, TodoResponseDto.class);
        return todoResponseDto;
    }


    private Todo convertToEntity(TodoDto todoDto) throws Exception{
        Todo todo = modelMapper.map(todoDto, Todo.class);
        return todo;
    }


    @PostMapping("/plantGrass")
    @ApiOperation("정원사 김민수")
    private void plantGrass() throws Exception {
       TodoDto todoDto = new TodoDto(null,142L, 27L, null,"운동",100, 50);
        int year = 2018;
        int month = 8;
        int day = 20;

        for(int i=0; i<580; i++){
            if(month>12){month=1;year++;}
            if(day>31){day=1;month++;}
            int n = (int) (Math.random() * 100) + 0;
            String sDay=Integer.toString(day);
            String sMonth=Integer.toString(month);
            if(day <10)sDay = "0"+sDay;
            if(month <10)sMonth = "0"+sMonth;

            String date = Integer.toString(year)+"-"+sMonth+"-"+sDay;
            day++;
            todoDto.setAchieve(n);
            todoDto.setDate(date);
            Todo todo = convertToEntity(todoDto);
            todoService.save(todo);

        }
    }
}
