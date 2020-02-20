package minsu.restapi.web.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CalendarDto {
    private Long id;
    private Long userId;
    private String title;
    private String startDate;
    private String endDate;
    private int view;
    private int recommend;
    private boolean pb;
    private String[] tags;
    private boolean represent;
    private String[] category1;
    private String[] category2;

}
