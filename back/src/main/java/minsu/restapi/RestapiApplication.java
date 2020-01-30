package minsu.restapi;

import minsu.restapi.persistence.property.FileUploadProperties;
import minsu.restapi.spring.JwtInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;

import java.util.Arrays;

@SpringBootApplication
@EnableConfigurationProperties({
        FileUploadProperties.class
})
public class RestapiApplication {

    public static void main(String[] args) {
        SpringApplication.run(RestapiApplication.class, args);
    }

    @Autowired
    private JwtInterceptor jwtInterceptor;

    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(jwtInterceptor).addPathPatterns("/**")
                .excludePathPatterns(Arrays.asList("/**"));
        // 나중에 토큰 체크할 부분
    }

}
