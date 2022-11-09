import React, {useState} from 'react';
import {useParams, Navigate, Link} from "react-router-dom";
import {connect} from 'react-redux'
import {verify} from "../../redux/Auth-reducer";

const Activate = ({ verify }) =>{
    const [verified, setVerified] =useState(false);

    const { uid , token } = useParams();

    const verify_account = e => {

        verify(uid, token);
        setVerified(true)
    };

    if (verified){return <Navigate to='/login'/>}

    return (
        <div className="login-container">
            <span className='title-medium center'>Verify your account:</span>
            <button className='login-container__submit login-container__registration' onClick={verify_account} >
               <Link to='/login' >Verify!</Link>
            </button>

        </div>
    );
}

export default connect(null, {verify})(Activate);
