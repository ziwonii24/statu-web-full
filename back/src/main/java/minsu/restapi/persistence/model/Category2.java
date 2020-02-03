package minsu.restapi.persistence.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "category2")
public class Category2 {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="category1_id",nullable = false)
    @JsonBackReference
    private Category1 category1;


    @Column(name="name")
    private String name;
}
