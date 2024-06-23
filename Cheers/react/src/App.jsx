import { useEffect } from 'react';
import { Routes, Route, } from 'react-router-dom';
import Header from './components/Home-Page/Header';
import HomePage from './components/Home-Page/homePage';
import SignIn from './components/Sign/SignIn';
import SignUp from './components/Sign/SignUp';
import Cards from './components/Cards';
import About from './components/About';
import Profile from './components/Profile';
import Ad from './components/Ad';
import AddNewAd from './components/AddNewAd';
import Search from './components/Search';
import Footer from './components/Home-Page/Footer';
import NoConnect from './components/NoConnect';
import 'semantic-ui-css/semantic.min.css';
import { useDispatch } from 'react-redux';
import './App.css';

export default function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'GET_ADS' })
    dispatch({ type: 'GET_COMMENTS' })
  }, [])

  return (
    <>
      <Header style={{ position: "flex" }} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="SignUp" element={<SignUp />} />
        <Route path="SignIn" element={<SignIn />} />
        <Route path="HomePage" element={<HomePage />} />
        <Route path="Header" element={<Header />} />
        <Route path="Search" element={<Search />} />
        <Route path="NoConnect" element={<NoConnect />} />
        <Route path="HomePage/Ad" element={<Ad />} />
        <Route path="About" element={<About />} />
        <Route path="Profile" element={<Profile />} />
        <Route path="Ad" element={<Ad />} />
        <Route path="AddNewAd" element={<AddNewAd />} />
        <Route path="Cards" element={<Cards />} />
      </Routes>
      <footer><Footer /></footer>
    </>
  )
}


