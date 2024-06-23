package com.javatpoint.service;

import com.javatpoint.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface CommentRepository extends JpaRepository<Comment,Long> {
    List<Comment> findAllByAdId(long id);
}
