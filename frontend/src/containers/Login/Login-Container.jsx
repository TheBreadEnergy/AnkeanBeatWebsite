import React, {useState} from 'react';
import {Link, Navigate} from "react-router-dom";
import {connect} from 'react-redux'
import {login} from "../../redux/Auth-reducer";

import {getIsAuth, getLoginFail} from "../../redux/Selectors";

const Login = ({login,isAuthenticated}) =>{
    const [formData, setFormData] = useState(
        {
            email:'',
            password:'',
        });

    const { email, password } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        login(email, password);
    };

    if (isAuthenticated){return <Navigate to='/'/>}

    return (
        <div className="login-container">
                <form onSubmit={e => onSubmit(e)}>
                    <div className='login-container__input-container'>
                <input type="email" name='email' value={email} className='login-container__input-area' onChange={e=> onChange(e)} placeholder="Login or email" required></input>
                <input type="password" name='password' value={password}  className='login-container__input-area' placeholder="Password" onChange={e=> onChange(e)} minLength='6' required></input>
                    </div>
                        <button type='submit' className='login-container__submit login' >Login</button>
                </form>

            <Link to="/signup" className="login-container__signup">Signup now</Link>
            <Link to="/reset_password" className="login-container__reset-password">Forgot your password?</Link>
        </div>
    );
}
const mapStateToProps = state =>({
    isAuthenticated: getIsAuth(state),
    loginFail: getLoginFail(state)
})

export default connect(mapStateToProps, {login})(Login);