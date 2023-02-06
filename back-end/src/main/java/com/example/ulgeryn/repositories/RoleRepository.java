package com.example.ulgeryn.repositories;

import com.example.ulgeryn.models.ERole;
import com.example.ulgeryn.models.Role;
import com.example.ulgeryn.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RoleRepository extends MongoRepository<Role, String> {
    Optional<Role> findByName(ERole name);
}
