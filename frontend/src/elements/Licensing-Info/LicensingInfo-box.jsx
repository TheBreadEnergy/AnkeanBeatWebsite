import React from 'react';
import {StarImg} from "../../Img-bundle";
import {ENGLISH} from "../../redux/Settings-reducer";
import Button from "../Buttons/Buttons";


function LicesingInfoBox({popular,name,language,price,fileInfo,streams,commercialUse,platforms,yotubeId,betterFor,annotation,exclusive}) {

    const BaseLicensingInfo=()=>{
        return(
            <>
            <span className="licensing-info__name">{name}</span>
                    {exclusive?<span className="licensing-info__price-exclusive">{price}</span>:<span className="licensing-info__price">${price}</span>}
                    <span className="licensing-info__file-info">{fileInfo}</span>
                    <ul className="licensing-info__text">
                        <li>{fileInfo}</li>
                        <li>{streams}</li>
                        <li>{commercialUse}</li>
                        {annotation?<li>{annotation}</li>:null}
                        {betterFor?<li>{betterFor}</li>:null}
                        <li>{platforms}</li>
                        <li>{yotubeId}</li>
                    </ul>
                    <Button licensingInfo name={name} price={price} fileInfo={fileInfo}>{language==ENGLISH?'READ LICENSE':'ПОДРОБНЕЕ'}</Button>
        </>
        )
    }

    return (
        <>
            {popular ?
                <div className="licensing-info__popular">
                    <span className="licensing-info__popular-label">
                        <img src={StarImg} alt=""/>
                        {language == ENGLISH ? 'Popular' : 'Популярная'}
                    </span>
                    {BaseLicensingInfo()}
                </div>
                :
                <div className="licensing-info__box">
                    {BaseLicensingInfo()}
                </div>
            }
        </>
    );
}



export default  LicesingInfoBox;
