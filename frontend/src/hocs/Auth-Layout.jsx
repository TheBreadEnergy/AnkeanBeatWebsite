import React from 'react'
import {connect} from "react-redux";
import {checkAuthenticated, load_user} from "../redux/Auth-reducer";
import {GetInitLanguage} from "../redux/Settings-reducer";
import {GetPlaylist} from "../redux/PlayList-reducer";
import {GetLocalVolume} from "../data_access_layer/PlayBarDAL";
import {GetLyricsArr} from "../data_access_layer/LyricsDAL";


const AuthLayout = ({ checkAuthenticated, load_user, children,GetInitLanguage,GetPlaylist,GetLocalVolume,GetLyricsArr}) => {

    let AuthCheck = () => {
        checkAuthenticated();
        load_user();
        GetInitLanguage();
        GetPlaylist();
        GetLocalVolume()
        GetLyricsArr()
    };

    return (
        <>

            {AuthCheck()}
            {children}
        </>
    );
};

export default connect(null, { checkAuthenticated, load_user,GetInitLanguage,GetPlaylist,GetLocalVolume,GetLyricsArr})(AuthLayout);