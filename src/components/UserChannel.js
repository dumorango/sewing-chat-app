import React from 'react';
import { ListItem, Avatar, IconMenu, IconButton, MenuItem } from 'material-ui';
import { withRouter } from 'react-router-dom';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import AccountBox from 'material-ui/svg-icons/action/account-box';

const UserChannel = ({ user, history }) => {
  function selectChannel() {
    history.push(`users/${user.uid}/messages`);
  }

  function getUserLastOnline() {
    return user.lastOnline ? user.lastOnline : '';
  }

  function goToProfilePage() {
    history.push(`users/${user.uid}/profile`);
  }

  return (
    <ListItem
      onTouchTap={selectChannel}
      leftAvatar={<Avatar
        src={user.photoURL}
      >{ user.photoURL ? null : user.displayName[0] }</Avatar>}
      rightIconButton={
        <IconMenu
          touchTapCloseDelay={0}
          useLayerForClickAway={false}
          iconButtonElement={<IconButton
            touch
            tooltip="opcões"
          >
            <MoreVertIcon />
          </IconButton>}
        >
          <MenuItem
            rightIcon={<AccountBox />}
            onTouchTap={goToProfilePage}
          >Perfil</MenuItem>
        </IconMenu>
            }
      primaryText={user.displayName}
      secondaryText={getUserLastOnline()}
    >
    </ListItem>
  );
};

export default withRouter(UserChannel);
