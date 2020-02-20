package minsu.restapi.persistence.dao;

import minsu.restapi.persistence.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Long> {

    @Query("select t from Todo t where t.date = :date AND t.subTitle.calendar.id = :calenderId ")
    public List<Todo> findByDateCal(@Param("date") Date date, @Param("calenderId") Long calenderId);

    public List<Todo> findByCalendarId(Long calendarId);

    @Query("select t from Todo t where t.subTitle.calendar.user.id = :userId ")
    public List<Todo> findByUserId(@Param("userId") Long userId);

}
