import {SetIdBeat, SetPlayBarView, SetPlaying, SetVolume} from "../redux/PlayBar-reducer";
import axios from "axios";


const initialVolume = 0.5

export const SetPlayBeat = (id) => {
    return (dispatch, getState) => {
        let state = getState()
        let trackId = state.PlayBar.id
        let playing = state.PlayBar.playing
        let playBarView = state.PlayBar.view

        if (id == trackId && playBarView) {
            dispatch(SetPlaying(!playing))
        } else {
            if (playBarView) {
                dispatch(SetIdBeat(id))
            } else {
                dispatch(SetIdBeat(id))
                dispatch(SetPlayBarView(true))
            }
        }

    }
};

export const GetLocalVolume = () => {
    return (dispatch) => {
        if (localStorage.getItem('Player_Volume')) {
            dispatch(SetVolume(localStorage.getItem('Player_Volume')))
        } else {
            localStorage.setItem('Player_Volume', initialVolume)
            dispatch(SetVolume(initialVolume))
        }

    }
};
export const SetLocalVolume = (volume) => {
    return (dispatch) => {
        localStorage.setItem('Player_Volume', volume)
        dispatch(SetVolume(volume))
    }
}
export const SetPlaysCount = (id) => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/steam-track/${id+1}/`)
}

