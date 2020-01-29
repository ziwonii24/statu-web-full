package minsu.restapi.persistence.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="sub_title")
public class SubTitle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;
    @Column(name="sub_title",nullable = false)
    private String subTitle;

    @Column(name = "start_date",nullable = false)
    private String startDate;

    @Column(name = "end_date",nullable = false)
    private String endDate;

    @Column(name = "color", columnDefinition = "varchar(30) default 'gray'")
    private String color;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "calendar_id")
    @JsonBackReference
    private Calendar calendar;

    @OneToMany(mappedBy="subTitle")
    @JsonManagedReference
    private List<Todo> todo = new ArrayList<>();

}
