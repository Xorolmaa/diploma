package com.example.ulgeryn.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "photos")
public class Photo {
    @Id
    private String id;

    private Binary image;

    public Photo(Binary image) {
        this.image = image;
    }
}