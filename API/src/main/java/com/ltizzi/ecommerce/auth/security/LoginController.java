package com.ltizzi.ecommerce.auth.security;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
