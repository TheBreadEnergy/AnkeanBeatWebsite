import React, {useRef} from 'react';
import emailjs from 'emailjs-com'
import {connect} from "react-redux";
import {ENGLISH, SetMessageLoad, SetNotification} from "../../redux/Settings-reducer";
import {getAuthState, getLanguage} from "../../redux/Selectors";

function Contact({User,language,viewTitle,SetNotification,SetMessageLoad}) {
    const form = useRef()
    const sendEmail = (e) => {
        e.preventDefault();
        SetMessageLoad(true)
        emailjs.sendForm('service_j3ub2cu', 'template_im0qa3o', form.current, 'yU52UxXwhwefmHfD8')
            .then((result) => {
                SetNotification(result.text == 'OK' ? "Message sent" : 'Opps, problems')
            }, (error) => {
                SetNotification(error.text);
            });
        e.target.reset();
    };
    return (
        <>
            <form className="contact max-layout-width" ref={form} onSubmit={sendEmail}>
                    <div className="contact__container">
                        {viewTitle? <span className="contact__title title-min">{language==ENGLISH?"Contact":'Контакты'}</span>:null}
                        <div className="contact__input-informaition">
                            <div className="contact__first-string">
                                {User.isAuthenticated&&User.user?
                                    <>
                                         <textarea className="input-name" readOnly required value={`${User.user.first_name} ${User.user.last_name}`} placeholder={language==ENGLISH?"Your name":'Имя'} name="user_name"/>
                                         <textarea className="input-email" readOnly required type="email" value={User.user.email} placeholder={language==ENGLISH?"E-mail address":'E-mail'} name="user_email"/>
                                    </>
                                     :
                                    <>
                                     <input className="input-name"  required type="text" placeholder={language==ENGLISH?"Your name":'Имя'} name="user_name"/>
                                     <input className="input-email" required type="email" placeholder={language==ENGLISH?"E-mail address":'E-mail'} name="user_email" />
                                    </>
                                }
                            </div>

                            <input className="input-subject" type="text" required placeholder={language==ENGLISH?"Subject":'Тема сообщения'} name="subject"/>
                            <input className="input-message" type="text" required placeholder={language==ENGLISH?"Message":'Cообщение'} name="message"/>
                        </div>
                        <div className="contact__button">
                            <input  className="contact__submit-button" type="submit" value={language==ENGLISH?"SEND MESSAGE":'ОТПРАВИТЬ'}/>
                        </div>
                    </div>
            </form>
        </>
    );
}
const mapStateToProps = state =>({
    User:getAuthState(state),
    language: getLanguage(state)
})

export default  connect (mapStateToProps, {SetNotification,SetMessageLoad}) (Contact);