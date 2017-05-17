import React, { Component } from 'react';
import { ListItem, Avatar, IconMenu, IconButton, MenuItem, FontIcon } from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { withRouter } from 'react-router-dom';
import MenuItemWithConfirmationDialog from './MenuItemWithConfirmationDialog';


class GroupChannel extends Component {

    constructor(props) {
        super(props);
        this.isAdmin = this.isAdmin.bind(this);
    }

    isAdmin() {
        const { user, channel } = this.props;
        return channel.admin && channel.admin[user.uid];
    }

    selectChannel() {
        const { channel } = this.props;
        this.props.history.push(`groups/${channel.key}`)
    }

    openGroupDetails() {

    }

    render() {
        const { channel } = this.props;
        const groupMenu = [<MenuItem key={`${channel.key}-details`}
            rightIcon={<FontIcon className="fa fa-group"/>}
            onTouchTap={this.openGroupDetails.bind(this)}
        >Detalhes</MenuItem>];

        if(this.isAdmin()){
            groupMenu.push(
                <MenuItemWithConfirmationDialog
                    key={`${channel.key}-delete`}
                    title="Apagar"
                    confirmationTitle={`Deseja realmente apagar o grupo ${channel.name}?`}
                    onConfirm={() => this.props.deleteGroup(channel)}
                />)
        }

        return (
            <ListItem
                onTouchTap={this.selectChannel.bind(this)}
                leftAvatar={<Avatar
                    src={channel.photoURL}
                >{channel.photoURL ? null : channel.name[0]}</Avatar>}
                rightIconButton={
                    <IconMenu
                        touchTapCloseDelay={0}
                        useLayerForClickAway={true}
                        iconButtonElement={<IconButton
                            touch={true}
                            tooltip="opcões"
                        >
                            <MoreVertIcon/>
                        </IconButton>}>
                        {groupMenu}
                    </IconMenu>
                }
                primaryText={channel.name}
                secondaryText={channel.name}
            >
            </ListItem>
        );
    };
}
export default withRouter(GroupChannel);