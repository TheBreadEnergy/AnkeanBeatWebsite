export const SET_VALUE = 'SET_VALUE';
export const SET_TYPE = 'SET_TYPE';
export const SET_BPM = 'SET_BPM';
export const SET_MOOD = 'SET_MOOD';
export const SET_GENRE = 'SET_GENRE';
export const SET_SORT_BY = 'SET_SORT_BY';
export const SET_FILTERED = 'SET_FILTERED';

let initialState =
    {
        value:null,
        type:['All type','Beat'],
        bpm:['All PBM'],
        mood:['All mood'],
        genre:['All genres'],
        sortBy:['Sort by', 'Popular', 'Latest', 'Oldest'],
        filtered:[],
    };


const SearchReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_VALUE:
            return {...state, value: action.value}
        case SET_TYPE:
            return {...state, type: action.typeBeat}
        case SET_BPM:
            return {...state, bpm: action.bpm}
        case SET_MOOD:
            return {...state, mood: action.mood}
        case SET_GENRE:
            return {...state, genre: action.genre}
        case SET_SORT_BY:
            return {...state, sortBy: action.sort}
        case SET_FILTERED:
            return {...state, filtered: action.arr}
        default:
            return state;
    }
}

export const SetSearchValue =(value)=>{
    return {
        type:SET_VALUE,
        value,
    }
}
export const SetFiltered =(arr)=>{
    return {
        type:SET_FILTERED,
        arr,
    }
}
export const SetSearchType =(typeBeat)=>{
   return  {
    type:SET_TYPE,
    typeBeat
   }
}
export const SetSearchBpm =(bpm)=>{
   return  {
    type:SET_BPM,
    bpm
   }
}
export const SetSearchMood =(mood)=>{
   return  {
    type:SET_MOOD,
    mood
   }
}
export const SetSearchGenre =(genre)=>{
   return  {
    type:SET_GENRE,
    genre
   }
}
export const SetSearchSortBy =(sort)=>{
   return  {
    type:SET_SORT_BY,
    sort
   }
}



export default  SearchReducer;

