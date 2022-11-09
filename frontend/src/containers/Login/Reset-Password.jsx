import React, {useState} from "react";
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";
import {reset_password} from "../../redux/Auth-reducer";

const ResetPassword = ({reset_password}) =>{
      const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({email:''});
    const {email} = formData;
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
    const onSubmit = e => {
        e.preventDefault();
        reset_password(email);
        setRequestSent(true);
    };

    if (requestSent){
         return <Navigate to='/check_email'/>
    }

    return (
        <div className="login-container">
            <div>
                <form onSubmit={e => onSubmit(e)}>
                <input type="email" name='email' value={email} className='login-container__input-area' onChange={e=> onChange(e)} placeholder="Login or email" required></input>
                <button type='submit' className='login-container__submit'>RESET PASSWORD</button>
                </form>
            </div>
        </div>
    );
}


export default connect(null, {reset_password})(ResetPassword);