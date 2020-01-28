package minsu.restapi.persistence.service;

import minsu.restapi.persistence.dao.CalendarRepository;
import minsu.restapi.persistence.model.Calendar;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CalendarServiceImpl implements CalendarService {

    @Autowired
    CalendarRepository calendarRepository;

    @Override
    public void save(Calendar calendar) {
        calendarRepository.save(calendar);
    }

    @Override
    public List<Calendar> findAll() {
        return calendarRepository.findAll();
    }
}
