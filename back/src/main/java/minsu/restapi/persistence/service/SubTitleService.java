package minsu.restapi.persistence.service;

import minsu.restapi.persistence.model.Calendar;
import minsu.restapi.persistence.model.SubTitle;

import java.util.List;
import java.util.Optional;

public interface SubTitleService {

    List<SubTitle> findAll();

    Optional<SubTitle> findById(Long titleId);

    List<SubTitle> findByCalendarId(Long calendarId);

    void save(SubTitle subTitle);

}
