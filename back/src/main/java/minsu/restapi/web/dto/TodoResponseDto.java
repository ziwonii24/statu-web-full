package minsu.restapi.web.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TodoResponseDto {
    private Long id;
    private Long subTitleId;
    private Long calendarId;
    private String date;
    private String todo;
    private int goal;
    private int achieve;
}
