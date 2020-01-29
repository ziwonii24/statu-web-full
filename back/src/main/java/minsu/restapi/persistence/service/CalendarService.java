package minsu.restapi.persistence.service;

import minsu.restapi.persistence.model.Calendar;
import minsu.restapi.web.dto.CalendarDto;

import java.util.List;

public interface CalendarService {

    public void save(Calendar calendar);

    public Calendar findById(Long id);

    public List<Calendar> findAll();

    public List<Calendar> findByUserId(Long id);

    public Calendar findByUserIdAndRepresen(Long id);

    public void deleteById(Long id);
}
