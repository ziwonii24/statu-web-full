package minsu.restapi.controller;

import minsu.restapi.persistence.model.Calendar;
import minsu.restapi.persistence.service.CalendarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"*"}, maxAge = 6000)
@RestController
public class CalendarController {

    @Autowired
    CalendarService calendarService;



    @PostMapping("/calendar")
    public Map<String, String> save(@RequestBody Calendar calendar){
        calendarService.save(calendar);
        Map<String, String> map = new HashMap<>();
        map.put("result", "success");
        return map;
    }

    @GetMapping("/calendar")
    public List<Calendar> findAll(){
        return calendarService.findAll();
    }


}
