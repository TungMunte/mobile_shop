package com.back_end.controller;

import com.back_end.entity.Location;
import com.back_end.entity.Packet;
import com.back_end.entity.Process;
import com.back_end.service.PacketService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class PacketController {

    private PacketService packetService;

    public PacketController(PacketService packetService) {
        this.packetService = packetService;
    }

    @PreAuthorize("hasAuthority('USER')")
    @PostMapping(value = "/api/packet/add/{username}")
    public ResponseEntity<String> addPacket(@RequestBody Location location, @PathVariable String username) {
        return new ResponseEntity<>(packetService.addPacket(location, username), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('USER') OR hasAuthority('ADMIN') OR hasAuthority('DELIVERY_MAN')")
    @GetMapping(value = "/api/packet/get/{username}")
    public ResponseEntity<List<Packet>> getPackets(@PathVariable String username) {
        return new ResponseEntity<>(packetService.getPackets(username), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('DELIVERY_MAN')")
    @GetMapping(value = "/api/packet/put/{process}/{id}")
    public ResponseEntity<String> updatePacket(@PathVariable Process process, @PathVariable Long id) {
        return new ResponseEntity<>(packetService.updatePacket(id, process), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('USER') OR hasAuthority('ADMIN')")
    @DeleteMapping(value = "/api/packet/delete/{id}")
    public ResponseEntity<String> deletePacket(@PathVariable Long id) {
        return new ResponseEntity<>(packetService.deletePacket(id), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('DELIVERY_MAN') OR hasAuthority('ADMIN')")
    @GetMapping(value = "/api/packet/getForDeliver/{deliver}")
    public ResponseEntity<List<Packet>> getPacketForDeliver(@PathVariable String deliver) {
        return new ResponseEntity<>(packetService.getPacketForDeliver(deliver), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN') OR hasAuthority('DELIVERY_MAN')")
    @GetMapping(value = "/api/packet/getAll")
    public ResponseEntity<List<Packet>> getAllPacket() {
        return new ResponseEntity<>(packetService.getAllPacket(), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('DELIVERY_MAN')")
    @GetMapping(value = "/api/packet/getByProcess/{process}")
    public ResponseEntity<List<Packet>> getPacketByProcess(@PathVariable Process process) {
        return new ResponseEntity<>(packetService.getPacketByProcess(process), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('DELIVERY_MAN')")
    @GetMapping(value = "/api/packet/getByCompletedProcess/{process}/{username}")
    public ResponseEntity<List<Packet>> getPacketByProcess(@PathVariable Process process, @PathVariable String username) {
        return new ResponseEntity<>(packetService.getPacketByProcess(process), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('DELIVERY_MAN')")
    @GetMapping(value = "/api/packet/selectBy/{deliver}/{id}")
    public ResponseEntity<String> packetSelectByDeliver(@PathVariable String deliver, @PathVariable Long id) {
        return new ResponseEntity<>(packetService.packetSelectByDeliver(deliver, id), HttpStatus.OK);
    }

}
