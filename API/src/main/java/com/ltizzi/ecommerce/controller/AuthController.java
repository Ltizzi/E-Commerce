package com.ltizzi.ecommerce.controller;


import com.ltizzi.ecommerce.exception.InvalidUserException;
import com.ltizzi.ecommerce.model.user.UserEntity;
import com.ltizzi.ecommerce.model.user.UserMapper;
import com.ltizzi.ecommerce.model.user.UserResponse;
import com.ltizzi.ecommerce.security.utils.OauthUtils;
import com.ltizzi.ecommerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import java.util.List;
import java.util.Map;
import java.util.logging.Logger;
import java.util.stream.Collectors;

/**
 * @author Leonardo Terlizzi
 */

@RestController
@RequestMapping("/auth")
public class AuthController {


    private final Logger LOG = Logger.getLogger(AuthController.class.getName());


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

    //@RequestParam("code") String code
    //Profile: {sub=102508174089616165099, name=Leonardo Terlizzi, given_name=Leonardo, family_name=Terlizzi, picture=https://lh3.googleusercontent.com/a/ACg8ocLBtDUA2HD54F2Vis7yCK5AxkIXMPHKOWjbDqN4wAB_zYqn=s96-c, email=terlizzileonardo@gmail.com, email_verified=true, locale=es}

    @GetMapping("/success")
    public Object authSuccessHandler(Model model, OAuth2AuthenticationToken authentication) throws InvalidUserException, NullPointerException {
        //  OAuth2AuthorizedClient client = oauthUtils.getClient(authentication);
        LOG.info("logueado con " + authentication.toString());
        //String userInfoEndpointUri = oauthUtils.getUserInfoEndpointUri(client);
        //if (!StringUtils.isEmpty(userInfoEndpointUri)) {
        //    Map<String, Object> response = oauthUtils.oauthHandler(userInfoEndpointUri, client);
        //    LOG.info("mas info " + response.toString());
        //   UserEntity user = userServ.getUserByEmail((String) response.get("email"));
        UserEntity user = userServ.getUserByEmail(authentication.getPrincipal().getAttribute("email"));
        if (null == user) {
            UserResponse createdUser = userServ.createNewUser(authentication.getPrincipal().getAttributes());  //response
            LOG.info("User " + createdUser.getEmail() + " salvado correctamente en la DB");
            user = userMapper.toUserEntity(createdUser);
        }
//            List<GrantedAuthority> authorities = user.getRoles().stream()
//                    .map(role -> new SimpleGrantedAuthority("ROLE_" + role.name()))
//                    .collect(Collectors.toList());
//            Authentication auth = new UsernamePasswordAuthenticationToken(user.getEmail(), null, authorities);
//            SecurityContextHolder.getContext().setAuthentication(auth);
        //  }  // IF
        String redirectUrl = "http://localhost:4200";
        RedirectView redirectView = new RedirectView();
        redirectView.setUrl(redirectUrl);
        return redirectView;

    }

    @GetMapping("/user")
    public ResponseEntity<UserResponse> getUserDetailsAfterLogin(OAuth2AuthenticationToken token) { // Authentication token
        if (token != null) {
//            OAuth2AuthorizedClient client = oauthUtils.getClient(token);
//            String userInfoEndpointUri = oauthUtils.getUserInfoEndpointUri(client);
//            Map<String, Object> response = oauthUtils.oauthHandler(userInfoEndpointUri, client);
            String email = token.getPrincipal().getAttribute("email");
            //String email = (String) response.get("email");
            LOG.info("Fetching data from " + email);
            LOG.info("Authorities " + token.getAuthorities());
            UserResponse user = userMapper.toUserResponse(userServ.getUserByEmail(email));
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


}
