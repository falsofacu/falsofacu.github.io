import React from "react";
import logo from '../media/images/logo.png';

const LoadingScreen = () => {
    return (
        <>
            <div id="loading-bg"></div>
            <div id="loading">
                <img src={logo} width="80" height="80"/>
            </div>
        </>
    )
}

export default LoadingScreen;