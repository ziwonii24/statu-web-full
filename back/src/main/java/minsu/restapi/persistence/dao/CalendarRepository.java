package minsu.restapi.persistence.dao;

import minsu.restapi.persistence.model.Calendar;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CalendarRepository extends JpaRepository<Calendar, Long> {


}
