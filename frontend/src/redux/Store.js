import {combineReducers, createStore, applyMiddleware} from "redux";
import PlayListReducer from "./PlayList-reducer";
import CartReducer from "./Cart-reducer";
import AuthReducer from "./Auth-reducer";
import LicenseReducer from "./License-reducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import LyricsReducer from "./Lyrics-reducer";
import PlayBarReducer from "./PlayBar-reducer";
import RhymeReducer from "./Rhyme-reducer";
import SettingsReducer from "./Settings-reducer";
import SearchReducer from "./Search-reducer";

const initialState ={};

const middleware = [thunk];

let reducers = combineReducers({
    PlaylistPage:PlayListReducer,
    Auth:AuthReducer,
    Header:CartReducer,
    SelectLicense:LicenseReducer,
    Lyrics:LyricsReducer,
    PlayBar:PlayBarReducer,
    Rhymes:RhymeReducer,
    Settings:SettingsReducer,
    SearchReducer: SearchReducer,
});

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)));
export default store