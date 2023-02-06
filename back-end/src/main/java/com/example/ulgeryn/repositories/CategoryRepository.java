package com.example.ulgeryn.repositories;

import com.example.ulgeryn.models.Category;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CategoryRepository extends MongoRepository<Category, Integer> {
}
