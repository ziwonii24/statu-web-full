package minsu.restapi.web.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private String email;
    private String password;
    private String name;
    private boolean img;
    private Long[] category1;
    private Long[] category2;
    private String regDate;
    private Long[] calendars;
}
