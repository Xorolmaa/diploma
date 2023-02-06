package com.example.ulgeryn.services;

import com.example.ulgeryn.models.Category;
import com.example.ulgeryn.repositories.CategoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public void save(Category category) {
        categoryRepository.insert(category);
    }

    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    public Category findById(Integer id) {
        Optional<Category> categoryOptional = categoryRepository.findById(id);
        if (categoryOptional.isPresent()) {
            Category category = categoryOptional.get();
            return category;
        }
        return null;
    }

    public void deleteById(Integer id) {
        categoryRepository.deleteById(id);
    }

    public void update(Category updatedCategory) {
        Optional<Category> categoryOptional = categoryRepository.findById(updatedCategory.getId());
        if (categoryOptional.isPresent()) {
            Category category = categoryOptional.get();
            category.setCategoryName(updatedCategory.getCategoryName());
            categoryRepository.save(category);
        }
    }
}
