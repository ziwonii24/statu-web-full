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
    private Long userId;
    private String title;
    private String startDate;
    private String endDate;
    private int recommend;
    private int view;
    private boolean pb;
    private float progress;
    private String[] tags;
    private boolean represent;
    private String[] category1;
    private String[] category2;
}
