package com.example.ulgeryn.controllers;

import com.example.ulgeryn.models.Event;
import com.example.ulgeryn.models.Photo;
import com.example.ulgeryn.models.User;
import com.example.ulgeryn.services.EventService;
import com.example.ulgeryn.services.PhotoService;
import lombok.AllArgsConstructor;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1")
@AllArgsConstructor
public class PhotoController {
    private PhotoService photoService;

//    @RequestMapping(value = "/photos", method = RequestMethod.GET)
//    public List<Event> getAllEvents(){
//        return eventService.findAll();
//    }

    @RequestMapping(value = "/photo/{id}", method = RequestMethod.GET)
    public String getPhoto(@PathVariable String id, HttpServletResponse response) throws IOException
    {
        Photo photo = photoService.getPhoto(id);
        response.setContentType("image/jpeg, image/jpg, image/png");
        response.getOutputStream().write(photo.getImage().getData());
        response.getOutputStream().close();
        return "photos";
    }

    //TODO: yaj create hiihee bodoh - front end
    @RequestMapping(value = "/create-photo", method = RequestMethod.POST)
    public String addPhoto(@RequestBody MultipartFile image)
            throws IOException {
        String id = photoService.addPhoto(image);
        return id;
    }

//    @RequestMapping(value = "/update-photo/{id}", method = RequestMethod.PUT)
//    public void updateEvent( @PathVariable String id, @RequestBody Event event){
//        eventService.update(event);
//    }
//
//    @RequestMapping(value = "/delete-photo/{id}", method = RequestMethod.DELETE)
//    public void deleteEvent(@PathVariable String id){
//        eventService.deleteById(id);
//    }
}
