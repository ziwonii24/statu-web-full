package minsu.restapi.persistence.dao;

import minsu.restapi.persistence.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Long> {

    @Query("select t from Todo t where t.date = :date AND t.subTitle.calendar.id = :calenderId ")
    public List<Todo> findByDateCal(@Param("date") Date date, @Param("calenderId") Long calenderId);
}
