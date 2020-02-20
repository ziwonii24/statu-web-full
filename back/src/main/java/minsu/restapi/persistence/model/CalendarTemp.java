package minsu.restapi.persistence.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "calendar_Temp")
public class CalendarTemp {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;
    @Column(name = "user_id")
    private Long userId;
    @Column(name="calendar_id")
    private Long calendarId;

    public CalendarTemp(Long userId, Long calendarId){
        this.userId=userId;
        this.calendarId=calendarId;
    }
}
