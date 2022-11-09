import React,{useRef} from 'react';
import {connect} from "react-redux";
import loadMassage from '../../assets/Img/send_load.svg'
import {getAlert,getAlertLoad} from "../../redux/Selectors";

function Alert({alert,loading}) {
    return (
        <>
            {alert!==null?<div className='alert'>{alert}</div>:null}
            {loading==true&&alert==null?<div className='alert'><img src={loadMassage} alt=""/></div>:null}
        </>
    );
}
const mapStateToProps = state =>({
    alert: getAlert(state),
    loading: getAlertLoad(state)
})

export default  connect (mapStateToProps, null) (Alert);