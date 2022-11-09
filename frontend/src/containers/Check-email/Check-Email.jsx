import React from 'react';
import {Link} from "react-router-dom";


function CheckEmail() {

    return (
        <div className="check-email column">
                <span className='title-medium check-email__title'>Check you email address</span>
                <Link to={'/'} className='check-email__sub-title'>Go to the main page</Link>
        </div>
    );
}
export default CheckEmail;