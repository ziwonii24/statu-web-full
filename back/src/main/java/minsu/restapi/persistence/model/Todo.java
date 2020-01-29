package minsu.restapi.persistence.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
@Table(name="todo")
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sub_title_id")
    @JsonBackReference
    private SubTitle subTitle;

    @Column(name = "date",nullable = false)
    private String date;
    @Column(name = "todo",nullable = false)
    private String todo;
    @Column(name = "goal",nullable = false)
    private int goal;
    @Column(name = "achieve",nullable = false, columnDefinition = "integer default 0")
    private int achieve;

}
