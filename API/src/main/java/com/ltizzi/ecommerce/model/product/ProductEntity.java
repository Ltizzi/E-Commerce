package com.ltizzi.ecommerce.model.product;

import com.ltizzi.ecommerce.model.productType.ProductTypeEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.Where;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Leonardo Terlizzi
 */

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "products")
@SQLDelete(sql = "UPDATE products SET soft_delete = true where product_id=?")
@Where(clause = "soft_delete=false")
public class ProductEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long product_id;


    @NotEmpty(message = "Name can't be Empty")
    @NotNull(message = "Name can't be Null")
    @NotBlank(message = "Name can't be Blank")
    @Column(length = 30, nullable = false)
    private String name;

    @NotEmpty(message = "Brand can't be Empty")
    @NotNull(message = "Brand can't be Null")
    @NotBlank(message = "Brand can't be Blank")
    @Column(length = 20, nullable = false)
    private String brand;

    @Column(columnDefinition = "TEXT", length = 2000)
    private String about;

    @Column(name = "image_url")
    private List<String> imageUrl = new ArrayList<>();

    @NotNull(message = "Price can't be null")
    private BigDecimal price;

    @CreationTimestamp
    @Column(updatable = false)
    private Timestamp createdAt;

    @UpdateTimestamp
    private Timestamp updatedAt;

    @Column(name = "soft_delete")
    private Boolean soft_delete = Boolean.FALSE;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "prod_type_id", nullable = false)
    private ProductTypeEntity product_type;

}
