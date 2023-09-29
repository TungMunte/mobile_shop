package com.back_end.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "smartphones")
public class SmartPhone {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String brand;

    @Column(nullable = false)
    private String technology;

    @Column(nullable = false)
    private Integer price;

    @Column(nullable = false)
    private String internalMemory;

    @Column(nullable = false)
    private String ram;

    @Column(nullable = false)
    private String screenDimension;

    @Column(nullable = false)
    private String imageCode;

}
