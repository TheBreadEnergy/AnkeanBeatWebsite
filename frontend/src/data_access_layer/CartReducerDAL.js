import axios from "axios";
import {
    AddBeatInfo,
    AddCart,
    deleteBeatsInfo,
    DeleteInCart,
    setUserCart,
    ClearBeatsInfo,
    AddBeatPrice
} from "../redux/Cart-reducer";


export const GetUserLocalCart = () => {

    return (dispatch) => {
        if(localStorage.getItem('cart')) {

            let LocalCart = JSON.parse(localStorage.getItem('cart'))
            dispatch(setUserCart(LocalCart))

            if (LocalCart.length > 0) {
                dispatch(ClearBeatsInfo())
                LocalCart.forEach((item) => {
                    dispatch(GetBeatInfo(item.id,item.license))
                })
            }
        }
        else{
            localStorage.setItem('cart','')
        }
    }
};

export const GetUserCart = () => {
    return (dispatch) => {
        let config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };
        axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config).then(response => {
            let localCart = localStorage.getItem('cart')
            if(localCart!=='')
            {localCart=JSON.parse(localStorage.getItem('cart'),['id', 'license'])}
            //Transferring data from the user's local cart to the network one, provided that the network cart is empty, and the local one does not exist at the same time equal to ""
            if (localCart && !localCart == '' && response.data.cart == '') {
                localStorage.removeItem('cart')
                localCart=JSON.stringify(localCart,['id', 'license'])
                let body = JSON.stringify({cart: localCart})
                axios.patch(`${process.env.REACT_APP_API_URL}/auth/users/me/`, body, config).then(
                    axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config).then(response => {
                        let cart = JSON.parse(response.data.cart)
                        dispatch(setUserCart(cart));
                        dispatch(ClearBeatsInfo())
                        cart.forEach((item) => {
                            dispatch(GetBeatInfo(item.id,item.license))
                        })

                    })
                )
            } else {
                let cart = JSON.parse(response.data.cart)
                if(localCart){localStorage.removeItem('cart')}
                dispatch(setUserCart(cart));
                dispatch(ClearBeatsInfo())
                cart.forEach((item) => {
                    dispatch(GetBeatInfo(item.id,item.license))
                })
            }
        });
    }

};

export const AddInCart = (id,license) => {
    return (dispatch) => {
        //if the user is registered
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                    'Accept': 'application/json'
                }
            };
            axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config).then(response => {
                let stateCopy = response.data.cart==''?[]:JSON.parse(response.data.cart)
                let includeId = stateCopy.find(e => e.id === id)
                //checking for id in the shopping cart
                if (!includeId) {
                    stateCopy.push({id:id,license:license})
                    dispatch(AddCart(stateCopy))
                    dispatch(GetBeatInfo(id,license))
                    stateCopy=JSON.stringify(stateCopy,['id', 'license'])
                    const body = JSON.stringify({cart: stateCopy});
                    axios.patch(`${process.env.REACT_APP_API_URL}/auth/users/me/`, body, config)
                }
                //if there is already a product with such an id, then you can change the license type for it
                else {
                    for (let i = 0; i < stateCopy.length; i++) {
                        if (stateCopy[i].id == id && stateCopy[i].license !== license) {
                            stateCopy[i].license = license
                            dispatch(AddCart(stateCopy))
                            dispatch(GetBeatInfo(id,license))
                            stateCopy=JSON.stringify(stateCopy,['id', 'license'])
                            const body = JSON.stringify({cart: stateCopy});
                            axios.patch(`${process.env.REACT_APP_API_URL}/auth/users/me/`, body, config)
                            break;
                        }
                    }
                }
            });
        }
        //if the user is not registered
        else {
                //user does not have a local cart
            if (!localStorage.getItem('cart')) {
                let stateCopy = []
                stateCopy.push({id:id,license:license})
                const body = JSON.stringify(stateCopy);
                localStorage.setItem('cart', body)
                dispatch(AddCart(stateCopy))
                dispatch(GetBeatInfo(id,license))
            }
            //user has a local cart
            else {
                let stateCopy = JSON.parse(localStorage.getItem('cart'));
                let includeId = stateCopy.find(e => e.id === id)
                 //checking for id in the shopping cart
                if (!includeId) {
                    stateCopy.push({id:id,license:license})
                    dispatch(AddCart(stateCopy))
                    dispatch(GetBeatInfo(id,license))
                    let body = JSON.stringify(stateCopy);
                    localStorage.setItem('cart', body)
                }
                //there is already a product with such an id, change the license type
                else {
                    for (let i = 0; i < stateCopy.length; i++) {
                        if (stateCopy[i].id == id && stateCopy[i].license !== license) {
                            stateCopy[i].license = license
                            dispatch(AddCart(stateCopy))
                            dispatch(GetBeatInfo(id,license))
                            let body = JSON.stringify(stateCopy);
                            localStorage.setItem('cart', body)
                            break;
                        }
                    }
                }

            }
        }

    }
}

export const DeleteBeatFromCart = (id) => {

    return (dispatch) => {
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                    'Accept': 'application/json'
                }
            };
            try {
                    axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config).then(response => {
                    let stateCopy = JSON.parse(response.data.cart);
                    stateCopy.forEach((item) => {
                        if (item.id == id) {
                            stateCopy.splice(stateCopy.indexOf(item), 1)
                            dispatch(DeleteInCart(stateCopy))
                            dispatch(deleteBeatsInfo(id))
                            stateCopy=JSON.stringify(stateCopy,['id', 'license'])
                            const body = JSON.stringify({cart: stateCopy});
                            axios.patch(`${process.env.REACT_APP_API_URL}/auth/users/me/`, body, config)
                        } else {
                            console.log(`none (id: ${id})`)
                        }
                    });
                });
            } catch (err) {
                console.log('err')
            }
        }
        //delete beat from local store
        else {
            if (localStorage.getItem('cart')) {
                let stateCopy = JSON.parse(localStorage.getItem('cart'));
                stateCopy.forEach((item) => {
                    if (item.id == id) {
                        stateCopy.splice(stateCopy.indexOf(item), 1)
                        dispatch(DeleteInCart(stateCopy))
                        dispatch(deleteBeatsInfo(id))
                        let body = JSON.stringify(stateCopy);
                        localStorage.setItem('cart', body)
                    }

                });
            }
        }
    }
}

export const GetBeatInfo = (id,license) => {
    return (dispatch) => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/playlist/?limit=1&offset=${id - 1}`).then(response => {
            let price
            if(license=="MP3"){price=response.data.results[0].mp3Price}
            if(license=="WAV"){price=response.data.results[0].wavPrice}
            if(license=="Trackout"){price=response.data.results[0].trackout}
            if(license=="Unlimited"){price=response.data.results[0].unlimited}
            let beat = {
                    id: response.data.results[0].id,
                    price: price,
                    title: response.data.results[0].title,
                    cover: response.data.results[0].cover,
                    license:license,
            }
            dispatch(AddBeatPrice(price))
            return dispatch(AddBeatInfo(beat))
        })

}
}

export const DeleteInfo = (stateCopy, id) => {
    stateCopy.Cart.BeatsInfoInCart.forEach((item) => {
        if (item.id === id) {
            stateCopy.Cart.CartPriceNow=stateCopy.Cart.CartPriceNow-item.price
            stateCopy.Cart.BeatsInfoInCart.splice(stateCopy.Cart.BeatsInfoInCart.indexOf(item), 1);
        }
    })
    return stateCopy
}


