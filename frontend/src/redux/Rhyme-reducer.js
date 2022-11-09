export const SET_RHYMES = 'SET_RHYMES';
export const SET_RHYMES_LANGUAGE = 'SET_RHYMES_LANGUAGE';
export const DELETE_RHYMES = 'DELETE_RHYMES';

let initialState =
    {
        rhymes:[],
        language:'eng',
    };


const RhymeReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_RHYMES:
            return {...state, rhymes: action.rhymes}
        case SET_RHYMES_LANGUAGE:
            return {...state, language: action.language}
        case DELETE_RHYMES:
            return {...state, rhymes: action.rhymes}
        default:
            return state;
    }
}

export const SetRhymeLanguage =(language)=>{
    return {
        type:SET_RHYMES_LANGUAGE,
        language:language,
    }
}

export const SetRhymes =(rhymes)=>{
    return {
        type: SET_RHYMES,
        rhymes: rhymes,
    }
}
export const DeleteRhymes =()=>{
    return {
        type: DELETE_RHYMES,
        rhymes: [],
    }
}

export default RhymeReducer;

