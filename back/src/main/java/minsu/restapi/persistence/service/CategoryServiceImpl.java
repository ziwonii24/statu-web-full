package minsu.restapi.persistence.service;

import minsu.restapi.persistence.dao.Category1Repository;
import minsu.restapi.persistence.dao.Category2Repository;
import minsu.restapi.persistence.model.Category1;
import minsu.restapi.persistence.model.Category2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    Category1Repository category1Repository;

    @Autowired
    Category2Repository category2Repository;


    @Override
    public List<Category1> categoryfindAll() {

        List<Category1> categories = category1Repository.findAll();

        return categories;
    }

    @Override
    public List<Category2> subCategoryfindAll() {

        List<Category2> subCategories = category2Repository.findAll();

        return subCategories;
    }
}
