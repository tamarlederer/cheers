import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Footer() {
    const nav = useNavigate();
    return (
        <>
            <div className='Footer'>
                <img src="/public/images/logoNew.png" style={{width:70}}/>
                <h4>©️ 2023 cherrs</h4>
                <h4>codeing with love by noa & tamar❤️</h4>
                <button className='Footer-button' onClick={() => { nav('About') }}>
                    About
                </button>

            </div>
        </>
    )
}