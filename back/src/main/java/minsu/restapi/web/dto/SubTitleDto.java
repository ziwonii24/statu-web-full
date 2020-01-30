package minsu.restapi.web.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@AllArgsConstructor
@NoArgsConstructor
public class SubTitleDto {
    private Long id;
    private Long calendarId;
    private String subTitle;
    private String startDate;
    private String endDate;
    private String color;

}
