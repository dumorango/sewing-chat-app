import React from 'react';
import { withRouter } from 'react-router-dom';
import { AppBar, IconButton } from 'material-ui';
import Logo from 'material-ui/svg-icons/content/content-cut';
import muiThemeable from 'material-ui/styles/muiThemeable';

const MyAppBar = (props) => {

    const { muiTheme, title, onLeftIconButtonTouchTap  } = props;

    const showMenuIconButton = !!onLeftIconButtonTouchTap;

    const logo = <IconButton style={{
        transform: 'rotate(180deg)',
        color: muiTheme.appBar.textColor
    }} ><Logo/></IconButton>;

    return (
        <AppBar
            title={title || 'ZAP'}
            style={{
                position: 'fixed'
            }}
            titleStyle={{
                textAlign: 'center'
            }}
            iconElementRight={ logo }
            showMenuIconButton={showMenuIconButton}
            onLeftIconButtonTouchTap={onLeftIconButtonTouchTap}
        />
    );
};

export default withRouter(muiThemeable()(MyAppBar));