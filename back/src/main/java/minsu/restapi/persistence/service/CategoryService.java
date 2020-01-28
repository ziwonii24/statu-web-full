package minsu.restapi.persistence.service;

import minsu.restapi.persistence.model.Category1;
import minsu.restapi.persistence.model.Category2;

import java.util.List;

public interface CategoryService {
    List<Category1> categoryfindAll();

    List<Category2> subCategoryfindAll();

}
