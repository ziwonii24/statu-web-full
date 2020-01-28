package minsu.restapi.persistence.service;

import minsu.restapi.persistence.model.Calendar;

import java.util.List;

public interface CalendarService {

    public void save(Calendar calendar);

    public List<Calendar> findAll();
}
