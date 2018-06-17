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
            <p>Current price: Rs. {props.price}</p>
            {controls.map(control => {
                return (
                    <BuildControl key={control.type} label={control.label} onAddClick={() => props.addClicked(control.type)} onRemoveClick={() => props.removeClicked(control.type)} isAddDisabled={props.addDisabledState[control.type]} isRemoveDisabled={props.removeDisabledState[control.type]}/>
                )
            })}
        </div>
    );
}

export default buildControls;