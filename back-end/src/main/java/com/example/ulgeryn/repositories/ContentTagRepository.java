package com.example.ulgeryn.repositories;

import com.example.ulgeryn.models.ContentTag;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ContentTagRepository extends MongoRepository<ContentTag, String> {
}
