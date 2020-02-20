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
public class UserUpdateDto {
    private Long id;
    private String name;
    private String[] category1;
    private String[] category2;
}