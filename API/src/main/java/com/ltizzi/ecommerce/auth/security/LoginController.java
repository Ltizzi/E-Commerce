package com.ltizzi.ecommerce.auth.security;


import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * @author Leonardo Terlizzi
 */

@RestController
@RequestMapping("/auth")
public class LoginController {

    @GetMapping("/login")
    public String login() {
        return "please blabla";
    }

    @GetMapping("/success")
    public Map<String, Object> authSuccessHandler(OAuth2AuthenticationToken oAuth2AuthenticationToken) { //@RequestParam("code") String authorizationCode
        if (oAuth2AuthenticationToken != null) {
            return oAuth2AuthenticationToken.getPrincipal().getAttributes();
        } else return null;
    }

    @GetMapping("/failure")
    public String failedLogin() {
        return "failed to log in";
    }
}
