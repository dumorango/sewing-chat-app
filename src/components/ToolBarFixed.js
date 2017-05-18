import React, { Component } from 'react';
import {
    Toolbar
} from 'material-ui';

const ToolBarFixed = ({ style = {}, children })  => {
        style = Object.assign({
            zIndex: 1,
            position: 'fixed',
            width: '100%',
            display: 'block',
            border: '0px',
            backgroundColor: 'white',
            bottom: '0px'
        }, style);

        return (
            <Toolbar style={{
                backgroundColor: 'white',
                position: 'fixed',
                zIndex: 3,
                top: '60px',
                width: '100%',
                noGutter: true,
                display: 'flex'
            }}>
                {children}
            </Toolbar>
        );
};

export default ToolBarFixed;