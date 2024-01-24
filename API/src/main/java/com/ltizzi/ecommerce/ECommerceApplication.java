package com.ltizzi.ecommerce;

import com.ltizzi.ecommerce.model.user.UserEntity;
import com.ltizzi.ecommerce.model.user.UserMapper;
import com.ltizzi.ecommerce.model.user.UserRequest;
import com.ltizzi.ecommerce.model.user.UserResponse;
import com.ltizzi.ecommerce.repository.UserRepository;
import com.ltizzi.ecommerce.service.UserService;
import com.ltizzi.ecommerce.utils.Role;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@SpringBootApplication
//@ComponentScan("com/ltizzi/ecommerce/security/config/CustomOAuth2UserService.java")
public class ECommerceApplication {
//
//
//    @Autowired
//    private UserRepository userRepo;

    public static void main(String[] args) {
        SpringApplication.run(ECommerceApplication.class, args);
    }

//    @PostConstruct
//    public void init() {
//        String DEV_ADMIN_EMAIL = System.getenv("DEV_ADMIN_EMAIL");
//        UserEntity user = userRepo.findByEmail(DEV_ADMIN_EMAIL);
//        List<Role> roles = user.getRoles();
//        if (!roles.contains(Role.ADMIN)) {
//            roles.add(Role.ADMIN);
//            user.setRoles(roles);
//            userRepo.save(user);
//        }
//
//    }

}
