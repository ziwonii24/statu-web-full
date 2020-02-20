package minsu.restapi.web.controller;

import io.swagger.annotations.ApiOperation;
import minsu.restapi.persistence.model.SubTitle;
import minsu.restapi.persistence.service.CalendarService;
import minsu.restapi.persistence.service.SubTitleService;
import minsu.restapi.web.dto.SubTitleDto;
import minsu.restapi.web.dto.SubTitleResponseDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

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
    @ApiOperation("모든 소목표 찾기")
    public List<SubTitleResponseDto> findAll(){
        List<SubTitle> subTitleList =subTitleService.findAll();
        List<SubTitleResponseDto> list = new ArrayList<>();

        for(int i=0; i<subTitleList.size(); i++){
            list.add(i, convertToResponseDto(subTitleList.get(i)));
        }
        return list;
    }

    @GetMapping("/subtitle/bysubtitle/{subTitleId}")
    @ApiOperation("소목표아이디로 소목표 찾기")
    public SubTitleResponseDto titleById(@PathVariable Long subTitleId){
        SubTitleResponseDto subTitleResponseDto = convertToResponseDto(subTitleService.findById(subTitleId));
        return  subTitleResponseDto;
    }

    @GetMapping("/subtitle/bycalendarid/{calendarId}")
    @ApiOperation("캘린더아이디로 소목표들 찾기")
    public List<SubTitleResponseDto> titleByCalendarId(@PathVariable Long calendarId){
        List<SubTitle> subTitleList = subTitleService.findByCalendarId(calendarId);
        List<SubTitleResponseDto> list = new ArrayList<>();

        for(int i=0; i<subTitleList.size(); i++){
            list.add(i, convertToResponseDto(subTitleList.get(i)));
        }
        return list;
    }

    @PostMapping("/subtitle")
    @ApiOperation("소목표 저장")
    public Map<String,Object> save(@RequestBody SubTitleDto subTitleDto) throws Exception {

        subTitleDto.setId(null);
        SubTitle subTitle = convertToEntity(subTitleDto);
        Long id = subTitleService.save(subTitle);

        Map<String,Object> map = new HashMap<>();
        map.put("result","success");
        map.put("id",id);
        return map;
    }

    @PutMapping("/subtitle")
    @ApiOperation("소목표 수정")
    public Map<String,String> modify(@RequestBody SubTitleDto subTitleDto) throws Exception {

        SubTitle subTitle = convertToEntity(subTitleDto);
        subTitleService.save(subTitle);

        Map<String,String> map = new HashMap<>();
        map.put("result","succdss");
        return map;
    }

    @DeleteMapping("/subtitle/{subTitleId}")
    @ApiOperation("소목표아이디로 소목표 지우기")
    public Map<String,String> deleteById(@PathVariable Long subTitleId){
        subTitleService.deleteById(subTitleId);

        Map<String,String> map = new HashMap<>();
        map.put("result","succdss");
        return map;
    }


    //mapper

    private SubTitleResponseDto convertToResponseDto(SubTitle subTitle){
        SubTitleResponseDto subTitleResponseDto = modelMapper.map(subTitle, SubTitleResponseDto.class);
        return subTitleResponseDto;
    }


    private SubTitle convertToEntity(SubTitleDto subTitleDto) throws Exception{
        SubTitle subTitle = modelMapper.map(subTitleDto, SubTitle.class);
        //set
        return subTitle;
    }
}
