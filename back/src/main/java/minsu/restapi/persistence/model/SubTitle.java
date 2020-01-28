package minsu.restapi.persistence.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="sub_title")
public class SubTitle {

    @Id
    @GeneratedValue
    @Column(name="id")
    Long id;
    @Column(name="sub_title")
    String subTitle;

    @Temporal(TemporalType.DATE)
    @Column(name = "start_date")
    private Date startDate;

    @Temporal(TemporalType.DATE)
    @Column(name = "end_date")
    private Date endDate;

    @Column(name = "color")
    private String color;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "calendar_id")
    @JsonBackReference
    Calendar calendar;

    @OneToMany(mappedBy="subTitle")
    @JsonManagedReference
    private List<Todo> todo = new ArrayList<>();

}
