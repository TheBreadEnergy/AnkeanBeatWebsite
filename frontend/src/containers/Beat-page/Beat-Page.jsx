import React from 'react';
import {connect} from "react-redux";
import {Navigate, useParams} from "react-router-dom";
import {BPM,Key,ButtonBuy,ButtonDownload,ButtonShare,preloader,Headphones,PauseIco,StartPlayIco} from '../../Img-bundle';
import {Related,Button} from "../../File-bundle";
import {SetPlayBeat} from "../../data_access_layer/PlayBarDAL";
import {getFetchInfo, getPlayBar, getTracks} from "../../redux/Selectors";


function BeatPage({tracks,togglePlayerBar,SetPlayBeat,isFetching,PlayBar}) {
    const {id} = useParams();

    let beat = tracks[id - 1]
    let tag
    if (tracks.length > 0) {
        tag = tracks[id - 1].tag.split(', ');
        if (isNaN(id) || tracks.length < id) {
            return <Navigate to='/'/>
        }
    }
    return (
        <>
            <section className='beat'>
                <div className={`beat__cover ${isFetching ? 'is-loading' : ''}`}
                     onClick={() => SetPlayBeat(id - 1)}>
                    {beat == undefined ? <img src={preloader}/> : <img src={beat.cover} alt="Cover featured track"/>}
                    <button className="beat__cover button-play" id="Button_play" disabled={isFetching}>
                        {PlayBar.playing && PlayBar.id == id - 1 ? <img src={PauseIco} alt=""/> :
                            <img src={StartPlayIco} alt=""/>}
                    </button>
                </div>
                <div className='beat__info-container'>
                    <div className='beat__title'>{beat == undefined ? 'Track name ' : beat.title}</div>
                    <div className='beat__info'>
                        <div className="beat__bpm"><img src={BPM} alt=""/> {beat == undefined ? '000' : beat.bpm} bpm
                        </div>
                        <div className="beat__genre"><img src={Key} alt=""/> {beat == undefined ? '' : beat.genre}
                        </div>
                        <div className="beat__plays-count"><img src={Headphones}
                                                                alt=""/> {beat == undefined ? '000' : beat.plays_count}
                        </div>
                    </div>

                    <div className="beat__button-block ">
                        <div className='button-block'>
                            {tracks[id - 1] == undefined || isFetching ?
                                <>
                                    <Button buyButtonLoad/>
                                    <Button sideButtonLoad/>
                                </>
                                :
                                <>
                                    <Button buy price={tracks[id - 1].mp3Price} id={id} type="submit"><img
                                        src={ButtonBuy} alt='buy'/><span>$ {tracks[id - 1].mp3Price}</span></Button>
                                    <Button download beat={tracks[id - 1].beat}>
                                        <img src={ButtonDownload}/>
                                        <span>Download</span>
                                    </Button>
                                </>
                            }
                            <Button share id={id}>
                                <img src={ButtonShare}/>
                                <span>Share</span>
                            </Button>
                        </div>
                        <div className='beat__tags' >
                            {tag == undefined ? <></> : tag.map((name, index) => <span key={`${name}__${index}`}
                                                                                       className="tag">#{name}</span>)}
                        </div>
                    </div>
                </div>
            </section>
            <Related togglePlayerBar={togglePlayerBar} id={id} tag={tag}></Related>
        </>
    );
}

const mapStateToProps = state => ({
    tracks: getTracks(state),
    isFetching: getFetchInfo(state),
    PlayBar: getPlayBar(state),
})

export default connect(mapStateToProps, {SetPlayBeat})(BeatPage);
