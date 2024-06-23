import React, { useState, useEffect } from 'react';
import { Image, Card, Form, Input, Select,Icon } from 'semantic-ui-react'
import { Link, useNavigate } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Search from '../Search'
import './homePageCSS.css';
import { useSelector } from 'react-redux';


const category = [
    { key: 'ca', text: 'Catering', value: 'Catering' },
    { key: 's', text: 'Singers', value: 'Singers' },
    { key: 'p', text: 'photographers', value: 'photographers' },
    { key: 'h', text: 'Halls', value: 'Halls' },
    { key: 'e', text: 'Event Design', value: 'Event Design' },
    { key: 'm', text: "Men's event clothes", value: "Men's event clothes" },
    { key: 'w', text: "Women's event clothes", value: "Women's event clothes" },
    { key: 'ce', text: "Children's event clothes", value: "Children's event clothes" },
];

const area = [
    { key: 'no', text: 'North', value: 'North' },
    { key: 'so', text: 'South', value: 'South' },
    { key: 'ce', text: 'Central', value: 'Central' },
];

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


export default function HomePage() {

    const nav = useNavigate();

    const [isSearch, setIsSearch] = useState(false)
    const [scroll, setScroll] = useState(0);
    const [width, setWidth] = useState(window.innerWidth);
    const [isopen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        area: '',
        category: '',
        free: '',
    });

    useEffect(() => {
        const handleScroll = () => {
            setScroll(window.scrollY);
            setWidth(window.innerWidth);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        setIsSearch(false)
    }, [formData])

    const handleChange = (e, { name, value, checked, control }) => {
        const newValue = control === 'Select' ? checked : value;
        setFormData((prevData) => ({ ...prevData, [name]: newValue }));
        console.log(formData);

    };

    const openModal = () => {
        setIsOpen(true);
    };

    const handleSubmit = () => {
        console.log('Form submitted:', formData);
        setIsSearch(true);
    };

    const ads = useSelector((state) => state.ad.listAds);
    const adsCopy = ads.slice();

    adsCopy.sort((ad1, ad2) => new Date(ad2.uploadDate) - new Date(ad1.uploadDate));
    const latestFiveAds = adsCopy.slice(0, 5);
    // console.log(latestFiveAds);


    return (
        <nav style={{ paddingTop: "6%" }}>
            <section id="one">
                <div className="content" style={{ maxHeight: "10%" }}>
                    <div className="text-content">
                        <h1 className="white"><strong>Cheers -</strong>
                            <p>and your event is ready</p>
                        </h1>
                        <h4 className="blackish">We offer special services for special event!</h4>
                        <div className="two-button">
                            <button onClick={() => nav('/About')} className="t-btn btn">About Us</button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="goblack">
                <br />
                <br />

                <div style={{ textAlign: "center" }} >
                    <Form onSubmit={handleSubmit} className="searchForm">
                        <Form.Group widths='equal' className="searchForm">
                            <Form.Field
                                control={Input}
                                label='free Search'
                                placeholder='Enter a letter / word / sentence to search'
                                name='free'
                                value={formData.free}
                                onChange={handleChange}
                            />
                            <Form.Field
                                control={Select}
                                label='area'
                                options={area}
                                placeholder='Search By Area'
                                name='area'
                                value={formData.area}
                                onChange={handleChange}
                            />
                            <Form.Field
                                control={Select}
                                label='Category'
                                options={category}
                                placeholder='Search By Category'
                                name='category'
                                value={formData.category}
                                onChange={handleChange}
                            />
                            <button onClick={handleSubmit} style={{border:"none",background: "none",paddingTop:"2%"}}><Icon name='search' inverted circular link /></button>
                        </Form.Group>
                    </Form>
                </div>

                {isSearch ? <Search form={formData}></Search> : <></>}
                <br></br>
                <div className="heading ">
                    <h1>The new ads</h1>
                    <p className="lightblack">The newest ads are presented to you</p>
                </div>
                <br />
                <br />
                <Slider {...settings}>
                    {latestFiveAds && latestFiveAds.map((item) =>
                        <div style={{ padding: '2vw' }} key={item.id}>
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
                <br />
                <br />
            </section>

            <section id="gallery">
                <div className="heading ">
                    <h1>Our Gallery</h1>
                    <p className="lightblack">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque,
                        eaque ipsa quae ab illo inventore.</p>

                </div>
                <div className="gallery__container">
                    <div className="first__row row">
                        <span><img className="shine" src="./public/images/galleryHomePage/gallery8.jpg" alt="" /></span>
                        <span><img src="./public/images/galleryHomePage/gallery1.jpg" style={{ width: "280px" }} /></span>
                        <span><img src="./public/images/galleryHomePage/gallery5.jpg" style={{ width: "580px" }} /></span>
                        <span><img src="./public/images/galleryHomePage/gallery4.jpg" style={{ width: "220px" }} /></span>

                    </div>
                    <div className="second__row row">
                        <div className="first__column">
                            <span><img src="./public/images/galleryHomePage/gallery7.jpg" alt="" /></span>
                        </div>
                        <span className="big__image">
                            <img src="./public/images/galleryHomePage/gallery3.jpg" alt="" />
                        </span>
                        <div className="first__column">
                            <span><img src="./public/images/galleryHomePage/gallery2.jpg" alt="" /></span>
                            <span><img src="./public/images/galleryHomePage/gallery9.jpg" alt="" /></span>
                        </div>
                    </div>
                </div>

            </section>
            <br /><br /><br />
            <section id="five" className="goblack">
                <div className="dog__image"><img src="./public/images/galleryHomePage/Angeles2.jpg" alt="" /></div>
                <div className="dog__container">
                    <div className="dog__boxes">
                        <div className="dog__box" style={{ paddingLeft: "8%" }}>
                            <span><i className="star icon"></i></span>
                            <h4>for your event</h4>
                            <p>Choose the best - choose Cheers.</p>
                        </div>
                        <div className="dog__box">
                            <span><i className="star up icon"></i></span>
                            <h4>at your event</h4>
                            <p>Rest assured that everything will be done for the best.</p>
                        </div>
                    </div>
                    <div className="dog__boxes">
                        <div className="dog__box" style={{ paddingLeft: "8%" }}>
                            <span><i className="star up icon"></i></span>
                            <h4>your event</h4>
                            <p>will be the most beautiful.</p>
                        </div>
                        <div className="dog__box">
                            <span><i className="star up icon"></i></span>
                            <h4>about your event</h4>
                            <p>Everyone will be talking enthusiastically.</p>
                        </div>
                    </div>
                </div>

            </section>

            <section id="six">
                <h1 className="white">Business owner? Not registered yet?</h1>
                <h2>Register now and bring new customers to your business!</h2>

                <div className="two-button">
                    <button onClick={() => nav('/SignUp')} className="t-btn btn">Sign Up</button>
                </div>

            </section>
            <br></br>

        </nav>
    )
};