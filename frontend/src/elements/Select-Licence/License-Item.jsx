import React, {useState} from 'react';
import {Button} from "../../File-bundle";
import {ButtonBuy} from "../../Img-bundle";
import {Expand_more_grey,Expand_less_grey} from "../../Img-bundle";

import {ENGLISH} from "../../redux/Settings-reducer";
import License from "./License";

function LicenseItem({name,subtitle,price, id,stream,distribute,video, radio, language}) {
    const[view,setView]=useState(false)
    return (
        <div className='license'>
            <div className='title-and-button'>
                <div className='title-and-button__name'>
                    <span>{name} {language == ENGLISH ? 'license ' : 'Лицензия'}</span>
                    <span className='subtitle'>{subtitle}</span>
                </div>
                {name == 'Exclusive' ? <Button buyExclusive id={id}><span>{language == ENGLISH ? 'MAKE AN OFFER' : 'ПРЕДЛОЖИТЬ ЦЕНУ'}</span></Button>
                    : <Button buyLicense price={price} id={id} name={name}><img src={ButtonBuy} alt='buy'/><span>$ {price}</span></Button>}
            </div>
            {view ? <License stream={stream} distribute={distribute} video={video} radio={radio} language={language}/>:null}
                <div className='license__expand' onClick={() => setView(!view)}>
                    {view ? <img src={Expand_less_grey} alt=""/> : <img src={Expand_more_grey} alt=""/>}
                    {view ? <span>{language == ENGLISH ? 'Hide usage terms' : 'Скрыть подробности'}</span> :
                        <span>{language == ENGLISH ? 'Show usage terms' : 'Показать подробности'}</span>}
                </div>

            </div>
    );
}



export default LicenseItem

