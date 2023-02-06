package com.example.ulgeryn.services;

import com.example.ulgeryn.models.Event;
import com.example.ulgeryn.repositories.EventRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class EventService {
    private final EventRepository eventRepository;

    public void save(Event event) {
        event.setEventDate(new Date());
        eventRepository.insert(event);
    }

    public List<Event> findAll() {
        return eventRepository.findAll();
    }

    public Event findById(String id) {
        Optional<Event> eventOptional = eventRepository.findById(id);
        if (eventOptional.isPresent()) {
            Event event = eventOptional.get();
            return event;
        }
        return null;
    }

    public void deleteById(String id) {
        eventRepository.deleteById(id);
    }

    public void update(Event updatedEvent) {
        Optional<Event> eventOptional = eventRepository.findById(updatedEvent.getId());
        if (eventOptional.isPresent()) {
            Event event = eventOptional.get();
            event.setUserId(updatedEvent.getUserId());
            event.setContentId(updatedEvent.getContentId());
            event.setAction(updatedEvent.getAction());
            event.setEventDate(updatedEvent.getEventDate());
            eventRepository.save(event);
        }
    }
}
