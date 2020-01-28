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
@Table(name = "calendar")
public class Calendar {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    @JsonBackReference
    private User user;

    @Column(name = "title")
    private String title;

    @Temporal(TemporalType.DATE)
    @Column(name = "start_date")
    private Date startDate;

    @Temporal(TemporalType.DATE)
    @Column(name = "end_date")
    private Date endDate;

    @Column(name = "recommend")
    private int recommend;

    @Column(name = "view")
    private int view;

    @Column(name = "pb")
    private boolean pb;

    @Column(name = "progress")
    private float progress;

    @Column(name = "tag")
    private String tag;

    @Column(name = "represen")
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
