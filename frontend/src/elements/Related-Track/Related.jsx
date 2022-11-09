import React, {useEffect, useState} from 'react';
import {Button,PlaylistItem} from "../../File-bundle";
import {preloader} from "../../Img-bundle";
import {connect} from 'react-redux'
import {GetPlaylist} from "../../redux/PlayList-reducer";
import {getFetchInfo, getTracks} from "../../redux/Selectors";


let Related = ({Playlist, isFetching,id, tag,SetPlayBeat})=>{
    const [related,setRelated]=useState([])

     useEffect(() => {
         setRelated([])
        if(Playlist.length!==0) {filterBeats()}
    }, [Playlist])

    useEffect(() => {
        setRelated([])
        if(Playlist.length!==0) {filterBeats()}
    }, [id])

    let filterBeats = () => {
        let relatedID=[]

        Playlist.filter(beat => {
            if (Playlist) {
                if (id == beat.id) {return}
                let beatTags = beat.tag
                tag.forEach(element => {
                    if (beatTags.toLowerCase().includes(element.toLowerCase())) {
                        if (!relatedID.includes(beat.id)) {
                            relatedID.push(beat.id)
                        }
                    }
                })
            }
        })
        if (relatedID.length < 6) {
                    for (let i = relatedID.length; i < 10; i++) {
                        Playlist.forEach(element => {
                            if (!relatedID.includes(element.id)&&element.id!== Number(id)) {
                                relatedID.push(element.id)
                            }
                        })
                    }
                }
        setRelated(relatedID)
    }

        let BeatsList =  related.map(beat => <PlaylistItem
            key = {[id,Playlist[beat-1].id]}
            name = {Playlist[beat-1].title}
            id = {Playlist[beat-1].id}
            time = {Playlist[beat-1].time}
            bpm = {Playlist[beat-1].bpm}
            tag = {Playlist[beat-1].tag}
            price = {Playlist[beat-1].mp3Price}
            cover = {Playlist[beat-1].cover}
            link = {Playlist[beat-1].link}
            beat = {Playlist[beat-1].beat}
        />)
        return (

            <section className="playlist">
                <div className="playlist__container max-layout-width">
                    <div className='Related'>RELATED TRACKS
                    </div>
                    <ul className="playlist__basis">
                        <li className="playlist__li" >
                            <span className="playlist__title">TITLE</span>
                            <span className="playlist__time">TIME</span>
                            <span className="playlist__bpm">BPM</span>
                            <span className="playlist__tags">TAGS</span>
                            <span className="playlist__sale"></span>
                        </li>
                    </ul>
                    {isFetching ? <img src={preloader}/> : null}
                    <ul className="main-playlist">
                        {Related.length>0? BeatsList: <img src={preloader}/>}
                    </ul>
                    <Button allTrack type="submit" >BROWSE ALL TRACK</Button>
                </div>
            </section>
        );

    };

const mapStateToProps = state =>({
    Playlist: getTracks(state),
    isFetching: getFetchInfo(state),
})

export default connect (mapStateToProps, {GetPlaylist})(Related);

