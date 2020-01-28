package minsu.restapi.persistence.dao;

import minsu.restapi.persistence.model.SubTitle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SubTitleRepository extends JpaRepository<SubTitle, Long> {

    @Query("select s from SubTitle s where s.calendar.id = :calenderId ")
    public List<SubTitle> findByCalendarId(@Param("calenderId") Long calenderId);
}
