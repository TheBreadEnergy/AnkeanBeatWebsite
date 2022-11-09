import React from 'react';
import {SelectId} from "../../redux/License-reducer";
import {connect} from "react-redux";
import LicenseItem from "./License-Item";
import {ENGLISH} from "../../redux/Settings-reducer";
import {getLanguage, getLicenseState, getTracks, SelectLicenseId} from "../../redux/Selectors";

function SelectLicense({SelectId,tracks, id,Language,SelectLicenseId}) {

    return (
        <>
            {
                SelectLicenseId!==0?
                    <>
                        <div className='window-background' onClick={() => {
                            document.body.style.overflowY = "scroll";
                            SelectId(0);
                        }}></div>
                        <section className='window'>
                            <div className='window__name'>
                                <div> {Language == ENGLISH ? 'Choose license type' : 'Выберите тип лицензии'}</div>
                                <div className='window__exit' onClick={() => {
                                    document.body.style.overflowY = "scroll";
                                    SelectId(0);
                                }}>
                                    <div className='exit-big'></div>
                                </div>
                            </div>
                            <div className='window__container'>
                                <div className='window__track'>
                                    <div className="featured-track__cover window__cover">
                                        <img src={tracks[id - 1].cover} alt="Cover"/>
                                    </div>
                                    <div className='window__title'>
                                        {tracks[id - 1].title}
                                    </div>
                                </div>
                                <div className='window__license'>
                                    <LicenseItem
                                        name={'MP3'}
                                        subtitle={'MP3'}
                                        id={id}
                                        tracks={tracks}
                                        stream={10000}
                                        distribute={5000}
                                        video={1} radio={3}
                                        language={Language}
                                        price={tracks[id - 1].mp3Price}/>
                                    <LicenseItem
                                        name={'WAV'}
                                        subtitle={Language == ENGLISH ? 'MP3 and WAV' : 'MP3 и WAV '}
                                        id={id}
                                        tracks={tracks}
                                        stream={100000}
                                        distribute={7500}
                                        video={1} radio={5}
                                        language={Language}
                                        price={tracks[id - 1].wavPrice}/>
                                    <LicenseItem
                                        name={'Trackout'}
                                        subtitle={Language == ENGLISH ? 'MP3, WAV and TRACK STEMS' : 'MP3, WAV И ПО ДОРОЖКАМ'}
                                        id={id}
                                        tracks={tracks}
                                        stream={200000}
                                        distribute={10000}
                                        video={1} radio={10}
                                        language={Language}
                                        price={tracks[id - 1].trackout}/>
                                    <LicenseItem
                                        name={'Unlimited'}
                                        subtitle={Language == ENGLISH ? 'MP3, WAV and TRACK STEMS' : 'MP3, WAV И ПО ДОРОЖКАМ'}
                                        id={id}
                                        tracks={tracks}
                                        stream={'Unlimited'}
                                        distribute={'Unlimited'}
                                        video={'Unlimited'} radio={'Unlimited'}
                                        language={Language}
                                        price={tracks[id - 1].unlimited}/>
                                    <LicenseItem
                                        name={'Exclusive'}
                                        subtitle={Language == ENGLISH ? 'NEGOTIATE' : 'ПО ДОГОВОРЕННОСТИ'}
                                        id={id}
                                        tracks={tracks}
                                        stream={'Unlimited'}
                                        distribute={'Unlimited'}
                                        video={'Unlimited'} radio={'Unlimited'}
                                        language={Language}/>
                                </div>
                            </div>
                        </section>
                    </> : null
            }
        </>

    );
}

let mapStateToProps = state => ({
    tracks: getTracks(state),
    id:SelectLicenseId(state),
    License: getLicenseState(state),
    Language: getLanguage(state),
    SelectLicenseId: SelectLicenseId(state)
})


export default connect(mapStateToProps,{SelectId})(SelectLicense)

