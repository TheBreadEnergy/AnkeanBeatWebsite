import React, {useEffect, useRef, useState} from 'react';
import {connect} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {ENGLISH} from "../../redux/Settings-reducer";
import {SetSearchValue} from "../../redux/Search-reducer";
import {getFetchInfo, getLanguage, getTracks} from "../../redux/Selectors";


function Search({ tracks,language,SetSearchValue}) {
    const navigate = useNavigate();
    const [value, setValue] = useState('')
    const [viewSearch, setViewSearch] = useState(false)
    const resultRef = useRef()
    const searchRef = useRef()


     const filterBeats = tracks.filter(beat => {
        let tags = beat.tag
        if (Array.from(value).length > 1) {
            return beat.title.toLowerCase().includes(value.toLowerCase()) || tags.toLowerCase().includes(value.toLowerCase())
        }
    })

    const search=(value)=>{
       SetSearchValue(value)
       navigate('/beats')
    }

    useEffect(()=>{
        if(filterBeats.length>0){setViewSearch(true)}
        else{setViewSearch(false)}
    },[filterBeats.length])

    useEffect(() => {
    const checkIfClickedOutside = e => {
      if (viewSearch && resultRef.current && !resultRef.current.contains(e.target)&&!searchRef.current.contains(e.target)) {setViewSearch(false)}
    }
    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {document.removeEventListener("mousedown", checkIfClickedOutside)}
  }, [viewSearch])



    return (
        <section className="search">
            <input
                className='search__area'
                type="text"
                placeholder={language == ENGLISH ? "What type of track are you looking for" : "Какой тип треков ищите?"}
                onChange={(event => {
                    event.target.value.length > 1 ? setValue(event.target.value) : setValue('')
                })}
                onKeyDown={(event => {
                    if (event.keyCode === 13) {
                        search(value)
                    }
                })}
                onClick={() => filterBeats.length > 0 ? setViewSearch(true) : null}
                ref={searchRef}
            />
            <button onClick={() => search(value)}
                    className='search__button'>{language == ENGLISH ? "SEARCH" : "ИСКАТЬ"}</button>
            {viewSearch ?
                <div className='result' ref={resultRef}>
                    {filterBeats.map((beats, index) => {
                        let tag = beats.tag.split(', ')
                        return (
                            <Link to={`/beat/${beats.id}`} className='result__item' key={beats.id + index}>
                                <img src={beats.cover} alt=""/>
                                {beats.title}
                                {tag.map((name, index) => <div key={`${name}__${index}`} className='result__tag'>#{name}</div>)}
                            </Link>
                        )
                    })}
                </div>
                : null}
        </section>
    );
}

const mapStateToProps = state => ({
    tracks: getTracks(state),
    isFetching: getFetchInfo(state),
    language: getLanguage(state)
})


export default connect(mapStateToProps, {SetSearchValue})(Search);
