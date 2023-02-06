package com.example.ulgeryn.repositories;

import com.example.ulgeryn.models.Audio;
import com.example.ulgeryn.models.Photo;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AudioRepository extends MongoRepository<Audio, String> { }
