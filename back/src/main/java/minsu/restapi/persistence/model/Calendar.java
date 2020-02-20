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
@Table(name = "calendar")
public class Calendar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @JoinColumn(name="user_id",nullable = false)
    private User user;

    @Column(name = "title",nullable = false)
    private String title;

    @Column(name = "start_date",nullable = false)
    private String startDate;

    @Column(name = "end_date",nullable = false)
    private String endDate;

    @Column(name = "recommend",columnDefinition = "integer default 0")
    private int recommend;

    @Column(name = "view",columnDefinition = "integer default 0")
    private int view;

    @Column(name = "pb",nullable = false ,columnDefinition = "boolean default true")
    private boolean pb;

    @Column(name = "progress",columnDefinition = "float default 0")
    private float progress;

    @Column(name = "tag")
    private String tag;

    @Column(name = "represent",nullable = false,columnDefinition = "boolean default false")
    private boolean represent;

    @Column(name ="category1")
    private String category1;
    @Column(name ="category2")
    private String category2;

    @OneToMany(mappedBy="calendar", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JsonManagedReference
    private List<SubTitle> subTitles = new ArrayList<>();

}
