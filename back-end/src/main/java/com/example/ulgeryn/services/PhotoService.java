package com.example.ulgeryn.services;
import com.example.ulgeryn.models.Photo;
import com.example.ulgeryn.repositories.PhotoRepository;
import lombok.AllArgsConstructor;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@AllArgsConstructor
@Service
public class PhotoService {

    @Autowired
    private PhotoRepository photoRepo;

    public String addPhoto( MultipartFile file) throws IOException {
        Photo photo = new Photo();
        photo.setImage(
                new Binary(BsonBinarySubType.BINARY, file.getBytes()));
        photo = photoRepo.insert(photo);
        return photo.getId();
    }

    public Photo getPhoto(String id) {
        return photoRepo.findById(id).get();
    }
}