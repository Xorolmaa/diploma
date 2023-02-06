package com.example.ulgeryn.services;

import com.example.ulgeryn.models.Content;
import com.example.ulgeryn.models.Version;
import com.example.ulgeryn.repositories.CategoryRepository;
import com.example.ulgeryn.repositories.ContentRepository;
import com.example.ulgeryn.repositories.UserRepository;
import com.example.ulgeryn.repositories.VersionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class ContentService {

    private final int HIDDEN_TEXT_LEN = 120;
    private final ContentRepository contentRepository;
    private final VersionRepository versionRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    private SequenceGeneratorService sequenceGeneratorService;

    public void save(Content content) {
        content.setAuthor(userRepository.findById(content.getAuthor().getId()).get());
        List<Version> versions = content.getVersions();
        List<Version> createdVersions = new ArrayList<>();
        //versions.forEach(versionRepository.save(versions.get(i)));
        int i = 0;
        for(Version v : versions) {
            v.setId(sequenceGeneratorService.getSequenceNumber(Version.SEQUENCE_NAME));
            v.setPublishDate(new Date());
            versionRepository.save(v);
            createdVersions.add(v);
                    i++;
        }
//        content.setVersions(versionRepository.saveAll(content.getVersions()));
        content.setVersions(createdVersions);
        content.setCategory(categoryRepository.save(content.getCategory()));
        contentRepository.insert(content);
    }


    public Content findByIdDetailed(String id) {
        Optional<Content> contentOptional = contentRepository.findById(id);
        if (contentOptional.isPresent()) {
            Content content = contentOptional.get();
            return content;
        }
        return null;
    }

    public List<Content> findAll() {
        List<Content> contents = contentRepository.findAll();
        contents.forEach(this::makeHidden);
        return contents;
    }

    public Content findById(String id) {
        Optional<Content> contentOptional = contentRepository.findById(id);
        if (contentOptional.isPresent()) {
            Content content = contentOptional.get();
            makeHidden(content);
            return content;
        }
        return null;
    }

    private void makeHidden(Content content) {
        content.getVersions()
                .forEach((v) -> v.setText(cutText(v.getText())));
    }

    private String cutText(String text) {
        if (text != null && !text.isEmpty()) {
            int shortLen = Math.min(HIDDEN_TEXT_LEN, text.length());
            return text.substring(0, shortLen);
        }
        return text;
    }

    public void deleteById(String id) {
        contentRepository.deleteById(id);
    }

    public void update(Content updatedContent) {
        Optional<Content> contentOptional = contentRepository.findById(updatedContent.getId());
        if (contentOptional.isPresent()) {
            Content content = contentOptional.get();
            content.setLikeNumber(updatedContent.getLikeNumber());
            content.setImageUrl(updatedContent.getImageUrl());
            content.setVersions(updatedContent.getVersions());
            content.setAuthor(updatedContent.getAuthor());
            content.setCategory(updatedContent.getCategory());
            content.setTitle(updatedContent.getTitle());
            contentRepository.save(content);
        }
    }

    public List<Content> findAllByCategory(Integer categoryId) {
        List<Content> contents = contentRepository.findContentsByCategory_Id(categoryId);
        contents.forEach(this::makeHidden);
        return contents;
    }
//
//    public List<Content> findByUserId(String userId) {
//        List<Content> contents = contentRepository.findContentsByUser_Id(userId);
//        return contents;
//    }
}
