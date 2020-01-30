package minsu.restapi.web.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class TodosDto {
    private TodoDto[] todos;
}
