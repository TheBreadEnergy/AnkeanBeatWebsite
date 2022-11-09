import React from 'react';
import {Button} from "../../File-bundle";
import {ButtonBuy,ButtonDownload,ButtonShare,PauseIco,StartPlayIco} from "../../Img-bundle";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {ENGLISH} from "../../redux/Settings-reducer";
import {SetPlayBeat} from "../../data_access_layer/PlayBarDAL";
import {getFeaturedTrack, getFetchInfo, getLanguage, getPlayingFeaturedTrack, getTracks} from "../../redux/Selectors";

function FeaturedTrack({ tracks, isFetching, language,Playing,SetPlayBeat,FeaturedTrack}) {

    return (
        <section className={`featured-track ${isFetching?'is-loading':''}`}>
                        <div className="featured-track__cover" onClick={()=>SetPlayBeat(FeaturedTrack)}>
                            {tracks[FeaturedTrack] == undefined||isFetching? <div/> :
                                <img src={tracks[FeaturedTrack].cover} alt="Cover featured track"/>}
                            <button className="featured-track__button-play" id="Button_play" disabled={isFetching}>
                                {Playing? <img src={PauseIco} alt=""/> :
                                        <img src={StartPlayIco} alt=""/>}
                            </button>
                        </div>
                        <div className="featured-track__lable">
                            <Link to={`/beat/${FeaturedTrack+1}`}>
                            <p className='featured-track__title'>{language==ENGLISH?"Featured Track":"Попуярный трек"}</p>
                            {tracks[FeaturedTrack] == undefined||isFetching?
                                <p className="featured-track__title title-medium"></p> :
                                <p className="featured-track__title title-medium">{tracks[FeaturedTrack].title}</p>}
                            </Link>
                            <div className="featured-track__tags-block tags-block">
                    {tracks[FeaturedTrack] == undefined||isFetching?
                        <><div className='tags-block__tags tag-1'/><div className='tags-block__tags tag-2'/><div className='tags-block__tags tag-3'/></>
                        : tracks[FeaturedTrack].tag.split(', ').map((name, index) => <span
                            key={`${name}__${index}`} className='tags-block__tags'>#{name}</span>)}
                    </div>
                            <div className="featured-track__buttons-block buttons-block">
                                {tracks[FeaturedTrack] == undefined||isFetching?<Button buyButtonLoad />:
                                <Button buy price={tracks[FeaturedTrack].price}  id={FeaturedTrack+1} type="submit"  ><img src={ButtonBuy} alt='buy'/><span>$ {tracks[FeaturedTrack].mp3Price}</span></Button>}
                                {tracks[FeaturedTrack] == undefined||isFetching?<Button sideButtonLoad />:<Button share id={FeaturedTrack+1}><img src={ButtonShare} alt='share'/></Button>}
                                {tracks[FeaturedTrack] == undefined||isFetching?<Button sideButtonLoad />:<Button download beat={tracks[FeaturedTrack].beat}><img src={ButtonDownload} alt='download' href={tracks[FeaturedTrack].link}/></Button>}
                            </div>
                        </div>
                </section>
    );
}

const mapStateToProps = (state) => {
    return{
    tracks: getTracks(state),
    isFetching: getFetchInfo(state),
    Playing: getPlayingFeaturedTrack(state),
    language: getLanguage(state),
    FeaturedTrack:getFeaturedTrack(state)
    }
}


export default connect(mapStateToProps, {SetPlayBeat})(FeaturedTrack);
