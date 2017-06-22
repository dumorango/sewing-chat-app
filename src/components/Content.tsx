import muiThemeable from "material-ui/styles/muiThemeable";
import * as React from "react";

const Content = ({ children, style, muiTheme }) => {
            style = {...{
                    paddingTop: muiTheme.appBar.height + muiTheme.toolbar.height,
                    zIndex: 0,
                }, style};
            return <div style= {style} >
                {children}
            </div>;
        };

export default muiThemeable()(Content);
