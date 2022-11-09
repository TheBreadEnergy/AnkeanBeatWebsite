export const SET_BEAT_ID = 'SET_BEAT_ID';
export const SET_VIEW = 'SET_VIEW';
export const SET_PLAYING = 'SET_PLAYING';
export const SET_LOOPED = 'SET_LOOPED';
export const SET_VOLUME = 'SET_VOLUME';

let initialState =
    {
        id: null,
        idNext:null,
        idPrev:null,
        playing:false,
        view:false,
        loop:false,
        volume:0.5,
    };


const LyricsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BEAT_ID :
            return {...state, id: action.id}
        case SET_VIEW:
            return {...state,  view: action.view}
        case SET_PLAYING:
            return {...state,  playing: action.playing}
        case SET_LOOPED:
            return {...state,  loop: action.loop}
        case SET_VOLUME:
            return {...state,  volume: action.volume}

        default:
            return state;
    }
}


export const SetIdBeat =(id)=>{
    return {
        type:SET_BEAT_ID,
        id,
    }
}

export const SetVolume =(volume)=>{
    return {
        type:SET_VOLUME,
        volume,
    }
}

export const SetLooped =(loop)=>{
    return {
        type:SET_LOOPED,
        loop,
    }
}

export const SetPlayBarView =(view)=>{
    return {
        type:SET_VIEW,
        view,
    }
}
export const SetPlaying =(playing)=>{
    return {
        type:SET_PLAYING,
        playing,
    }
}



export default LyricsReducer;

