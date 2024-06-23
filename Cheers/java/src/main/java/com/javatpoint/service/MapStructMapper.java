package com.javatpoint.service;

import com.javatpoint.DTO.AdDTO;
import com.javatpoint.DTO.CommentDTO;
import com.javatpoint.model.Ad;
import com.javatpoint.DTO.UserDTO;
import com.javatpoint.model.Comment;
import com.javatpoint.model.User;
import org.mapstruct.Mapper;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;

@Mapper(componentModel = "spring")
public interface MapStructMapper {
    //באופן אוטומטי ידע להחזיר גם רשימה כזאת, ע"י שימוש בפונקציה שכתבנו למטה
    List<AdDTO> adsToDto(List<Ad> ads);

    List<CommentDTO> commentsToDto(List<Comment> comments);
    CommentDTO commentsToDto(Comment comments);


    //כאן אפשר לכתוב כל מיני פונקציות ששייכות להמרה בין המחלקות

    default AdDTO adToDto(Ad a) throws IOException {
        AdDTO adDTO = new AdDTO();
        adDTO.setId(a.getId());
        adDTO.setCategory(a.getCategory());
        adDTO.setTitle(a.getTitle());
        adDTO.setContent(a.getContent());
        adDTO.setDateUpload(a.getDateUpload());
        adDTO.setAddress(a.getAddress());
        adDTO.setArea(a.getArea());
        adDTO.setLink(a.getLink());
        adDTO.setMail(a.getMail());
        adDTO.setPhone(a.getPhone());
        adDTO.setScore(a.getScore());
        adDTO.setAdvertiserId(a.getAdvertiserId());
        adDTO.setLove(a.isLove());






        //כאן נוכל לבצע את ההמרה של התמונה שלנו לביטים כדי שיחזרו לריאקט בהצלחה
        List<String> images = Arrays.asList(a.getImage().split(";"));
        for (int i = 0; i < images.size(); i++) {
            Path filename = Paths.get(images.get(i));
            byte[] byteImages = Files.readAllBytes(filename);
            adDTO.addImage(Base64.getEncoder().encodeToString(byteImages));
        }
        return adDTO;
    }


    default UserDTO userToDto(User u) throws IOException {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(u.getId());
        //  userDTO.setAdLove(u.getAdLove());
        userDTO.setUserName(u.getUserName());
        userDTO.setMail(u.getMail());
        userDTO.setPassword(u.getPassword());
        userDTO.setStatus(u.getStatus());

        //כאן נוכל לבצע את ההמרה של התמונה שלנו לביטים כדי שיחזרו לריאקט בהצלחה
        Path filename = Paths.get(u.getImage());
        //הופך את התמונה למערך של ביטים
        byte[] byteImage = Files.readAllBytes(filename);
        userDTO.setImage(Base64.getEncoder().encodeToString(byteImage));
        return userDTO;
    }


//    default CommentDTO commentToDto(Comment c) throws IOException {
//        CommentDTO commentDTO = new CommentDTO();
//        commentDTO.setDate(c.getDate());
//        commentDTO.setContent(c.getContent());
//        commentDTO.setId(c.getId());
//        commentDTO.setScore(c.getScore());
//        commentDTO.setUser(c.getUser());//צריך בתגובה שיהיה יוזר מסוג dto לא?? מה שאמרתי כבררנו אז מה הבעיה עכשיו
//        commentDTO.setAdId(c.getAdId());
//
//        //כאן נוכל לבצע את ההמרה של התמונה שלנו לביטים כדי שיחזרו לריאקט בהצלחה
//        Path filename = Paths.get(c.getUser().getImage());
//        //הופך את התמונה למערך של ביטים
//        byte[] byteImage = Files.readAllBytes(filename);
//        commentDTO.getUser().setImage(Base64.getEncoder().encodeToString(byteImage));
//        return commentDTO;
//    }

}
