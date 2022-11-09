import React, {useEffect, useState} from 'react'
import classNames from 'classnames'
import {connect} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {SelectId, SetLicenseInfo} from "../../redux/License-reducer";
import {AddInCart} from "../../data_access_layer/CartReducerDAL";
import {ENGLISH,  SetNotification} from "../../redux/Settings-reducer";
import {ButtonBuy} from "../../Img-bundle";
import {getBeatInCartInfo, getLanguage} from "../../redux/Selectors";


function Button({buy,buyButtonLoad, beat,sideButtonLoad,buyLicense,buyExclusive,download,share,allTrack,SelectId,id,children,AddInCart,name, language,cart,licensingInfo,SetLicenseInfo,price,fileInfo,SetNotification}) {
    const [disable,setDisable]=useState(false)
    const [disableLicense,setDisableLicense]=useState(false)
    const navigate = useNavigate();

    useEffect(()=>{
        if(id){
            let findInCart=cart.find(e => e.id === id)
            if(findInCart){
                setDisable(true)
                if(buyLicense&&name==findInCart.license){
                    setDisableLicense(true)
                }
            }
            else {setDisable(false)}
        }
    },[cart])

    let Rights = () => {
        if (buy) {
            SelectId(id)
            document.body.style.overflowY = "hidden";
        }
        if(allTrack){
            navigate('/beats')
        }
        if(buyLicense){
            AddInCart(id,name)
            document.body.style.overflowY = "scroll";
            SelectId(0)
        }
        if(buyExclusive){
            document.body.style.overflowY = "scroll";
            return <Link to={`/beat/${id}`}></Link>
        }
        if(share){
            navigator.clipboard.writeText(`${process.env.REACT_APP_REACT}/beat/${id}`)
            SetNotification(language==ENGLISH?'Link copied':'Ссылка скопирована')
        }
        if(download){
            window.open(beat)
        }
        if(licensingInfo){
            document.body.style.overflowY = "hidden";
            SetLicenseInfo(true,name,price,fileInfo)
        }
    }
 return(

     <button
         className={classNames(
             {
                'button-buy': buy,
             },
             {
                'button-buy button-load': buyButtonLoad,
             },
             {
                'button-share button-load ': sideButtonLoad,
             },
             {
                 'button-buy license__btn': buyLicense,
             },
             {
                 'button-buy license__exclusive': buyExclusive,
             },
             {
                 'button-download': download,
             },
             {
                 'button-share': share,
             },
             {
                 'button-all-track': allTrack,

             },
             {
                 'licensing-info-button': licensingInfo,

             },
         )}
          onClick={Rights} disabled={disableLicense||buyButtonLoad||sideButtonLoad} >
         {disable&&buy||disableLicense?
             <>
                    <img className='in-cart-img' src={ButtonBuy} alt='buy'/>
                    <span className='in-cart'>
                        {language==ENGLISH?'IN CART':'В КОРЗИНЕ'}
                    </span>
             </>
             :children}
     </button>
 );
}
let mapStateToProps = state => ({
    cart: getBeatInCartInfo(state),
    language: getLanguage(state)
})


export default connect(mapStateToProps, {AddInCart,SelectId,SetLicenseInfo,SetNotification})(Button)

