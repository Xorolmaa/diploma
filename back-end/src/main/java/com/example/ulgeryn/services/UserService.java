package com.example.ulgeryn.services;

import com.example.ulgeryn.models.User;
import com.example.ulgeryn.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;

    public void save(User user) {
        userRepository.insert(user);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findById(String id) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return user;
        }
        return null;
    }

    public void deleteById(String id) {
        userRepository.deleteById(id);
    }

    public void update(User updatedUser) {
        Optional<User> userOptional = userRepository.findById(updatedUser.getId());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setFirstName(updatedUser.getFirstName());
            user.setEmail(updatedUser.getEmail());
            user.setLastName(updatedUser.getLastName());
            user.setPassword(updatedUser.getPassword());
            userRepository.save(user);
        }
    }

    public String findUserNameById(String id) {
        Optional<User> user = userRepository.findById(id);
        return user.orElseThrow().getFirstName();
    }
}
