import React, {useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import {connect} from "react-redux";
import {reset_password_confirm} from "../../redux/Auth-reducer";

const ResetPasswordConfirm = ({reset_password_confirm}) =>{
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState(
        {
            new_password:'',
            re_new_password:''
        });
    const { new_password, re_new_password } = formData;
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const { uid , token } = useParams();

    const onSubmit = e => {
        e.preventDefault();
        reset_password_confirm(uid, token, new_password, re_new_password);
        setRequestSent(true);
    };

    if (requestSent){
         return <Navigate to='/login'/>
    }

    return (
        <div className="login-container">
            <div>
                <form onSubmit={e => onSubmit(e)}>
                <input type="password" name='new_password' value={new_password}  className='login-container__input-area' placeholder=" New Password" onChange={e=> onChange(e)} minLength='6' required></input>
                <input type="password" name='re_new_password' value={re_new_password}  className='login-container__input-area' placeholder=" Confiirm New Password" onChange={e=> onChange(e)} minLength='6' required></input>
                <button className='login-container__submit' type='submit'>RESET PASSWORD</button>
                </form>
            </div>
        </div>
    );
}


export default connect(null, {reset_password_confirm})(ResetPasswordConfirm)