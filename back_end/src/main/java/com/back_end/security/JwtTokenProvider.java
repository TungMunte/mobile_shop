package com.back_end.security;

import com.back_end.entity.User;
import com.back_end.exception.OnlineShopAPIException;
import com.back_end.exception.ResourceNotFoundException;
import com.back_end.repository.UserRepository;
import com.back_end.utils.AppConstants;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenProvider {

    private final UserRepository userRepository;

    public JwtTokenProvider(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String generateToken(Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByEmail(username).orElseThrow(() -> new ResourceNotFoundException("User", username, 0L));
        Date currentDate = new Date();
        Date expireDate = new Date(currentDate.getTime() + AppConstants.JWT_EXPIRATION);
        return Jwts.builder().setSubject(user.getUsername()).setIssuedAt(new Date()).setExpiration(expireDate).claim("role", user.getRole().toString()).signWith(key()).compact();
    }

    public String generateRefreshToken(Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByEmail(username).orElseThrow(() -> new ResourceNotFoundException("User", username, 0L));
        Date currentDate = new Date();
        Date expireDate = new Date(currentDate.getTime() + AppConstants.REFRESH_TOKEN_EXPIRATION);
        return Jwts.builder().setSubject(user.getUsername()).setIssuedAt(new Date()).setExpiration(expireDate).claim("role", user.getRole().toString()).signWith(key()).compact();
    }

    public String generateTokenByUsername(String username) {
        Date currentDate = new Date();
        Date expireDate = new Date(currentDate.getTime() + AppConstants.JWT_EXPIRATION);
        return Jwts.builder().setSubject(username).setIssuedAt(new Date()).setExpiration(expireDate).signWith(key()).compact();
    }

    private Key key() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(AppConstants.JWT_SECRET));
    }

    //    get username from jwt token
    public String getUsername(String token) {
        Claims claims = Jwts
                .parserBuilder()
                .setSigningKey(key())
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

    //    validate jwt token
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(key())
                    .build()
                    .parse(token);
            return true;
        } catch (MalformedJwtException exception) {
            throw new OnlineShopAPIException(HttpStatus.BAD_REQUEST, "invalid jwt token");
        } catch (ExpiredJwtException exception) {
            throw new OnlineShopAPIException(HttpStatus.BAD_REQUEST, "expired jwt token");
        } catch (UnsupportedJwtException exception) {
            throw new OnlineShopAPIException(HttpStatus.BAD_REQUEST, "unsupported jwt token");
        } catch (IllegalArgumentException exception) {
            throw new OnlineShopAPIException(HttpStatus.BAD_REQUEST, "JWT claims string is empty");
        }

    }
}

