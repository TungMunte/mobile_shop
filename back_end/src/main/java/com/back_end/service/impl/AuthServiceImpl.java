package com.back_end.service.impl;

import com.back_end.entity.User;
import com.back_end.payload.ForgetPasswordDto;
import com.back_end.payload.JwtResponseDto;
import com.back_end.payload.LoginDto;
import com.back_end.payload.RegisterDto;
import com.back_end.repository.UserRepository;
import com.back_end.security.JwtTokenProvider;
import com.back_end.service.AuthService;
import com.mailjet.client.errors.MailjetException;
import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.util.WebUtils;

import java.io.IOException;
import java.util.HashSet;
import java.util.UUID;

@Service
@Slf4j
public class AuthServiceImpl implements AuthService {
    private AuthenticationManager authenticationManager;
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private JwtTokenProvider jwtTokenProvider;


    public AuthServiceImpl(AuthenticationManager authenticationManager,
                           UserRepository userRepository,
                           PasswordEncoder passwordEncoder,
                           JwtTokenProvider jwtTokenProvider) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public JwtResponseDto login(LoginDto loginDto , HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginDto.getUsernameOrEmail(), loginDto.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String accessToken = jwtTokenProvider.generateToken(authentication);
        String refreshToken = jwtTokenProvider.generateRefreshToken(authentication);

        return new JwtResponseDto(accessToken, refreshToken);
    }


    @Override
    public String register(RegisterDto registerDto, HttpServletRequest httpServletRequest) {

        log.info("enter register");
        System.out.println(registerDto.getEmail());

        if (userRepository.existsByUsername(registerDto.getUsername())) {
            return "Username is already existed";
        }
        if (userRepository.existsByEmail(registerDto.getEmail())) {
            return "Email is already existed";
        }
        User user = new User();
        user.setEmail(registerDto.getEmail());
        user.setFirstName(registerDto.getFirstName());
        user.setLastName(registerDto.getLastName());
        user.setUsername(registerDto.getUsername());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        user.setRole(registerDto.getRole());

        userRepository.save(user);
        log.info("done");
        return "Success";
    }

    @Override
    public String refreshToken(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) {
        Cookie refreshToken = WebUtils.getCookie(httpServletRequest, "refreshToken");
        if (refreshToken == null) {
            throw new NullPointerException("there is no refresh token");
        }
        String username = jwtTokenProvider.getUsername(refreshToken.getValue());
        User user = userRepository.findByUsernameOrEmail(username, username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username or email: " + username));
        if (user != null && jwtTokenProvider.validateToken(refreshToken.getValue())) {
            String accessToken = jwtTokenProvider.generateTokenByUsername(username);
            Cookie cookie = new Cookie("accessToken", accessToken);

            cookie.setMaxAge(7 * 24 * 60 * 60); // expires in 7 days
            cookie.setSecure(true);
            cookie.setHttpOnly(true);
            cookie.setPath("/"); // Global

            httpServletResponse.addCookie(cookie);
            return "Success";
        }
        return "Fail";
    }

    @Override
    public String forgetPassword(ForgetPasswordDto forgetPasswordDto, HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws MailjetException, IOException {
        log.info("enter");
        User user = userRepository.findByEmail(forgetPasswordDto.getEmail()).orElseThrow(() -> new UsernameNotFoundException("User not found with username or email: " + forgetPasswordDto.getEmail()));
        user.setPassword(passwordEncoder.encode(forgetPasswordDto.getPassword()));
        userRepository.save(user);
        String url = "http://localhost:3000/login/" + UUID.randomUUID();

        Email from = new Email("seeyouagain14012000@gmail.com");
        String subject = "Sending with Twilio SendGrid is Fun";
        Email to = new Email("tung.nguyen@stud.fils.upb.ro");
        Content content = new Content("text/plain", url);
        Mail mail = new Mail(from, subject, to, content);

        SendGrid sg = new SendGrid("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");
        Request request = new Request();
        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            Response response = sg.api(request);
            System.out.println(response.getStatusCode());
            System.out.println(response.getBody());
            System.out.println(response.getHeaders());
        } catch (IOException ex) {
            throw ex;
        }
        log.info("done");
        return "Success";
    }

}
