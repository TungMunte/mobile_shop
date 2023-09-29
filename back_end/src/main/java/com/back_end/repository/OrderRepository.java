package com.back_end.repository;

import com.back_end.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findAllBySmartPhoneId(Long id);

    boolean deleteBySmartPhoneId(Long id);
}
