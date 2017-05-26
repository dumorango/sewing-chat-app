import React, { Component } from 'react';
import {
    ListItem, Avatar, IconMenu, IconButton, MenuItem, Divider
} from 'material-ui';
import MenuItemWithConfirmationDialog from './MenuItemWithConfirmationDialog';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import SupervisorAccount from 'material-ui/svg-icons/action/supervisor-account';
import Delete from 'material-ui/svg-icons/action/delete';

class GroupParticipantsItem extends Component {

    constructor(props){
        super(props);
        this.state = {
            menuOpen: false
        };
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    toggleMenu(){
        this.setState({
            menuOpen: !this.state.menuOpen
        })
    }

    render() {
        const {groupUser, isGroupUserAdmin, isCurrentUser, setAdmin, removeMember} = this.props;
        return <div><ListItem
            leftAvatar={<Avatar src={groupUser.photoURL}/>}
            primaryText={groupUser.displayName}
            secondaryText={isGroupUserAdmin ? 'Administrador' : 'Membro'}
            rightIconButton={ isCurrentUser ?
                <IconMenu
                    open={this.state.menuOpen}
                    touchTapCloseDelay={0}
                    useLayerForClickAway={true}
                    iconButtonElement={<IconButton
                        touch={true}
                        tooltip="opcões"
                    >
                        <MoreVertIcon/>
                    </IconButton>}
                    onTouchTap={this.toggleMenu}
                >
                    <MenuItem rightIcon={<SupervisorAccount/>}
                              onTouchTap={() => {
                                  this.toggleMenu();
                                  setAdmin(groupUser.uid, !isGroupUserAdmin)
                              }}
                    >{isGroupUserAdmin ? 'Tornar Usuário Comum' : 'Tornar Administrador'}</MenuItem>
                    <MenuItemWithConfirmationDialog
                        key={`${groupUser.key}-delete`}
                        title="Apagar"
                        confirmationTitle={`Deseja realmente remover ${groupUser.displayName} do grupo ?`}
                        rightIcon={<Delete/>}
                        onConfirm={() => removeMember(groupUser.uid)}
                    />

                </IconMenu> : null
            }
        >
        </ListItem><Divider inset={true}/></div>
    };
}

export default GroupParticipantsItem;


