package com.back_end.controller;

import com.back_end.entity.Order;
import com.back_end.payload.OrderDto;
import com.back_end.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class OrderController {

    private OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PreAuthorize("hasAuthority('USER')")
    @PostMapping(value = "/api/order/add/{username}")
    public ResponseEntity<String> addOrder(@RequestBody OrderDto orderDto, @PathVariable String username) {
        return new ResponseEntity<>(orderService.postOrder(orderDto, username), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping(value = "/api/order/get/{username}/{pageNo}")
    public ResponseEntity<List<Order>> getOrders(@PathVariable String username, @PathVariable Integer pageNo) {
        return new ResponseEntity<>(orderService.getOrders(username, pageNo), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping(value = "/api/order/{id}")
    public ResponseEntity<Order> getOrder(@PathVariable Long id) {
        return new ResponseEntity<>(orderService.getOrder(id), HttpStatus.OK);
    }

//    @PreAuthorize("hasAuthority('USER')")
    @PutMapping(value = "/api/order/put/{id}/{quantity}")
    public ResponseEntity<String> updateOrder(@PathVariable Long id, @PathVariable Long quantity) {
        return new ResponseEntity<>(orderService.updateOrder(id, quantity), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('USER')")
    @DeleteMapping(value = "/api/order/delete/{id}/{username}")
    public ResponseEntity<String> deleteOrder(@PathVariable Long id, @PathVariable String username) {
        return new ResponseEntity<>(orderService.deleteOrder(id, username), HttpStatus.OK);
    }
}
