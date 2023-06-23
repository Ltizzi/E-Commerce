package com.ltizzi.ecommerce.auth.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.WebSecurityConfigurer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

/**
 * @author Leonardo Terlizzi
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity

public class SecurityConfig {


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors(Customizer.withDefaults()).csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(authorize ->
                        //authenticated() para oauth2
                        authorize.anyRequest().permitAll()).oauth2Login(Customizer.withDefaults());

        return http.build();
    }
}
