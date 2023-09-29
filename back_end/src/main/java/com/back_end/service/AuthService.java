package com.back_end.service;

import com.back_end.payload.ForgetPasswordDto;
import com.back_end.payload.JwtResponseDto;
import com.back_end.payload.LoginDto;
import com.back_end.payload.RegisterDto;
import com.mailjet.client.errors.MailjetException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

public interface AuthService {
    JwtResponseDto login(LoginDto loginDto, HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse);

    String register(RegisterDto registerDto, HttpServletRequest httpServletRequest);

    String refreshToken(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse);

    String forgetPassword(ForgetPasswordDto forgetPasswordDto, HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws MailjetException, IOException;

}
