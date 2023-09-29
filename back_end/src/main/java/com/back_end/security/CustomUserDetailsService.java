package com.back_end.security;

import com.back_end.entity.User;
import com.back_end.repository.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String usernameOremail) throws UsernameNotFoundException {
        User user = userRepository.findByUsernameOrEmail(usernameOremail, usernameOremail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username or email : " + usernameOremail));
        List<GrantedAuthority> authorities = user.getAuthorities();
//                .getRoles()
//                .stream()
//                .map(role -> new SimpleGrantedAuthority(role.getName()))
//                .collect(Collectors.toSet());

        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), authorities);
    }
}
