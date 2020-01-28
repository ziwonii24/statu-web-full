package minsu.restapi.controller;

import minsu.restapi.persistence.model.SubTitle;
import minsu.restapi.persistence.service.SubTitleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = {"*"}, maxAge = 6000)
@RestController
public class SubTitleController {

    @Autowired
    SubTitleService subTitleService;

    @GetMapping("/subtitle")
    public List<SubTitle> title(){
        return subTitleService.findAll();
    }

    @GetMapping("/subtitle/{subTitleId}")
    public Optional<SubTitle> titleById(@PathVariable Long subTitleId){
        return  subTitleService.findById(subTitleId);
    }

    @GetMapping("/subtitle/{calendarId}")
    public List<SubTitle> titleByCalendarId(@PathVariable Long calendarId){
        return  subTitleService.findByCalendarId(calendarId);
    }

    @PostMapping("/subtitle")
    public Map<String,String> save(@RequestBody SubTitle subTitle){
        subTitleService.save(subTitle);

        Map<String,String> map = new HashMap<>();
        map.put("result","succdss");
        return map;
    }
}
