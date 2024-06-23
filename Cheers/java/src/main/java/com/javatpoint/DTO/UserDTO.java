package com.javatpoint.DTO;

import com.javatpoint.model.Ad;
import java.util.List;

public class UserDTO {

    private Long id;
    private String mail;
    private String password;
    private String userName;
    private int status;
    private String image;
    //private List<Ad> adLove;

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

    //public List<Ad> getAdLove() {
   //     return adLove;
    //}

    //public void setAdLove(List<Ad> adLove) {
      //  this.adLove = adLove;
    //}
}
