package minsu.restapi.persistence.dao;

import minsu.restapi.persistence.model.CalendarTemp;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CalendarTempRepository extends JpaRepository<CalendarTemp, Long> {

    public List<CalendarTemp> findByUserId(Long userId);
}
