import React from 'react';
import {Button,PlaylistItem} from "../../File-bundle";
import {connect} from 'react-redux'
import {GetPlaylist} from "../../redux/PlayList-reducer";
import {ENGLISH} from "../../redux/Settings-reducer";
import {getLanguage, getTracks} from "../../redux/Selectors";

let Playlist = ({Playlist,isFetching,language})=>{

        let state = Playlist
        let BeatsList = state.slice(0,10).map(beat => <PlaylistItem
            key = {[beat.id]}
            name = {beat.title}
            id = {beat.id}
            time = {beat.time}
            bpm = {beat.bpm}
            tag = {beat.tag}
            price = {beat.mp3Price}
            cover = {beat.cover}
            link = {beat.link}
            beat = {beat.beat}
        />)
    let BeatsListLoad=[]
    for (let i = 0; i < 10; i++) {
      BeatsListLoad.push(<PlaylistItem load key={i} id={i}/>)
    }

        return (
            <>
                <section className="playlist">
                    <div className="playlist__container max-layout-width">
                        <ul className="playlist__basis">
                            <li className="playlist__li">
                                <span className="playlist__title">{language == ENGLISH ? "TITLE" : "НАЗВАНИЕ"}</span>
                                <span className="playlist__time">{language == ENGLISH ? "TIME" : "ВРЕМЯ"}</span>
                                <span className="playlist__bpm">BPM</span>
                                <span className="playlist__tags">{language == ENGLISH ? "TAGS" : "ТЕГИ"}</span>
                                <span className="playlist__sale"></span>
                            </li>
                        </ul>
                        <ul className="main-playlist">
                            {isFetching ? BeatsListLoad : BeatsList}
                        </ul>
                        <Button allTrack
                                type="submit">{language == ENGLISH ? "BROWSE ALL TRACK" : "ПРОСМОТРЕТЬ БОЛЬШЕ"}</Button>
                    </div>
                </section>
            </>
        );

    };

const mapStateToProps = state =>({
    Playlist: getTracks(state),
    language: getLanguage(state)
})

export default connect (mapStateToProps, {GetPlaylist})(Playlist);

