package com.back_end.controller;

import com.back_end.payload.ForgetPasswordDto;
import com.back_end.payload.JwtResponseDto;
import com.back_end.payload.LoginDto;
import com.back_end.payload.RegisterDto;
import com.back_end.service.AuthService;
import com.mailjet.client.errors.MailjetException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@CrossOrigin(origins="*")
public class AuthController {

    private AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping(value = {"/api/auth/login", "/api/auth/signin"})
    public ResponseEntity<JwtResponseDto> login(@RequestBody LoginDto loginDto, HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) {
        return new ResponseEntity<>(authService.login(loginDto, httpServletRequest, httpServletResponse), HttpStatus.OK);
    }

    @PostMapping(value = {"/api/auth/signup", "/api/auth/register"})
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto, HttpServletRequest httpServletRequest) {
        return new ResponseEntity<>(authService.register(registerDto, httpServletRequest), HttpStatus.CREATED);
    }

    @PostMapping(value = "/api/auth/refreshToken")
    public ResponseEntity<String> refreshToken(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) {
        return new ResponseEntity<>(authService.refreshToken(httpServletRequest, httpServletResponse), HttpStatus.OK);
    }

    @PostMapping(value = "/api/auth/forgetPassword")
    public ResponseEntity<String> forgetPassword(@RequestBody ForgetPasswordDto forgetPasswordDto, HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws MailjetException, IOException {
        return new ResponseEntity<>(authService.forgetPassword(forgetPasswordDto, httpServletRequest, httpServletResponse), HttpStatus.OK);
    }

}
