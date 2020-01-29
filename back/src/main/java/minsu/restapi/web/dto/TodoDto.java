package minsu.restapi.web.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TodoDto {
    private Long subTitleId;
    private String date;
    private String todo;
    private String goal;
    private String achieve;
}
