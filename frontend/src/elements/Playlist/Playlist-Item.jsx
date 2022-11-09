import React from 'react';
import {connect} from 'react-redux'
import {Button,PlaybackIndicator} from "../../File-bundle";
import {ButtonDownload,ButtonShare,ButtonBuy} from "../../Img-bundle";
import {Link} from "react-router-dom";
import {SetPlayBeat} from "../../data_access_layer/PlayBarDAL";
import {refactorTime} from "../../Functions";

function PlaylistItem({id,name,tag,time,bpm,price,link,cover,load,SetPlayBeat,beat}) {
    if(!load){
    tag = tag.split(', ');
    }

    return (
            <li className={`playlist__item item ${load?`is-loading length-${id}`:''}`} id={load?0:id}>
                <div className="item__icon-name">
                    <div className="item__track-icon" onClick={() => SetPlayBeat(id - 1)}>
                        {load ? null : <img src={cover} alt='icon'/>}
                        <PlaybackIndicator id={id}/>
                    </div>
                    {load?<div className="item__track-name"></div>:<Link to={`/beat/${id}`} className="item__track-name" >{name}</Link>}
                    <div className='item__back-toggle' onClick={()=>SetPlayBeat(id-1)}></div>
                </div>
                <span className="item__track-time">{load?'':refactorTime(time)}</span>
                <span className="item__track-bpm">{load?'':bpm}</span>
                <div className="item__track-tags" >
                    {load ?
                        <>
                            <div className="tag tag-1"/>
                            <div className="tag tag-2"/>
                            <div className="tag tag-3"/>
                        </>
                        : tag.map((name, index) =>
                            <span key={`${name}__${index}`} className="tag">#{name}</span>)}
                </div>
                <div className="item__buttons-block buttons-block">
                    {load?<Button sideButtonLoad />:<Button download id={id} beat={beat}><img src={ButtonDownload} alt='download' href={link}/></Button>}
                    {load?<Button sideButtonLoad />:<Button share id={id}><img src={ButtonShare} alt='share'/></Button>}
                    {load?<Button buyButtonLoad />:
                    <Button buy price={price}  id={id} type="submit" name={name} ><img src={ButtonBuy} alt='buy'/><span>$ {price}</span></Button>}
                </div>
                <div className="item__border-track"/>
            </li>
    );
}


export default connect (null,{SetPlayBeat}) (PlaylistItem);