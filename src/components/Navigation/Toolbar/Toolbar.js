import React from 'react';
import Logo from '../../Logo/Logo';
import classes from './Toolbar.css';
import Navigation from '../NavigationItems/NavigationItems';

const toolbar = () => {
    return (
        <header className={classes.Toolbar}>
            <Logo height="80%" />
            <Navigation />
        </header>
    );
}

export default toolbar;