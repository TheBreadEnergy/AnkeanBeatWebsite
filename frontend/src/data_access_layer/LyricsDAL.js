import {AddLyrics, SetWhereSave} from "../redux/Lyrics-reducer";
import {SetRhymes} from "../redux/Rhyme-reducer";
import axios from "axios";


export const GetSave = () => {
    return (dispatch) => {
    if(localStorage.getItem('whereSave')){dispatch(SetWhereSave(localStorage.getItem('whereSave')))}
    }
};

export const SetTrackText = (id,  text) => {
    return (dispatch,getState) => {
         let state = getState()
            let AllLyrics=state.Lyrics.Lyrics
             //checking if the archive is empty
            if (AllLyrics == undefined || AllLyrics == '') {
                if (text.length > 2) {
                    localStorage.setItem('text', JSON.stringify([{id: id, text: text}]))
                    dispatch(AddLyrics([{id: id, text: text}]))
                }
            }
            else {
                //checking whether this text is in the archive
                if (!AllLyrics.find(txt => txt.id === id)) {
                    AllLyrics.push({id: id, text: text})
                    localStorage.setItem('text', JSON.stringify(AllLyrics))
                } else {
                    for (var i = 0; i < AllLyrics.length; i++) {
                        if (AllLyrics[i].id == id) {
                            AllLyrics[i].text = text;
                            dispatch(AddLyrics(AllLyrics))
                            localStorage.setItem('text', JSON.stringify(AllLyrics))
                        }
                    }
                }

            }
    }
};

export const DeleteTrackText = (id) => {
    return (dispatch,getState) => {
                 let state = getState()
                 let AllLyrics=state.Lyrics.Lyrics
                if (AllLyrics.findIndex(txt => txt.id === id)!==-1) {
                    let index=AllLyrics.findIndex(txt => txt.id === id)
                    AllLyrics.splice(index, 1)
                    dispatch(AddLyrics(AllLyrics))
                    localStorage.setItem('text', JSON.stringify(AllLyrics))
                }

    }
};

export const getRhymes = (word, language) => {
    return (dispatch) => {
        if (language == 'rus') {
                let body = {"operationName":"searchRhyme","variables":{"word":word},"query":"query searchRhyme($word: String!) {\n  searchRhyme(word: $word)\n}"}
                axios.post(`${process.env.REACT_APP_RHYME_RUS}`,body).then(response => {
                let RhymeInfo = response.data.data.searchRhyme.slice(0, 50)
                if (RhymeInfo.length==0){RhymeInfo=[404]}
                dispatch(SetRhymes(RhymeInfo))
            })
        } else {
            axios.get(`${process.env.REACT_APP_RHYME_ENG}${word}`).then(response => {
                let RhymeInfo = response.data.slice(0, 50)
                let rhymes = []
                RhymeInfo.forEach(elem => rhymes.push(elem.word))
                if (rhymes.length==0){rhymes=[404]}
                dispatch(SetRhymes(rhymes))
            })
        }
    }
}

export const GetLyricsArr = () => {
     return (dispatch) => {
         if (localStorage.getItem('text')) {
             let Lyrics = JSON.parse(localStorage.getItem('text'))
             dispatch(AddLyrics(Lyrics));
         }
    };
};