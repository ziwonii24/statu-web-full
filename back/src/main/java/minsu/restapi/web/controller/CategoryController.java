package minsu.restapi.web.controller;

import minsu.restapi.persistence.dao.Category1Repository;
import minsu.restapi.persistence.dao.Category2Repository;
import minsu.restapi.persistence.model.Category1;
import minsu.restapi.persistence.model.Category2;
import minsu.restapi.persistence.service.CategoryService;
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



    @PostMapping("/category1")
    public Map<String,String> insertCategory1(@RequestBody Category1 category1){
        category1Repository.save(category1);

        Map<String,String> map = new HashMap<>();

        return map;
    }

    @PostMapping("/category2")
    public Map<String,String> insertCategory2(@RequestBody Category2 category2){
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
}
