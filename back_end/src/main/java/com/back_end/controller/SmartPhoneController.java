package com.back_end.controller;

import com.back_end.entity.SmartPhone;
import com.back_end.payload.SmartPhoneDto;
import com.back_end.payload.SmartPhoneRequestDto;
import com.back_end.service.SmartPhoneService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@Slf4j
public class SmartPhoneController {

    private SmartPhoneService smartPhoneService;

    public SmartPhoneController(SmartPhoneService smartPhoneService) {
        this.smartPhoneService = smartPhoneService;
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping(value = "/api/product/add")
    public ResponseEntity<String> addSmartPhone(@RequestBody SmartPhoneDto smartPhoneDto, HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) {
        log.info("start");
        return new ResponseEntity<>(smartPhoneService.addSmartPhone(smartPhoneDto, httpServletRequest, httpServletResponse), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping(value = "/api/image/add/{imageCode}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> addImage(@RequestPart("file") MultipartFile file, @PathVariable String imageCode) throws IOException {
        log.info("start");
        return new ResponseEntity<>(smartPhoneService.addImage(file, imageCode), HttpStatus.OK);
    }

    @GetMapping(value = "/api/image/get/{imageCode}", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> getCustomerProfileImage(@PathVariable String imageCode) {
        return new ResponseEntity<>(smartPhoneService.getImage(imageCode), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping(value = "/api/image/delete/{imageCode}")
    public ResponseEntity<String> deleteCustomerProfileImage(@PathVariable String imageCode) {
        return new ResponseEntity<>(smartPhoneService.deleteSmartPhoneByImageCode(imageCode), HttpStatus.OK);
    }

    @PostMapping(value = "/api/smartphones/get/{pageNo}")
    public ResponseEntity<List<SmartPhone>> getSmartphones(@PathVariable Integer pageNo, @RequestBody SmartPhoneRequestDto smartPhoneRequestDto) {
        log.info("/api/smartphones/get/");
        return new ResponseEntity<>(smartPhoneService.getSmartphones(smartPhoneRequestDto, pageNo), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping(value = "/api/smartphones/delete/{id}")
    public ResponseEntity<String> deleteSmartphone(@PathVariable Long id) {
        return new ResponseEntity<>(smartPhoneService.deleteSmartphone(id), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping(value = "/api/smartphones/put/{id}")
    public ResponseEntity<String> updateSmartphone(@PathVariable Long id, @RequestBody SmartPhoneDto SmartPhoneDto) {
        return new ResponseEntity<>(smartPhoneService.updateSmartphone(id, SmartPhoneDto), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping(value = "/api/smartphone/get/{id}")
    public ResponseEntity<SmartPhone> getSmartphoneById(@PathVariable Long id) {
        return new ResponseEntity<>(smartPhoneService.getSmartphoneById(id), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping(value = "/api/image/put/{id}/{oldCode}/{newCode}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> replaceImageSmartphone(@PathVariable Long id, @PathVariable String oldCode, @PathVariable String newCode, @RequestPart("file") MultipartFile file) throws IOException {
        return new ResponseEntity<>(smartPhoneService.replaceImageSmartphone(id, oldCode, newCode, file), HttpStatus.OK);
    }
}
