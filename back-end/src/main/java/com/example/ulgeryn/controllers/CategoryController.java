package com.example.ulgeryn.controllers;

import com.example.ulgeryn.models.Category;
import com.example.ulgeryn.services.CategoryService;
import lombok.AllArgsConstructor;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("api/v1")
@AllArgsConstructor
public class CategoryController {
    private CategoryService categoryService;

    @RequestMapping(value = "/categories", method = RequestMethod.GET)
    public List<Category> getAllCategories(){
        return categoryService.findAll();
    }

    @RequestMapping(value = "/category/{id}", method = RequestMethod.GET)
    public Category getCategoryById(@PathVariable Integer id){
        return categoryService.findById(id);
    }

    @RequestMapping(value = "/create-category", method = RequestMethod.POST)
    public void createCategory(@RequestBody Category category) {
        categoryService.save(category);
    }

    @RequestMapping(value = "/update-category/{id}", method = RequestMethod.PUT)
    public void updateCategory( @PathVariable Integer id, @RequestBody Category category){
        categoryService.update(category);
    }

    @RequestMapping(value = "/delete-category/{id}", method = RequestMethod.DELETE)
    public void deleteCategory(@PathVariable Integer id){
        categoryService.deleteById(id);
    }
}
