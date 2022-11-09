import React from 'react';
import {connect} from 'react-redux'
import {ENGLISH} from "../../redux/Settings-reducer";
import PlaylistItem from "../../elements/Playlist/Playlist-Item";
import {NotFound} from "../../Img-bundle";
import {getLanguage,getTracks} from "../../redux/Selectors";

let SearchPlaylist = ({Playlist,isFetching,Language, AllTracks})=>{
    let BeatsList = Playlist.map(beat => <PlaylistItem
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
    for (let i = 0; i < Playlist.length; i++) {BeatsListLoad.push(<PlaylistItem load key = {i} id={i}/>)}

        return (
            <div className="playlist">
                <div className="playlist__container max-layout-width">
                    {Playlist.length==0&&AllTracks.length!==0?<div className='empty-result'>
                            <div className='title-min'>Oops, we didn't find anything on your request</div>
                            <img src={NotFound} alt=""/>
                            <div className='title-min'>Ohhh, Sorry :(</div>
                    </div>:
                        <>
                            <ul className="playlist__basis">
                                <li className="playlist__li">
                                    <span className="playlist__title">{Language == ENGLISH ? "TITLE" : "НАЗВАНИЕ"}</span>
                                    <span className="playlist__time">{Language == ENGLISH ? "TIME" : "ВРЕМЯ"}</span>
                                    <span className="playlist__bpm">BPM</span>
                                    <span className="playlist__tags">{Language == ENGLISH ? "TAGS" : "ТЕГИ"}</span>
                                    <span className="playlist__sale"></span>
                                </li>
                            </ul>
                            <ul className="main-playlist">
                                {isFetching ? BeatsListLoad : BeatsList}
                            </ul>
                        </>}
                </div>
            </div>
        );

    };

const mapStateToProps = state =>({
    Language: getLanguage(state),
    AllTracks: getTracks(state)
})

export default connect (mapStateToProps, null)(SearchPlaylist);