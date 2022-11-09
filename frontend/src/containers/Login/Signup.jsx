import React from 'react';
import {Link} from "react-router-dom";


function Signup() {

    return (
        <div className="signup-container">
            <Link to='/signup_with_email'>
                <button className='signup-container__button login-with-email' type="submit"> CONTINUE WITH EMAIL</button>
            </Link>
            <button className='signup-container__button login-with-google'type="submit" > CONTINUE WITH GOOGLE</button>
            <button className='signup-container__button login-with-google'type="submit"> CONTINUE WITH FACEBOOK</button>
            <Link to="/login" className="signup-container__signup">login now</Link>
        </div>
    );
}
export default Signup;