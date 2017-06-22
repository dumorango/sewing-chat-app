import {
    Toolbar,
} from "material-ui";
import * as React from "react";

import muiThemeable from "material-ui/styles/muiThemeable";

const ToolBarFixed = ({ style = {}, children, muiTheme })  => {
        style = Object.assign({
            backgroundColor: "white",
            display: "flex",
            noGutter: true,
            position: "fixed",
            width: "100%",
            top: muiTheme.appBar.height,
            zIndex: 2,
        }, style);

        return (
            <Toolbar style={style}>
                {children}
            </Toolbar>
        );
};

export default muiThemeable()(ToolBarFixed);