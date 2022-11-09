import React from 'react';
import {img404} from "../../Img-bundle";
import {Link} from "react-router-dom";

function Eror() {
    return (
       <section className='eror-page'>
           <div className='eror-page__title title-medium'>Oo0_oppps, page not found</div>
           <img className='eror-page__img' src={img404} alt=""/>
           <Link to='/' className='sub-title'>Go back to the main page</Link>
           <div></div>
       </section>

    );
}
export default Eror;