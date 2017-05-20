import React, { Component } from 'react';
import {
    List, ListItem, Avatar, IconMenu, IconButton, MenuItem, FontIcon, Divider
} from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

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
        const {groupUser, isGroupUserAdmin, isCurrentUser, isCurrentUserAdmin, setAdmin, removeMember} = this.props;
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
                    <MenuItem rightIcon={<FontIcon className="fa fa-id-card"/>}
                              onTouchTap={() => {
                                  this.toggleMenu();
                                  setAdmin(groupUser.uid, !isGroupUserAdmin)
                              }}
                    >{isGroupUserAdmin ? 'Tornar Usuário Comum' : 'Tornar Administrador'}</MenuItem>
                    <MenuItem rightIcon={<FontIcon className="fa fa-trash"/>}
                              onTouchTap={() => removeMember(groupUser.uid)}
                    >Remover do Grupo</MenuItem>
                </IconMenu> : null
            }
        >
        </ListItem><Divider inset={true}/></div>
    };
}

export default GroupParticipantsItem;


