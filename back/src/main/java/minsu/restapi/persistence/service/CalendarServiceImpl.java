package minsu.restapi.persistence.service;

import minsu.restapi.persistence.dao.CalendarRepository;
import minsu.restapi.persistence.dao.Category1Repository;
import minsu.restapi.persistence.dao.Category2Repository;
import minsu.restapi.persistence.dao.UserRepository;
import minsu.restapi.persistence.model.Calendar;
import minsu.restapi.persistence.model.Category1;
import minsu.restapi.persistence.model.Category2;
import minsu.restapi.persistence.model.User;
import minsu.restapi.web.dto.CalendarDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CalendarServiceImpl implements CalendarService {

    @Autowired
    private CalendarRepository calendarRepository;

    @Override
    public void save(Calendar calendar) {
        calendarRepository.save(calendar);
    }

    @Override
    public Calendar findById(Long id) {
        return calendarRepository.findById(id).get();
    }

    @Override
    public List<Calendar> findAll() {
        return calendarRepository.findAll();
    }

    @Override
    public List<Calendar> findByUserId(Long id) {
        List<Calendar> list = calendarRepository.findByUserId(id);
        return list;
    }

    @Override
    public Calendar findByUserIdAndRepresen(Long id) {
        Calendar calendar = calendarRepository.findByUserIdAndRepresen(id, true);
        return calendar;
    }

    @Override
    public void deleteById(Long id) {
        calendarRepository.deleteById(id);
    }

}
