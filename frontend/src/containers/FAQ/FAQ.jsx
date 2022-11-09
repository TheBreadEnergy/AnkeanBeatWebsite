import React from 'react';
import {FAQImg} from "../../Img-bundle";
import {FaqBlock} from "../../File-bundle";

function FAQ() {

    return (
        <div className='faq'>
            <div className='faq__container max-layout-width'>
            <div className='faq__title title-max'>FAQ</div>
            <div className='faq__slogan'>
                <div className='faq__slogan-title title-max'> You will not miss your inspiration</div>
                <img src={FAQImg}  className='faq-img'/>
            </div>
                <div className='faq__sub-title title-medium'>In the future, there will be a full-fledged FAQ section related to the site, so far there will be some description of why it is needed, and further development plans</div>
                <FaqBlock title={<span>What is the meaning of the site and will it be used in the future</span>}
                          subtitle={<span>The site is a personal place of sale of instrumentals, and in the future, compositions will actually be sold on it</span>}/>
                <FaqBlock title={<span>Why react was chosen for development?</span>}
                          subtitle={<span><strong>React</strong> is an efficient, declarative, and flexible open-source JavaScript library for building simple, fast, and scalable frontends of web applications. React allows to create a SPA, which later can be increase</span>}/>
                <FaqBlock title={<span>What development tools were used</span>}
                          subtitle={<span>The project used:  library for managing and updating application state - <strong>redux</strong>, preprocessor scripting language that is interpreted or compiled into CSS - <strong>SCSS</strong>, <strong>redux-thunk</strong>, for animate some components - <strong>react-transition-group</strong>, to send emails used library - <strong>emailjs-com</strong> </span>}/>
                <FaqBlock title={<span>What are plans for further development of the project?</span>}
                          subtitle={<span>Change backend from Django to NodeJs, add a payment option, add an option to record a demo track with various effects</span>}/>
            </div>
        </div>
    );
}



export default FAQ;