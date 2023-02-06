package com.example.ulgeryn.controllers;

import com.example.ulgeryn.models.ContentTag;
import com.example.ulgeryn.services.ContentTagService;
import lombok.AllArgsConstructor;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("api/v1")
@AllArgsConstructor
public class ContentTagController {
    private ContentTagService contentTagService;

    @RequestMapping(value = "/content-tags", method = RequestMethod.GET)
    public List<ContentTag> getAllContentTags(){
        return contentTagService.findAll();
    }

    @RequestMapping(value = "/content-tag/{id}", method = RequestMethod.GET)
    public ContentTag getContentTagId(@PathVariable String id){
        return contentTagService.findById(id);
    }

    //TODO: yaj create hiihee bodoh - front end
    @RequestMapping(value = "/create-content-tag", method = RequestMethod.POST)
    public void createContentTag(@RequestBody ContentTag contentTag) {
        contentTagService.save(contentTag);
    }

    @RequestMapping(value = "/update-content-tag/{id}", method = RequestMethod.PUT)
    public void updateContentTag( @PathVariable String id, @RequestBody ContentTag contentTag){
        contentTagService.update(contentTag);
    }

    @RequestMapping(value = "/delete-content-tag/{id}", method = RequestMethod.DELETE)
    public void deleteContentTag(@PathVariable String id){
        contentTagService.deleteById(id);
    }
}
