import axios from "axios";

export const RUSSIAN = 'Russian';
export const ENGLISH = 'English';
export const SET_LANGUAGE = 'SET_LANGUAGE';
export const SET_IS_FETCHING = 'SET_IS_FETCHING';
export const SET_TIME = 'SET_TIME';
export const SET_MESSAGE = 'SET_MESSAGE';
export const SET_MESSAGE_LOAD = 'SET_MESSAGE_LOAD';


let initialState =
    {
        language:'English',
        licenseDate:null,
        isFetching:false,
        message:null,
        messageLoad:false,
    };


const SettingsReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_LANGUAGE:
            return {...state, language: action.language}
        case SET_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case SET_TIME:
            return {...state, licenseDate: action.licenseDate}
        case SET_MESSAGE:
            return {...state, message: action.message}
        case SET_MESSAGE_LOAD:
            return {...state, messageLoad: action.messageLoad}
        default:
            return state;
    }
}

export const SetLanguage =(language)=>{

    return {
        type:SET_LANGUAGE,
        language:language,
    }
}

export const SetMessage =(message)=>{
    return {
        type:SET_MESSAGE,
        message,
    }
}
export const SetMessageLoad =(messageLoad)=>{
    return {
        type:SET_MESSAGE_LOAD,
        messageLoad,
    }
}
export const GetInitLanguage = () => {
    return (dispatch) => {
        if (localStorage.getItem('language')) {
            let initLanguage = localStorage.getItem('language')
            dispatch(SetLanguage(initLanguage))
        }
    }
}

export const SelectLanguage = (language) => {
    return (dispatch) => {
      localStorage.setItem('language',language)
      dispatch(SetLanguage(language))
    }}

export const SetTime=(licenseDate)=>{
   return  {
    type:SET_TIME,
    licenseDate

   }
}
export const setIsFetching =(isFetching)=>{
    return {
        type:SET_IS_FETCHING,
        isFetching,
    }
}


export const GetTime=()=>{
    debugger
    return (dispatch) => {
        dispatch(setIsFetching(true))
        axios.get(`${process.env.REACT_APP_TIME}`).then(response => {
            let licenseDate =`${response.data.datetime.substr(0, 10)} ${response.data.datetime.substr(11, 8)} ${response.data.timezone}`
            dispatch(SetTime(licenseDate))
             dispatch(setIsFetching(false))
        })
    }
}

export const SetNotification=(info)=>{
    return (dispatch) => {
         dispatch(SetMessageLoad(false))
         dispatch(SetMessage(info))
            setTimeout(() => { dispatch(SetMessage(null))}, 3000);
    }
}


export default SettingsReducer;

