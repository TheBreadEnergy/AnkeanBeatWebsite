import React from 'react';


function CheckoutItem(props) {

    return (
            <li className="checkout-item" >
                <div className="checkout-item__icon-name">
                    <span className="checkout-item__track-icon"><img src={props.cover} alt='icon'/></span>
                    <span className="checkout-item__track-name" onClick={()=>props.SelectId(props.id)}>
                    <div >{props.title}</div>
                        <div className='checkout-item__track-license'>
                            {props.license}
                        </div>
                    </span>
                </div>

                <div className="checkout-item__track-price"><span>$</span>{props.price}</div>
                <div className="checkout-item__close" onClick={()=> {props.Delete(props.id)}}></div>
            </li>
    );
}

export default CheckoutItem;