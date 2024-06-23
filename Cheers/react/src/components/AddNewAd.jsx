import React, { useState } from "react";
import axios from "axios";
import { Button, Checkbox, Form, Input, Radio, Select, TextArea, Image } from 'semantic-ui-react'
import '../styleSheet.css';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const options = [
  { id: 1, text: 'Catering', value: { id: '1', name: 'Catering' } },
  { id: 7, text: 'Singers', value: { id: '7', name: 'Singers' } },
  { id: 8, text: 'Photographers', value: { id: '8', name: 'Photographers' } },
  { id: 5, text: 'Event Design', value: { id: '5', name: 'Event Design' } },
  { id: 6, text: 'Halls', value: { id: '6', name: 'Halls' } },
  { id: 2, text: "Men's event clothes", value: { id: '2', name: "Men's event clothes" } },
  { id: 3, text: "Women's event clothes", value: { id: '3', name: "Women's event clothes" } },
  { id: 4, text: "Children's event clothes", value: { id: '4', name: "Children's event clothes" } },
];


export default function AddNewAd() {

  const dispatch = useDispatch();
  const nav = useNavigate();
  const currentUser = useSelector((state) => state.user.user)
  const [images, setImages] = useState([]);
  const [ad, setAd] = useState({
    id: 0,
    image: '',
    title: '',
    dateUpload: new Date(),
    address: '',
    area: '',
    mail: '',
    link: '',
    content: '',
    // agree: false,
    // love: false,
    phone: '',
    score: 0,
    advertiserId: currentUser.id,
    category: { id: '', name: '' }
  });

  const addAdFromClient = () => {
    console.log('ad :', ad);
    console.log("image: ", images);
    dispatch({
      type: 'ADD_AD',
      payload: { ad: ad, image: images }
    })
    nav('/HomePage')
  }

  const handleImageUpload = (event) => {
    const file = event.target.files;
    console.log("the images is: ",file);
    setImages(file)
  };

  const handleChange = (e, { name, value, checked, type }) => {
    const newValue = type === 'checkbox' ? checked : value;
    setAd((prevData) => ({ ...prevData, [name]: newValue }));
  };

  const handleChangeCategory = (e, { name, value, checked, type }) => {
    const newValue = type === 'checkbox' ? checked : value;
    setAd((prevData) => ({ ...prevData, [name]: { id: newValue.id, name: newValue.name } }));
  };


  return (
    <>
      <br /><br /><br /><br /><br /><br />
      <div style={{ display: "flex" }}>
        <Form onSubmit={addAdFromClient} className="form2">
          <Form.Group widths='equal'>
            <Form.Field
              control={Input}
              label='Name'
              placeholder='Name'
              name='title'
              value={ad.title}
              onChange={handleChange}
              required
            />
            <Form.Field
              control={Input}
              label='Address'
              placeholder='Address'
              name='address'
              value={ad.address}
              onChange={handleChange}
              required
            />
            <Form.Field
              control={Select}
              label='Category'
              options={options}
              placeholder='Category'
              name='category'
              value={ad.category}
              onChange={handleChangeCategory}
              required
            />
          </Form.Group>
          <Form.Group inline>
            <label >Area: </label>
            <Form.Field
              control={Radio}
              label='Central'
              name='area'
              value='1'
              checked={ad.area === '1'}
              onChange={handleChange}
            />
            <Form.Field
              control={Radio}
              label='South'
              name='area'
              value='2'
              checked={ad.area === '2'}
              onChange={handleChange}
            />
            <Form.Field
              control={Radio}
              label='North'
              name='area'
              value='3'
              checked={ad.area === '3'}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field
              control={Input}
              label={<i className="envelope icon">mail </i>}
              placeholder='Mail'
              name='mail'
              value={ad.mail}
              onChange={handleChange}
              required
            />
            <Form.Field
              control={Input}
              label={<i className="world icon">link</i>}
              placeholder='Link to your website'
              name='link'
              value={ad.link}
              onChange={handleChange}
              required
            />
            <Form.Field
              control={Input}
              label={<i className="phone icon">Phone</i>}
              placeholder='Your number phone'
              name='phone'
              value={ad.phone}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Field
            control={TextArea}
            label="Description"
            placeholder='Briefly describe the business...'
            name='content'
            value={ad.content}
            onChange={handleChange}
            required
          />

          <br></br>
          <h3>add image</h3>
          <Image.Group size='tiny'>
            <Button animated='fade' style={{ border: '1px solid black', borderRadius: '4px', margin: '4px', padding: '27px', width: '70px' }}>
              <Button.Content visible>
                <i className="upload icon" />
              </Button.Content>

              <Button.Content hidden>Add Images</Button.Content>
              <input name="image" type="file" multiple accept="image/*" onChange={handleImageUpload} className="input-upload-img"></input>
            </Button>
            {/* {images && images.map((img) => (<Image src={img} style={{ border: '1px solid black', borderRadius: '4px', margin: '4px', padding: '4px' }} />))} */}
          </Image.Group><br></br>
          <Form.Field control={Button} >Submit</Form.Field>
        </Form>
        <div className="txt">Add <br />your<br /> Ad</div>
      </div>
    </>
  );
};