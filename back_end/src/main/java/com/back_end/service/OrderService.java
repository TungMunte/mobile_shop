package com.back_end.service;

import com.back_end.entity.Order;
import com.back_end.payload.OrderDto;

import java.util.List;

public interface OrderService {

    String postOrder(OrderDto orderDto, String username);

    List<Order> getOrders(String username, Integer pageNo);

    Order getOrder(Long id);

    String updateOrder(Long id, Long quantity);

    String deleteOrder(Long id, String username);
}
