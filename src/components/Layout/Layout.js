import React from 'react';
import Aux from '../../hoc/Aux';
import Toolbar from '../Navigation/Toolbar/Toolbar';

import classes from './Layout.css';

const layout = (props) => (
    <Aux>
        <Toolbar />
        <main className={classes.content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;