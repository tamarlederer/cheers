import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Form.css';

const SignIn = (props) => {

  const nav = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({ id: 0, mail: "", password: "", userName: "", status: "", image: "C:\Users\noa\Desktop\תמונות\emptyUserLgo.jpg", adLove: null });
  
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSignIn = () => {
    if (isPasswordValid(user.password) &&
      isEmailValid(user.mail)) {

      axios.post('http://localhost:8585/api/users/signIn', user)
        .then((response) => {
          console.log('response.data', response.data);
          console.log('response.status', response.status);
          dispatch({ type: 'POST_USER_IN', payload: user })
          // nav('./Profile')
          alert("you connected :)")

        })
        .catch((error) => {
          if (error.status == 409) {
            console.log("User exist", error.status);
            alert("The email or password does not match")
          }
          else
            alert("User does not exist, Sign up.")
        });
    }

    else {
      alert("invalid mail or password")
    }
  };

  const userChange = (e) => {
    setUser((prevUser) => ({ ...prevUser, [e.target.name]: e.target.value }));
  }

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
      <h1 className='title-logIn'>Sign In</h1><br />
      <br/><br/>
      <form>
      <label ><h3><i className="envelope icon"></i>Email</h3></label>
        <input
          type="email"
          value={user.mail}
          name='mail'
          placeholder="Enter Email"
          className="Form-control"
          onChange={(e) => userChange(e)}
        /><br/><br/>

        <label>
          <h3><i
            className={showPassword ? 'eye icon' : 'eye slash icon'}
            onClick={handleTogglePassword}
            style={{ cursor: 'pointer' }}
          ></i>Password</h3></label>

        <input
          type={showPassword ? 'text' : 'password'}
          name='password'
          value={user.password}
          placeholder="Enter Password"
          className="Form-control"
          onChange={(e) => { userChange(e) }}
        />

        <br /><br /><br /><br /><br /><br />
        {/* <span><input type="checkbox" id="check" />
          <label htmlFor="check" > Remember me</label></span> */}
        <button type="button" onClick={handleSignIn}>
          Sign In
        </button><br />
        <p className='dir-rtl'>
          Don't have an account ?
          <Link onClick={props.handleSignUpOpen}>Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;

