package minsu.restapi.persistence.service;

public interface MailService {
    //public boolean send(String subject, String text, String from, String to, String filePath);
    public void sendSimpleMessage(String to, String subject, String text);
}