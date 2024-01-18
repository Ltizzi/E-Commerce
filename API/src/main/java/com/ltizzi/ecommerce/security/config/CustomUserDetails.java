package com.ltizzi.ecommerce.security.config;

import com.ltizzi.ecommerce.model.user.UserEntity;
import com.ltizzi.ecommerce.repository.UserRepository;
import com.ltizzi.ecommerce.utils.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

/**
 * @author Leonardo Terlizzi
 */
@Service
public class CustomUserDetails implements UserDetailsService {

    private final Logger LOG = Logger.getLogger(CustomUserDetails.class.getName());
    @Autowired
    private UserRepository userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        String userName = null;
        List<GrantedAuthority> authorities = null;
        UserEntity user = userRepo.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User details not found for the user " + username);
        } else {
            userName = user.getUsername();
            authorities = new ArrayList<>();
            for (Role role : user.getRoles()) {
                authorities.add(new SimpleGrantedAuthority(role.name()));
            }

        }
        LOG.info("From CustomUserDetails: " + userName + " " + authorities.toString());
        return new User(userName, null, authorities);
    }
}
