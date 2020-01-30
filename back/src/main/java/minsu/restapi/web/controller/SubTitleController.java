package minsu.restapi.web.controller;

import minsu.restapi.persistence.model.Calendar;
import minsu.restapi.persistence.model.Category1;
import minsu.restapi.persistence.model.SubTitle;
import minsu.restapi.persistence.model.Todo;
import minsu.restapi.persistence.service.CalendarService;
import minsu.restapi.persistence.service.SubTitleService;
import minsu.restapi.web.dto.CalendarDto;
import minsu.restapi.web.dto.SubTitleDto;
import org.modelmapper.ModelMapper;
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

    @Autowired
    CalendarService calendarService;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping("/subtitle")
    public List<SubTitle> title(){
        return subTitleService.findAll();
    }

    @GetMapping("/subtitle/bysubtitle/{subTitleId}")
    public SubTitle titleById(@PathVariable Long subTitleId){
        return  subTitleService.findById(subTitleId);
    }

    @GetMapping("/subtitle/bycalendarid/{calendarId}")
    public List<SubTitle> titleByCalendarId(@PathVariable Long calendarId){
        return  subTitleService.findByCalendarId(calendarId);
    }

    @PostMapping("/subtitle")
    public Map<String,String> save(@RequestBody SubTitleDto subTitleDto) throws Exception {

        Calendar calendar = calendarService.findById(subTitleDto.getCalendarId());
        SubTitle subTitle = convertToEntity(subTitleDto);
        subTitleService.save(subTitle);
        calendar.getSubTitles().add(subTitle);
        calendarService.save(calendar);

        Map<String,String> map = new HashMap<>();
        map.put("result","succdss");
        return map;
    }

    @PutMapping("/subtitle")
    public Map<String,String> modify(@RequestBody SubTitleDto subTitleDto) throws Exception {

        Calendar calendar = calendarService.findById(subTitleDto.getCalendarId());
        SubTitle subTitle = convertToEntity(subTitleDto);
        subTitleService.save(subTitle);
        calendar.getSubTitles().add(subTitle);
        calendarService.save(calendar);

        Map<String,String> map = new HashMap<>();
        map.put("result","succdss");
        return map;
    }

    @DeleteMapping("/subtitle/{subTitleId}")
    public Map<String,String> deleteById(@PathVariable Long subTitleId){
        subTitleService.deleteById(subTitleId);

        Map<String,String> map = new HashMap<>();
        map.put("result","succdss");
        return map;
    }



    private SubTitle convertToEntity(SubTitleDto subTitleDto) throws Exception{
        SubTitle subTitle = modelMapper.map(subTitleDto, SubTitle.class);
        //set
        return subTitle;
    }
}
