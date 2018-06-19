import React from 'react';

import classes from './Order.css';

const order = (props) => {
    const ingredients = [];
    for(let ingredient in props.ingredients) {
        ingredients.push({
            name: ingredient,
            amount: props.ingredients[ingredient]
        });
    };

    const ingredientOutput = ingredients.map(key => {
        return <span style={{textTransform: 'capitalize', border: '1px solid #ccc', padding: '5px', display: 'inline-block', marginLeft: '20px'}} key={key.name}>{key.name} ({key.amount})</span>;
    });
    return (
        <div className={classes.Order}>
            <p>
                <strong>Ingredients:</strong> 
                {ingredientOutput}
            </p>
            <p>Price: <strong>Rs. {props.price}</strong></p>
        </div>
    );
}

export default order;