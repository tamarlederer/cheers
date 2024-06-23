import React,{ useState } from "react";
import { Card,} from 'semantic-ui-react'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import '../styleSheet.css'

export default function Search(props) {
    const nav=useNavigate();
    const [data, setData] = useState('');

    const ads = useSelector((state) => state.ad.listAds)
    const myAds = ads.filter(ad => ad.category.name === props.form.category || ad.area === props.form.area || (ad.title.includes(props.form.free) && props.form.free !== "") || (ad.content.includes(props.form.free) && props.form.free !== ""));
    return (
        <div style={{
            display: 'flex', flexWrap: 'wrap', margin: '3vw'
        }} >
            {myAds.length === 0 ? (
                <img
                    src='https://cdn.dribbble.com/users/2382015/screenshots/6065978/media/8b4662f8023e4e2295f865106b5d3aa7.gif'
                    alt="No result found"
                    style={{ width: "55%", height: "500px", margin: 'auto' }}
                />

            ) :
                myAds.map((item) =>
                    <div style={{ padding: '2vw', }}>
                        
                            <Card key={item.id}
                                style={{ transition: 'transform 0.3s', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                                onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                                onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')} 
                                onClick={()=>nav('Ad',{state:{ad:{item}}})}
                                >
                                <img src={`data:image/*;base64,${item.image[0]}`} />
                                <Card.Content>
                                    <Card.Header>{item.title}</Card.Header>
                                    <Card.Meta>
                                        <span className='date'>{item.dateUpload}</span>
                                    </Card.Meta>
                                    <Card.Description>
                                        {item.content}
                                        <br></br>
                                        <br></br><i class="marker icon"></i>{item.address}
                                        <br></br><i class="mail icon"></i>{item.mail}
                                        <br></br><i class="linkify icon"></i>{item.link}
                                        <br></br>
                                        <div style={{ textAlign: "center", paddingTop: "3vh" }}>
                                        </div>
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                </Card.Content>
                            </Card>
                    </div>
                )}
        </div>

    )
}