 import React from 'react';
import {connect} from 'react-redux';
import {StartPlayIco,PauseIco} from '../../Img-bundle';
import {getPlayBar} from '../../redux/Selectors';

function PlaybackIndicator({id,PlayBar}) {

    return (
        <>
            {id - 1 == PlayBar.id ?
                <>
                    <div className='item__track-icon track-select'></div>
                    {PlayBar.playing ? <div className='item__track-icon track-stream'></div> :
                        <div className='item__track-icon track-ico-play now'><img src={StartPlayIco}
                                                                                  alt=""/></div>}
                    <div className='item__track-icon track-ico-play'>
                        {PlayBar.playing ? <img src={PauseIco} alt=""/> :
                            <img src={StartPlayIco} alt=""/>}
                    </div>
                </>
                :
                <div className='item__track-icon track-ico-play'>
                    <img src={StartPlayIco} alt=""/>
                </div>
            }
        </>

    );
}

const mapStateToProps =(state) =>{
    return {
        PlayBar: getPlayBar(state)
    }

}

export default connect (mapStateToProps,null) (PlaybackIndicator);