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
            {controls.map(control => {
                return (
                    <BuildControl key={control.type} label={control.label}/>
                )
            })}
        </div>
    );
}

export default buildControls;