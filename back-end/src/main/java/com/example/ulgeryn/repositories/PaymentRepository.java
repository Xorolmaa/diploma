package com.example.ulgeryn.repositories;

import com.example.ulgeryn.models.Payment;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PaymentRepository extends MongoRepository<Payment, String> {
}
