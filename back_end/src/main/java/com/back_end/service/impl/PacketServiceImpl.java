package com.back_end.service.impl;

import com.back_end.entity.Process;
import com.back_end.entity.*;
import com.back_end.repository.OrderRepository;
import com.back_end.repository.PacketRepository;
import com.back_end.repository.SmartPhoneRepository;
import com.back_end.repository.UserRepository;
import com.back_end.service.PacketService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Slf4j
public class PacketServiceImpl implements PacketService {
    private UserRepository userRepository;
    private OrderRepository orderRepository;
    private SmartPhoneRepository smartPhoneRepository;
    private PacketRepository packetRepository;

    public PacketServiceImpl(UserRepository userRepository, OrderRepository orderRepository, SmartPhoneRepository smartPhoneRepository, PacketRepository packetRepository) {
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
        this.smartPhoneRepository = smartPhoneRepository;
        this.packetRepository = packetRepository;
    }

    @Override
    public String addPacket(Location location, String username) {

        User user = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found with username or email: " + username));
        Set<Order> orderSet = new HashSet<>(user.getOrders());

        for (Order order : orderSet) {
            log.info(order.getSmartPhone().getName());
        }

        Packet packet = new Packet();
        packet.setProcess(Process.ON_DELIVERY);
        packet.setLocation(location);
        packet.setOwner(username);
        packet.setOrders(orderSet);
        packetRepository.save(packet);
        Set<Packet> packetSet = user.getPackets();
        packetSet.add(packet);

        user.setPackets(packetSet);
        user.setOrders(new HashSet<>());
        userRepository.save(user);
        return "Success";
    }

    @Override
    public List<Packet> getPackets(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("Packet not found with username or email: " + username));
        return user.getPackets().stream().toList();
    }

    @Override
    public String updatePacket(Long id, Process process) {
        Packet packet = packetRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("Packet not found with id : " + id));
        packet.setProcess(process);
        packetRepository.save(packet);
        return "Success";
    }

    @Override
    public String deletePacket(Long id) {
        Packet packet = packetRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("Packet not found with id: " + id));
        packet.setOrders(new HashSet<>());
        packet.setLocation(null);
        User owner = userRepository.findByUsername(packet.getOwner()).orElseThrow(() -> new UsernameNotFoundException("Packet not found with id: " + id));
        for (Packet p : owner.getPackets()) {
            if (Objects.equals(p.getId(), id)) {
                Set<Packet> newPackets = owner.getPackets();
                newPackets.remove(p);
                owner.setPackets(newPackets);
                userRepository.save(owner);
                break;
            }
        }
        Optional<User> deliver = userRepository.findByUsername(packet.getDeliver());
        if (deliver.isPresent()) {
            for (Packet p : deliver.get().getPackets()) {
                if (Objects.equals(p.getId(), id)) {
                    Set<Packet> newPackets = owner.getPackets();
                    newPackets.remove(p);
                    owner.setPackets(newPackets);
                    userRepository.save(owner);
                    break;
                }
            }
        }
        packetRepository.save(packet);
        packetRepository.deleteById(id);
        return "Success";
    }

    @Override
    public List<Packet> getAllPacket() {
        return packetRepository.findAllByDeliverIsNull();
    }

    @Override
    public List<Packet> getPacketForDeliver(String deliver) {
        return packetRepository.findAllByDeliver(deliver);
    }

    @Override
    public List<Packet> getPacketByProcess(Process process) {
        return packetRepository.findByProcess(process);
    }

    @Override
    public String packetSelectByDeliver(String deliver, Long id) {
        Packet packet = packetRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("Packet not found with id: " + id));
        packet.setDeliver(deliver);
        packetRepository.save(packet);
        return "Success";
    }

}
