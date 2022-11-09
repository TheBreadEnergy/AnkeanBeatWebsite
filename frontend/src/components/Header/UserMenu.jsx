import React, {useEffect, useRef, useState} from 'react';
import {LoginIco,LuricsIco,PurchasesIco,Acount,LogOutIco} from "../../Img-bundle";
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {logout} from "../../redux/Auth-reducer";
import {ENGLISH} from "../../redux/Settings-reducer";
import {SetNotification} from "../../redux/Settings-reducer";
import {CSSTransition} from "react-transition-group";
import {getAuthState, getLanguage} from "../../redux/Selectors";


let UserMenu = React.memo(
    function Header({isAuthenticated, setShowCart, logout,language, SetNotification}) {
    const [showMenu, setShowMenu] = useState(false);

    const menuRef = useRef();

    /*_____________________function_for_close_popup_elements_____________________*/
    useEffect(() => {
    const checkIfClickedOutside = e => {
      if (showMenu && menuRef.current && !menuRef.current.contains(e.target)) {setShowMenu(false)}
    }
    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {document.removeEventListener("mousedown", checkIfClickedOutside)}
  }, [showMenu])


        return (
            <>
                {isAuthenticated.isAuthenticated ?
                    <section ref={menuRef}>
                        <div className="link-login" onClick={() => {
                            setShowMenu(!showMenu);
                            setShowCart(false)
                        }}>
                            <img src={Acount} alt=""/>
                            <span
                                className="link-login__name">{isAuthenticated.user ? isAuthenticated.user.first_name : 'User'}</span>
                            <div className="border"></div>
                        </div>
                        <CSSTransition
                            in={showMenu}
                            timeout={300}
                            classNames="profile-menu"
                            mountOnEnter
                            unmountOnExit
                        >
                            <div className='profile-menu'>
                                <Link to='/profile' className='profile-menu__item' onClick={() => {
                                    setShowMenu(false)
                                }}><img src={LoginIco}
                                        alt=""/><span> {language == ENGLISH ? 'Account' : 'Профиль'}</span></Link>
                                <Link to='/lyrics' className='profile-menu__item' onClick={() => {
                                    setShowMenu(false)
                                }}><img src={LuricsIco} alt=""/><span>{language == ENGLISH ? 'Lurics' : 'Текста'}</span></Link>
                                <div className='profile-menu__item' onClick={() => {
                                    setShowMenu(false);
                                    SetNotification(language == ENGLISH ? 'In development' : 'В разработке')
                                }}><img src={PurchasesIco}
                                        alt=""/><span>{language == ENGLISH ? 'Purchases' : 'Покупки'}</span></div>
                                <div className='profile-menu__item' onClick={() => {
                                    logout();
                                    setShowMenu(false)
                                }}><img src={LogOutIco} alt=""/>
                                    <span> {language == ENGLISH ? 'Log Out' : 'Выйти'}</span></div>
                            </div>
                        </CSSTransition>

                    </section>
                    :
                    <Link to="/login" className="link-login">
                        <img src={Acount} alt=""/>
                        <span className="menu__link">{language == ENGLISH ? 'Login in' : 'Войти'}</span>
                        <div className="border"></div>

                    </Link>
                }

            </>
        );
}
)

const mapStateToProps = state =>({
    isAuthenticated: getAuthState(state),
    language: getLanguage(state)
})

export default connect (mapStateToProps, {logout, SetNotification})(UserMenu);