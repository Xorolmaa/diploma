package com.example.ulgeryn.services;

import com.example.ulgeryn.models.Payment;
import com.example.ulgeryn.repositories.PaymentRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class PaymentService {
    private final PaymentRepository paymentRepository;

    public void save(Payment payment) {
        payment.setPaymentDate(new Date());
        Date expiryDate = null;
        expiryDate.setMonth(payment.getPaymentDate().getMonth() + 1);
        payment.setExpiryDate(expiryDate);
        paymentRepository.insert(payment);
    }

    public List<Payment> findAll() {
        return paymentRepository.findAll();
    }

    public Payment findById(String id) {
        Optional<Payment> paymentOptional = paymentRepository.findById(id);
        if (paymentOptional.isPresent()) {
            Payment payment = paymentOptional.get();
            return payment;
        }
        return null;
    }

    public void deleteById(String id) {
        paymentRepository.deleteById(id);
    }

    public void update(Payment updatedPayment) {
        Optional<Payment> paymentOptional = paymentRepository.findById(updatedPayment.getId());
        if (paymentOptional.isPresent()) {
            Payment payment = paymentOptional.get();
            payment.setUserId(updatedPayment.getUserId());
            payment.setPaymentDate(updatedPayment.getPaymentDate());
            payment.setExpiryDate(updatedPayment.getExpiryDate());
            paymentRepository.save(payment);
        }
    }
}
