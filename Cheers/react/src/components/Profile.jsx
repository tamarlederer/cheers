import React from "react";
import { useSelector } from "react-redux";
import { Outlet, } from "react-router-dom";
import { Header, Image, Card, Button, Form, TextArea } from 'semantic-ui-react'

import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import '../styleSheet.css';
import emailjs from '@emailjs/browser';

const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
    cssEase: "linear"
}

export default function Profile() {

    const nav = useNavigate();

    const currentUser = useSelector((state) => state.user.user)

    const pause = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    };
    const funcP = async () => {
        await pause(500);
    }
    funcP()

    console.log("user", currentUser)
    const ads = useSelector((state) => state.ad.listAds)
    const myAds = ads.filter(ad => ad.advertiserId === currentUser.id)
    console.log('currentUser', currentUser);
    console.log(currentUser.image);

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm("service_wgepzc6", "template_8dujvwb", e.target, 'uV-3y4zoM-OkPdn-A')
        alert("submitted");
    }

    return (
        <>
            <div style={{ paddingTop: '90px' }}>
                <Header as='h1' style={{ marginRight: '5vw' }} textAlign="center">
                    <Image  src={`data:image/*;base64,${currentUser.image}`}
                        onError={(e) => { e.target.src = './public/images/general/emptyUserLgo.jpg' }}
                        style={{ width: '8%' ,borderRadius: '100%'}} />
                    {currentUser != null ? <p>{currentUser.userName}</p> : <p>userName upload</p>}
                </Header>

                <Header as='h3' textAlign="center" >
                    <span style={{ marginRight: '5vw' }}><i className="mail icon"></i>{currentUser.mail}</span>
                </Header>
                <div style={{ paddingLeft: "43%", paddingTop: "1%" }}>
                    <Button animated='fade' onClick={() => nav('/AddNewAd')} color="black">
                        <Button.Content visible>Add a new ad</Button.Content>
                        <Button.Content hidden><i className="plus icon"></i></Button.Content>
                    </Button>
                </div>
                <h3> My ads: <i className="address book icon" /></h3>
                <hr></hr>

                {/* <div style={{ margin: '3vw' }}> */}
                <Slider {...settings}>
                    {myAds && myAds.map((item) =>
                    
                        <div style={{ padding: '2vw', }} key={item.id}>
                            <Card key={item.id}
                                style={{ transition: 'transform 0.3s', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                                onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                                onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                                onClick={() => nav('/Ad', { state: { ad: { item } } })}
                            >
                                <img src={`data:image/*;base64,${item.image[0]}`} style={{ maxHeight: "100%", maxWidth: "290px" }} />
                                <Card.Content>
                                    <Card.Header>{item.title}</Card.Header>
                                    <Card.Meta>
                                        <span className='date'>{item.dateUpload}</span>
                                    </Card.Meta>
                                    <Card.Description>
                                        {item.content}
                                        <br></br>
                                        <br></br><i className="marker icon"></i>{item.address}
                                        <br></br><i className="mail icon"></i>{item.mail}
                                        <br></br><i className="linkify icon"></i>{item.link}
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                </Card.Content>
                            </Card>
                        </div>
                    )}
                </Slider>
                {/* </div> */}

                <div style={{paddingTop:"5%",paddingBottom:"5%",paddingLeft:"40%"}}>
                    <span><h3>Enjoy using the site? Send us a feedback 😊</h3></span>
                    <br />
                    <form onSubmit={sendEmail}>
                        <label><h3>From Email:  </h3></label>
                        <input
                            type="email"
                            name="email_from"
                            placeholder="Enter Email"
                            className="Form-control"
                            value={currentUser.mail}
                        /><br></br>
                        <label><h3>describe:  </h3></label>
                        <Form.Field
                            control={TextArea}
                            placeholder='Your describe...'
                            name="message"
                            className="Form-control"
                        />

                        <Button animated='fade' type="submit" color="black">
                            <Button.Content visible>Send email</Button.Content>
                            <Button.Content hidden><i className="arrow right icon"></i></Button.Content>
                        </Button><br /><br />
                    </form>
                </div>
            </div>
            {/* </div> */}
            <Outlet />

        </>
    )
}