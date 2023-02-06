package com.example.ulgeryn.controllers;

import com.example.ulgeryn.models.Event;
import com.example.ulgeryn.models.User;
import com.example.ulgeryn.services.EventService;
import lombok.AllArgsConstructor;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1")
@AllArgsConstructor
public class EventController {
    private EventService eventService;

    @RequestMapping(value = "/events", method = RequestMethod.GET)
    public List<Event> getAllEvents(){
        return eventService.findAll();
    }

    @RequestMapping(value = "/event/{id}", method = RequestMethod.GET)
    public Event getEventById(@PathVariable String id){
        return eventService.findById(id);
    }

    //TODO: yaj create hiihee bodoh - front end
    @RequestMapping(value = "/create-event", method = RequestMethod.POST)
    public void createEvent(@RequestBody Event event) {
        eventService.save(event);
    }

    @RequestMapping(value = "/update-event/{id}", method = RequestMethod.PUT)
    public void updateEvent( @PathVariable String id, @RequestBody Event event){
        eventService.update(event);
    }

    @RequestMapping(value = "/delete-event/{id}", method = RequestMethod.DELETE)
    public void deleteEvent(@PathVariable String id){
        eventService.deleteById(id);
    }
}
