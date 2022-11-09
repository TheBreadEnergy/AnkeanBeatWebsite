import React from 'react';
import {Recording,Stream,Live,Distr,Video,Radio} from "../../Img-bundle";
import {ENGLISH} from "../../redux/Settings-reducer";

function License({stream,distribute,video, radio, language}) {
    let RuVideo
    let RuDistribute = `${distribute} продаж`
    let RuRadio = `Права на ротацию по радио (${radio} станций)`
    if(language!==ENGLISH){
        if(video==1){RuVideo='1 клип'}
        if(video>1){RuVideo=`${video} клипов`}
        if(video=='Unlimited'){RuVideo=`Неограниченное количество клипов`}
        if(distribute=='Unlimited'){RuDistribute ='Неограниченное количество продаж'}
        if(radio===1){RuRadio=`Права на ротацию по радио (${radio} станцию)`}
        if((radio<5)&&(radio!==1)){RuRadio=`Права на ротацию по радио (${radio} станции)`}
        if(radio>5){RuRadio=`Права на ротацию по радио (${radio} станций)`}
        if(radio=='Unlimited'){RuRadio =`Права на ротацию по радио (на неограниченое количество станций)`}
    }
    return (
            <div className="license__description ">
                            <div className="description-row">
                                <div className="description-item"><img src={Recording} alt=""/>{language==ENGLISH?'Used for Music Recording':'Использование для записи музыки'}</div>
                                <div className="description-item"><img src={Stream} alt=""/>{stream} {language==ENGLISH?'Online Audio Streams':'Прослушиваний в сети'}</div>
                                <div className="description-item"><img src={Live} alt=""/>{language==ENGLISH?'For Profit Live Performances':'Для использования на концертах'}</div>
                            </div>
                            <div className="description-row">
                                <div className="description-item"><img src={Distr} alt=""/>{language==ENGLISH?`Distribute up to ${distribute} copies`:RuDistribute}</div>
                                <div className="description-item"><img src={Video} alt=""/>{language==ENGLISH?`${video} Music Video`:RuVideo}</div>
                                <div className="description-item"><img src={Radio} alt=""/>{language==ENGLISH?`Radio Broadcasting rights (${radio} Stations)`:RuRadio}</div>
                            </div>
                        </div>
    );
}



export default License

