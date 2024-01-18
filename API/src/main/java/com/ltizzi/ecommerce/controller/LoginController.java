package com.ltizzi.ecommerce.controller;


import com.ltizzi.ecommerce.exception.InvalidUserException;
import com.ltizzi.ecommerce.model.user.UserEntity;
import com.ltizzi.ecommerce.model.user.UserMapper;
import com.ltizzi.ecommerce.model.user.UserResponse;
import com.ltizzi.ecommerce.security.utils.OauthUtils;
import com.ltizzi.ecommerce.service.UserService;
import com.ltizzi.ecommerce.utils.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;
import java.util.stream.Collectors;

/**
 * @author Leonardo Terlizzi
 */

@RestController
@RequestMapping("/auth")
public class LoginController {


    private final Logger LOG = Logger.getLogger(LoginController.class.getName());


    @Autowired
    private OAuth2AuthorizedClientService authorizedClientService;

    @Autowired
    private UserService userServ;

    @Autowired
    private OauthUtils oauthUtils;

    @Autowired
    private UserMapper userMapper;


    @GetMapping("/login")
    public String login() {
        return "please blabla";
    }

    //userInfo.toString():
    //Profile: {sub=102508174089616165099, name=Leonardo Terlizzi, given_name=Leonardo, family_name=Terlizzi, picture=https://lh3.googleusercontent.com/a/ACg8ocLBtDUA2HD54F2Vis7yCK5AxkIXMPHKOWjbDqN4wAB_zYqn=s96-c, email=terlizzileonardo@gmail.com, email_verified=true, locale=es}

    @GetMapping("/success")
    public Object authSuccessHandler(@RequestParam("code") String code) throws InvalidUserException, NullPointerException {
        ResponseEntity response = null;

        Map<String, Object> tokens = oauthUtils.verifyTokenWithGoogle(code);
        Map<String, Object> userInfo = oauthUtils.getUserInfoFromGoogle(tokens);


        String email = (String) userInfo.get("email");
        LOG.info("Se ha logueado con la cuenta Google de " + email);
        UserEntity user = userServ.getUserByEmail(email);
        if (null == user) {
            UserResponse createdUser = userServ.createNewUser(userInfo);
            response = ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
            user = userServ.getUserByEmail(email);
        }
        List<GrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role.name()))
                .collect(Collectors.toList());
        Authentication authentication = new UsernamePasswordAuthenticationToken(user.getUsername(), null, authorities);


        //return response;
        String redirectUrl = "http://localhost:4200";
        RedirectView redirectView = new RedirectView();
        redirectView.setUrl(redirectUrl);
        redirectView.addStaticAttribute("user_id", user.getUser_id());

        return redirectView;


    }

    @GetMapping("/user")
    public ResponseEntity<UserResponse> getUserDetailsAfterLogin(Authentication authentication) {
        LOG.info("obteniendo información de..." + authentication.getName());

        if (authentication != null) {
            String username = authentication.getName();

            UserResponse user = userServ.getUserByUsername(username);
            if (user != null) {

                return new ResponseEntity<>(user, HttpStatus.OK);
            }

        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @GetMapping("/failure")
    public String failedLogin() {
        return "failed to log in";
    }

    //PARAMS:
    //Model model, OAuth2AuthenticationToken oAuth2AuthenticationToken,
    //body:
    //        OAuth2AuthorizedClient client = authorizedClientService
//                .loadAuthorizedClient(
//                        oAuth2AuthenticationToken.getAuthorizedClientRegistrationId(), oAuth2AuthenticationToken.getName()
//                );
//        return "success" + oAuth2AuthenticationToken.getName();
}
