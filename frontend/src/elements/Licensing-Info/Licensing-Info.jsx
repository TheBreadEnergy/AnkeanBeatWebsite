import React, {useRef, useState} from 'react';
import {ENGLISH} from "../../redux/Settings-reducer";
import {connect} from "react-redux";
import LicesingInfoBox from "./LicensingInfo-box";
import {Back_ico,Next_ico} from "../../Img-bundle";
import {getLanguage} from "../../redux/Selectors";



function LicesingInfo({language}) {
    const [position, setPosition] = useState(0)
    const [prev, setPrev] = useState(false)
    const [next, setNext] = useState(true)

    const slider = useRef(null)

    const SelectPrev=()=>{
        if (position==0){
            setPrev(false)
            setNext(true)
        }else{
        position==-100?setPrev(false):setPrev(true)
        setNext(true)
        slider.current.childNodes.forEach((element)=>{
            element.style=`transform:translateX(${position+100}%)`
        })
        setPosition(position+100)
        }
    }

    const SelectNext=()=>{
        if (position<=-300){
            setNext(false)
            setPrev(true)
        }else{
        position==-200?setNext(false):setNext(true)
        setPrev(true)
        slider.current.childNodes.forEach((element)=>{
            element.style=`transform:translateX(${position-100}%)`
        })
        setPosition(position-100)
        }
    }


    return (
        <section className="licensing-info">
            <span className="licensing-info__title title-min">{language==ENGLISH?'Licensing Info':'Лицензии'}</span>
            <div className="licensing-info__licenses" ref={slider}>
                <LicesingInfoBox
                                 name={language==ENGLISH?'MP3 license':'MP3 Лицензия'}
                                 language={language}
                                 fileInfo={'HQ MP3 (320kbps)'}
                                 price={25}
                                 platforms={language==ENGLISH?'Spotify, Apple, iTunes, etc':'Spotify, Apple, iTunes, и тд'}
                                 streams={language==ENGLISH?'Up to 10,000 Streams':'До 10,000 прослушиваний'}
                                 commercialUse={language==ENGLISH?'Commercial Use':'Коммерческое использование'}
                                 yotubeId={language==ENGLISH?'NO Content ID for YouTube Allowed':'Content ID для YouTube не разрешен'}
                />
                <LicesingInfoBox
                                 name={language==ENGLISH?'WAV license':'WAV Лицензия'}
                                 language={language}
                                 fileInfo={'MP3 + WAV'}
                                 price={50}
                                 platforms={language==ENGLISH?'Spotify, Apple, iTunes, etc':'Spotify, Apple, iTunes, и тд'}
                                 streams={language==ENGLISH?'Up to 100,000 Streams':'До 100,000 прослушиваний'}
                                 commercialUse={language==ENGLISH?'Commercial Use':'Коммерческое использование'}
                                 yotubeId={language==ENGLISH?'NO Content ID for YouTube Allowed':'Content ID для YouTube не разрешен'}
                />
                <LicesingInfoBox
                                 name={language==ENGLISH?'Trackout license':'Trackout Лицензия'}
                                 language={language}
                                 fileInfo={'MP3 + WAV + STEMS'}
                                 price={100}
                                 platforms={language==ENGLISH?'Spotify, Apple, iTunes, etc':'Spotify, Apple, iTunes, и тд'}
                                 streams={language==ENGLISH?'Up to 200,000 Streams':'До 200,000 прослушиваний'}
                                 betterFor={language==ENGLISH?'Good for mixing & mastering':'Хорошо подходит для сведения и мастеринга'}
                                 commercialUse={language==ENGLISH?'Commercial Use':'Коммерческое использование'}
                                 yotubeId={language==ENGLISH?'NO Content ID for YouTube Allowed':'Content ID для YouTube не разрешен'}
                />
                <LicesingInfoBox

                                 name={language==ENGLISH?'Unlimited license':'Unlimited Лицензия'}
                                 language={language}
                                 fileInfo={'MP3 + WAV + STEMS'}
                                 price={200}
                                 platforms={language==ENGLISH?'Spotify, Apple, iTunes, etc':'Spotify, Apple, iTunes, и тд'}
                                 streams={language==ENGLISH?'Unlimited Streams, Sales, Radio Stations, etc':'Неограниченное количество прослушиваний, продаж, ротаций на радио, и тд.'}
                                 betterFor={language==ENGLISH?'Good for mixing & mastering':'Хорошо подходит для сведения и мастеринга'}
                                 commercialUse={language==ENGLISH?'Commercial Use':'Коммерческое использование'}
                                 yotubeId={language==ENGLISH?'Content ID for YouTube Allowed':'Content ID для YouTube разрешен'}
                />

                <LicesingInfoBox
                                 popular
                                 exclusive
                                 name={'Exclusive'}
                                 language={language}
                                 fileInfo={'MP3 + WAV + STEMS'}
                                 price={'MAKE AN OFFER'}
                                 annotation={language==ENGLISH?'*Only available for select tracks if "make an offer" button is showing*':'*Доступно только для выбранных треков, если отображается кнопка "Предложить цену" *'}
                                 platforms={'Spotify, Apple, YouTube...'}
                                 streams={language==ENGLISH?'Unlimited Streams, Sales, Radio Stations, etc':'Неограниченное количество прослушиваний, продаж, ротаций на радио, и тд.'}
                                 betterFor={language==ENGLISH?'Track Removed from Catalog':'Трек удаляется с каталога'}
                                 commercialUse={language==ENGLISH?'Commercial Use':'Коммерческое использование'}
                                 yotubeId={language==ENGLISH?'Content ID for YouTube Allowed':'Content ID для YouTube разрешен'}
                />
            </div>
            <img className={`licensing-info__prev ${!prev?'disabled-toggle':''}`} onClick={SelectPrev} src={Back_ico} alt=''/>
            <img className={`licensing-info__next ${!next?'disabled-toggle':''}`} onClick={SelectNext} src={Next_ico} alt=''/>
        </section>
    );
}

let mapStateToProps = state => ({
    language: getLanguage(state)
})


export default connect(mapStateToProps, null)(LicesingInfo)
