import React from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
                            .map(key => {
                                return <li key={key}>
                                            <span style={{textTransform: 'capitalize'}}>{key}</span>: {props.ingredients[key]}
                                        </li>
                            });

    return (
        <Aux>
            <h1 style={{textAlign: 'center'}}>Your Order</h1>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <h3>Total bill: Rs. {props.price}</h3>
            <p>Continue to checkout?</p>
            <Button btnType="Success" clicked={props.continuePurchase}>Continue</Button>
            <Button btnType="Danger" clicked={props.cancelPurchase}>Cancel</Button>
        </Aux>
    );
}

export default orderSummary;