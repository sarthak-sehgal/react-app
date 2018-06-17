import React from 'react';

import classes from './BuildControl.css';

const buildControl = (props) => {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button className={classes.More} onClick={props.onAddClick} disabled={props.isAddDisabled}>Add</button>
            <button className={classes.Less} onClick={props.onRemoveClick} disabled={props.isRemoveDisabled}>Remove</button>
        </div>
    );
}

export default buildControl;