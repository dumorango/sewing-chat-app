import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';

const Content = ({ children, style, muiTheme }) => {
            style = Object.assign({
                    paddingTop: muiTheme.appBar.height + muiTheme.toolbar.height,
                    zIndex: 0
                }, style);
            return <div style={ style }>
                { children }
            </div>;
        };

export default muiThemeable()(Content);