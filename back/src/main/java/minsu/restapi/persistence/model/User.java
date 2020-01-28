package minsu.restapi.persistence.model;

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
@Table(name="user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;
    @Column(name = "email")
    private String email;
    @Column(name = "password")
    private String password;
    @Column(name = "name")
    private String name;
    @Column(name = "img")
    private String img;

    @ManyToMany
    @JoinTable(name="user_category",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id"))
    private List<Category1> category1s = new ArrayList<>();

    @ManyToMany
    @JoinTable(name="user_sub_category",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "sub_category_id"))
    private List<Category2> category2s = new ArrayList<>();

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "reg_date")
    private Date regDate;
    //사용자 타입
    //@Column(columnDefinition="USER")
    @Column(name = "user_type_code")
    private String userTypeCode;
    //사용자 상태
    //@Column(columnDefinition="USE")
    @Column(name = "status_code")
    private String statusCode;


    @OneToMany(mappedBy="user")
    @JsonManagedReference
    private List<Calendar> calendars = new ArrayList<>();

}
