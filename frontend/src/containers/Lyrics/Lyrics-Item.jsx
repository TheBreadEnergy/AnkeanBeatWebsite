import React from 'react';
import {connect} from "react-redux";
import {SetIdLyrics, SetViewLyrics} from "../../redux/Lyrics-reducer";
import {ENGLISH} from "../../redux/Settings-reducer";
import {UserText} from "../../Img-bundle";


function LyricsItem({text,id,cover,title,SetViewLyrics,Settings,SetIdLyrics}) {

    let LyricsText=text
    if(LyricsText.length>130){
        LyricsText=`${text.substr(0,130)}...`
    }
    return (
        <li className='lyrics__item item' id={id}>

                    <div className="item__track-icon"><img src={cover} alt='icon'/></div>
                    <div to={`/beat/${id}`} className="item__track-name-lyrics ">
                        <div className="track-name-lyrics__name"> {title}</div>
                        <div className="track-name-lyrics__lyrics">{LyricsText}</div>
                    </div>

                <div className="item__buttons-block buttons-block">
                    <button className='button-buy' type="submit" onClick={()=>(document.body.style.overflowY = "hidden",SetIdLyrics(id),SetViewLyrics('large'))}>
                        <img src={UserText} alt="" className='lyrics-button'/> <span>{Settings.language==ENGLISH?'VIEW LYRICS':'ОТКРЫТЬ'}</span></button>
                </div>
                <div className="item__border-track"/>
        </li>

    );
}


export default connect(null, {SetViewLyrics,SetIdLyrics})  (LyricsItem) ;