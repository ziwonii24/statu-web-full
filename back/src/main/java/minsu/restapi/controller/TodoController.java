package minsu.restapi.controller;

import minsu.restapi.persistence.model.Todo;
import minsu.restapi.persistence.service.TodoService;
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

    @PostMapping("/todo")
    public Map<String, String> insertTodo(@RequestBody Todo todo){
        Map<String, String> map = new HashMap<>();
        todoService.save(todo);
        map.put("result", "success");
        return map;

    }

    @PutMapping("/todo")
    public Map<String, String> updateTodo(@RequestBody Todo todo){
        Map<String, String> map = new HashMap<>();
        todoService.update(todo);
        map.put("result", "success");
        return map;

    }


}
