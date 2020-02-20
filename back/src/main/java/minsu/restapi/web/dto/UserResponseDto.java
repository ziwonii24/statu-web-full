package minsu.restapi.web.dto;

import lombok.*;
import minsu.restapi.persistence.model.Category1;
import minsu.restapi.persistence.model.Category2;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDto {
    private Long id;
    private String email;
    private String name;
    private String img;
    private String[] category1;
    private String[] category2;
    private String regDate;
    private String userTypeCode;
    private String statusCode;
}
