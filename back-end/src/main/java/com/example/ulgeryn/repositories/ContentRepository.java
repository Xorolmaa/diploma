package com.example.ulgeryn.repositories;

import com.example.ulgeryn.models.Content;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ContentRepository extends MongoRepository<Content, String> {

    List<Content> findContentsByCategory_Id(Integer categoryId);
}
