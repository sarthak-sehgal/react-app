import React from 'react';
import classes from './Logo.css';
import Logo from '../../assets/logo.png';

const logo = (props) => {
    return (
        <img className={classes.Logo} src={Logo} alt="My Burger" />
    )
};

export default logo;