package minsu.restapi.web.controller;

import minsu.restapi.persistence.model.Calendar;
import minsu.restapi.persistence.model.Category1;
import minsu.restapi.persistence.model.SubTitle;
import minsu.restapi.persistence.model.Todo;
import minsu.restapi.persistence.service.SubTitleService;
import minsu.restapi.persistence.service.TodoService;
import minsu.restapi.web.dto.CalendarDto;
import minsu.restapi.web.dto.TodoDto;
import minsu.restapi.web.dto.TodosDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public List<Todo> findAll(){
        return todoService.findAll();
    }

    @GetMapping("/todo/{today}/{calenderId}")
    public List<Todo> findByDateCal(@PathVariable Date date, @PathVariable Long calenderId){
        return todoService.findByDateCal(date,calenderId);
    }

    @DeleteMapping("/todo/{todoId}")
    public Map<String, String> deleteById(@PathVariable Long todoId){

        Map<String, String> map = new HashMap<>();
        todoService.deleteById(todoId);
        map.put("result", "success");
        return map;
    }
/*
    @PostMapping("/todo")
    public Map<String, String> insertTodo(@RequestBody TodoDto todoDto) throws Exception {

        Todo todo = convertToEntity(todoDto);
        SubTitle subTitle = subTitleService.findById(todoDto.getSubTitleId());
        todoService.save(todo);
        subTitle.getTodo().add(todo);
        subTitleService.save(subTitle);

        Map<String, String> map = new HashMap<>();
        todoService.save(todo);
        map.put("result", "success");
        return map;

    }
 */

    @PostMapping("/todos")
    public Map<String, String> saveTodos(@RequestBody TodosDto todosDto) throws Exception {
        Map<String, String> map = new HashMap<>();
        if(todosDto.getTodos()==null){
            map.put("result", "failed");
            return map;
        }
        int size = todosDto.getTodos().length;

        for(int i=0; i<size; i++) {
            TodoDto todoDto = todosDto.getTodos()[i];
            Todo todo = convertToEntity(todoDto);
            SubTitle subTitle = subTitleService.findById(todoDto.getSubTitleId());
            todoService.save(todo);
            subTitle.getTodo().add(todo);
            subTitleService.save(subTitle);
            todoService.save(todo);
        }
        map.put("result", "success");
        return map;

    }

    @PutMapping("/todo")
    public Map<String, String> updateTodo(@RequestBody TodoDto todoDto) throws Exception {
        Todo todo = convertToEntity(todoDto);
        SubTitle subTitle = subTitleService.findById(todoDto.getSubTitleId());
        todoService.save(todo);
        subTitle.getTodo().add(todo);
        subTitleService.save(subTitle);

        Map<String, String> map = new HashMap<>();
        todoService.save(todo);
        map.put("result", "success");
        return map;

    }

    private Todo convertToEntity(TodoDto todoDto) throws Exception{
        Todo todo = modelMapper.map(todoDto, Todo.class);
        return todo;
    }

}
