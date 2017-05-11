import React from 'react';
import { withRouter } from 'react-router-dom';
import { AppBar, IconMenu, IconButton, FontIcon, MenuItem, Avatar } from 'material-ui';

const MyAppBar = ({ history, iconElementLeft, title, iconElementRight }) => {

    function redirectToCreateGroup() {
        history.replace('/addgroup');
    };

    const logo = <FontIcon style={{
        color: 'white',
    }} className="fa fa-scissors"/>;
    const backwardsLogo = <FontIcon style={{
        color: 'white'
    }} className="fa fa-scissors fa-rotate-180"/>;

    return (
        <AppBar
            title={<div>{logo}   {title || 'ZAP'}  {backwardsLogo}</div>}
            style={{
                position: 'fixed'
            }}
            titleStyle={{
                textAlign: 'center'
            }}
            iconElementLeft={ iconElementLeft }
            iconElementRight={ iconElementRight }
            showMenuIconButton={ !!iconElementLeft}
        />
    );
};

export default withRouter(MyAppBar);