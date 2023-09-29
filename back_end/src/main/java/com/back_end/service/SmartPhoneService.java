package com.back_end.service;

import com.back_end.entity.SmartPhone;
import com.back_end.payload.SmartPhoneDto;
import com.back_end.payload.SmartPhoneRequestDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface SmartPhoneService {
    String addSmartPhone(SmartPhoneDto smartPhoneDto, HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse);

    byte[] getImage(String imageCode);

    String addImage(MultipartFile file, String imageCode) throws IOException;

    List<SmartPhone> getSmartphones(SmartPhoneRequestDto smartPhoneRequestDto, Integer pageNo);

    String deleteSmartPhoneByImageCode(String imageCode);

    String updateSmartphone(Long id, SmartPhoneDto smartPhoneDto);

    String deleteSmartphone(Long id);

    SmartPhone getSmartphoneById(Long id);

    String replaceImageSmartphone(Long id, String oldCode, String newCode, MultipartFile file) throws IOException;
}
