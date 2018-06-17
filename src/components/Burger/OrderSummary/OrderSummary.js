import React from 'react';

import Aux from '../../../hoc/Aux';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
                            .map(key => {
                                return <li key={key}>
                                            <span style={{textTransform: 'capitalize'}}>{key}</span>: {props.ingredients[key]}
                                        </li>
                            });

    return (
        <Aux>
            <h2>Your Order</h2>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
        </Aux>
    );
}

export default orderSummary;