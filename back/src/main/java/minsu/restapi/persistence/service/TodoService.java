package minsu.restapi.persistence.service;

import minsu.restapi.persistence.model.Todo;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface TodoService {
    public List<Todo> findAll();

    public void save(Todo todo);

    public void deleteById(Long todoId);

    public void update(Todo todo);

    public Optional<Todo> findById(Long todoId);

    public List<Todo> findByDateCal(Date date, Long calenderId);

}
