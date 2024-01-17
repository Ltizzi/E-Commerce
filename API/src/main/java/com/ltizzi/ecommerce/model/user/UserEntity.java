package com.ltizzi.ecommerce.model.user;

import com.ltizzi.ecommerce.model.cart.CartEntity;
import com.ltizzi.ecommerce.model.product.ProductEntity;
import com.ltizzi.ecommerce.model.purchase.PurchaseEntity;
import com.ltizzi.ecommerce.utils.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.Where;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @author Leonardo Terlizzi
 */

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "users")
@SQLDelete(sql = "UPDATE users SET soft_delete = true where user_id=?")
@Where(clause = "soft_delete=false")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_id;

    @NotNull(message = "Username can't be null")
    @NotBlank(message = "username can't be blank")
    @NotEmpty(message = "Username can't be empty")
    @Column(name = "username", nullable = false, length = 35)
    private String username;

    @NotNull(message = "Name can't be null")
    @NotBlank(message = "Name can't be blank")
    @NotEmpty(message = "Name can't be empty")
    @Column(name = "name", nullable = false, length = 15)
    private String name;

    @NotNull(message = "Lastname can't be null")
    @NotBlank(message = "Lastname can't be blank")
    @NotEmpty(message = "Lastname can't be empty")
    @Column(name = "lastname", nullable = false, length = 15)
    private String lastname;

    @NotNull(message = "Email can't be null")
    @NotBlank(message = "Email can't be blank")
    @NotEmpty(message = "Email can't be empty")
    @Email(message = "Please use a valid email")
    @Column(name = "email", nullable = false, length = 35)
    private String email;

    //    @NotNull(message = "googleId can't be null")
//    @NotBlank(message = "googleId can't be blank")
//    @NotEmpty(message = "googleId can't be empty")
    @Column(name = "googleId")
    private Long googleId;

    @Column(name = "role")
    private List<Role> roles = new ArrayList<>();

    @Column(name = "avatar", nullable = true)
    private String avatar;

    @Temporal(TemporalType.DATE)
    private Date birthday;

    @CreationTimestamp
    @Column(updatable = false)
    private Timestamp createdAt;

    @UpdateTimestamp
    private Timestamp updatedAt;

    @Column(name = "soft_delete")
    private Boolean soft_delete = Boolean.FALSE;

    @OneToMany(fetch = FetchType.LAZY)
    private List<CartEntity> carts = new ArrayList<>();

    //cascade = CascadeType.ALL, orphanRemoval = true,
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<PurchaseEntity> purchases = new ArrayList<>();


}
