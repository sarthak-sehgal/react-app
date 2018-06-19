import React from 'react';
import classes from './CheckoutSummary.css';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{width: '100%', margin: 'auto', overflow: 'scroll'}}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button clicked={props.checkoutContinued} btnType="Success">CONTINUE</Button>
            <Button clicked={props.checkoutCancelled} btnType="Danger">CANCEL</Button>
        </div>
    );
}

export default checkoutSummary;