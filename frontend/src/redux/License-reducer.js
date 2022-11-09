import cloneDeep from 'lodash.clonedeep'

export const SELECT_ID = 'SELECT_ID';
export const SET_LICENSE = 'SET_LICENSE';
export const CLOSE_LICENSE = 'CLOSE_LICENSE';


let initialState =
    {
        SelectId:0,
        LicenseInfo:{view:false, type:null, price:0, file:null},
    };


const LicenseReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_ID:{
        let stateCopy = cloneDeep(state)
            stateCopy.SelectId = action.id
            return stateCopy
         }
        case SET_LICENSE:{
        let stateCopy = cloneDeep(state)
            stateCopy.LicenseInfo.view = action.view
            stateCopy.LicenseInfo.type=action.typeLicense
            stateCopy.LicenseInfo.price=action.price
            stateCopy.LicenseInfo.file=action.file
            return stateCopy
        }
        case CLOSE_LICENSE:{
        let stateCopy = cloneDeep(state)
            stateCopy.LicenseInfo.view = false
            stateCopy.LicenseInfo.type=null
            stateCopy.LicenseInfo.price=null
            stateCopy.LicenseInfo.file=null
            return stateCopy
        }
        default:
            return state;
    }
}


export const SelectId = (id) => {
    return {
        type: SELECT_ID,
        id: id,
    }
}
export const SetLicenseInfo = (view,typeLicense,price,file) => {
    return {
        type: SET_LICENSE,
        view,
        typeLicense,
        price,
        file
    }
}
export const CloseLicense = () => {
    return {
        type: CLOSE_LICENSE,
    }
}



export default LicenseReducer;

