import React, {useState} from 'react';
import {Link, Navigate} from "react-router-dom";
import {connect} from 'react-redux'
import {signup} from "../../redux/Auth-reducer";
import {continueWithGoogle} from "../../data_access_layer/AuthReducerDAL.js"
import {SetNotification} from "../../redux/Settings-reducer";
import {getIsAuth} from "../../redux/Selectors";

const SignupWithEmail = ({signup,isAuthenticated,SetNotification}) =>{
    const [accountCreated, setAccountCreated] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        re_password: ''
    });

    const { first_name, last_name, email, password, re_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        if (password === re_password) {
            signup(first_name, last_name, email, password, re_password);
            setAccountCreated(true);
        }else{
           SetNotification('Passwords dont match')
        }
    };



    if (isAuthenticated){
        debugger
         return <Navigate to='/'/>
    }
    if (accountCreated){
        debugger
         return <Navigate to='/check_email'/>
    }
    return (
        <div className="login-container reg">
            <span className='login-container__title title-medium'>Create your account</span>
            <div className="login-container__registration">
                <form onSubmit={e => onSubmit(e)}>
                    <div className='login-container__input-container'>
                <input type="text" name='first_name' value={first_name} className='login-container__input-area' onChange={e=> onChange(e)} placeholder="first name" required></input>
                <input type="text" name='last_name' value={last_name} className='login-container__input-area' onChange={e=> onChange(e)} placeholder="last name" required></input>
                <input type="email" name='email' value={email} className='login-container__input-area' onChange={e=> onChange(e)} placeholder="Login or Email" required></input>
                <input type="password" name='password' value={password}  className='login-container__input-area' placeholder="Password" onChange={e=> onChange(e)} minLength='6' required></input>
                <input type="password" name='re_password' value={re_password}  className='login-container__input-area' placeholder="Confirm your password" onChange={e=> onChange(e)} minLength='6' required></input>
                    </div>
                        <button type='submit' className='login-container__submit register'>Register</button>
                </form>
            </div>
            <div className='login-container__or'>or</div>
            <button className='login-container__submit google'type="submit" onClick={()=>continueWithGoogle()}> Continue with google</button>
            <Link to="/login" >Already have an account? Sign in</Link>
        </div>
    );
}
const mapStateToProps = state =>({
    isAuthenticated: getIsAuth(state)
})

export default connect(mapStateToProps, {signup,SetNotification})(SignupWithEmail);