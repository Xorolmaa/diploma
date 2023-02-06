package com.example.ulgeryn.services;

import com.example.ulgeryn.models.Version;
import com.example.ulgeryn.repositories.VersionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class VersionService {

    private final VersionRepository versionRepository;



    public void save(Version version) {

        version.setPublishDate(new Date());
        versionRepository.insert(version);
    }

    public List<Version> findAll() {
        return versionRepository.findAll();
    }

    public Version findById(Integer id) {
        Optional<Version> versionOptional = versionRepository.findById(id);
        if (versionOptional.isPresent()) {
            Version version = versionOptional.get();
            return version;
        }
        return null;
    }

    public void deleteById(Integer id) {
        versionRepository.deleteById(id);
    }

    public void update(Version updatedVersion) {
        Optional<Version> versionOptional = versionRepository.findById(updatedVersion.getId());
        if (versionOptional.isPresent()) {
            Version version = versionOptional.get();
            version.setText(updatedVersion.getText());
            version.setAudioUrl(updatedVersion.getAudioUrl());
            version.setIsDefault(updatedVersion.getIsDefault());
            version.setVersionName(updatedVersion.getVersionName());
            versionRepository.save(version);
        }
    }
}
