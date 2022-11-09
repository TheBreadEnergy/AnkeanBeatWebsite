import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {SearchPlaylist,SelectTypesWindow} from "../../File-bundle";
import {GetPlaylist} from "../../redux/PlayList-reducer";
import {ENGLISH} from "../../redux/Settings-reducer";
import {SetSearchValue} from "../../redux/Search-reducer";
import {filterBeats} from "../../data_access_layer/SearchDAL";
import {
    getFetchInfo,
    getFilteredTracks,
    getSearchBpm, getSearchGenre, getSearchMood, getSearchSort,
    getSearchType,
    getSearchValue,
    getSettingsState
} from "../../redux/Selectors";


function Beats({Search, typeBeats,bpmBeats,moodBeats,genreBeats,sortByBeats,filterBeats, Settings,SetSearchValue,filteredTracks,isFetching}) {
    const [type, setType] = useState(typeBeats[0])
    const [bpm, setBpm] = useState(bpmBeats[0])
    const [mood, setMood] = useState(moodBeats[0])
    const [genres, setGenres] = useState(genreBeats[0])
    const [sort, setSort] = useState(sortByBeats[0])

    useEffect(()=>{
        filterBeats(type,bpm,mood,genres,sort)
    },[type,bpm,mood,genres,sort,Search])

    return (
        <>
            <section className='beat-search '>
                <section className='beat-search__container max-layout-width-medium'>
                    <div className='beat-search__title title-max'>Beats</div>
                    <div className="beat-search__search">
                        <div className='beat-search__dropdown'>
                            <SelectTypesWindow value={type} setValue={setType} valueArr={typeBeats}/>
                            <SelectTypesWindow value={bpm} setValue={setBpm} valueArr={bpmBeats}/>
                            <SelectTypesWindow value={mood} setValue={setMood} valueArr={moodBeats}/>
                            <SelectTypesWindow value={genres} setValue={setGenres} valueArr={genreBeats}/>
                            <SelectTypesWindow value={sort} setValue={setSort} valueArr={sortByBeats}/>
                        </div>
                        <input
                            className="search__area"
                            type="text"
                            value={Search == null ? '' : Search}
                            placeholder={Settings.language == ENGLISH ? "What type of track are you looking for" : "Какой тип треков ищите?"}
                            onChange={(event => SetSearchValue(event.target.value))}
                        />

                    </div>

                </section>
                <section className='beat-search__result'>
                    <SearchPlaylist Playlist={filteredTracks} isFetching={isFetching}></SearchPlaylist>
                </section>
            </section>
        </>
    );
}

const mapStateToProps = state => ({
    filteredTracks: getFilteredTracks(state),
    isFetching: getFetchInfo(state),
    Settings: getSettingsState(state),
    Search: getSearchValue(state),
    typeBeats:getSearchType(state),
    bpmBeats:getSearchBpm(state),
    moodBeats:getSearchMood(state),
    genreBeats: getSearchGenre(state),
    sortByBeats: getSearchSort(state),
})

export default connect(mapStateToProps, {GetPlaylist,SetSearchValue,filterBeats})(Beats);