import React from 'react';
import { withRouter } from 'react-router-dom';
import { AppBar, IconMenu, IconButton, FontIcon, MenuItem, Avatar } from 'material-ui';

const MyAppBar = ({ history, avatar, title }) => {

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
            iconElementLeft={
                <IconMenu
                    iconButtonElement={
                        <IconButton  ><FontIcon color='white' className="fa fa-bars"/></IconButton>
                    }
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                >
                    <MenuItem onTouchTap={redirectToCreateGroup} leftIcon={<FontIcon className="fa fa-users"/>} primaryText="Criar Grupo" />
                </IconMenu>
            }
            iconElementRight={
                avatar ? <Avatar src={avatar}/> : null
            }
        />
    );
};

export default withRouter(MyAppBar);