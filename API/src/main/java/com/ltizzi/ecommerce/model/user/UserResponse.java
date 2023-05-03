package com.ltizzi.ecommerce.model.user;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

/**
 * @author Leonardo Terlizzi
 */
@Data
@NoArgsConstructor
public class UserResponse {

    private Long user_id;
    private String username;
    private String name;
    private String lastname;
    private String email;
    private String avatar;
    private Date birthday;

}
