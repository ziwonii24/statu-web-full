package minsu.restapi.persistence.model;

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
@Table(name="user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "email",nullable = false, unique = true)
    private String email;
    @Column(name = "password",nullable = false)
    private String password;
    @Column(name = "name",nullable = false)
    private String name;
    @Column(name = "img",nullable = true,columnDefinition = "varchar(225) default 'default.png'")
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

    @Column(name = "reg_date")
    private String regDate;
    //사용자 타입
    //@Column(columnDefinition="USER")
    @Column(name = "user_type_code", columnDefinition = "varchar(20) default 'user'")
    private String userTypeCode;
    //사용자 상태
    //@Column(columnDefinition="USE")
    @Column(name = "status_code", columnDefinition = "varchar(20) default 'use'")
    private String statusCode;


    @OneToMany(mappedBy="user")
    @JsonManagedReference
    private List<Calendar> calendars = new ArrayList<>();

}
