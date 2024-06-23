package com.javatpoint.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String mail;
    private String password;
    private String userName;
    private int status;
    private String image;
    @JsonIgnore
    @OneToMany(mappedBy = "love")
    private List<Ad> adLove;

    public User(Long id, String mail, String password,String userName, int status,String image, List<Ad> adLove) {
        this.id = id;
        this.mail = mail;
        this.password = password;
        this.userName = userName;
        this.status = status;
        this.image=image;
        this.adLove = adLove;
    }

    public User() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public List<Ad> getAdLove() {
        return adLove;
    }

    public void setAdLove(List<Ad> adLove) {
        this.adLove = adLove;
    }

}
