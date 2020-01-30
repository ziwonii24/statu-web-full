package minsu.restapi.web.controller;

import minsu.restapi.persistence.model.*;
import minsu.restapi.web.dto.CalendarResponseDto;
import org.modelmapper.ModelMapper;
import minsu.restapi.persistence.service.CalendarService;
import minsu.restapi.persistence.service.CategoryService;
import minsu.restapi.persistence.service.UserService;
import minsu.restapi.web.dto.CalendarDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"*"}, maxAge = 6000)
@RestController
public class CalendarController {

    @Autowired
    CalendarService calendarService;

    @Autowired
    private UserService userService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private ModelMapper modelMapper;

    @PostMapping("/calendar")
    public Map<String, String> save(@RequestBody CalendarDto calendarDto) throws Exception {
        User user = userService.findById(calendarDto.getUserId());
        calendarDto.setId(null);
        Calendar calendar = convertToEntity(calendarDto);
        calendarService.save(calendar);
        user.getCalendars().add(calendar);
        userService.save(user);

        Map<String, String> map = new HashMap<>();
        map.put("result", "success");
        return map;
    }

    @PutMapping("/calendar")
    public Map<String, String> modify(@RequestBody CalendarDto calendarDto) throws Exception {

        User user = userService.findById(calendarDto.getUserId());
        Calendar calendar = convertToEntity(calendarDto);
        calendarService.save(calendar);
        user.getCalendars().add(calendar);
        userService.save(user);
        Map<String, String> map = new HashMap<>();

        map.put("result", "success");
        return map;
    }

    @GetMapping("/calendar")
    public List<CalendarResponseDto> findAll(){
        List<Calendar> temp = calendarService.findAll();
        List<CalendarResponseDto> list = new ArrayList<>();
        for(int i=0; i<temp.size(); i++){
            list.add(convertToResponseDto(temp.get(i)));
        }
        return list;
    }


    @GetMapping("/calendar/findall/{userid}")
    public List<CalendarResponseDto> findByUserId(@PathVariable Long userid){
        List<Calendar> temp = calendarService.findByUserId(userid);
        List<CalendarResponseDto> list = new ArrayList<>();
        for(int i=0; i<temp.size(); i++){
            list.add(convertToResponseDto(temp.get(i)));
        }
        return list;
    }

    @GetMapping("/calendar/represen/{userid}")
    public CalendarResponseDto findByUserIdAndRepresen(@PathVariable Long userid){
        return convertToResponseDto(calendarService.findByUserIdAndRepresen(userid));
    }

    @DeleteMapping("/calendar/{calendarId}")
    public Map<String, String> delete(@PathVariable Long calendarId){
        calendarService.deleteById(calendarId);
        Map<String, String> map = new HashMap<>();
        map.put("result", "success");
        return map;
    }


    private CalendarResponseDto convertToResponseDto(Calendar calendar){
        CalendarResponseDto calendarResponseDto = modelMapper.map(calendar, CalendarResponseDto.class);
        //set
        String temp[] = calendar.getTag().split(",");
        calendarResponseDto.setTag(temp);
        return calendarResponseDto;
    }

    private Calendar convertToEntity(CalendarDto calendarDto) throws Exception{

        Calendar calendar = modelMapper.map(calendarDto, Calendar.class);

        //set
        String temp="";
        for(int i=0; i<calendarDto.getTags().length; i++){
            temp+=calendarDto.getTags()[i]+",";
        }
        calendar.setTag(temp);

        if(calendarDto.getCategory1()!=null){
            for (int i = 0; i < calendarDto.getCategory1().length; i++) {
                Category1 category1 = new Category1();
                category1.setId(calendarDto.getCategory1()[i]);
                calendar.getCategory1s().add(category1);
            }
        }

        if(calendarDto.getCategory2()!=null){
            for (int i = 0; i < calendarDto.getCategory2().length; i++) {
                Category2 category2 = new Category2();
                category2.setId(calendarDto.getCategory2()[i]);
                calendar.getCategory2s().add(category2);
            }
        }


        return calendar;
    }


}

