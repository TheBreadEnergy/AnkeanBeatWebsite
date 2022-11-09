import React,{useEffect} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {connect} from "react-redux";
import queryString from "query-string"
import {googleAuthenticate} from "../../data_access_layer/AuthReducerDAL.js";

const Google = ({ googleAuthenticate }) => {
    let location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const values = queryString.parse(location.search);
        const state = values.state ? values.state : null;
        const code = values.code ? values.code : null;

        if (state && code) {
            googleAuthenticate(state, code);
            navigate('/')
        }
    }, [location]);

    return (
        <></>
    );
};

export default connect(null, {googleAuthenticate})(Google);