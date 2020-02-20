package minsu.restapi.spring;

import minsu.restapi.persistence.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Config {


    @Autowired
    private UserService userService;


    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

}
