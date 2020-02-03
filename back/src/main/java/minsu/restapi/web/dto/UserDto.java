package minsu.restapi.web.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.jws.soap.SOAPBinding;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private Long id;
    private String email;
    private String password;
    private String name;
    private String img;
    private Long[] category1;
    private Long[] category2;
}