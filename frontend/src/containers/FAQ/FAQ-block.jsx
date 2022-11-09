import React, {useState} from 'react';
import {Expand_less_grey,Expand_more_grey} from "../../Img-bundle";


function FaqBlock({title,subtitle}) {
    const [view,setView]=useState(false)

    return (
            <div className='faq__block' onClick={() => setView(!view)}>
               <div className='block__title title-min'>{title}</div>
                {view?<div className='block__answer'>{subtitle}</div>:null}
                <div className='faq__expand' >
                    {view ? <img src={Expand_less_grey} alt=""/> : <img src={Expand_more_grey} alt=""/>}
                    {view ? <span>Hide</span> : <span>Show</span>}
                </div>
            </div>
    );
}



export default FaqBlock;