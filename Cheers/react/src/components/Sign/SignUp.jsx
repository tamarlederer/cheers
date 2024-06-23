import React, { useState } from 'react';
import { Image } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../Form.css';

const SignUp = (props) => {

  const dispatch = useDispatch();
  const nav = useNavigate();
  const currentUser = useSelector((state) => state.user.user)

  const [showPassword, setShowPassword] = useState(false);
  const [image, setImage] = useState(null)
  const [user, setUser] = useState({ id: 0, mail: "", password: "", userName: "", status: "", image: "", adLove: null })

  const handleSignUp = async () => {
    if (isPasswordValid(user.password) &&
      isEmailValid(user.mail)) {

      const formData = new FormData();
      formData.append("image", image)
      formData.append("user", new Blob([JSON.stringify(user)], { type: "application/json" }))
      console.log("image", image);
      axios.post('http://localhost:8585/api/users/signUp', formData)
        .then((response) => {
          console.log('response.data', response.data);
          console.log('response.status', response.status);
          dispatch({
            type: 'POST_USER_UP',
            payload: { user: user, image: image }
          })
          
          alert("Welcome❤️ ,you connected :)")
          nav('./homePage')
        })
        .catch((error) => {
          if (error.status == 409) {
            console.log("User exist", error.status);
            alert("Registered user, go to sign in.")
          }

        });
    }
    else {
      alert("invalid mail or password")
    }
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const userChange = (e) => {
    setUser((prevUser) => ({ ...prevUser, [e.target.name]: e.target.value }));
  }

  const funcImg = (e) => {
    setImage(e.target.files[0]);``
  };

  function isEmailValid(mail) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(mail);
  }

  function isPasswordValid(password) {
    // Check that the password contains at least 6 characters, letters, and numbers
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[\x21-\x7E]{6,}$/;
    return passwordRegex.test(password);
  }

  return (
    <div className="auth-form" ><br /><br />
      {/* <button type="file" id="myFile" name="filename" onChange={funcImg}>
        <Image circular src={currentUser != null ? currentUser.Image : './public/images/general/emptyUserLgo.jpg'} style={{ width: '5vw' }} />
      </button> */}
      <h1>Sign Up</h1><br />
      <form>
        <label htmlFor="image"><h3><i className="image icon"></i>add image</h3></label>
        <input type="file" id="myFile" name="filename" onChange={funcImg} />
        <label ><h3><i className="user circle icon"></i>Name</h3></label>
        <input
          type="text"
          value={user.userName}
          name='userName'
          placeholder="Enter Name"
          className="Form-control"
          onChange={(e) => userChange(e)}
        /><br />
        <label ><h3><i className="envelope icon"></i>Email</h3></label>
        <input
          type="email"
          value={user.mail}
          name='mail'
          placeholder="Enter Email"
          className="Form-control"
          onChange={(e) => userChange(e)}
        />
        <br />
        <label>
          <h3><i
            className={showPassword ? 'eye icon' : 'eye slash icon'}
            onClick={handleTogglePassword}
            style={{ cursor: 'pointer' }}
          ></i>Password</h3></label>
        <input

          type={showPassword ? 'text' : 'password'}
          value={user.password}
          name='password'
          placeholder="Enter Password"
          className="Form-control"
          onChange={(e) => userChange(e)}
        />
        <br /><br />

        <button type="button" onClick={handleSignUp}>
          Sign Up
        </button>
        <br />
        <p className='dir-rtl'>
          Already Registerd?
          <Link onClick={props.handleSignInOpen}>Sign In</Link>
        </p>


      </form>
    </div>
  );
};

export default SignUp;