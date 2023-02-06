package com.example.ulgeryn.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "event")
public class Event {
    @Id
    private String id;
    private String userId;
    private String contentId;
    private String action;
    private Date eventDate;
}
