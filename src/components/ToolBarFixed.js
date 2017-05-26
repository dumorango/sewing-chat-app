import React, { Component } from 'react';
import {
    Toolbar
} from 'material-ui';

import muiThemeable from 'material-ui/styles/muiThemeable';

const ToolBarFixed = ({ style = {}, children, muiTheme })  => {
        style = Object.assign({
            backgroundColor: 'white',
            position: 'fixed',
            zIndex: 2,
            top: muiTheme.appBar.height,
            width: '100%',
            noGutter: true,
            display: 'flex'
        }, style);

        return (
            <Toolbar style={style}>
                {children}
            </Toolbar>
        );
};

export default muiThemeable()(ToolBarFixed);