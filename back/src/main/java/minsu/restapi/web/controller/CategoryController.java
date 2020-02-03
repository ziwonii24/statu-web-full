package minsu.restapi.web.controller;

import minsu.restapi.persistence.dao.Category1Repository;
import minsu.restapi.persistence.dao.Category2Repository;
import minsu.restapi.persistence.model.Category1;
import minsu.restapi.persistence.model.Category2;
import minsu.restapi.persistence.model.Todo;
import minsu.restapi.persistence.model.User;
import minsu.restapi.persistence.service.CategoryService;
import minsu.restapi.web.dto.Category1Dto;
import minsu.restapi.web.dto.Category2Dto;
import minsu.restapi.web.dto.TodoDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"*"}, maxAge = 6000)
@RestController
public class CategoryController {
    @Autowired
    CategoryService categoryService;
    @Autowired
    Category1Repository category1Repository;
    @Autowired
    Category2Repository category2Repository;
    @Autowired
    private ModelMapper modelMapper;
    @PostMapping("/category1")
    public Map<String,String> insertCategory1(@RequestBody Category1Dto category1Dto) throws Exception {

        Category1 category1 = convertToEntity1(category1Dto);
        category1.setId(null);
        category1Repository.save(category1);

        Map<String,String> map = new HashMap<>();

        return map;
    }

    @PostMapping("/category2")
    public Map<String,String> insertCategory2(@RequestBody Category2Dto category2Dto) throws Exception {
        Category2 category2 = convertToEntity2(category2Dto);
        category2.setId(null);
        category2Repository.save(category2);

        Map<String,String> map = new HashMap<>();

        return map;
    }

    @PutMapping("/category1")
    public Map<String,String> modifyCategory1(@RequestBody Category1 category1){
        category1Repository.save(category1);

        Map<String,String> map = new HashMap<>();

        return map;
    }

    @PutMapping("/category2")
    public Map<String,String> modifyCategory2(@RequestBody Category2 category2){
        category2Repository.save(category2);

        Map<String,String> map = new HashMap<>();

        return map;
    }

    @GetMapping("/categorys")
    List<Category1> categorys(){
        List<Category1> list = categoryService.categoryfindAll();
        return  list;
    }

    @GetMapping("/subcategorys")
    List<Category2> subCategories(){
        List<Category2> list = categoryService.subCategoryfindAll();
        return  list;
    }


    private Category1 convertToEntity1(Category1Dto category1Dto) throws Exception{
        Category1 category1 = modelMapper.map(category1Dto, Category1.class);
        return category1;
    }

    private Category2 convertToEntity2(Category2Dto category2Dto) throws Exception{
        Category2 category2 = modelMapper.map(category2Dto, Category2.class);
        return category2;
    }

}
