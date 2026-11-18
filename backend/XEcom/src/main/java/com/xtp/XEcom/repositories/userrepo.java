package com.xtp.XEcom.repositories;

import java.util.Optional;
import java.util.UUID;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.xtp.XEcom.entity.user;

public interface userrepo extends JpaRepository<user, UUID>{
    Optional<user> findByEmail(String email);
    boolean existsByEmail(String email);
    List<user> findByNameContainingIgnoreCaseOrEmailContainingIgnoreCase(String name, String email);
}
