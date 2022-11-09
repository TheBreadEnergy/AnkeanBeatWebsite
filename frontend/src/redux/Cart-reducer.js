import cloneDeep from 'lodash.clonedeep'
import {DeleteInfo} from "../data_access_layer/CartReducerDAL";
import {SelectId} from "./License-reducer";

export const SET_USER_CART = 'SET_USER_CART';
export const ADD_CART = 'ADD_CART';
export const DELETE_BEAT = 'DELETE_BEAT';
export const ADD_BEAT_PRICE = 'ADD_BEAT_PRICE';
export const ADD_BEATS_INFO = 'ADD_BEATS_INFO';
export const DELETE_BEATS_INFO = 'DELETE_BEATS_INFO';
export const CLEAR_BEATS_INFO = 'CLEAR_BEATS_INFO';


let initialState =
    {
        Cart: {CartPriceNow: 0, BeatsIdInCart: [], BeatsInfoInCart: []},
    };


const CartReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_CART:
        case ADD_CART:
        case DELETE_BEAT: {
            let stateCopy = cloneDeep(state)
            SelectId(0)
            stateCopy.Cart.BeatsIdInCart = action.BeatsIdInCart
            return stateCopy
        }
        case ADD_BEAT_PRICE:{
            let stateCopy = cloneDeep(state)
            stateCopy.Cart.CartPriceNow = stateCopy.Cart.CartPriceNow+action.price
            return stateCopy
        }

        case ADD_BEATS_INFO: {
            let stateCopy = cloneDeep(state)
            DeleteInfo(stateCopy,action.beat.id)//this function is triggered only when the object in the array has an object with the same id (use for change licensing type) (rework)
            stateCopy.Cart.BeatsInfoInCart.push(action.beat)
            return stateCopy

        }
        case DELETE_BEATS_INFO: {
            let stateCopy = cloneDeep(state)
            DeleteInfo(stateCopy, action.id)
            return stateCopy
        }
        case CLEAR_BEATS_INFO:{
            let stateCopy = cloneDeep(state)
            stateCopy.Cart.BeatsInfoInCart =[]
            stateCopy.Cart.CartPriceNow = 0
            return stateCopy
        }
        default:
            return state;
    }
}
export const ClearBeatsInfo = () => {
    return {
        type: CLEAR_BEATS_INFO,
    }
}

export const AddCart = (BeatsIdInCart) => {
    return {
        type: ADD_CART,
        BeatsIdInCart: BeatsIdInCart,
    }
}

export const setUserCart = (BeatsIdInCart) => {
    return {
        type: SET_USER_CART ,
        BeatsIdInCart: BeatsIdInCart,
    }
}

export const AddBeatInfo = (beat) => {
    return {
        type: ADD_BEATS_INFO,
        beat: beat,
    }
}

export const AddBeatPrice = (price) => {
    return {
        type: ADD_BEAT_PRICE,
        price: price,
    }
}

export const deleteBeatsInfo = (id) => {
    return {
        type: DELETE_BEATS_INFO,
        id: id,
    }
}


export const DeleteInCart = (BeatsIdInCart) => {
    return {
        type: DELETE_BEAT,
        BeatsIdInCart: BeatsIdInCart,
    }
}


export default CartReducer;

