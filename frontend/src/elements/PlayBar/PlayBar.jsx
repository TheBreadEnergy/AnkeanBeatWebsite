import React,{useState, useRef, useEffect} from 'react';
import {Loop_ico,StartPlayIco_white,Shufle,User_text,Prev_track_ico,Next_track_ico,Pause_ico_white,ButtonBuy,Volume_up,Volume_down,Mute} from "../../Img-bundle";
import {Button,Slider,Slider_volume} from "../../File-bundle";
import {connect} from "react-redux";
import {SetStatus} from "../../redux/Lyrics-reducer";
import {SetIdBeat, SetLooped, SetPlaying} from "../../redux/PlayBar-reducer";
import {SetIdLyrics, SetViewLyrics} from "../../redux/Lyrics-reducer";
import {SelectId} from "../../redux/License-reducer";
import {SetLocalVolume, SetPlaysCount} from "../../data_access_layer/PlayBarDAL";
import {getPlayBar, getPlayBarView, getTracks,getLyrics} from "../../redux/Selectors";
import {CSSTransition} from "react-transition-group";
import {funcRandom,refactorTime} from "../../Functions";


function PlayBar({tracks,SetLooped, playBeat, PlayBar, SetStatus,SetPlaying,Lyrics,SetViewLyrics,SetIdBeat,SetIdLyrics,SelectId,SetLocalVolume,PlayBarView}) {

    const [trackProgress, setTrackProgress] = useState(0)
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [statevolum, setStateVolum] = useState(PlayBar.volume)
    const [mute, setMute] = useState(false)
    const [Random, setRandom] = useState(false)
    const [idLastTrack, setIdLastTrack] = useState(0)
    const [disabledNext,setDisabledNext] = useState(false)
    const [disabledPrev,setDisabledPrev] = useState(false)
    const [mobile,setMobile] = useState(false)

    let randomId = () => {
        let randomNumber = funcRandom(tracks.length)
        while (randomNumber == PlayBar.id) {randomNumber = funcRandom(tracks.length)}
        return randomNumber;
    }
    let Play = () => {
        let playPromise = audioRef.current.play()
        if (playPromise !== undefined) {playPromise.then(_ => {audioRef.current.play()})}
    }

    let Pause = () => {
        let pausePromise = audioRef.current.pause()
        if (pausePromise !== undefined) {pausePromise.then(_ => {audioRef.current.pause()})}
    }
    const audioRef = useRef(new Audio(tracks[PlayBar.id]!==undefined?[PlayBar.id].beat:null))

    useEffect(() => {
        if (audioRef.current&&playBeat!==undefined) {
            if (playBeat == true) {
                Play()
                SetPlaying(playBeat)
            } else {
                Pause()
                SetPlaying(playBeat)
            }

        }
    }, [playBeat])

    useEffect(() => {
        SetViewLyrics(false)
        if (audioRef.current&&PlayBar.id!==null) {
            setTrackProgress(0)
            Pause()
            audioRef.current = new Audio(tracks[PlayBar.id].beat);
            SetPlaysCount(PlayBar.id)
            audioRef.current.ontimeupdate = () => (getCurrDuration(audioRef.current.currentTime, audioRef.current.duration))
            audioRef.current.onloadeddata = () => (setDuration(audioRef.current.duration.toFixed(2)))
            audioRef.current.volume = statevolum
            Play()
            SetPlaying(true)
        }
    }, [PlayBar.id]);


    useEffect(() => {
        if(PlayBar.view){PlayBar.playing?Play():Pause();}
        }, [PlayBar.playing])


    const onChange = (e) => {
        const audio = audioRef.current
        audio.currentTime = (audio.duration / 100) * e.target.value
        setTrackProgress(e.target.value)
    }

    const onVolumeChange = (e) => {
        handleVolume(e.target.value / 100)
    }

    const getCurrDuration = (currentTime, duration) => {
        const percent = ((currentTime / duration) * 100).toFixed(2)
        const time = currentTime
        setTrackProgress(+percent)
        setCurrentTime(time.toFixed(2))
    }

    const toPrevTrack = () => {
        let ArchiveText = Lyrics.Lyrics.find(txt => txt.id === Lyrics.id)
            const isSetPrev = (currentTime / (duration / 100) < 10)
            const isSetNext = (currentTime / (duration / 100) > 10)
        if(ArchiveText==undefined){
            if(Lyrics.text!=''&&isSetPrev){return SetStatus('checkClose')}
        }
        else{
            if (ArchiveText.text!==Lyrics.text&&isSetPrev&&Lyrics.View!==false){return SetStatus('checkClose')}
        }
        setDisabledPrev(true)
        setTimeout( ()=>{setDisabledPrev(false)}, 700);
        if (!Random) {
            if (PlayBar.id - 1 < 0) {
                if (isSetNext) {
                    Pause();
                    setTrackProgress(0)
                    audioRef.current = new Audio(tracks[PlayBar.id].beat);
                    audioRef.current.ontimeupdate = () => (getCurrDuration(audioRef.current.currentTime, audioRef.current.duration))
                    audioRef.current.onloadeddata = () => (setDuration(audioRef.current.duration.toFixed(2)))
                    audioRef.current.volume = statevolum
                    Play()
                } else {
                    SetIdBeat(tracks.length - 1);
                }
            } else {
                if (isSetNext) {
                    Pause();
                    setTrackProgress(0)
                    audioRef.current = new Audio(tracks[PlayBar.id].beat);
                    audioRef.current.ontimeupdate = () => (getCurrDuration(audioRef.current.currentTime, audioRef.current.duration))
                    audioRef.current.onloadeddata = () => (setDuration(audioRef.current.duration.toFixed(2)))
                    audioRef.current.volume = statevolum
                    Play()

                } else {
                    SetIdBeat(PlayBar.id - 1);
                }
            }
        } else {
            if (isSetNext) {
                Pause();
                setTrackProgress(0)
                audioRef.current = new Audio(tracks[PlayBar.id].beat);
                audioRef.current.ontimeupdate = () => (getCurrDuration(audioRef.current.currentTime, audioRef.current.duration))
                audioRef.current.onloadeddata = () => (setDuration(audioRef.current.duration.toFixed(2)))
                audioRef.current.volume = statevolum
                Play()
            } else {
                if (PlayBar.id == idLastTrack) {
                    SetIdBeat(randomId())
                } else {
                    SetIdBeat(idLastTrack)
                }
            }
        }
    };

    const toNextTrack = () => {
        let ArchiveText = Lyrics.Lyrics.find(txt => txt.id === Lyrics.id)
        if(ArchiveText==undefined){
            if(Lyrics.text!=''){return SetStatus('checkClose')}
        }
        else{
            if (ArchiveText.text!==Lyrics.text&&Lyrics.View!==false){return SetStatus('checkClose')}
        }
        setDisabledNext(true)

        setTimeout( ()=>{setDisabledNext(false)}, 700);
        if (!Random) {
            if (PlayBar.id < tracks.length - 1) {
                SetIdBeat(PlayBar.id + 1);
            } else {
                SetIdBeat(0);
            }
        } else {
            setIdLastTrack(PlayBar.id)
            SetIdBeat(randomId())

        }
    };

    if (duration !== 0) {
        if (currentTime == duration) {
            if(PlayBar.loop){setCurrentTime(0)
            Play()
            }
            else{
                setCurrentTime(0);
                toNextTrack()
            }

        }
    }

    const handleVolume = (volume = statevolum) => {
        setStateVolum(volume)
        SetLocalVolume(volume)
        audioRef.current.volume = volume
    }

    const TypeVolume = () => {
        if (statevolum > 0.4) {return <img src={Volume_up} alt=""/>}
        else {return <img src={Volume_down} alt=""/>}
    }

    const switchVolume = () => {
        if (mute) {
            setMute(false)
            setStateVolum(PlayBar.volume)
            audioRef.current.volume = PlayBar.volume

        } else {
            setMute(true)
            setStateVolum(0)
            audioRef.current.volume = 0
        }
    }

    const ChangeColorDuration = () => {
        if (currentTime / (duration / 100) > 97.5) {return 'black'}
    }
    const ChangeColorCurrentTime = () => {
        if (currentTime / (duration / 100) > 2) {return 'black'}
    }



    function detectWindowSize() {
        if(window.innerWidth>600){
            setMobile(false);
            document.body.style.overflowY = "scroll"
        }
        else{
            if(Lyrics.View!==false){SetViewLyrics('large')}
        }
    }

    window.onresize = detectWindowSize;

    const checkMobile=()=>{
        if(window.innerWidth<600){
            document.body.style.overflowY = "hidden"
            setMobile(true)
        }

    }
    return (
        <>
            {PlayBarView ?
                <div>
                    <CSSTransition
                        in={mobile}
                        timeout={300}
                        classNames="window"
                        mountOnEnter
                        unmountOnExit
                    >
                        <div className='window'>
                            <div className='window__name'>
                                <div></div>
                                <div className='window__exit' onClick={() => {
                                    document.body.style.overflowY = "scroll";
                                    setMobile(false)
                                }}>
                                    <div className='exit-big'></div>
                                </div>
                            </div>
                            <div className='playbar-window__cover'><img src={tracks[PlayBar.id].cover} alt=""
                                                                        className="playbar-cover"/></div>
                            <div className='playbar-window__title'>
                                <div className='sub-title'>{tracks[PlayBar.id].title}</div>
                                <div className='description'>Anekan</div>
                            </div>
                            <div className='playbar-window__progress-bar'>
                                <div className='progress-bar'>
                                    <Slider percentage={trackProgress} onChange={onChange}/>
                                    <div className='time duration'>{refactorTime(duration)}</div>
                                    <div className='time current-time'>{refactorTime(currentTime)}</div>
                                </div>
                            </div>
                            <div className="playbar-window__play-control">
                                <img src={Prev_track_ico} alt=""
                                     className={`playbar-window__Prev-Track ${disabledPrev ? 'disabled' : null}`}
                                     onClick={disabledPrev ? null : toPrevTrack}/>
                                <div className='playbar-window__Play-Track'
                                     onClick={PlayBar.playing ? () => SetPlaying(false) : () => SetPlaying(true)}>
                                    {PlayBar.playing ? <img src={Pause_ico_white} className='playbar-window__Pause'
                                                            onClick={() => SetPlaying(false)}/>
                                        :
                                        <img src={StartPlayIco_white} onClick={() => SetPlaying(true)}/>}
                                </div>
                                <img src={Next_track_ico} alt=""
                                     className={`playbar-window__Next-Track ${disabledNext ? 'disabled' : null}`}
                                     onClick={disabledNext ? null : toNextTrack}/>
                                <div className={`Looped-tracks ${PlayBar.loop ? '' : 'disabled'}`}
                                     onClick={() => SetLooped(!PlayBar.loop)}><img src={Loop_ico} alt=""/></div>
                                <div className={`Random-tracks ${Random ? '' : 'disabled'}`}>
                                    <img src={Shufle} alt="" onClick={() => {
                                        setRandom(!Random)
                                    }}/>
                                </div>
                            </div>
                            <div className="playbar-window__services">
                                <div className='Write-text' onClick={() => {
                                    SetIdLyrics(PlayBar.id);
                                    SetViewLyrics(Lyrics.View == false ? 'large' : false);
                                    SetLooped(true)
                                }}><img src={User_text} alt=""/></div>
                                <div className='playbar-buy' onClick={() => {
                                    SelectId(PlayBar.id + 1);
                                    document.body.style.overflowY = "hidden";
                                    setMobile(false)
                                }}><img src={ButtonBuy} alt='buy'/></div>
                            </div>
                        </div>
                    </CSSTransition>
                    {mobile ?
                        null
                        :
                        <div className='playBar'>
                            <div className='progress-bar'>
                                <Slider percentage={trackProgress} onChange={onChange}/>
                                <div className={'time duration ' + ChangeColorDuration()}>{refactorTime(duration)}</div>
                                <div
                                    className={'time current-time ' + ChangeColorCurrentTime()}>{refactorTime(currentTime)}</div>
                            </div>

                            <div className="playBar__container max-layout-width">
                                <div className="playBar__play-control">
                                    <img src={Prev_track_ico} alt=""
                                         className={`playBar__Prev-Track ${disabledPrev ? 'disabled' : null}`}
                                         onClick={disabledPrev ? null : toPrevTrack}/>
                                    <div className='playBar__Play-Track'
                                         onClick={PlayBar.playing ? () => SetPlaying(false) : () => SetPlaying(true)}>
                                        {PlayBar.playing ? <img src={Pause_ico_white} className='playBar__container__Pause'
                                                                onClick={() => SetPlaying(false)}/> :
                                            <img src={StartPlayIco_white} onClick={() => SetPlaying(true)}/>}
                                    </div>
                                    <img src={Next_track_ico} alt=""
                                         className={`playBar__Next-Track ${disabledNext ? 'disabled' : null}`}
                                         onClick={disabledNext ? null : toNextTrack}/>


                                </div>
                                <div className="playBar__beat-info" onClick={checkMobile}>
                                    <img src={tracks[PlayBar.id].cover} alt="" className="playBar__beat-info__cover"/>
                                    <div className='playBar__beat-info__name'>
                                        <div
                                            className='playBar__beat-info__name__title'>{tracks[PlayBar.id].title}</div>
                                        <div>Anekan</div>

                                    </div>
                                    <Button buy price={tracks[PlayBar.id].price} id={PlayBar.id + 1} type="submit"><img
                                        src={ButtonBuy}
                                        alt='buy'/><span> $ {tracks[PlayBar.id].mp3Price}</span></Button>
                                    <div></div>

                                </div>
                                <div className="playBar__controls">
                                    <div className="playBar__track-control">
                                        <div className='Write-text' onClick={() => {
                                            SetIdLyrics(PlayBar.id);
                                            SetViewLyrics(Lyrics.View == false ? 'medium' : false);
                                            SetLooped(true)}}>
                                            <img src={User_text} alt=""/>
                                        </div>
                                        <div className={`Looped-tracks ${PlayBar.loop ? '' : 'disabled'}`}
                                             onClick={() => SetLooped(!PlayBar.loop)}><img src={Loop_ico} alt=""/></div>
                                        <div className={`Random-tracks ${Random ? '' : 'disabled'}`}>
                                            <img src={Shufle} alt="" onClick={() => {setRandom(!Random)}}/>
                                        </div>
                                    </div>
                                    <div className="playBar__volume-control">
                                        <Slider_volume statevolum={statevolum} onVolumeChange={onVolumeChange}/>
                                        <div className='Volume-control' onClick={switchVolume}>
                                            {statevolum == 0 ? <img src={Mute} alt=""/> : TypeVolume()}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>}
                </div> : null}
        </>
    );
}

const mapStateToProps = state => ({
    tracks: getTracks(state),
    PlayBar: getPlayBar(state),
    Lyrics: getLyrics(state),
    PlayBarView: getPlayBarView(state),
})

export default connect(mapStateToProps, {SetPlaying,SetViewLyrics,SetIdBeat,SetIdLyrics,SetLooped,SelectId,SetStatus,SetLocalVolume}) (PlayBar);