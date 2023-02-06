package com.example.ulgeryn.services;

import com.example.ulgeryn.models.ContentTag;
import com.example.ulgeryn.repositories.ContentTagRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class ContentTagService {
    private final ContentTagRepository contentTagRepository;

    public void save(ContentTag contentTag) {
        contentTagRepository.insert(contentTag);
    }

    public List<ContentTag> findAll() {
        return contentTagRepository.findAll();
    }

    public ContentTag findById(String id) {
        Optional<ContentTag> contentTagOptional = contentTagRepository.findById(id);
        if (contentTagOptional.isPresent()) {
            ContentTag contentTag = contentTagOptional.get();
            return contentTag;
        }
        return null;
    }

    public void deleteById(String id) {
        contentTagRepository.deleteById(id);
    }

    public void update(ContentTag updatedContentTag) {
        Optional<ContentTag> contentTagOptional = contentTagRepository.findById(updatedContentTag.getId());
        if (contentTagOptional.isPresent()) {
            ContentTag contentTag = contentTagOptional.get();
            contentTag.setContentId(updatedContentTag.getContentId());
            contentTag.setTag(updatedContentTag.getTag());
            contentTagRepository.save(contentTag);
        }
    }
}
