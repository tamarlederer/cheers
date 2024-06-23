import React, { useState } from 'react';
import { Comment, Header, Form, Button, Feed, Icon, Rating } from 'semantic-ui-react';
import { Carousel } from 'react-responsive-carousel';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"
import './adStyle.css';

export default function Ad() {
  //cards -> nav('/Ad', { state: { ad: { item } } })} - מי שהביא אותנו לעמוד הזה
  const location = useLocation()
  const dispatch = useDispatch();

  const ad = location.state.ad.item;
  const user = useSelector((state) => state.user.user)//לקיחת היוזר השולט 
  const [comment, setComment] = useState({ content: '', user: user, score: 0, adId: ad.id })
  const [ratingState, setRatingState] = useState({});

  const handleRate = (e, { rating, maxRating }) => {
    console.log("rating=",rating," ,maxRating=",maxRating)
    setRatingState({ rating, maxRating });
    console.log(ratingState)
    setComment({ ...comment, score: (ratingState.maxRating - ratingState.rating + 1) })
  };

  const galleryData = ad.image

  const handleClick = () => {
    console.log("comment:", comment);
    dispatch({ type: "ADD_COMMENT", payload: comment })
    alert("Your comment has been added:)")
  }

  console.log("ad=", ad);

  const comments = useSelector((state) => state.comment.listComments)
  const myComments = comments.filter(comment => comment.adId == ad.id)

  return (
    <>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <section className="product-info">
        <div className='gallery-container'>
          <Carousel className='crsl' autoPlay infiniteLoop>
            {galleryData.map((item, index) =>
              <img style={{ height: "100%" }} key={index} src={`data:image/*;base64,${item}`} />
            )}
          </Carousel>
        </div>
        <div className="item-info-parent">
          <br /><br /><br />

          <div className="main-info">
            <h1>{ad.title}</h1>
            <hr></hr>
          </div>

          <div className="description">
            <ul>
              <br /><br />
              <li><h2>{ad.content}</h2></li>
              <br /><br />
              <li><h3><i className="marker icon"></i>{ad.address}</h3></li>
              <br />

              <li><h3><i className="linkify icon"></i>{ad.link}</h3></li>
              <br />

              <li><h3><i className="phone icon"></i>{ad.phone}</h3></li>
              <br />

              <li><h3><i className="mail icon"></i>{ad.mail}</h3></li>
            </ul>
          </div>
        </div>

      </section>

      <Comment.Group threaded>
        <Header as='h1' dividing>
          Comments
        </Header>
        <div style={{ paddingRight: "20px", marginLeft: "20px" }}>
          <Feed >
            {myComments && myComments.map((item) =>
              <Feed.Event>
                <Feed.Label>
                  {/* {funcP()}
                  <img src={item.user.image!=''?item.user.image:'./public/images/general/emptyUserLgo.jpg}'} /> */}
                  <img src={
                    item.user !== null
                      ? `data:image/*;base64,${item.user.image}`  // if user is not null, use base64-encoded image
                      : './public/images/general/emptyUserLgo.jpg'  // if user is null, use default image path
                  } />
                </Feed.Label>
                <Feed.Content>
                  <Feed.Summary>
                    <Feed.User>{item.user !== null ? item.user.userName : 'anonimus'}</Feed.User>{/* {item.user.userName} */}
                    <br></br>
                    {item.content}
                    <Feed.Date>{item.date}</Feed.Date>
                  </Feed.Summary>
                  <Feed.Meta>
                    <Feed.Like>
                      <Rating defaultRating={item.score} maxRating={5} disabled />
                    </Feed.Like>
                  </Feed.Meta>
                </Feed.Content>
              </Feed.Event>

            )}
          </Feed>
        </div>
        <Form reply>
          {/* <Rating value={comment.score} maxRating={5} onChange={(e) => setComment({ ...comment, score: e.target.value })} /> */}

          <Rating maxRating={5} onRate={handleRate} />
          {/* <pre>{JSON.stringify(ratingState, null, 2)}</pre> */}
          <Form.TextArea value={comment.content} onChange={(e) => setComment({ ...comment, content: e.target.value })} />
          <Button onClick={() => handleClick()} name='content' content='Add Reply' labelPosition='left' icon='edit' primary />
        </Form>
      </Comment.Group>
    </>
  )
}




