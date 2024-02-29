package com.project.shop.repo;

import com.project.shop.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@EnableJpaRepositories
@Repository
public interface CartRepository extends JpaRepository<Cart,Long> {
    Optional<List<Cart>> findByUserId(Long id);

    Optional<Cart> findByUserIdAndProductId(Long userId, Long productId);

}
