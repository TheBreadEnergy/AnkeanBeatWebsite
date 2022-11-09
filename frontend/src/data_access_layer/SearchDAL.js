import {SetFiltered, SetSearchBpm, SetSearchGenre, SetSearchMood} from "../redux/Search-reducer";

export const setBeatsTypes = (tracks) =>{
    return(dispatch,getState)=>{
    let state = getState()
    let bpm = state.SearchReducer.bpm
    let mood = state.SearchReducer.mood
    let genre = state.SearchReducer.genre
    tracks.map(beat => {
                if (!bpm.includes(beat.bpm)) {
                    let arr = bpm
                    arr.push(beat.bpm)
                    dispatch(SetSearchBpm(arr))
                }
                if (!mood.includes(beat.mood)) {
                    let arr = mood
                    arr.push(beat.mood)
                     dispatch(SetSearchMood(arr))
                }
                if (!genre.includes(beat.genre)) {
                    let arr = genre
                    arr.push(beat.genre)
                     dispatch(SetSearchGenre(arr))
                }
            })
    }
}

export const filterBeats = (type,bpm,mood,genres,sort) =>{
    return(dispatch,getState)=>{
        let state = getState()
        let beats = state.PlaylistPage.Playlist;
        let search = state.SearchReducer.value;
        let initBpm = state.SearchReducer.bpm[0];
        let initMood = state.SearchReducer.mood[0];
        let initGenre = state.SearchReducer.genre[0];
        if(search!==null&&beats.length>0){

            beats=beats.filter(beat => {
                    let tags = beat.tag
                    return beat.title.toLowerCase().includes(search.toLowerCase()) || tags.toLowerCase().includes(search.toLowerCase())
                })
             }
            beats=beats.filter(beat => {
                    if(initBpm==bpm){return true}
                    if(bpm==beat.bpm){return true}
                })
             beats=beats.filter(beat => {
                    if(initMood==mood){return true}
                    if(mood==beat.mood){return true}
                })
            beats=beats.filter(beat => {
                    if(initGenre==genres){return true}
                    if(genres==beat.genre){return true}
                })
        if (sort =='Popular') {beats.sort((prev, next) => next.plays_count - prev.plays_count)}
        if (sort == 'Latest') {beats.reverse()}
        dispatch(SetFiltered(beats))


    }
}