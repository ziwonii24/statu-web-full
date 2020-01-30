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
    @JoinColumn(name="user_id",nullable = false)
    @JsonBackReference
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

    @Column(name = "pb",columnDefinition = "boolean default true")
    private boolean pb;

    @Column(name = "progress",columnDefinition = "float default 0")
    private float progress;

    @Column(name = "tag")
    private String tag;

    @Column(name = "represen",columnDefinition = "boolean default false")
    private boolean represen;

    @ManyToMany
    @JoinTable(name="calendar_category1",
            joinColumns = @JoinColumn(name = "calendar_id"),
            inverseJoinColumns = @JoinColumn(name = "category1_id"))
    private List<Category1> category1s = new ArrayList<>();

    @ManyToMany
    @JoinTable(name="calendar_category2",
            joinColumns = @JoinColumn(name = "calendar_id"),
            inverseJoinColumns = @JoinColumn(name = "category2_id"))
    private List<Category2> category2s = new ArrayList<>();

    @OneToMany(mappedBy="calendar")
    @JsonManagedReference
    private List<SubTitle> subTitles = new ArrayList<>();

}
