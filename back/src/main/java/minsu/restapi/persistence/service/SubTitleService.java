package minsu.restapi.persistence.service;

import minsu.restapi.persistence.model.Calendar;
import minsu.restapi.persistence.model.SubTitle;

import java.util.List;
import java.util.Optional;

public interface SubTitleService {

    public List<SubTitle> findAll();

    public SubTitle findById(Long titleId);

    public List<SubTitle> findByCalendarId(Long calendarId);

    public void save(SubTitle subTitle);

    public void deleteById(Long subTitleId);


}
