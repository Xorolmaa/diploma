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
@Document(collection = "audios")
public class Audio {
    @Id
    private String id;

    private Binary audio;

    public Audio(Binary audio) {
        this.audio = audio;
    }
}