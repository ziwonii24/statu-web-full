package minsu.restapi.persistence.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="todo")
public class Todo {

    @Id
    @GeneratedValue
    @Column(name = "id")
    Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sub_title_id")
    @JsonBackReference
    SubTitle subTitle;

    @Temporal(TemporalType.DATE)
    @Column(name = "date")
    Date date;
    @Column(name = "todo")
    String todo;
    @Column(name = "goal")
    int goal;
    @Column(name = "achieve")
    int achieve;
    @Column(name = "time")
    String time;
    @Column(name = "unit")
    String unit;

}
