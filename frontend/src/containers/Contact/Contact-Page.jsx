import React from 'react';
import Contact from "./Contact";
function ContactPage() {

    return (
        <section className='contact-page'>
            <div className='title-max'>Contact</div>
            <Contact viewTitle={false}/>
        </section>
    );
}


export default ContactPage;