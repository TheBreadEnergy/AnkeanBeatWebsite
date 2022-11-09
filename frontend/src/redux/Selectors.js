//_________Selectors for playBar__________//
export const getPlayBar=(state)=>{
    return state.PlayBar
}
export const getPlayBarId=(state)=>{
    return state.PlayBar.id
}
export const getPlayBarView=(state)=>{
    return state.PlayBar.view
}
export const getPlaying=(state)=>{
    return state.PlayBar.playing
}
export const getPlayingFeaturedTrack=(state)=>{
    if(state.PlayBar.id==state.PlaylistPage.FeaturedTrackId){
     return state.PlayBar.playing
    }
}
export const getBeatsState=(state)=>{
     return state.PlaylistPage
}
//_________Selectors for LYRICS__________//
export const getLyricsWindowSize=(state)=>{
    return state.Lyrics.View
}
export const getLyrics=(state)=>{
    return state.Lyrics
}
export const getRhymesInfo=(state)=>{
    return state.Rhymes.rhymes
}
export const getRhymesLanguage=(state)=>{
    return state.Rhymes.language
}
//_________Selectors for WINDOWS__________//
export const getLicenseInfoWindowView=(state)=>{
    return state.SelectLicense.LicenseInfo.view
}
export const getLicenseStateInfo=(state)=>{
    return state.SelectLicense.LicenseInfo
}
export const getLicenseState=(state)=>{
    return state.SelectLicense
}
export const SelectLicenseId=(state)=>{
    return state.SelectLicense.SelectId
}

//_________Selectors for Playlist__________//
export const getTracks=(state)=>{
    return state.PlaylistPage.Playlist
}
export const getFetchInfo=(state)=>{
    return state.PlaylistPage.isFetching
}
export const getFeaturedTrack=(state)=>{
    return state.PlaylistPage.FeaturedTrackId
}
//_________Selectors for Cart__________//
export const getCartInfo=(state)=>{
    return state.Header.Cart
}
export const getBeatInCartInfo=(state)=>{
    return state.Header.Cart.BeatsIdInCart
}

//_________Selectors for Authenticated__________//
export const getAuthState=(state)=>{
    return state.Auth
}
export const getIsAuth=(state)=>{
    return state.Auth.isAuthenticated
}
export const getLoginFail=(state)=>{
    return state.Auth.loginFail
}
export const getUserStateInfo=(state)=>{
    return state.Auth.user
}
//_________Selectors for Settings__________//
export const getSettingsState=(state)=>{
    return state.Settings
}
export const getLanguage=(state)=>{
    return state.Settings.language
}
export const getAlert=(state)=>{
    return state.Settings.message
}
export const getAlertLoad=(state)=>{
    return state.Settings.messageLoad
}
//_________Selectors for Search__________//
export const getFilteredTracks=(state)=>{
    return state.SearchReducer.filtered
}
export const getSearchValue=(state)=>{
    return state.SearchReducer.value
}
export const getSearchType=(state)=>{
    return state.SearchReducer.type
}
export const getSearchBpm=(state)=>{
    return state.SearchReducer.bpm
}
export const getSearchMood=(state)=>{
    return state.SearchReducer.mood
}
export const getSearchGenre=(state)=>{
    return state.SearchReducer.genre
}
export const getSearchSort=(state)=>{
    return state.SearchReducer.sortBy
}