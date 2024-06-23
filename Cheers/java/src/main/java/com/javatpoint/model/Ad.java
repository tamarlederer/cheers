package com.javatpoint.model;


import javax.persistence.*;
import java.time.LocalDate;
@Entity
//טבלת מודעות
@Table(name = "ad")
public class Ad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String content;
    private String image;
    private LocalDate dateUpload;
    private String area;
    private String address;
    private String link;
    private String phone;
    private String mail;
    private boolean love;
    private int score;
    private int advertiserId;
    @ManyToOne
    private Category category;


    public Ad(Long id, String title, String content, String image, LocalDate dateUpload, String area, String address, String link, String phone, String mail, boolean love, int score, int advertiserId, Category category) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.image = image;
        this.dateUpload = dateUpload;
        this.area = area;
        this.address = address;
        this.link = link;
        this.phone = phone;
        this.mail = mail;
        this.love = love;//לשימוש עתידי
        this.score = score;
        this.advertiserId = advertiserId;
        this.category = category;
    }

    public Ad() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public LocalDate getDateUpload() {
        return dateUpload;
    }

    public void setDateUpload(LocalDate dateUpload) {
        this.dateUpload = dateUpload;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public boolean isLove() {
        return love;
    }

    public void setLove(boolean love) {
        this.love = love;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public int getAdvertiserId() {
        return advertiserId;
    }

    public void setAdvertiserId(int advertiserId) {
        this.advertiserId = advertiserId;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }


}
