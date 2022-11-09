import React, {useEffect, useRef, useState} from 'react';
import {Expand_more,Expand_less} from "../../Img-bundle";
import {CSSTransition} from "react-transition-group";

function SelectTypesWindow({ value, setValue, valueArr}) {
    const [toggle,setToggle]=useState(false)
    const windowRef = useRef()

    useEffect(() => {
    const checkIfClickedOutside = e => {
      if (toggle && windowRef.current && !windowRef.current.contains(e.target)) {
        setToggle(false)
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {document.removeEventListener("mousedown", checkIfClickedOutside)}
    }, [toggle])

    return (
        <div className='dropdown-elem' onClick={() => setToggle(!toggle)} ref={windowRef}>
            <div className='dropdown-btn'>
                <span>{value}</span>
                <div className='dropdown-btn__expand' >
                    {!toggle ? <img src={Expand_more} alt=""/> : <img src={Expand_less} alt=""/>}
                </div>
            </div>
            {
                <CSSTransition
                    in={toggle}
                    timeout={300}
                    classNames="find__dropdown-type"
                    mountOnEnter
                    unmountOnExit
                >
                    <div className="find__dropdown-type">
                        {
                            valueArr.map(
                                (elem, index) => {
                                    return (
                                    <div className='find__dropdown-type__name'  key = {index}
                                    onClick={() => setValue(elem)}>
                                        {elem == 'Sort by' ? 'Default' : elem}
                                    </div>)
                                })
                        }
                    </div>
                </CSSTransition>
            }
        </div>
    );
}

export default SelectTypesWindow;