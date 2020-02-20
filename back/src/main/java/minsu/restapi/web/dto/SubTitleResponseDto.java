package minsu.restapi.web.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SubTitleResponseDto {
    private Long id;
    private Long calendarId;
    private String subTitle;
    private String startDate;
    private String endDate;
    private String color;
}
