package minsu.restapi.web.controller;

import minsu.restapi.persistence.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class EmailController {

    @Autowired
    private MailService mailService;

    @GetMapping("/email/{email}")
    public void sendEmailAction (@PathVariable String email) throws Exception {
        mailService.sendSimpleMessage(email,"test","this is test");
    }

}
