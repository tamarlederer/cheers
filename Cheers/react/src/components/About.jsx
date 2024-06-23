import React, { useState, useRef } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Home-Page/homePageCSS.css';
import '../styleSheet.css';

const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  speed: 3000,
  autoplaySpeed: 3000,
  cssEase: "linear"
};

export default function About() {
  
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div className='about-page' >
      <section id="one-half" className="goblack">
        <span> <img src="./public/images/general/aboutImg.jpg" style={{ width: "130%", height: "450px", margin: 'auto', marginLeft: "-45%" }} /></span>
        <div className="half-content">
          <div className="half__text">
            <h1>About Us</h1>
            <p>Welcome to "Cheers" - the perfect destination for anyone who wanted to make
              their special holidays and events a one-time and perfect experience.</p>
          </div>
          <div className="half__boxes">
            <div className="box">
              <span href="#"><i className="calendar check icon" /></span>
              <h2>Our Mission</h2>
              <p>We are here to respond to every desire and give the perfect solutions for every event, enchant it with a unique
                charm and guarantee that it will be a holiday to remember for a lifetime.</p>
            </div>
            <div className="box">
              <span href="#"><i className="handshake outline icon" /></span>
              <h2>Our Vision</h2>
              <p>The "CHEERS" team knows how important accurate and beautiful preparation is, we are here to help you make your
                dreams come true. With our help you will make the perfect event..</p>
            </div>
          </div>
        </div>

      </section>

      <div style={{width:"100%",paddingLeft:"10%",paddingRight:"10%"}}>
        <video
          ref={videoRef}
          autoPlay
          muted={isMuted}
          controls
          style={{ width: '100%', position: "inherit" }}
        >
          <source
            src="./public/images/home-page/Promotional_video.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>

      <section id="two">
        <div className="heading "><br/><br/>
          <h1>Surfers Share</h1>
          <p className="lightblack">A few of the warm reactions of the surfers on our site</p><br />
        </div>
        <div style={{ margin: '3vw' }}>
          <Slider {...settings}>
            <div className="info">
              <div className="info__text">
                <h1>Maya A.:</h1>
                <h4>  <i className="quote left icon" />  I was very pleased with 'Cheers' service for my bat mitzvah event.
                  The website was user-friendly, and they took care of every detail. Highly recommend!       <i className="quote right icon" /></h4>
              </div>
            </div>
            <div className="info">
              <div className="info__text">
                <h1>Amit K.: </h1>
                <h4><i className="quote left icon" />  Organizing my event through 'Cheers' was a dream come true. They provided everything
                  I needed and turned the event into a unique experience. I can't thank them enough!       <i className="quote right icon" /></h4>
              </div>
            </div>
            <div className="info">
              <div className="info__text">
                <h1>Dana S.:</h1>
                <h4><i className="quote left icon" />  I chose 'Cheers' for my event, and I'm definitely coming back. They brought
                  magic to every moment and made the event truly special. Thank you so much!       <i className="quote right icon" /></h4>
              </div>
            </div>
            <div className="info">
              <div className="info__text">
                <h1>Avi and Tali R.:</h1>
                <h4><i className="quote left icon" />  Our event organization through 'Cheers' was perfect.
                  They took care of every detail and made our day wonderful. Highly recommended!       <i className="quote right icon" /></h4>
              </div>
            </div>
            <div className="info">
              <div className="info__text">
                <h1>Shira G.:</h1>
                <h4><i className="quote left icon" />  My wedding was extraordinary thanks to 'Cheers.' They took care of every
                  detail and brought creative touches to every moment. I am overjoyed!       <i className="quote right icon" /></h4>
              </div>
            </div>
            <div className="info">
              <div className="info__text">
                <h1>Nir and Maya L.:</h1>
                <h4><i className="quote left icon" />  We chose 'Cheers' for our event, and we were very satisfied.
                  The personal service and magic they brought make them the perfect choice. Thank you so much!       <i className="quote right icon" /></h4>
              </div>
            </div>
          </Slider>
        </div>
      </section>
    </div>

  )
}