package com.example.models;
import lombok.Data;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@Entity
public class Perfume {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String name;
    private String description;
    private Integer price;

    public Perfume() {}

    public Perfume(String name, String description, Integer price) {
        this.name = name;
        this.description = description;
        this.price = price;
    }

}