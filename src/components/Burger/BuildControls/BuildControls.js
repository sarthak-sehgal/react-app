import React from 'react';
import BuildControl from './BuildControl/BuildControl';

import classes from './BuildControls.css';

const buildControls = (props) => {
    const controls = [
        {label: 'Salad', type: 'salad'},
        {label: 'Cheese', type: 'cheese'},
        {label: 'Bacon', type: 'bacon'},
        {label: 'Meat', type: 'meat'}
    ];

    return (
        <div className={classes.BuildControls}>
            <p>Current price: <strong>Rs. {props.price}</strong></p>
            {controls.map(control => {
                return (
                    <BuildControl key={control.type} label={control.label} onAddClick={() => props.addClicked(control.type)} onRemoveClick={() => props.removeClicked(control.type)} isAddDisabled={props.addDisabledState[control.type]} isRemoveDisabled={props.removeDisabledState[control.type]}/>
                )
            })}
            <button className={classes.OrderButton} disabled={props.isOrderDisabled} onClick={props.ordered}>ORDER NOW!</button>
        </div>
    );
}

export default buildControls;