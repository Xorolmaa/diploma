package com.example.ulgeryn.controllers;

import com.example.ulgeryn.models.Content;
import com.example.ulgeryn.models.User;
import com.example.ulgeryn.services.ContentService;
import com.example.ulgeryn.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("api/v1")
@AllArgsConstructor
public class ContentController {
    private ContentService contentService;

    @RequestMapping(value = "/contents", method = RequestMethod.GET)
    public List<Content> getAllContents(){
        return contentService.findAll();
    }

    @RequestMapping(value = "/content/{id}", method = RequestMethod.GET)
    public Content getContentById(@PathVariable String id){
        return contentService.findById(id);
    }


    @RequestMapping(value = "/content-detailed/{id}", method = RequestMethod.GET)
    public Content getContentByIdDetailed(@PathVariable String id){
        return contentService.findByIdDetailed(id);
    }

    @RequestMapping(value = "/create-content", method = RequestMethod.POST)
    public void createContent(@RequestBody Content content) {
        contentService.save(content);
    }

    @RequestMapping(value = "/update-content/{id}", method = RequestMethod.PUT)
    public void updateContent( @PathVariable String id, @RequestBody Content content){
        contentService.update(content);
    }

    @RequestMapping(value = "/delete-content/{id}", method = RequestMethod.DELETE)
    public void deleteContent(@PathVariable String id){
        contentService.deleteById(id);
    }

    @RequestMapping(value = "/update-added-like/{id}", method = RequestMethod.PUT)
    public void updateContentByAddedLike( @PathVariable String id, @RequestBody Content content){
        content.setLikeNumber(content.getLikeNumber()+1);
        contentService.update(content);
    }

    @RequestMapping(value = "/update-reduced-like/{id}", method = RequestMethod.PUT)
    public void updateContentByReducedLike( @PathVariable String id, @RequestBody Content content){
        contentService.update(content);
    }
}
