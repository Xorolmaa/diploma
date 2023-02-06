package com.example.ulgeryn.controllers;

import com.example.ulgeryn.models.Version;
import com.example.ulgeryn.services.SequenceGeneratorService;
import com.example.ulgeryn.services.VersionService;
import lombok.AllArgsConstructor;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("api/v1")
@AllArgsConstructor
public class VersionController {
    private VersionService versionService;
    private SequenceGeneratorService sequenceGeneratorService;

    @RequestMapping(value = "/versions", method = RequestMethod.GET)
    public List<Version> getAllVersions(){
        return versionService.findAll();
    }

    @RequestMapping(value = "/version/{id}", method = RequestMethod.GET)
    public Version getVersionById(@PathVariable Integer id){
        return versionService.findById(id);
    }

    @RequestMapping(value = "/create-version", method = RequestMethod.POST)
    public void createVersion(@RequestBody Version version) {
        version.setId(sequenceGeneratorService.getSequenceNumber(version.SEQUENCE_NAME));
        versionService.save(version);
    }

        @RequestMapping(value = "/update-version/{id}", method = RequestMethod.PUT)
    public void updateVersion(@PathVariable Integer id,@RequestBody Version version){
         versionService.update(version);
    }

    @RequestMapping(value = "/delete-version/{id}", method = RequestMethod.DELETE)
    public void deleteVersion(@PathVariable Integer id){
        versionService.deleteById(id);

    }
}
