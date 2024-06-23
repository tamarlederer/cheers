package com.javatpoint.service;

import com.javatpoint.model.Ad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import java.util.List;

@Component//ע"י זה הוא מכיר את המחלקה ומייצג ממנה מופעים-לבד. ללא new ליצירת אוביקט חדש כמו עד עכשיו
// ע"י נקשר עם המחלקה- בה נצטרך להשתמש עם @Autowired
//JpaRepository- מחלקה שמכילה את כל הפונקציות של סקל כבר מובנות ללא צורך בכתיבת שאילות לבד
public interface AdRepository extends JpaRepository<Ad,Long> {
//    List<Ad> findAllByCategoryId(long id);
//    List<Ad> findAllByAdvertiserId(long id);
//    List<Ad> findAllByAreaEquals(String area);
//    List<Ad> findAllByContentContaining(String content);
}
