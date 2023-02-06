package com.example.ulgeryn.repositories;

import com.example.ulgeryn.models.Event;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface EventRepository extends MongoRepository<Event, String> {

}
