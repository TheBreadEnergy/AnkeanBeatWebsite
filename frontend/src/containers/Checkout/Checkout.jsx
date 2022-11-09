import React, {useState} from 'react';
import {connect} from 'react-redux';
import {CheckoutItem} from "../../File-bundle";
import {DeleteBeatFromCart} from "../../data_access_layer/CartReducerDAL";
import {SelectId} from "../../redux/License-reducer";
import {getCartInfo} from "../../redux/Selectors";
import {Link} from "react-router-dom";


function Сheckout({Cart,DeleteBeatFromCart,SelectId}) {
    const [purchase,setPurchase]=useState(false)

    let list = Cart.BeatsInfoInCart.map(beat =>
        <CheckoutItem
        key = {[beat.id, beat]}
        id = {beat.id}
        price = {beat.price}
        license = {beat.license}
        title = {beat.title}
        cover = {beat.cover}
        Delete = {DeleteBeatFromCart}
        SelectId = {SelectId}
        />
    )

    return (
            <section className='checkout'>
                <div className='checkout__container max-layout-width'>
                    {purchase?<><section className='window-background' onClick={()=>{document.body.style.overflowY = "scroll";setPurchase(false);}}>
                </section>
                    <section className='window'>
                        yes, it doesn't work yet
                        after processing the backend, a payment will be added here, read more in the
                        <Link to='/faq'>FAQ</Link>
                    </section></>
                    :<></>}
                    <div className='checkout__title'>
                    <h1 className='checkout__title-name'>YOUR CART</h1>
                </div>
                    <div className="checkout__cart-and-payments">

                    <section className="checkout__cart">
                        <div className='checkout__cart-title'>
                            <div>PRODUCT</div>
                            <div className='cart-title__price'>PRICE</div>
                        </div>
                        {list}
                    </section>
                    <section className="checkout__payments">
                        <div className="checkout__payments-container">
                            <div className='gross'><div>Gross:</div> <div>{Cart.CartPriceNow} $</div></div>
                            <div className='total'><div>Total:</div> <div>{Cart.CartPriceNow} $</div></div>
                            <div className="pay_paypal" onClick={()=>{setPurchase(true)}}>PAY WITH PAYPAL</div>
                        </div>
                    </section>
                </div>
                </div>
            </section>
    );
}


const mapStateToProps = state =>({
    Cart: getCartInfo(state),
})

export default connect (mapStateToProps, {DeleteBeatFromCart,SelectId})(Сheckout);