package com.javatpoint.controller;

import com.javatpoint.DTO.CommentDTO;
import com.javatpoint.model.Ad;
import com.javatpoint.model.Comment;
import com.javatpoint.service.CommentRepository;
import com.javatpoint.service.MapStructMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin
public class CommentController {
    private CommentRepository commentRepository;
    private MapStructMapper mapper;

    @Autowired
    public CommentController(CommentRepository commentRepository, MapStructMapper mapper) {
        this.commentRepository = commentRepository;
        this.mapper = mapper;
    }

    @GetMapping("/getComments")
    public ResponseEntity<List<Comment>> getComments() {
        try {
            List<Comment> comments = new ArrayList<>();
            commentRepository.findAll().forEach(e -> comments.add(e));
            return new ResponseEntity<>(comments, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e);
            //שגיאה 500
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/uploadComment")
    public ResponseEntity<Comment> uploadComment( @RequestBody Comment comment) throws IOException {
        try {
            comment.setDate(LocalDate.now());
            commentRepository.save(comment);
            return new ResponseEntity(comment, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }




}
