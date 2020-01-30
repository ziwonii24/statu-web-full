package minsu.restapi.web.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import minsu.restapi.persistence.model.Category1;
import minsu.restapi.persistence.model.Category2;
import minsu.restapi.persistence.model.SubTitle;
import minsu.restapi.persistence.model.User;

import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CalendarResponseDto {
    private Long id;
    private String title;
    private String startDate;
    private String endDate;
    private int recommend;
    private int view;
    private boolean pb;
    private float progress;
    private String[] tag;
    private boolean represen;
    private List<Category1> category1s = new ArrayList<>();
    private List<Category2> category2s = new ArrayList<>();
    private List<SubTitle> subTitles = new ArrayList<>();
}
