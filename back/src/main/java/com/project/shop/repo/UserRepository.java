package com.project.shop.repo;

import com.project.shop.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository  extends JpaRepository<User,Long> {
    User findOneByEmailIgnoreCaseAndPassword(String emailId, String password);

    User findByEmail(String email);

    User deleteByEmail(String email);

}
