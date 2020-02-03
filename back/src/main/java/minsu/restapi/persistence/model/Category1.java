package minsu.restapi.persistence.model;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "category1")
public class Category1 {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;
    @Column(name="name")
    private String name;

    @OneToMany(mappedBy="category1",fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Category2> category2s = new ArrayList<>();


}

