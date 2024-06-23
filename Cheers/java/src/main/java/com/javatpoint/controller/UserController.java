package com.javatpoint.controller;

import com.javatpoint.DTO.UserDTO;
import com.javatpoint.model.Ad;
import com.javatpoint.model.User;
import com.javatpoint.service.MapStructMapper;
import com.javatpoint.service.UserRepository;
import org.hibernate.annotations.Check;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

    private UserRepository userRepository;
    private MapStructMapper mapper;
    private static String UPLOAD_DIRECTORY = System.getProperty("user.dir") + "\\images\\";

    @Autowired
    public UserController(UserRepository userRepository, MapStructMapper mapper) {
        this.userRepository = userRepository;
        this.mapper = mapper;
    }

    @GetMapping("/getUsers")
    public ResponseEntity<List<User>> getUsers() {
        try {
            List<User> users = new ArrayList<>();
            userRepository.findAll().forEach(e -> users.add(e));
            return new ResponseEntity<>(users, HttpStatus.OK);
        } catch (Exception e) {
            //שגיאה 500
            System.out.println(e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getUser/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User u = userRepository.findById(id).orElse(null);
        if (u != null) {
            return new ResponseEntity<>(u, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    //ה עלאת מודעה עם תמונה
    @PostMapping("/uploadUser")
    public ResponseEntity<UserDTO> uploadUserWithImage(@RequestPart("image") MultipartFile file,
                                                    @RequestPart("user") User u) throws IOException {
        try {
            String filePath = UPLOAD_DIRECTORY + file.getOriginalFilename();
            //הולך להיות הנתיב בו נשמור את התמונה
            Path filename = Paths.get(filePath);//im.jpg
            Files.write(filename, file.getBytes());
            u.setImage(filePath);

            userRepository.save(u);
            return new ResponseEntity(mapper.userToDto(u), HttpStatus.CREATED);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/updateUser/{id}")
    public ResponseEntity<User> updateUser(@PathVariable long id, @RequestBody User u) {
        User newUser = userRepository.findById(id).orElse(null);
        if (newUser != null) {
            newUser.setAdLove(u.getAdLove());
            newUser.setUserName(u.getUserName());
            newUser.setMail(u.getMail());
            newUser.setPassword(u.getPassword());
            newUser.setStatus(u.getStatus());

            userRepository.save(newUser);
            return new ResponseEntity<>(newUser, HttpStatus.OK);

        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity deleteUser(@PathVariable long id) {
        try {
            userRepository.deleteById(id);
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/getdto/{id}")
    public ResponseEntity<UserDTO> getDTO(@PathVariable long id) throws IOException {
        User u=userRepository.findById(id).orElse(null);
        if(u!=null){
            return new ResponseEntity<>(mapper.userToDto(u),HttpStatus.OK);
        }
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/signIn")
    public ResponseEntity<UserDTO> signIn(@RequestBody User u) throws IOException {
        User user=userRepository.findByMail(u.getMail());
        System.out.println(user);
        if(user!=null && user.getPassword().equals(u.getPassword())){//mail & pass correct
            return new ResponseEntity<>(mapper.userToDto(user),HttpStatus.OK);//200
        }
        else if(user!=null){//mail correct & pass uncorrect
            return new ResponseEntity<>(null,HttpStatus.CONFLICT);//409
        }
        else
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);//404
    }


    @PostMapping("/signUp")
    public ResponseEntity<UserDTO> signUp(@RequestPart("image") MultipartFile file,
                                          @RequestPart("user") User u) throws IOException {
        User user=userRepository.findByMail(u.getMail());
        System.out.println(user);
        if(user==null ){
            String filePath = UPLOAD_DIRECTORY + file.getOriginalFilename();
            //הולך להיות הנתיב בו נשמור את התמונה
            Path filename = Paths.get(filePath);//im.jpg
            Files.write(filename, file.getBytes());
            u.setImage(filePath);

            userRepository.save(u);
            return new ResponseEntity(mapper.userToDto(u), HttpStatus.CREATED);//201
        }
        else
            return new ResponseEntity<>(null,HttpStatus.CONFLICT);//409
        }

}



