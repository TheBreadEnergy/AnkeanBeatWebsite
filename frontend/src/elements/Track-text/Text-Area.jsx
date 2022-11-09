import React, {useEffect, useRef, useState} from 'react';
import Draggable from "react-draggable";
import {exit,settings,saveIco,load,done,erorIco,size,rhymesIco,StartPlayIco_white,deleteIco} from "../../Img-bundle";
import {connect} from "react-redux";
import { SetLooped, SetPlaying} from "../../redux/PlayBar-reducer";
import {SetText,SetStatus} from "../../redux/Lyrics-reducer";
import {AddLyrics, SetViewLyrics} from "../../redux/Lyrics-reducer";
import {DeleteTrackText, SetTrackText} from "../../data_access_layer/LyricsDAL";
import SearchRhyme from "./Search-Rhyme";
import {DeleteRhymes, SetRhymeLanguage} from "../../redux/Rhyme-reducer";
import {SetPlayBeat} from "../../data_access_layer/PlayBarDAL";
import {getLyrics, getLyricsWindowSize, getPlayBar, getRhymesInfo,getTracks} from "../../redux/Selectors";
import {CSSTransition} from "react-transition-group";


function TextArea({
    Lyrics,
    tracks,
    DeleteRhymes,
    SetRhymeLanguage,
    SetTrackText,
    SetViewLyrics,
    rhyme,
    SetLooped,
    SetPlayBeat,
    PlayBar,
    DeleteTrackText,
    SetText,
    SetStatus,
    LyricsState
    })
{
    const [popupMenu, setPopupMenu] = useState(false)
    const [reSizeView, setReSizeView] = useState(false)
    const [rhymesMenuView, setRhymesMenuView] = useState(false)
    const [rhymesView, setRhymesView] = useState(false)

    const popupMenuRef = useRef();
    const popupMenuIcoRef = useRef();

    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (popupMenu && popupMenuRef.current && !popupMenuRef.current.contains(e.target) && !popupMenuIcoRef.current.contains(e.target)) {
                setPopupMenu(false)
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {document.removeEventListener("mousedown", checkIfClickedOutside)}
    }, [popupMenu])

    useEffect(() => {
        if (rhymesView == false && rhyme.length > 0) {DeleteRhymes()}
    }, [rhymesView])


    let saveText = () => {
        if (Lyrics.text != '') {
            SetTrackText(Lyrics.id, Lyrics.text)
            SetStatus('saving')
            setTimeout(() => {SetStatus('save')}, 500);
        } else {
            SetStatus('saving')
            setTimeout(() => {SetStatus('empty')}, 500);
        }
        setTimeout(() => {SetStatus('')}, 1200);
    }

    useEffect(() => {
        SetText('')
        let txt = Lyrics.Lyrics.find(txt => txt.id === Lyrics.id)
        if (txt) {SetText(txt.text)}
    }, [Lyrics.id])

    let TextBody = (e) => {
        let body = e.target.value
        SetText(body)
    }

    let TextAreaStyle = () => {
        let style
        if (LyricsState == 'medium') {
            style = 'text-medium'
        }
        if (LyricsState == 'medium' && rhymesView) {
            style = 'text-medium-search'
        }
        if (LyricsState == 'medium' && rhymesView && rhyme.length == 0) {
            style = 'text-medium-search__init'
        }
        if (LyricsState == 'small') {
            style = 'text-small'
        }
        if (LyricsState == 'small' && rhymesView) {
            style = 'text-small-search'
        }
        if (LyricsState == 'small' && rhymesView && rhyme.lengtfh == 0) {
            style = 'text-small-search__init'
        }
        return `Text-Area__text ${style}`
    }

    const CloseWindow = () => {
        let ArchiveText = Lyrics.Lyrics.find(txt => txt.id === Lyrics.id)
        if (ArchiveText == undefined) {
            if (Lyrics.text != '') {
                return SetStatus('checkClose')
            } else {
                SetViewLyrics(false);
                SetLooped(false)
            }
        } else {
            if (ArchiveText.text !== Lyrics.text) {
                return SetStatus('checkClose')
            } else {
                SetViewLyrics(false);
                SetLooped(false)
            }
        }

    }
    const saveLoader = () => {
        if (Lyrics.status == 'saving') {
            return (<><img src={load} alt=""/><span>Saving</span></>)
        }
        if (Lyrics.status == 'save') {
            return (<><img src={done} alt=""/><span>Saved</span></>)
        }
        if (Lyrics.status == 'empty') {
            return (<><img src={erorIco} alt=""/><span>Opps, empty text field</span></>)
        }
        if (Lyrics.status == 'checkClose') {
            return (
                <div className='check'>
                    <div className='check__exit' onClick={() => SetStatus('')}>
                        <div className='exit'></div>
                    </div>
                    <div className='check__title'>Save lyrics?</div>
                    <div className='check__buttons'>
                        <div onClick={() => {
                            SetStatus('');
                            saveText();
                            SetViewLyrics(false);
                            SetLooped(false)
                        }}>Yes
                        </div>
                        <div onClick={() => {
                            SetStatus('');
                            SetViewLyrics(false);
                            SetLooped(false)
                        }}>No
                        </div>
                    </div>
                </div>
            )
        }
        if (Lyrics.status == 'checkDelete') {
            return (
                <div className='check'>
                    <div className='check__exit' onClick={() => SetStatus('')}>
                        <div className='exit'></div>
                    </div>
                    <div className='check__title'>Delete lyrics?</div>
                    <div className='check__buttons'>
                        <div onClick={() => {
                            SetStatus('');
                            DeleteTrackText(Lyrics.id);
                            SetText('')
                        }}>Yes
                        </div>
                        <div onClick={() => SetStatus('')}>No</div>
                    </div>
                </div>
            )
        }
    }

    //for Draggable item
    let state = {
        activeDrags: 0,
        deltaPosition: {x: 0, y: 0},
        controlledPosition: {x: -400, y: 200}
    };
    let onStart = () => {
        state.activeDrags = ++state.activeDrags;
    };

    let onStop = () => {
        state.activeDrags = --state.activeDrags;
    };
    const dragHandlers = {onStart: onStart, onStop: onStop};

    return (
        <>
            {LyricsState !== false ?
                <>
                    {LyricsState == 'large' ?
                        <>
                            <section className='window-background' onClick={() => CloseWindow()}></section>
                            <section className='window lyrics-window'>
                                <div className='window__name'>
                                    <div>Lyrics</div>
                                    <div className='window__menu window-menu'>
                                        <div className={Lyrics.status == '' ? null : 'disabled'}>
                                            <img src={saveIco}
                                            onClick={() => Lyrics.status == '' ? saveText() : null}
                                            alt="save"/>
                                        </div>
                                        <div ref={popupMenuIcoRef}>
                                            <img src={settings}
                                            onClick={() => setPopupMenu(!popupMenu)}
                                            alt="text area settings"/>
                                        </div>
                                        <div onClick={() => {CloseWindow();document.body.style.overflowY = "scroll"}}>
                                            <img src={exit} alt="exit"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="window__container column">
                                    {rhymesView ? <SearchRhyme View={setRhymesView}/> : null}
                                    <div className='row'>
                                        <div className='window__track '>
                                            <div className="featured-track__cover window__cover">
                                                <img src={tracks[Lyrics.id].cover} alt="Cover"/>
                                            </div>
                                            <div className='window__title'>
                                                {tracks[Lyrics.id].title}
                                            </div>
                                        </div>
                                        <CSSTransition
                                            in={popupMenu}
                                            timeout={300}
                                            classNames="popup-menu"
                                            mountOnEnter
                                            unmountOnExit
                                        >
                                            <div className='Text-Area__popup-menu popup-menu' ref={popupMenuRef}>
                                                <div className='popup-menu__elem elem resize'
                                                     onClick={() => {
                                                         setReSizeView(!reSizeView);
                                                         setRhymesMenuView(false)
                                                     }}>
                                                    <img src={size} alt=""/><span>Resize the window</span></div>
                                                {reSizeView ?
                                                    <>
                                                        <div
                                                            className={`elem__sub ${LyricsState == 'large' ? 'disabled' : ''}`}
                                                            onClick={LyricsState == 'large' ? null : () => {
                                                                setPopupMenu(false);
                                                                setReSizeView(!reSizeView)
                                                                SetViewLyrics('large')
                                                            }}>
                                                            Large
                                                        </div>
                                                        <div
                                                            className={`elem__sub ${LyricsState == 'medium' ? 'disabled' : ''}`}
                                                            onClick={LyricsState == 'medium' ? null : () => {
                                                                SetViewLyrics('medium');
                                                                setPopupMenu(false);
                                                                setReSizeView(!reSizeView)
                                                            }}>
                                                            Medium
                                                        </div>
                                                        <div
                                                            className={`elem__sub ${LyricsState == 'small' ? 'disabled' : ''}`}
                                                            onClick={LyricsState == 'small' ? null : () => {
                                                                SetViewLyrics('small');
                                                                setPopupMenu(false);
                                                                setReSizeView(!reSizeView)
                                                            }}>
                                                            Small
                                                        </div>
                                                    </>
                                                    : null}
                                                <div className='popup-menu__elem elem' onClick={() => {
                                                    setRhymesMenuView(!rhymesMenuView);
                                                    setReSizeView(false)
                                                }}>
                                                    <img src={rhymesIco} alt=""/><span>Search for rhymes</span></div>
                                                {rhymesMenuView ?
                                                    <>
                                                        <div className='elem__sub' onClick={() => {
                                                            SetRhymeLanguage('rus');
                                                            setPopupMenu(false);
                                                            setRhymesMenuView(false);
                                                            setRhymesView(true)
                                                        }}>Search in Russian
                                                        </div>
                                                        <div className='elem__sub' onClick={() => {
                                                            SetRhymeLanguage('eng');
                                                            setPopupMenu(false);
                                                            setRhymesMenuView(false);
                                                            setRhymesView(true)
                                                        }}>Search in English
                                                        </div>
                                                    </>
                                                    : null}
                                                <div className='popup-menu__elem elem' onClick={() => {
                                                    SetLooped(true);
                                                    SetPlayBeat(Lyrics.id, PlayBar);
                                                    setPopupMenu(false)
                                                }}>
                                                    <img src={StartPlayIco_white} alt=""/>
                                                    <span>Play track</span>
                                                </div>
                                                <div className='popup-menu__elem elem'
                                                     onClick={() => SetStatus('checkDelete')}>
                                                    <img src={deleteIco} alt=""/><span>Delete lyrics</span>
                                                </div>
                                            </div>
                                        </CSSTransition>
                                        {Lyrics.status !== '' ? <div className={`window__save`}>
                                            {saveLoader()}
                                        </div> : null}
                                        <textarea id='textArea' value={Lyrics.text} className='window__text'
                                                  onChange={TextBody}/>
                                    </div>
                                </div>
                            </section>
                        </>
                        :
                        <Draggable handle="strong" {...dragHandlers}>
                            <div className={`Text-Area ${LyricsState == 'medium' ? 'mediumTextArea' : 'smallTextArea'}`}
                                 bounds="body">
                                <strong className="cursor">
                                    <div className='Text-Area__header'><span
                                        className='Text-Area__name'>Your text :</span>
                                        <div className='Text-Area__header-menu window-menu'>
                                            <div className={Lyrics.status == '' ? null : 'disabled'}>
                                                <img src={saveIco}
                                                onClick={() => Lyrics.status == '' ? saveText() : null}
                                                alt="save"/>
                                            </div>
                                            <div ref={popupMenuIcoRef}
                                                 className={Lyrics.status == '' ? null : 'disabled'}
                                                 onClick={Lyrics.status == '' ? () => setPopupMenu(!popupMenu) : null}>
                                                <img src={settings}
                                                     alt="text area settings"/></div>
                                            <div onClick={Lyrics.status == '' ? () => CloseWindow() : null}
                                                 className={Lyrics.status == '' ? null : 'disabled'}>
                                                <img src={exit} alt="exit" className='Text-Area__header__exit'/>
                                            </div>
                                        </div>
                                    </div>
                                </strong>
                                <CSSTransition
                                    in={popupMenu}
                                    timeout={300}
                                    classNames="popup-menu"
                                    mountOnEnter
                                    unmountOnExit
                                >
                                    <div className='Text-Area__popup-menu popup-menu' ref={popupMenuRef}>
                                        <div className='popup-menu__elem elem resize' onClick={() => {
                                            setReSizeView(!reSizeView);
                                            setRhymesMenuView(false)
                                        }}>
                                            <img src={size} alt=""/><span>Resize the window</span></div>
                                        {reSizeView ?
                                            <>
                                                <div className={`elem__sub ${LyricsState == 'large' ? 'disabled' : ''}`}
                                                     onClick={LyricsState == 'large' ? null : () => {
                                                         setPopupMenu(false);
                                                         setReSizeView(!reSizeView)
                                                         SetViewLyrics('large')
                                                     }}>
                                                    Large
                                                </div>
                                                <div
                                                    className={`elem__sub ${LyricsState == 'medium' ? 'disabled' : ''}`}
                                                    onClick={LyricsState == 'medium' ? null : () => {
                                                        SetViewLyrics('medium');
                                                        setPopupMenu(false);
                                                        setReSizeView(!reSizeView)
                                                    }}>
                                                    Medium
                                                </div>
                                                <div className={`elem__sub ${LyricsState == 'small' ? 'disabled' : ''}`}
                                                     onClick={LyricsState == 'small' ? null : () => {
                                                         SetViewLyrics('small');
                                                         setPopupMenu(false);
                                                         setReSizeView(!reSizeView)
                                                     }}>
                                                    Small
                                                </div>
                                            </>
                                            : null}
                                        <div className='popup-menu__elem elem' onClick={() => {
                                            setRhymesMenuView(!rhymesMenuView);
                                            setReSizeView(false)
                                        }}><img src={rhymesIco} alt=""/><span>Search for rhymes</span></div>
                                        {rhymesMenuView ?
                                            <>
                                                <div className='elem__sub' onClick={() => {
                                                    SetRhymeLanguage('rus');
                                                    setPopupMenu(false);
                                                    setRhymesMenuView(false);
                                                    setRhymesView(true)
                                                }}>Search in Russian
                                                </div>
                                                <div className='elem__sub' onClick={() => {
                                                    SetRhymeLanguage('eng');
                                                    setPopupMenu(false);
                                                    setRhymesMenuView(false);
                                                    setRhymesView(true)
                                                }}>Search in English
                                                </div>
                                            </>
                                            : null}
                                        <div className='popup-menu__elem elem' onClick={() => {
                                            SetLooped(true);
                                            SetPlayBeat(Lyrics.id, PlayBar);
                                            setPopupMenu(false)
                                        }}>
                                            <img src={StartPlayIco_white} alt=""/>
                                            <span>Play track</span>
                                        </div>
                                        <div className='popup-menu__elem elem' onClick={() => SetStatus('checkDelete')}>
                                            <img src={deleteIco} alt=""/><span>Delete lyrics</span>
                                        </div>
                                    </div>
                                </CSSTransition>
                                {rhymesView ? <SearchRhyme View={setRhymesView}/> : null}
                                {Lyrics.status ? <div
                                    className={`Text-Area__loader ${LyricsState == 'small' ? 'loader-small' : 'loader-medium'}`}>{saveLoader()}</div> : null}
                                <textarea id='textArea' value={Lyrics.text} className={TextAreaStyle()}
                                          onChange={TextBody}/>
                            </div>
                        </Draggable>
                    }
                </>
                : null}

        </>
    );
}

const mapStateToProps = state => ({
    Lyrics: getLyrics(state),
    PlayBar: getPlayBar(state),
    rhyme: getRhymesInfo(state),
    tracks: getTracks(state),
    LyricsState: getLyricsWindowSize(state)
})

export default connect(mapStateToProps, {SetPlaying,SetViewLyrics,AddLyrics,SetTrackText,SetRhymeLanguage,DeleteRhymes,SetLooped, SetPlayBeat,DeleteTrackText,SetText,SetStatus}) (TextArea);

