import React, {useState} from 'react';
import {connect} from "react-redux";
import {Expand_more_white as expand} from "../../Img-bundle";
import {Link} from "react-router-dom";
import {resetFirstName,resetLastName,reset_password} from "../../redux/Auth-reducer";
import {ENGLISH, RUSSIAN, SelectLanguage} from "../../redux/Settings-reducer";
import {getSettingsState, getUserStateInfo} from "../../redux/Selectors";


function ProfilePage({User,resetFirstName,resetLastName,reset_password,Settings,SelectLanguage}) {
    const [settings, setSettings]=useState(true)
    const [notifications, setNotifications]=useState(false)
    const [safety, setSafety]=useState(false)
    const [firstNameChange, setFirstNameChange]=useState(false)
    const [lastNameChange, setLastNameChange]=useState(false)
    const [passwordChange, setPasswordChange]=useState(false)
    const [value, setValue]=useState('')
    const [toogleLang, setToogleLang] = useState(false)

    const settingsElement = () => {
        return(
        <div className='profile__user-info user-info max-layout-width-medium'>
            <p className='user-info__title title-max'>{Settings.language==ENGLISH?'Your account':'Ваш профиль'}</p>
            <p className='user-info__subtitle'>{Settings.language==ENGLISH?'Basic information that you use in Ankean site':'Основная информация, которую вы используете на Ankean site'}</p>
                <div className='user-info__item profile-item'>
                    <div className='profile-item__title'>{Settings.language==ENGLISH?'FIRST NAME':'ИМЯ'} :</div>
                    <div className='name-block'>
                        {firstNameChange?
                        <>
                            <input className="input-lastname" maxlength="150" type="text" placeholder={Settings.language==ENGLISH?'"Enter your first name"':'Введите имя'}
                                   onChange={(event => setValue(event.target.value))}
                                   onKeyDown={(event => event.keyCode === 13?(value.length>2?(setFirstNameChange(false),resetFirstName(value)):setFirstNameChange(false)):null)}/>
                            <span className='name-block__change' onClick={()=>value.length>2?(setFirstNameChange(false),resetFirstName(value)):setFirstNameChange(false)}>{Settings.language==ENGLISH?'Save':'Сохранить'}</span>
                        </>
                            :
                        <>
                            <span className='name-block__name'>{User.first_name}</span>
                            <span className='name-block__change' onClick={()=>(setFirstNameChange(true),setLastNameChange(false))}>{Settings.language==ENGLISH?'Change':'Изменить'}</span>
                        </>

                    }
                    </div>
                </div>
                <div className='user-info__item profile-item'>
                <div className='profile-item__title'>{Settings.language==ENGLISH?'LAST NAME':'ФАМИЛИЯ'} :</div>
                <div className='name-block'>
                    {lastNameChange?
                        <>
                            <input className="input-lastname" type="text" maxlength="150" placeholder={Settings.language==ENGLISH?'Enter your last name':'Введите фамилию'}
                                   onChange={(event => setValue(event.target.value))}
                                   onKeyDown={(event => event.keyCode === 13?(value.length>2?(setLastNameChange(false),resetLastName(value)):setLastNameChange(false)):null)}/>
                            <span className='name-block__change' onClick={()=>value.length>2?(setLastNameChange(false),resetLastName(value)):setLastNameChange(false)}>{Settings.language==ENGLISH?'Save':'Сохранить'}</span>
                        </>
                         :
                        <>
                            <span className='name-block__name'>{User.last_name}</span>
                            <span className='name-block__change' onClick={()=>(setLastNameChange(true),setFirstNameChange(false))}>{Settings.language==ENGLISH?'Change':'Изменить'}</span>
                        </>

                    }


                </div>
            </div>
                <div className='user-info__item profile-item'>
                <div className='profile-item__title'>{Settings.language==ENGLISH?'EMAIL ADDRESS':'EMAIL'} :</div>
                <div className='name-block'>
                    <span className='name-block__name'>{User.email}</span>
                </div>
            </div>
                <div className='user-info__item profile-item'>
                <div className='profile-item__title'>{Settings.language==ENGLISH?'LANGUAGE':'ЯЗЫК'} :</div>
                <div className='profile-item__name-block name-block'onClick={()=>setToogleLang(!toogleLang)}>
                    <span className={`name-block__name ${toogleLang?'disabled':null}`}>{toogleLang?(Settings.language==ENGLISH?'Select Language':'Выберите язык'):(Settings.language==ENGLISH?Settings.language:'Русский')}</span>
                    {toogleLang?
                       <div className='name-block__name popup-menu'>
                            <div className='name-block__name elem' onClick={()=>SelectLanguage(ENGLISH)}>English</div>
                           <div className='name-block__name elem' onClick={()=>SelectLanguage(RUSSIAN)}>Русский</div>
                       </div>
                        :
                        <img src={expand} alt="" />
                    }
                </div>
            </div>
            </div>
        )
    }
    const notificationsElement = () => {
        return(
        <div className='profile__user-info user-info max-layout-width-medium'>
            <div> It's empty :( read more about development plans in the <Link to='/faq' className='linkTo'>FAQ</Link> </div>
        </div>
        )
    }
    const safetyElement = () => {
        return(
        <div className='profile__user-info user-info max-layout-width-medium'>
            <p className='user-info__title title-max'>{Settings.language==ENGLISH?'User Security Settings':'Настройки безопасности'}</p>
            <p className='user-info__subtitle'>{Settings.language==ENGLISH?'Manage your password':'Управляйте своим паролем'}</p>
                <div className='user-info__item profile-item'>
                    <div className='profile-item__title'>{Settings.language==ENGLISH?'PASSWORD':'ПАРОЛЬ'} :</div>
                    <div className='name-block'>
                        {passwordChange?
                             <span className='name-block__change static' >{Settings.language==ENGLISH?'Check your email address ':'Проверьте вашу почту '}( {User.email} )</span>
                            :
                            <span className='name-block__change' onClick={()=>(setPasswordChange(true),reset_password(User.email))}>{Settings.language==ENGLISH?'Change':'Изменить'}</span>
                        }

                    </div>
                </div>
            </div>
        )
    }

    return (
        <section className='profile'>
            <div className='profile__container max-layout-width'>
                {User ? <>
                    <div className='profile__category category'>
                        <div className={`category__item ${settings ? 'item-active' : ''}`} onClick={() => {
                            setSettings(true);
                            setNotifications(false);
                            setSafety(false)
                        }}>{Settings.language == ENGLISH ? 'Settings' : 'Настройки'}</div>
                        <div className={`category__item ${notifications ? 'item-active' : ''}`} onClick={() => {
                            setSettings(false);
                            setNotifications(true);
                            setSafety(false)
                        }}>{Settings.language == ENGLISH ? 'Notifications' : 'Уведомления'} </div>
                        <div className={`category__item ${safety ? 'item-active' : ''}`} onClick={() => {
                            setSettings(false);
                            setNotifications(false);
                            setSafety(true)
                        }}>{Settings.language == ENGLISH ? 'Safety' : 'Безопасность'}</div>
                    </div>
                    {settings ? settingsElement() : null}
                    {notifications ? notificationsElement() : null}
                    {safety ? safetyElement() : null}
                </> : null}
            </div>

        </section>
    );
}

const mapStateToProps = state =>({
    User:getUserStateInfo(state),
    Settings: getSettingsState(state)
})

export default  connect (mapStateToProps, {resetFirstName,resetLastName,reset_password,SelectLanguage}) (ProfilePage);