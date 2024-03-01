package com.project.shop.repo;

import com.project.shop.entity.OrderMail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface OrderMailRepository extends JpaRepository<OrderMail,Long> {
}
