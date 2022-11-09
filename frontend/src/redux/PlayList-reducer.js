import axios from 'axios'
import {setBeatsTypes} from "../data_access_layer/SearchDAL";
import {SetFiltered} from "./Search-reducer";

export const ADD_PLAYLIST = 'ADD_PLAYLIST';
export const IS_FETCHING = 'IS_FETCHING';
export const SET_FEATURED_TRACK = 'SET_FEATURED_TRACK';

let initialState=
    {
            Playlist:[],
            FeaturedTrackId:null,
            isFetching:false
    };


 const PlayListReducer = (state=initialState,action)=>{

    switch (action.type){
        case ADD_PLAYLIST:
            return {...state, Playlist: action.Playlist}
        case IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case SET_FEATURED_TRACK:
            return {...state, FeaturedTrackId: action.id}
        default:
            return state;
    }
}

export const setFeaturedTrackId=(id)=>{
    return {
        type:SET_FEATURED_TRACK,
        id,
    }
}

export const setIsFetching =(isFetching)=>{
    return {
        type:IS_FETCHING,
        isFetching,
    }
}

export const AddPlaylist =(Playlist)=>{
    return {
        type:ADD_PLAYLIST,
        Playlist:Playlist,
    }
}

export const GetPlaylist = () => {
     return (dispatch) => {
         dispatch (setIsFetching(true));
         axios.get(`${process.env.REACT_APP_API_URL}/api/playlist/`).then(response => {
             dispatch(setIsFetching(false));
             dispatch(AddPlaylist(response.data.results));
             dispatch(GetFeaturedTrack(response.data.results))
             dispatch(setBeatsTypes(response.data.results));
             dispatch(SetFiltered(response.data.results))
         });
    };
};

export const GetFeaturedTrack = (tracks) => {
    return (dispatch) => {
        if (tracks.length > 1) {
            let trackIndex = 0
            tracks.forEach((item, id) => {
                if (tracks[trackIndex].plays_count < item.plays_count) {
                    trackIndex = id
                }
            })
            dispatch(setFeaturedTrackId(trackIndex));
        }
    };
};



export default PlayListReducer;