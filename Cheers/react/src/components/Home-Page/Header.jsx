import React, { Component } from 'react'
import { Menu, Segment, Popup, Dropdown, Button, Modal } from 'semantic-ui-react'
import { Icon, Input } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Cards from '../Cards';
import SignIn from '../Sign/SignIn';
import SignUp from '../Sign/SignUp';
import { useSelector } from 'react-redux';
import NoConnect from '../NoConnect';

export default function Header() {

  const nav = useNavigate();

  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [openNoConnect, setOpenNoConnect] = useState(false)

  const handleSignInOpen = () => {
    setIsSignInOpen(true);
    setIsSignUpOpen(false);
  };

  const handleSignUpOpen = () => {
    setIsSignUpOpen(true);
    setIsSignInOpen(false);
  };

  const handleCloseModals = () => {
    setIsSignInOpen(false);
    setIsSignUpOpen(false);
  };

  const user = useSelector((state) => state.user.user)
  // const pause = (milliseconds) => {
  //   return new Promise(resolve => setTimeout(resolve, milliseconds));
  // };
  // const funcP = async () => {
  //   await pause(500);
  // }
  // funcP()

  console.log("user:", user)

  return (
    <div style={{ position: "fixed", width: "100%", zIndex: "10000000" }}>
      <Segment inverted>
        <Menu inverted pointing secondary>
          <Menu.Item
            style={{ paddingLeft: "7%" }}
          />
          <Menu.Item
            name='About'
            onClick={() => { nav('About') }}
          />

          <Menu.Item
            name='Profile'
            onClick={() => { user != null ? nav('Profile') : setOpenNoConnect(true) }}
          >
            <i className="user icon" ></i>
            Profile
          </Menu.Item>

          <Menu.Item>
            <Dropdown placeholder='Categories' >
              <Dropdown.Menu key={1}>
                <Menu.Item
                  name='Catering'
                  onClick={() => nav("/Cards", { state: { id: 1 } })}
                />
                <Menu.Item>
                  <Dropdown text='Event Clothes'>
                    <Dropdown.Menu key={2}>
                      <Menu.Item
                        name='Man'
                        onClick={() => nav("./Cards", { state: { id: 2 } })}
                      />
                      <Menu.Item
                        name='Woman'
                        onClick={() => nav("./Cards", { state: { id: 3 } })}
                      />
                      <Menu.Item
                        name='Children'
                        onClick={() => { nav('./Cards', { state: { id: 4 } }) }}
                      />
                    </Dropdown.Menu>
                  </Dropdown>
                </Menu.Item>
                <Menu.Item
                  name='Event Design'
                  onClick={() => nav("./Cards", { state: { id: 5 } })}
                />
                <Menu.Item
                  name='Halls'
                  onClick={() => nav("./Cards", { state: { id: 6 } })}
                />
                <Menu.Item
                  name='Singers'
                  onClick={() => nav("./Cards", { state: { id: 7 } })}
                />
                <Menu.Item
                  name='Video Pictures'
                  onClick={() => nav("./Cards", { state: { id: 8 } })}
                />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
          <Menu.Menu position='right'>
            <Button.Group size='large'>
              <Button onClick={handleSignInOpen}>Sign In</Button>
              <Button.Or />
              <Button onClick={handleSignUpOpen}>Sign Up</Button>
              <Modal
                open={isSignUpOpen || isSignInOpen}
                onClose={handleCloseModals}
                header={isSignUpOpen ? <SignUp handleSignInOpen={handleSignInOpen} /> : (isSignInOpen ? <SignIn handleSignUpOpen={handleSignUpOpen} /> : <></>)}
                style={{ width: "27%", height: "97%" }}
              />
            </Button.Group>
          </Menu.Menu>
        </Menu>

      </Segment>

      <img
        src="/public/images/logoNew.png"
        alt="logo"
        style={{ height: '120px', paddingLeft: '1%', marginTop: "-6%", position: "fixed" }}
        onClick={() => nav("/homePage")}
      />
      <Outlet />

      {openNoConnect && <NoConnect open={openNoConnect} setOpen={setOpenNoConnect} />}

    </div>)
}

