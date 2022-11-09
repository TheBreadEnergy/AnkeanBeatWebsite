import React from 'react';
import {connect} from "react-redux";
import {LyricsItem} from "../../File-bundle";
import {NotFound} from "../../Img-bundle";
import  {SetViewLyrics} from '../../redux/Lyrics-reducer'
import {ENGLISH} from "../../redux/Settings-reducer";
import {getBeatsState, getLyrics, getSettingsState, getUserStateInfo} from "../../redux/Selectors";


function Lyrics({User,LyricsState,Beat,Settings}) {

    return (
        <section className='lyrics'>
            <div className='lyrics__container max-layout-width'>
                <div className='lyrics__title'>{Settings.language==ENGLISH?'Lyrics':'Тексты'}</div>
                {LyricsState.Lyrics.length>0?
                    LyricsState.Lyrics.map(text =><LyricsItem textArchive={LyricsState.Lyrics} id={text.id} text={text.text} cover={Beat.Playlist[text.id].cover} title={Beat.Playlist[text.id].title} Settings={Settings}/>)
                    :
                    <div className='empty-result'>
                            <div className='title-min'>Oops, empty</div>
                            <img src={NotFound} alt=""/>
                            <div className='title-min'>Write a couple of lyrics don't upset the cat :(</div>
                    </div>
                }
           </div>
        </section>
    );
}

const mapStateToProps = state =>({
    User:getUserStateInfo(state),
    Beat:getBeatsState(state),
    LyricsState: getLyrics(state),
    Settings:getSettingsState(state)
})

export default  connect (mapStateToProps, {SetViewLyrics}) (Lyrics);