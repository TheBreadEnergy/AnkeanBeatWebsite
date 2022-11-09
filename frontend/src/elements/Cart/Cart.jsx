import React from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {CartItem} from "../../File-bundle";
import {DeleteBeatFromCart} from "../../data_access_layer/CartReducerDAL";
import {ENGLISH} from "../../redux/Settings-reducer";
import {cartIco} from "../../Img-bundle";
import {getCartInfo, getLanguage} from "../../redux/Selectors";


function Cart({Cart,DeleteBeatFromCart,setTimer,setShowCart,Language}) {
    let list = Cart.BeatsInfoInCart.map(beat =>
        <CartItem
        key = {[beat.id, beat]}
        id = {beat.id}
        title ={beat.title}
        cover = {beat.cover}
        price = {beat.price}
        Delete = {DeleteBeatFromCart}
        />
    )

    return (
        <div className='Cart' onClick={() => {
            setTimer(false)
        }}>
            <div className="Cart__container">
                    {Cart.BeatsInfoInCart.length == 0 ?
                        <div className='Cart__container-empty'>
                            <img src={cartIco} />
                            <div className='sub-title'>{Language == ENGLISH ? 'Your cart is empty' : 'Ваша корзина пуста'}</div>
                            <div className='description'>{Language == ENGLISH ? 'When you add something to your cart, it will appear here' : 'Когда вы добавите что-то в свою корзину, оно появится здесь'}</div>
                        </div>
                        :
                        <>
                            <span
                                className="Cart__amount">{Language == ENGLISH ? 'Your cart ' : 'Ваша корзина '} : {Cart.BeatsInfoInCart.length == 0 ? null : (Cart.BeatsInfoInCart.length)}</span>
                            <div className="Cart__item">
                                {list}
                            </div>
                            <div className='Cart__buttons'>
                                <Link className="Cart__button" to="/checkout">
                                    <button className="Cart__button" onClick={() => setShowCart(false)}
                                            disabled={Cart.BeatsInfoInCart.length == 0}>{Language == ENGLISH ? 'PROCEED TO CHECKOUT' : 'ПЕРЕЙДИТЕ К ПОКУПКЕ'}</button>
                                </Link>
                                <Link to="/" className="Cart__shopping-button"
                                      onClick={() => setShowCart(false)}><span>{Language == ENGLISH ? 'CONTINUE SHOPPING' : 'ПРОДОЛЖИТЬ ПОИСК'}</span>
                                    <div className="triangle-right"></div>
                                </Link>
                            </div>
                        </>
                    }
            </div>
        </div>
    );
}


const mapStateToProps = state =>({
    Cart: getCartInfo(state),
    Language: getLanguage(state)
})

export default connect (mapStateToProps, {DeleteBeatFromCart})(Cart);