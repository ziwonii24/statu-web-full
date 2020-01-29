package minsu.restapi.web.controller;

import minsu.restapi.persistence.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class EmailController {

    @Autowired
    private MailService mailService;

    @GetMapping("/email")
    public void sendEmailAction () throws Exception {

        mailService.sendSimpleMessage("dhkem6216@gmail.com","test","this is test");
    }

}
