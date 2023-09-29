package com.back_end.repository;

import com.back_end.entity.Packet;
import com.back_end.entity.Process;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PacketRepository extends JpaRepository<Packet, Long> {
    List<Packet> findByProcess(Process process);

    List<Packet> findAllByDeliver(String deliver);

    List<Packet> findAllByDeliverIsNull();
}
