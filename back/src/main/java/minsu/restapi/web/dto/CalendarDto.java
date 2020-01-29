package minsu.restapi.web.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CalendarDto {
    private Long userId;
    private String title;
    private String startDate;
    private String endDate;
    private boolean pb;
    private String[] tags;
    private boolean represent;
    private Long[] category1;
    private Long[] category2;

    private Long[] subTitles;


}
