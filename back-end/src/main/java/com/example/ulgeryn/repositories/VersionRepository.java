package com.example.ulgeryn.repositories;

import com.example.ulgeryn.models.Version;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface VersionRepository extends MongoRepository<Version, Integer> {
}
