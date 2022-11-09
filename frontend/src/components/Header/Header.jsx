import React, { useEffect, useRef, useState} from 'react';
import {logo_min, MenuBurgerIco,Beats,Contact,FAQ,About,Buy,SerchIco} from '../../Img-bundle'
import {Cart,UserMenu} from "../../File-bundle";
import {Link, useNavigate} from "react-router-dom";
import {connect} from 'react-redux';
import {
    checkAuthenticated,
    load_user,
    googleAuthenticate,
} from "../../redux/Auth-reducer";
import {
    GetUserCart,
    GetUserLocalCart,
} from "../../data_access_layer/CartReducerDAL";
import {ENGLISH} from "../../redux/Settings-reducer";
import {SetSearchValue} from "../../redux/Search-reducer";
import {CSSTransition} from "react-transition-group";
import {getAuthState, getLanguage,getCartInfo} from "../../redux/Selectors";


let Header = React.memo(
    function Header({userCart, SetSearchValue,isAuthenticated, GetUserCart, GetUserLocalCart, language}) {
    const [showCart,setShowCart] = useState(false)
    const [timer,setTimer] = useState(false)
    const [toggle,setToggle] = useState(false)
    const [initCart,setInitCart] = useState(false)
    const [searchBox,setSearchBox] = useState(false)
    const [burgerMenu,setBurgerMenu] = useState(false)
    const [value, setValue] = useState('')

    const navigate = useNavigate();
    const searchBoxRef = useRef();
    const cartRef = useRef();
    const burgerMenuRef = useRef();
    const burgerMenuIcoRef = useRef();

    let Length = userCart.BeatsIdInCart.length

    let LengthCart = () => {
        if (Length > 0) {return <div className="length-cart">{Length}</div>}
    }
    useEffect(()=>{
        isAuthenticated.isAuthenticated ? GetUserCart() : GetUserLocalCart()
        Length = userCart.BeatsIdInCart.length
    },[isAuthenticated.isAuthenticated])

    /*_____________________function_for_close_popup_elements_____________________*/
    useEffect(() => {
    const checkIfClickedOutside = e => {
    if (searchBox && searchBoxRef.current && !searchBoxRef.current.contains(e.target) ) {setSearchBox(false)}}
    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {document.removeEventListener("mousedown", checkIfClickedOutside)}
  }, [searchBox])

     useEffect(() => {
    const checkIfClickedOutside = e => {
    if (showCart && cartRef.current && !cartRef.current.contains(e.target) ) {setShowCart(false)}}
    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {document.removeEventListener("mousedown", checkIfClickedOutside)}
  }, [showCart])

    useEffect(() => {
    const checkIfClickedOutside = e => {
    if (burgerMenu && burgerMenuRef.current && !burgerMenuRef.current.contains(e.target)&& !burgerMenuIcoRef.current.contains(e.target)) {setBurgerMenu(false)}}
    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {document.removeEventListener("mousedown", checkIfClickedOutside)}
  }, [burgerMenu])

        useEffect(() => {
        let lengthInfo=userCart.BeatsInfoInCart.length
        let lengthCart=userCart.BeatsIdInCart.length
            if (window.innerWidth > 768) {
                if (lengthInfo > 0 && lengthInfo == lengthCart) {
                    setInitCart(true)
                    if (initCart == true)
                        setShowCart(true)
                    if (!timer) {
                        setTimer(true)
                        setTimeout(() => {setToggle(!toggle)}, 2500);
                    }
                }
            }
        }, [userCart.BeatsIdInCart])

        //temporary solution for getting current timer value
        useEffect(() => {
            if (timer) {
                setShowCart(false);
                setTimer(false)
            }
        }, [toggle])

    const search=(value)=>{
       SetSearchValue(value)
       navigate('/beats')
    }

    return (
        <>
            <header className="header">
                <div className="header-container">
                    <div className="header__burger-menu menu " ref={burgerMenuIcoRef} onClick={() => setBurgerMenu(!burgerMenu)}>
                        <img src={MenuBurgerIco} className="burger-icon"/>
                    </div>
                    <Link to="/" alt="Logo" className="header-container__lable lable" id="lable_header">
                        <img src={logo_min}/>
                        <span>Ankean beats</span>
                    </Link>
                    <nav className="menu">
                        <ul className={`${!burgerMenu ? 'menu__list' : 'burger-menu'} ${searchBox ? 'close' : ''}`} ref={burgerMenuRef}>
                            <li>
                                <img className="menu__icon" src={Beats} alt=""/>
                                <Link to="/beats" className="menu__link"
                                      onClick={() => setBurgerMenu(false)}>{language == ENGLISH ? 'Beats' : 'Биты'}</Link>
                                <div className="border"></div>
                            </li>
                            <li>
                                <img className="menu__icon" src={Contact} alt=""/>
                                <Link to="/contact" className="menu__link"
                                      onClick={() => setBurgerMenu(false)}>{language == ENGLISH ? 'Contact' : 'Контакты'}</Link>
                                <div className="border"></div>
                            </li>
                            <li>
                                <img className="menu__icon" src={FAQ} alt=""/>
                                <Link to="/faq" className="menu__link" onClick={() => setBurgerMenu(false)}>FAQ</Link>
                                <div className="border"></div>
                            </li>
                            <li>
                                <img className="menu__icon" src={About} alt=""/>
                                <Link to="/about" className="menu__link"
                                      onClick={() => setBurgerMenu(false)}>{language == ENGLISH ? 'About' : 'Информация'}</Link>
                                <div className="border"></div>
                            </li>
                        </ul>
                        <div className="menu__buy-log-user">
                            <div className={`link-search ${searchBox ? '_open' : null}`} ref={searchBoxRef}>
                                <input type="text"
                                       value={value}
                                       placeholder={language == ENGLISH ? "Search beats" : "Поиск битов"}
                                       onChange={(event => {setValue(event.target.value)})}
                                       onKeyDown={(event => {
                                           if (event.keyCode === 13) {
                                               search(value);
                                               setSearchBox(false);
                                               setValue('')
                                           }
                                       })}
                                       className={`link-search__input${searchBox ? '_open' : null}`}/>
                                <div className="link-search__button" onClick={() => setSearchBox(!searchBox)}>
                                    <img src={SerchIco}/>
                                    <div className="border"></div>
                                </div>
                            </div>
                            <div className="link-buy" onClick={() => {
                                setShowCart(!showCart);
                                setTimer(false)
                            }} ref={cartRef}>
                                <img src={Buy}/>
                                {LengthCart()}
                                <span className="menu__link">{userCart.CartPriceNow}$</span>
                                <div className="border"></div>
                                <CSSTransition
                                    in={showCart}
                                    timeout={300}
                                    classNames="Cart"
                                    mountOnEnter
                                    unmountOnExit
                                >
                                    <Cart setShowCart={setShowCart} setTimer={setTimer}/>
                                </CSSTransition>
                            </div>
                            <UserMenu setShowCart={setShowCart}/>
                        </div>
                    </nav>
                </div>
            </header>
        </>
    );
}
)

const mapStateToProps = state =>({
    isAuthenticated: getAuthState(state),
    userCart:  getCartInfo(state),
    language: getLanguage(state)
})

export default connect (mapStateToProps, {checkAuthenticated, load_user,  googleAuthenticate, GetUserCart, GetUserLocalCart,SetSearchValue})(Header);