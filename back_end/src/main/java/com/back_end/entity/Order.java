package com.back_end.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long quantity;

    @Column(nullable = false)
    private String owner;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "smart_phone_id", referencedColumnName = "id")
    private SmartPhone smartPhone;

}
