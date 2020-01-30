package minsu.restapi.persistence.service;

import minsu.restapi.persistence.model.Todo;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface TodoService {
    public List<Todo> findAll();

    public Long save(Todo todo);

    public void deleteById(Long todoId);

    public Optional<Todo> findById(Long todoId);

    public List<Todo> findByDateCal(Date date, Long calenderId);

}
