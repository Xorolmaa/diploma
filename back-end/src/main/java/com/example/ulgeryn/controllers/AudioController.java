package com.example.ulgeryn.controllers;

import com.example.ulgeryn.models.Audio;
import com.example.ulgeryn.models.Photo;
import com.example.ulgeryn.services.AudioService;
import com.example.ulgeryn.services.PhotoService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
@RequestMapping("api/v1")
@AllArgsConstructor
public class AudioController {
    private AudioService audioService;

    @RequestMapping(value = "/audio/{id}", method = RequestMethod.GET)
    public String getAudio(@PathVariable String id, HttpServletResponse response) throws IOException
    {
        Audio audio = audioService.getAudio(id);
        response.setContentType("audio/mpeg");
        response.getOutputStream().write(audio.getAudio().getData());
        response.getOutputStream().close();
        return "audios";
    }

    //TODO: yaj create hiihee bodoh - front end
    @RequestMapping(value = "/create-audio", method = RequestMethod.POST)
    public String addAudio(@RequestBody MultipartFile audio)
            throws IOException {
        String id = audioService.addAudio(audio);
        return id;
    }}
