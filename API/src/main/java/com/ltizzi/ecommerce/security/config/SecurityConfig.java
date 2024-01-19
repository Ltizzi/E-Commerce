package com.ltizzi.ecommerce.security.config;

import com.ltizzi.ecommerce.repository.UserRepository;
import com.ltizzi.ecommerce.security.filter.CsrfCookieFilter;
import com.ltizzi.ecommerce.utils.Role;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.WebSecurityConfigurer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.*;
import java.util.stream.Collectors;

/**
 * @author Leonardo Terlizzi
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private UserRepository userRepo;


    @Bean
    public SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
        CsrfTokenRequestAttributeHandler requestHandler = new CsrfTokenRequestAttributeHandler();
        requestHandler.setCsrfRequestAttributeName("_csrf");
//sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        http.securityContext((context) -> context.requireExplicitSave(false))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.ALWAYS))
                .cors(corsCustomizer -> corsCustomizer.configurationSource(new CorsConfigurationSource() {
                    @Override
                    public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
                        CorsConfiguration config = new CorsConfiguration();
                        config.setAllowedOrigins(Collections.singletonList("http://localhost:4200"));
                        config.setAllowedMethods(Collections.singletonList("*"));
                        config.setAllowCredentials(true);
                        config.setAllowedHeaders(Collections.singletonList("*"));
                        //  config.setExposedHeaders(Arrays.asList("Authorization"));
                        config.setMaxAge(3600L);
                        return config;
                    }
                }))
                .csrf((csrf) -> csrf.csrfTokenRequestHandler(requestHandler)
                        .ignoringRequestMatchers("*")
                        .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()))
                .addFilterAfter(new CsrfCookieFilter(), BasicAuthenticationFilter.class)
                // .addFilterAfter(new JWTGenerationFilter(), BasicAuthenticationFilter.class)
                //      .addFilterBefore(new JWTValidatorFilter(), BasicAuthenticationFilter.class)
                .authorizeHttpRequests(request ->
                                //authenticated() para oauth
                                request
                                        //options
                                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                                        //auth
                                        .requestMatchers(HttpMethod.GET, "/auth/**").permitAll()
                                        .requestMatchers(HttpMethod.GET, "/auth/user").authenticated()
                                        //user
                                        .requestMatchers(HttpMethod.GET, "/user/byId").hasRole(Role.ADMIN.name())
                                        .requestMatchers(HttpMethod.GET, "/user/all").hasRole(Role.ADMIN.name())
                                        .requestMatchers(HttpMethod.PATCH, "/user/makeAdmin").hasRole(Role.ADMIN.name())
                                        .requestMatchers(HttpMethod.POST, "/user/new").hasRole(Role.ADMIN.name())
                                        .requestMatchers(HttpMethod.PATCH, "/user/update").authenticated()
                                        .requestMatchers(HttpMethod.GET, "/user/count").hasRole(Role.ADMIN.name())
                                        .requestMatchers(HttpMethod.DELETE, "/user/delete").authenticated()
                                        //cart
                                        .requestMatchers(HttpMethod.GET, "/cart/byUserId").authenticated()
                                        .requestMatchers(HttpMethod.GET, "/cart/byId").authenticated()
                                        .requestMatchers(HttpMethod.GET, "/cart/all").hasRole(Role.ADMIN.name())
                                        .requestMatchers(HttpMethod.POST, "/cart/new").authenticated()
                                        .requestMatchers(HttpMethod.DELETE, "/cart/delete").authenticated()
                                        .requestMatchers(HttpMethod.PATCH, "/cart/update").authenticated()
                                        //product
                                        .requestMatchers(HttpMethod.GET, "/product/all").permitAll()
                                        .requestMatchers(HttpMethod.GET, "/product/count").hasRole(Role.ADMIN.name())
                                        .requestMatchers(HttpMethod.GET, "/product/byId").permitAll()
                                        .requestMatchers(HttpMethod.POST, "/product/new").hasRole(Role.ADMIN.name())
                                        .requestMatchers(HttpMethod.DELETE, "/product/delete").hasRole(Role.ADMIN.name())
                                        .requestMatchers(HttpMethod.PATCH, "/product/update").hasRole(Role.ADMIN.name())
                                        //product type
                                        .requestMatchers(HttpMethod.GET, "/type/all").permitAll()
                                        .requestMatchers(HttpMethod.GET, "/type/count").hasRole(Role.ADMIN.name())
                                        .requestMatchers(HttpMethod.GET, "/type/byId").permitAll()
                                        .requestMatchers(HttpMethod.POST, "/type/new").hasRole(Role.ADMIN.name())
                                        .requestMatchers(HttpMethod.DELETE, "/type/delete").hasRole(Role.ADMIN.name())
                                        .requestMatchers(HttpMethod.PATCH, "/type/update").hasRole(Role.ADMIN.name())
                                        //purchase
                                        .requestMatchers(HttpMethod.GET, "/purchase/all").hasRole(Role.ADMIN.name())
                                        .requestMatchers(HttpMethod.GET, "/purchase/count").hasRole(Role.ADMIN.name())
                                        .requestMatchers(HttpMethod.GET, "/purchase/byId").authenticated()
                                        .requestMatchers(HttpMethod.GET, "/purchase/byUser").authenticated()
                                        .requestMatchers(HttpMethod.POST, "/purchase/new").authenticated()
                                        .requestMatchers(HttpMethod.DELETE, "/purchase/delete").hasRole(Role.ADMIN.name())
                                        .requestMatchers(HttpMethod.PATCH, "/purchase/update").hasRole(Role.ADMIN.name())
                                        //shop orders
                                        .requestMatchers(HttpMethod.GET, "/order/all").hasRole(Role.ADMIN.name())
                                        .requestMatchers(HttpMethod.GET, "/order/byId").authenticated()
                                        .requestMatchers(HttpMethod.GET, "/order/byUser").authenticated()
                                        .requestMatchers(HttpMethod.POST, "/order/new").authenticated()
                                        .requestMatchers(HttpMethod.DELETE, "/order/delete").authenticated()
                                        .requestMatchers(HttpMethod.PATCH, "/order/update").authenticated()
                                        //stock
                                        .requestMatchers(HttpMethod.GET, "/stock/all").hasRole(Role.ADMIN.name())
                                        .requestMatchers(HttpMethod.GET, "/stock/count").hasRole(Role.ADMIN.name())
                                        .requestMatchers(HttpMethod.GET, "/stock/checkStock").permitAll()
                                        .requestMatchers(HttpMethod.GET, "/stock/byId").hasRole(Role.ADMIN.name())
                                        .requestMatchers(HttpMethod.POST, "/stock/new").hasRole(Role.ADMIN.name())
                                        .requestMatchers(HttpMethod.PATCH, "/stock/update").hasRole(Role.ADMIN.name())
                                        //stock entry
                                        .requestMatchers("/entry/**").hasRole(Role.ADMIN.name())

                        //.anyRequest().permitAll()
                )
                .oauth2Login().defaultSuccessUrl("/auth/success", true); //Customizer.withDefaults()

        return http.build();
    }

//    @Bean
//    public GrantedAuthoritiesMapper userAuthoritiesMapper() {
//        return (authorities) -> {
//            Set<GrantedAuthority> mappedAuthorities = null;
//            Authentication authen = SecurityContextHolder.getContext().getAuthentication();
//            OAuth2AuthenticationToken authenticationToken = (OAuth2AuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
//            Map<String, Object> userAttributes = authenticationToken.getPrincipal().getAttributes();
//            String email = (String) userAttributes.get("email");
//            List<Role> userRoles = userRepo.findByEmail(email).getRoles();
////            for (Role role : userRoles) {
////                mappedAuthorities.add(new SimpleGrantedAuthority("ROLE_" + role.toString()));
////            }
//            mappedAuthorities = userRoles.stream().map(role -> new SimpleGrantedAuthority("ROLE_" + role.name())).collect(Collectors.toSet());
//            return mappedAuthorities;
//        };
//    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
