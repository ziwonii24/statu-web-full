package minsu.restapi.persistence.dao;

import minsu.restapi.persistence.model.Calendar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;


public interface CalendarRepository extends JpaRepository<Calendar, Long> {

    public List<Calendar> findByUserId(Long id);

    public Calendar findByUserIdAndRepresent(Long id, boolean represent);

    public boolean existsByUserId(Long userId);

    @Transactional
    @Modifying
    @Query("update Calendar c set c.represent = false where c.represent = true and c.user.id = :userId")
    public void updateRepresent(@Param("userId") Long userId);


    @Transactional
    @Modifying
    @Query("update Calendar c set c.represent = false where c.id = :calendarId")
    public void updateRepresentFalse(@Param("calendarId") Long calendarId);

    @Query("select c from Calendar c where c.title like :search order by :sort")
    public List<Calendar> fByTitle(@Param("search") String search, @Param("sort") String sort);

    @Query("select c from Calendar c where c.category1 like :search order by :sort")
    public List<Calendar> fByCategory1(@Param("search") String search, @Param("sort") String sort);

    @Query("select c from Calendar c where c.category2 like :search order by :sort")
    public List<Calendar> fByCategory2(@Param("search") String search, @Param("sort") String sort);

    @Query("select c from Calendar c where c.tag like :search order by :sort")
    public List<Calendar> fByTag(@Param("search") String search, @Param("sort") String sort);

    @Query("select c from Calendar c where c.title like :search " +
            "or c.tag like :search or c.category1 like :search or c.category2 like :search order by :sort")
    public List<Calendar> findByAllOp(@Param("search") String search, @Param("sort") String sort);

}
