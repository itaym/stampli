import React from 'react';
import './Header.css';

function Header () {
    return (
        <div className="Header">
            <div className="header-text">
                <img src="/logo-white.svg" alt="Stampli" />
                Test by Itay Merchav
            </div>
        </div>
    )
}

export default React.memo(Header);