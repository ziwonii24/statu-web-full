package minsu.restapi.persistence.service;

import minsu.restapi.persistence.model.Category1;
import minsu.restapi.persistence.model.Category2;

import java.util.List;

public interface CategoryService {
    public List<Category1> categoryfindAll();

    public List<Category2> subCategoryfindAll();

    public Category1 findByOneId(Long id);
    public Category2 findByTwoId(Long id);
}
