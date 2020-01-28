package minsu.restapi.persistence.service;


import minsu.restapi.persistence.dao.SubTitleRepository;
import minsu.restapi.persistence.model.Calendar;
import minsu.restapi.persistence.model.SubTitle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class SubTitleServiceImpl implements SubTitleService {

    @Autowired
    SubTitleRepository subTitleRepository;

    @Override
    public List<SubTitle> findAll() {
        return subTitleRepository.findAll();
    }

    @Override
    public Optional<SubTitle> findById(Long titleId) {
        return subTitleRepository.findById(titleId);
    }

    @Override
    public List<SubTitle> findByCalendarId(Long calendarId) {
        return subTitleRepository.findByCalendarId(calendarId);
    }

    @Override
    public void save(SubTitle subTitle) {
        subTitleRepository.save(subTitle);
    }


}
