package com.javatpoint.controller;

import com.javatpoint.DTO.AdDTO;
import com.javatpoint.model.Ad;
import com.javatpoint.model.Category;
import com.javatpoint.service.AdRepository;
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

@RestController//מאפשר שיהיה כתובת לאתר (הכתובת תכתב ע"י @GetMapping )
@RequestMapping("/api/ads")//תחילת הקישור לאתר שלנו
@CrossOrigin //מאפשר גישה אל האתר- כך האתר סוג של לא מאובטח ואפשר לגשת אליו
public class AdController {
    private AdRepository adRepository;//משתנה מסוג הממשק- כך נממש את הפונ שמספק הרפוזיטורי שלנו
    private MapStructMapper mapper;
    private static String UPLOAD_DIRECTORY = System.getProperty("user.dir") + "\\images\\";

    //הבנאי יקבל את מופע של הממשק שיכיל את הפונ שלנו
    @Autowired
    public AdController(AdRepository adRepository, MapStructMapper mapper) {
        this.adRepository = adRepository;
        this.mapper = mapper;
    }

    @GetMapping("/getAds")
    public ResponseEntity<List<AdDTO>> getAds() {
        try {
            List<Ad> ads = new ArrayList<>();
            adRepository.findAll().forEach(e -> ads.add((e)));//הוספת כל המודעות לads
            return new ResponseEntity<>(mapper.adsToDto(ads), HttpStatus.OK);//HttpStatus.ok=200
        } catch (Exception e) {
            System.out.println(e);
            //שגיאה 500
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    //פונקציה שתחזיר את כל המודעות- בהגשה זו נגדיר את הניווט בו נשתמש לקבלץ דרישת הפונ
    @GetMapping("/getAdsById/{id}")
    public ResponseEntity<AdDTO> getAdsByCategory(@PathVariable long id) {
        try {
            Ad ads =  adRepository.findById(id).orElse(null);
           //הוספת כל המודעות לads
            return new ResponseEntity<>(mapper.adToDto(ads), HttpStatus.OK);//HttpStatus.ok=200
        } catch (Exception e) {
            //שגיאה 500
            System.out.println(e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
//
//    @GetMapping("/getAds/{advertiserId}")
//    public ResponseEntity<List<Ad>> getAdsByAdvertiserId(@PathVariable long id) {
//        try {
//            List<Ad> ads = new ArrayList<>();
//            adRepository.findAllByAdvertiserId(id).forEach(e -> ads.add(e));//הוספת כל המודעות לads
//            return new ResponseEntity<>(ads, HttpStatus.OK);//HttpStatus.ok=200
//        } catch (Exception e) {
//            //שגיאה 500
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//
//    @GetMapping("/getAds/{area}")
//    public ResponseEntity<List<Ad>> getAdsByArea(@PathVariable String area) {
//        try {
//            List<Ad> ads = new ArrayList<>();
//            adRepository.findAllByAreaEquals(area).forEach(e -> ads.add(e));//הוספת כל המודעות לads
//            return new ResponseEntity<>(ads, HttpStatus.OK);//HttpStatus.ok=200
//        } catch (Exception e) {
//            //שגיאה 500
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//
//    @GetMapping("/getAds/{content}")
//    public ResponseEntity<List<Ad>> getAdsByContent(@PathVariable String content) {
//        try {
//            List<Ad> ads = new ArrayList<>();
//            adRepository.findAllByContentContaining(content).forEach(e -> ads.add(e));//הוספת כל המודעות לads
//            return new ResponseEntity<>(ads, HttpStatus.OK);//HttpStatus.ok=200
//        } catch (Exception e) {
//            //שגיאה 500
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }


    //העלאת מודעה עם תמונות
    //////////////////////////////////////////
    @PostMapping("/uploadAd")
    public ResponseEntity uploadAd(@RequestPart("image") MultipartFile[] files,@RequestPart("ad") Ad a) throws IOException {
        try{
            System.out.println("files.length="+files.length);
            System.out.println("files - list of image: "+files);
            for (int i = 0; i < files.length; i++) {
                String filePath=UPLOAD_DIRECTORY+files[i].getOriginalFilename();
                Path filename= Paths.get(filePath);
                Files.write(filename,files[i].getBytes());
                if(i==0)
                    a.setImage(filePath);
                else
                    a.setImage(a.getImage()+";"+filePath);
            }

            Ad newAd=adRepository.save(a);//הבעיה כאן שהוא שומר רק תמונה אחת.. למרות שקיבל בטוח את כולם!
            //setImage לא צריך להיות של מערך תמונות??
            System.out.println(newAd.getImage());
            return new ResponseEntity(newAd,HttpStatus.CREATED);
        }
        catch (Exception e){
            System.out.println(e);
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    ///////////////////////////////////////////////////


    @PutMapping("/updateAd/{id}")
    public ResponseEntity<Ad> updateAd(@PathVariable long id, @RequestBody Ad ad) {
        Ad a = adRepository.findById(id).orElse(null);
        if (a != null) {
            a.setAddress(ad.getAddress());
            a.setArea(ad.getArea());
            a.setContent(ad.getContent());
            a.setImage(ad.getImage());
            a.setLink(ad.getLink());
            a.setTitle(ad.getTitle());

            adRepository.save(a);
            return new ResponseEntity<>(a, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/deleteAd/{id}")
    public ResponseEntity deleteAd(@PathVariable long id) {
        try {
            adRepository.deleteById(id);
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }





}
