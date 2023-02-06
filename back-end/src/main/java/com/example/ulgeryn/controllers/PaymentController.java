package com.example.ulgeryn.controllers;

import com.example.ulgeryn.models.Payment;
import com.example.ulgeryn.models.User;
import com.example.ulgeryn.models.Version;
import com.example.ulgeryn.services.PaymentService;
import com.example.ulgeryn.services.SequenceGeneratorService;
import com.example.ulgeryn.services.UserService;
import com.example.ulgeryn.services.VersionService;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1")
@AllArgsConstructor
public class PaymentController {
    private PaymentService paymentService;

    @RequestMapping(value = "/payments", method = RequestMethod.GET)
    public List<Payment> getAllPaymnets(){
        return paymentService.findAll();
    }

    @RequestMapping(value = "/payment/{id}", method = RequestMethod.GET)
    public Payment getPaymentById(@PathVariable String id){
        return paymentService.findById(id);
    }

    @RequestMapping(value = "/create-payment", method = RequestMethod.POST)
    public void createPayment(@RequestBody Payment payment) {
        paymentService.save(payment);
    }

    @RequestMapping(value = "/delete-payment/{id}", method = RequestMethod.DELETE)
    public void deletePayment(@PathVariable String id){
        paymentService.deleteById(id);
    }

}
