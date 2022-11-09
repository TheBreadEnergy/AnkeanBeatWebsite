import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import VideoBackground from '../../assets/Img/background.mp4'

function Background() {
    const [backgroundStyle,setBackgroundStyle]=useState('video-background')

    const location = useLocation();

    useEffect(()=>{
        const isSelectedRoute=location.pathname == '/contact' || location.pathname == '/beats' || location.pathname == '/lyrics' || location.pathname == '/profile'|| (location.pathname.includes('/beat/')&&location.pathname!=='/beats')||location.pathname=='/checkout'
        if (isSelectedRoute) {
            if (location.pathname == '/contact') {setBackgroundStyle('video-background video-background-contact')}
            if (location.pathname == '/beats') {setBackgroundStyle('video-background video-background-beats')}
            if (location.pathname == '/lyrics') {setBackgroundStyle('video-background video-background-lyrics')}
            if (location.pathname == '/profile') {setBackgroundStyle('video-background video-background-profile')}
            if (location.pathname.includes('/beat/')) {setBackgroundStyle('video-background video-background-beat')}
            if (location.pathname.includes('/checkout')) {setBackgroundStyle('video-background video-background-checkout')}
        }else{setBackgroundStyle('video-background')}
    },[location.pathname])

    return (
        <video className={backgroundStyle} muted={true} autoPlay={true} loop={true} disablePictureInPicture={true} playsInline>
          <source src={VideoBackground} type="video/mp4" />
        </video>
    );
}

export default Background;