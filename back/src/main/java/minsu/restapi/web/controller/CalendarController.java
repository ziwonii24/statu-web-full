package minsu.restapi.web.controller;

import io.swagger.annotations.ApiOperation;
import minsu.restapi.persistence.model.*;
import minsu.restapi.persistence.service.SubTitleService;
import minsu.restapi.web.dto.CalendarResponseDto;
import org.modelmapper.ModelMapper;
import minsu.restapi.persistence.service.CalendarService;
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
    private SubTitleService subTitleService;

    @Autowired
    private ModelMapper modelMapper;

    @PostMapping("/calendar")
    @ApiOperation("캘린더 저장")
    public Map<String, Object> save(@RequestBody CalendarDto calendarDto) throws Exception {
        System.out.println(calendarDto.isRepresent());

        calendarDto.setId(null);
        Calendar calendar = convertToEntity(calendarDto);
        calendar.setRecommend(0);
        calendar.setView(0);
        calendar.setProgress(0);

        Long id = calendarService.save(calendar);
        SubTitle subTitle = new SubTitle(null,"기타","9999-99-99","9999-99-99","gray",calendar,null);
        subTitleService.save(subTitle);

        Map<String, Object> map = new HashMap<>();
        map.put("result", "success");
        map.put("id", id);
        return map;
    }

    @PutMapping("/calendar")
    @ApiOperation("캘린더 수정")
    public Map<String, String> modify(@RequestBody CalendarDto calendarDto) throws Exception {

        Calendar calendar = convertToEntity(calendarDto);
        calendarService.save(calendar);
        Map<String, String> map = new HashMap<>();

        map.put("result", "success");
        return map;
    }

    @PutMapping("/pbtoggle/{calendarid}")
    @ApiOperation("캘린더 아이디로 퍼블릭 토글")
    public Map<String, String> pbToggle(@PathVariable Long calendarid) throws Exception {
        calendarService.pbToggle(calendarid);
        Map<String, String> map = new HashMap<>();
        map.put("result", "success");
        return map;
    }


    @PutMapping("/representset/{calendarid}")
    @ApiOperation("캘린더 아이디로 대표 설정")
    public Map<String, String> setRepresent(@PathVariable Long calendarid) throws Exception {
        calendarService.setRepresent(calendarid);
        Map<String, String> map = new HashMap<>();
        map.put("result", "success");
        return map;
    }

    @PutMapping("/representoff/{calendarid}")
    @ApiOperation("캘린더 아이디로 대표 false")
    public Map<String, String> setRepresentFalse(@PathVariable Long calendarid) throws Exception {
        calendarService.setRepresentFalse(calendarid);
        Map<String, String> map = new HashMap<>();
        map.put("result", "success");
        return map;
    }


    @GetMapping("/calendar")
    @ApiOperation("모든 캘린더 찾기")
    public List<CalendarResponseDto> findAll(){
        List<Calendar> temp = calendarService.findAll();
        List<CalendarResponseDto> list = new ArrayList<>();
        for(int i=0; i<temp.size(); i++){
            list.add(convertToResponseDto(temp.get(i)));
        }
        return list;
    }


    @GetMapping("/calendar/findall/{userid}")
    @ApiOperation("유저id로 유저의 모든 캘린더 찾기")
    public List<CalendarResponseDto> findAllByUserId(@PathVariable Long userid){
        List<Calendar> temp = calendarService.findByUserId(userid);
        List<CalendarResponseDto> list = new ArrayList<>();
        for(int i=0; i<temp.size(); i++){
            list.add(convertToResponseDto(temp.get(i)));
        }
        return list;
    }

    @GetMapping("/calendar/{option}/{sort}/{search}")
    @ApiOperation("title,tag,category1,categort2,all/id,title,view,recommend/string")
    public List<CalendarResponseDto> findByUserId(@PathVariable String option,@PathVariable String sort, @PathVariable String search){
        List<Calendar> temp = null;

        if(!(sort.equals("id") || sort.equals("title") ||sort.equals("view") ||sort.equals("recommend")))sort="id";

        if(option.equals("all")){
            temp = calendarService.findByTagCC(search,sort);
        }else if(option.equals("title")){
            temp = calendarService.findByTitle(search,sort);
        }else if(option.equals("tag")){
            temp = calendarService.findByTag(search,sort);
        }else if(option.equals("category1")){
            temp = calendarService.findByCategory1(search,sort);
        }else if(option.equals("category2")){
            temp = calendarService.findByCategory2(search,sort);
        }
        List<CalendarResponseDto> list = new ArrayList<>();
        if(temp!=null)
        for(int i=0; i<temp.size(); i++){
            list.add(convertToResponseDto(temp.get(i)));
        }
        return list;
    }

    @GetMapping("/calendar/represent/{userid}")
    @ApiOperation("유저아이디로 대표 캘린더 찾기")
    public CalendarResponseDto findByUserIdAndRepresent(@PathVariable Long userid){
        return convertToResponseDto(calendarService.findByUserIdAndRepresent(userid));
    }

    @GetMapping("/calendar/1/{calendarid}")
    @ApiOperation("캘린더아이디로 소목표와 할일 모두 가져오기")
    public Calendar findByCalendarIdAll(@PathVariable Long calendarid) {
        return calendarService.findById(calendarid);
    }


    @GetMapping("/calendar/0/{calendarid}")
    @ApiOperation("캘린더 아이디로 캘린더 정보만 가져오기")
    public CalendarResponseDto findByCalendarIdOne(@PathVariable Long calendarid) {
        CalendarResponseDto calendarResponseDto = convertToResponseDto(calendarService.findById(calendarid));
        return calendarResponseDto;
    }

    @DeleteMapping("/calendar/{calendarId}")
    @ApiOperation("캘린더아이디로 캘린더 지우기")
    public Map<String, String> delete(@PathVariable Long calendarId){
        calendarService.deleteById(calendarId);
        Map<String, String> map = new HashMap<>();
        map.put("result", "success");
        return map;
    }


    //켈린더 장바구니

    @GetMapping("/calendartemp/{userid}")
    @ApiOperation("유저 아이디로 캘린더 장바구니 찾기")
    public List<CalendarTemp> findTemp(@PathVariable Long userid){
        List<CalendarTemp> list=null;
        list = calendarService.tempFind(userid);
        return list;
    }

    @PostMapping("/calendartemp")
    @ApiOperation("캘린더 장바구니 저장")
    public Map<String,String> saveTemp(@RequestBody CalendarTemp calendarTemp){
        List<CalendarTemp> list=null;
        calendarService.tempSave(calendarTemp);
        Map<String,String> map = new HashMap<String,String>();
        map.put("result","success");
        return map;
    }

    @DeleteMapping("/calendartemp/{tempid}")
    @ApiOperation("장바구니 아이디로 캘린더 삭제")
    public Map<String,String> deleteTemp(@PathVariable Long tempid){
        calendarService.tempDelete(tempid);
        Map<String,String> map = new HashMap<String,String>();
        map.put("result","success");
        return map;
    }




    //mapper

    private CalendarResponseDto convertToResponseDto(Calendar calendar){
        CalendarResponseDto calendarResponseDto = modelMapper.map(calendar, CalendarResponseDto.class);
        //set
        String temp[] = calendar.getTag().split(",");
        calendarResponseDto.setTags(temp);

        temp = calendar.getCategory1().split(",");
        calendarResponseDto.setCategory1(temp);

        temp = calendar.getCategory2().split(",");
        calendarResponseDto.setCategory2(temp);
        return calendarResponseDto;
    }

    private Calendar convertToEntity(CalendarDto calendarDto) throws Exception{

        Calendar calendar = modelMapper.map(calendarDto, Calendar.class);

        //set
        String temp="";
        if(calendarDto.getTags()!=null)
        for(int i=0; i<calendarDto.getTags().length; i++){temp+=calendarDto.getTags()[i]+",";}
        calendar.setTag(temp.substring(0,temp.length()-1));
       temp="";
        if(calendarDto.getCategory1()!=null)
        for(int i=0; i<calendarDto.getCategory1().length; i++){temp+=calendarDto.getCategory1()[i]+",";}
        calendar.setCategory1(temp.substring(0,temp.length()-1));
        temp="";
        if(calendarDto.getCategory2()!=null)
        for(int i=0; i<calendarDto.getCategory2().length; i++){temp+=calendarDto.getCategory2()[i]+",";}
        calendar.setCategory2(temp.substring(0,temp.length()-1));
        return calendar;
    }
}

