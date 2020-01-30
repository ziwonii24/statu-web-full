package minsu.restapi.persistence.service;


import minsu.restapi.persistence.dao.TodoRepository;
import minsu.restapi.persistence.model.Todo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TodoServiceImpl implements TodoService{

    @Autowired
    private TodoRepository todoRepository;

    @Override
    public List<Todo> findAll() {
        return todoRepository.findAll();
    }

    @Override
    public Long save(Todo todo) {
        Long id = todoRepository.save(todo).getId();
        return id;
    }

    @Override
    public void deleteById(Long todoId) {
        todoRepository.deleteById(todoId);
    }

    @Override
    public Optional<Todo> findById(Long todoId) {
        return todoRepository.findById(todoId);
    }

    @Override
    public List<Todo> findByDateCal(Date date, Long calenderId) {
        return todoRepository.findByDateCal(date, calenderId);
    }
}
