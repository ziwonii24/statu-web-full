package minsu.restapi.persistence.model;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "category2")
public class Category2 {
    @Id
    @GeneratedValue
    @Column(name="id")
    private Long id;
    @Column(name="name")
    private String name;
}
