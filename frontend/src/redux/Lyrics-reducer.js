export const ADD_LYRICS = 'ADD_LYRICS';
export const SET_LYRICS_ID = 'SET_LYRICS_ID';
export const SET_LYRICS_VIEW = 'SET_LYRICS_VIEW';
export const SET_WHERE_SAVE = 'SET_WHERE_SAVE';
export const SET_TEXT = 'SET_TEXT';
export const SET_STATUS = 'SET_STATUS';

let initialState =
    {
        Lyrics: [],
        id: null,
        View: false,
        whereSave: null,
        rhymes: [],
        text: '',
        status: ''
    };


const LyricsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_LYRICS:
            return {...state, Lyrics: action.Lyrics}
        case SET_LYRICS_ID:
             return {...state, id: action.id}
        case SET_LYRICS_VIEW:
            return {...state, View: action.View}
        case SET_WHERE_SAVE:
            return {...state, View: action.whereSave}
        case SET_TEXT:
            return{...state,text: action.text}
        case SET_STATUS:
            return {...state, status: action.status}
        default:
            return state;
    }
}

export const AddLyrics =(Lyrics)=>{
    return {
        type: ADD_LYRICS,
        Lyrics:Lyrics,
    }
}
export const SetIdLyrics =(id)=>{
    return {
        type: SET_LYRICS_ID,
        id:id,
    }
}

export const SetViewLyrics = (view) => {

    return {
        type: SET_LYRICS_VIEW,
        View: view,
    }
}

export const SetWhereSave = (saveType) => {

    return {
        type: SET_WHERE_SAVE,
        whereSave: saveType,
    }
}
export const SetText = (text) => {
    return {
        type: SET_TEXT,
        text: text,
    }
}

export const SetStatus = (status) => {
    return {
        type: SET_STATUS,
        status: status,
    }
}

export default LyricsReducer;

