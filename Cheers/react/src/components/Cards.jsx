import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Header, Image, Card, Icon, Button, Rating } from 'semantic-ui-react'
import { useSelector } from "react-redux";
import '../styleSheet.css'
import { useLocation } from 'react-router-dom';

export default function Cards() {
    const location = useLocation();
    //המיקום לוקח את הקוד זיהוי של המודעות 
    //nav("/Cards", { state: { id: 1 } })} 'דוג:
    const id = location.state.id;
    console.log(id)
    // const [rating, setRating] = useState({ rating: 0, maxRating: 5 });
    const nav = useNavigate();
    const handleRate = (e, { rating, maxRating }) => {
        setRating({ rating: rating, maxRating: maxRating })
    }

    const [data, setData] = useState('');
    //הסלקטור פונה לסטור. ad הוא מהסטור
    //ומהסטור הוא הולך לרדוסר המתאים ומשם לוקח את המשתנה המבוקש
    const ads = useSelector((state) => state.ad.listAds)
    //סינון כל המודעות שקיבלנו בעזרת הסלקטור למודעה לפי הקוד זיהוי שחילצנו ע"י המיקום
    const myAds = ads.filter(ad => ad.category.id == id);
    return (
        <>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', margin: '3vw'}} >
            {myAds.map((item) =>
                <div style={{ padding: '2vw', }}>
                    <Card key={item.id}
                        style={{ transition: 'transform 0.3s', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                        onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                        onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                        onClick={() => nav('/Ad', { state: { ad: { item } } })}
                        
                    >
                        <img src={`data:image/*;base64,${item.image[0]}`} style={{ maxHeight:"100%",maxWidth:"290px"}}/>
                        <Card.Content>
                            <Card.Header>{item.title}</Card.Header>
                            <Card.Meta>
                                <span className='date'>{item.dateUpload}</span>
                            </Card.Meta>
                            <Card.Description>
                                {item.content}
                                
                                {/* <br /><br />
                                <Rating maxRating={5} onClick={handleRate} />
                                <br></br> */}
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                        </Card.Content>
                    </Card>
                </div>
            )}
        </div>
        </>
    )
}