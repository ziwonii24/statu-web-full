package minsu.restapi.controller;

import minsu.restapi.persistence.dao.Category1Repository;
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


    @PostMapping("/insertcategory")
    public Map<String,String> insert(@RequestBody Category1 category1){
        category1Repository.save(category1);

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
