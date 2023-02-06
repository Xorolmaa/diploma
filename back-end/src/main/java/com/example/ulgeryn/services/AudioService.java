package com.example.ulgeryn.services;
import com.example.ulgeryn.models.Audio;
import com.example.ulgeryn.models.Photo;
import com.example.ulgeryn.repositories.AudioRepository;
import lombok.AllArgsConstructor;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@AllArgsConstructor
@Service
public class AudioService {

    @Autowired
    private AudioRepository audioRepo;

    public String addAudio( MultipartFile file) throws IOException {
        Audio audio = new Audio();
        audio.setAudio(
                new Binary(BsonBinarySubType.BINARY, file.getBytes()));
        audio = audioRepo.insert(audio);
        return audio.getId();
    }

    public Audio getAudio(String id) {
        return audioRepo.findById(id).get();
    }
}