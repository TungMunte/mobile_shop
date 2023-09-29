package com.back_end.service.impl;

import com.back_end.entity.Order;
import com.back_end.entity.SmartPhone;
import com.back_end.entity.User;
import com.back_end.payload.OrderDto;
import com.back_end.repository.OrderRepository;
import com.back_end.repository.SmartPhoneRepository;
import com.back_end.repository.UserRepository;
import com.back_end.service.OrderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Slf4j
public class OrderServiceImpl implements OrderService {

    private UserRepository userRepository;
    private OrderRepository orderRepository;
    private SmartPhoneRepository smartPhoneRepository;

    public OrderServiceImpl(UserRepository userRepository, OrderRepository orderRepository, SmartPhoneRepository smartPhoneRepository) {
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
        this.smartPhoneRepository = smartPhoneRepository;
    }

    @Override
    public String postOrder(OrderDto orderDto, String username) {
        log.info("start");
        User user = userRepository.findByUsernameOrEmail(username, username).orElseThrow(() -> new UsernameNotFoundException("User not found with username or email: " + username));
        SmartPhone smartPhone = smartPhoneRepository.findByImageCode(orderDto.getImageCode());

        Order order = new Order();
        order.setQuantity(orderDto.getQuantity());
        order.setSmartPhone(smartPhone);
        order.setOwner(username);
        orderRepository.save(order);

        Set<Order> orderSet = user.getOrders();
        orderSet.add(order);
        user.setOrders(orderSet);
        userRepository.save(user);

        log.info("end");
        return "Success";
    }

    @Override
    public List<Order> getOrders(String username, Integer pageNo) {
        log.info("start");
        User user = userRepository.findByUsernameOrEmail(username, username).orElseThrow(() -> new UsernameNotFoundException("User not found with username or email: " + username));
        log.info("end");
        return new ArrayList<>(user.getOrders());
    }

    @Override
    public Order getOrder(Long id) {
        return orderRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found with username or email: " + id));

    }

    @Override
    public String updateOrder(Long id, Long quantity) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("Order not found with id: " + id));
        order.setQuantity(quantity);
        orderRepository.save(order);
        return "Success";
    }

    @Override
    public String deleteOrder(Long id, String username) {
        User user = userRepository.findByUsernameOrEmail(username, username).orElseThrow(() -> new UsernameNotFoundException("User not found with username or email: " + username));
        Set<Order> orders = user.getOrders().stream().filter(order -> order.getId() != id).collect(Collectors.toSet());
        user.setOrders(orders);
        orderRepository.deleteById(id);
        return "Success";
    }
}
