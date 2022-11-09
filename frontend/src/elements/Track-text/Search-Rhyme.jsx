import React, {useRef, useState} from 'react';
import {connect} from "react-redux";
import {exit, Next_ico,Back_ico,SerchIco} from "../../Img-bundle";
import {getRhymes} from "../../data_access_layer/LyricsDAL";
import {getLyricsWindowSize, getRhymesInfo, getRhymesLanguage} from "../../redux/Selectors";


function SearchRhyme({View,getRhymes,rhyme,language,size}) {
    const [value, setValue] = useState('')
    const [prev, setPrev] = useState(false)
    const [next, setNext] = useState(true)
    const [position, setPosition] = useState(0)

    const slider = useRef(null)

    const SelectNext=()=>{

        if (position<=-(rhyme.length)*100+200){
            setNext(false)
            setPrev(true)
        }else{
        position<=-(rhyme.length)*100+300?setNext(false):setNext(true)
        setPrev(true)
        slider.current.childNodes.forEach((element)=>{
            element.style=`transform:translateX(${position-100}px)`
        })
        setPosition(position-100)
        }
    }
    const SelectPrev=()=>{
        if (position==0){
            setPrev(false)
            setNext(true)
        }else{
        position==-100?setPrev(false):setPrev(true)
        setNext(true)
        slider.current.childNodes.forEach((element)=>{
            element.style=`transform:translateX(${position+100}px)`
        })
        setPosition(position+100)
        }
    }
    return (
            <div className='Text-Area__search-rhyme search-rhyme'>
                 <div className='search-rhyme__input-field'>
                     <div className='search-rhyme__input-rhyme'>
                        <input  id='textArea'  placeholder={language=='eng'?'Search rhyme':'Поиск рифм'} className='input-rhyme'
                                onChange={(event => {event.target.value.length>2?setValue(event.target.value): setValue('')})}
                                onKeyDown={(event => {if(event.keyCode === 13){getRhymes(value,language);setPosition(0);setPrev(false)}})}
                        />
                         <img onClick={()=>{getRhymes(value,language);setPosition(0);setPrev(false)}} src={SerchIco} alt="" className='input-rhyme__button'/>
                     </div>
                     <div className='search-rhyme__exit' onClick={()=>View(false)}><img src={exit} alt=""/></div>
                 </div>
                {rhyme[0]==404?<div className='rhyme-eror'>no rhymes found :(</div>:null}
                {rhyme.length>0&&rhyme[0]!==404?<div className='rhyme-output'>
                    <div className={`rhyme-output__toggle-background ${size=='Large'?'rhyme-output__toggle-background-color-big':''}`}></div>
                    <div className='rhyme-output__wrapper' ref={slider}>
                            {rhyme.map((item)=>{
                                return(
                                <div className='rhyme-output__item '>{item}</div>
                                )
                            })}
                    </div>
                            <>
                                <img className={`rhyme-output__prev rhyme-output__button ${!prev?'disabled':''}`} onClick={SelectPrev} src={Back_ico} alt=''/>
                                <img className={`rhyme-output__next rhyme-output__button ${!next?'disabled':''}`} onClick={SelectNext}src={Next_ico} alt=''/>
                            </>
                    </div>:null}

            </div>
    );
}
const mapStateToProps = state =>({
    rhyme:getRhymesInfo(state),
    language:getRhymesLanguage(state),
    size:getLyricsWindowSize(state)
})
export default connect (mapStateToProps,{getRhymes}) (SearchRhyme);

