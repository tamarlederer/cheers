package com.javatpoint.controller;

import com.javatpoint.model.Category;
import com.javatpoint.service.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin
public class CategoryController {
    private CategoryRepository categoryRepository;

    @Autowired
    public CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @GetMapping("/getcategories")
    public ResponseEntity<List<Category>> getCategories() {
        try {
            List<Category> categories = new ArrayList<>();
            categoryRepository.findAll().forEach(e -> categories.add(e));
            return new ResponseEntity<>(categories, HttpStatus.OK);
        } catch (Exception e) {
            //שגיאה 500
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getcategory/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id) {
        Category c = categoryRepository.findById(id).orElse(null);
        if (c != null) {
            return new ResponseEntity<>(c, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
