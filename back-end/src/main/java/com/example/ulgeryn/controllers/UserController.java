package com.example.ulgeryn.controllers;

import com.example.ulgeryn.models.User;
import com.example.ulgeryn.models.Version;
import com.example.ulgeryn.services.SequenceGeneratorService;
import com.example.ulgeryn.services.UserService;
import com.example.ulgeryn.services.VersionService;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("api/v1")
@AllArgsConstructor
public class UserController {
    private UserService userService;

    @RequestMapping(value = "/users", method = RequestMethod.GET)
    public List<User> getAllUsers(){
        return userService.findAll();
    }

    @RequestMapping(value = "/user/{id}", method = RequestMethod.GET)
    public User getUserById(@PathVariable String id){
        return userService.findById(id);
    }

    @RequestMapping(value = "/user-get-name/{id}", method = RequestMethod.GET)
    public String getUserNameById(@PathVariable String id){
        return userService.findUserNameById(id);
    }

    @RequestMapping(value = "/create-user", method = RequestMethod.POST)
    public void createUser(@RequestBody User user) {
        userService.save(user);
    }

    @RequestMapping(value = "/update-user/{id}", method = RequestMethod.PUT)
    public void updateUser( @PathVariable String id, @RequestBody User user){
        userService.update(user);
    }

    @RequestMapping(value = "/delete-user/{id}", method = RequestMethod.DELETE)
    public void deleteUser(@PathVariable String id){
        userService.deleteById(id);
    }

}
