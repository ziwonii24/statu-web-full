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
    private Category1Repository category1Repository;

    @Autowired
    private Category2Repository category2Repository;


    @Override
    public List<Category1> categoryfindAll() {

        List<Category1> category1s = category1Repository.findAll();

        return category1s;
    }

    @Override
    public List<Category2> subCategoryfindAll() {

        List<Category2> category2s = category2Repository.findAll();

        return category2s;
    }

    @Override
    public Category1 findByOneId(Long id) {
        return category1Repository.findById(id).get();
    }

    @Override
    public Category2 findByTwoId(Long id) {
        return category2Repository.findById(id).get();
    }
}
