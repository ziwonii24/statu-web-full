package minsu.restapi.persistence.dao;

import minsu.restapi.persistence.model.Calendar;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface CalendarRepository extends JpaRepository<Calendar, Long> {

    public List<Calendar> findByUserId(Long id);

    public Calendar findByUserIdAndRepresen(Long id, boolean represen);

}
