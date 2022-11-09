import React from 'react';
import {logo_big} from "../../Img-bundle";
import {Playlist, LicensingInfo, Contact,Search,FeaturedTrack} from "../../File-bundle";
import {connect} from "react-redux";
import {getFetchInfo} from "../../redux/Selectors";

let MainPage=React.memo(function MainPage({isFetching}) {

    return (
        <>
            <section className="logo">
                <img src={logo_big} alt="Ankean beats"/>
            </section>
            <section className="search-and-featured-track-container max-layout-width-medium">
                <Search/>
                <FeaturedTrack/>
            </section>
            <Playlist isFetching={isFetching}/>
            <LicensingInfo/>
            <Contact viewTitle={true}/>
        </>
    );
})

const mapStateToProps = (state) => {
    return{
    isFetching: getFetchInfo(state),
    }

}


export default connect(mapStateToProps, null)(MainPage);
