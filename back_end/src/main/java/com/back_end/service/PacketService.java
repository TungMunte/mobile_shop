package com.back_end.service;

import com.back_end.entity.Location;
import com.back_end.entity.Packet;
import com.back_end.entity.Process;

import java.util.List;

public interface PacketService {

    String addPacket(Location location, String username);

    List<Packet> getPackets(String username);

    String updatePacket(Long id, Process process);

    String deletePacket(Long id);

    List<Packet> getAllPacket();

    List<Packet> getPacketForDeliver(String deliver);

    List<Packet> getPacketByProcess(Process process);

    String packetSelectByDeliver(String deliver, Long id);

}
