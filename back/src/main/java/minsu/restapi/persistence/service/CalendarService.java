package minsu.restapi.persistence.service;

import minsu.restapi.persistence.model.Calendar;
import minsu.restapi.persistence.model.CalendarTemp;

import java.util.List;

public interface CalendarService {

    public Long save(Calendar calendar);

    public void pbToggle(Long id);

    public void setRepresent(Long id);

    public void setRepresentFalse(Long calendarId);

    public Calendar findById(Long id);

    public List<Calendar> findByTitle(String title, String sort);

    public List<Calendar> findByTag(String search, String sort);

    public List<Calendar> findByCategory1(String search, String sort);

    public List<Calendar> findByCategory2(String search, String sort);

    public List<Calendar> findByTagCC(String search, String sort);

    public List<Calendar> findAll();

    public List<Calendar> findByUserId(Long id);

    public Calendar findByUserIdAndRepresent(Long id);

    public void deleteById(Long id);

    public void tempSave(CalendarTemp calendarTemp);
    public void tempDelete(Long id);
    public List<CalendarTemp> tempFind(Long id);

}
