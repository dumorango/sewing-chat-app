import React, { Component } from 'react';
import { ListItem, Avatar, IconMenu, IconButton } from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { withRouter } from 'react-router-dom';
import MenuItemWithConfirmationDialog from './MenuItemWithConfirmationDialog';


class GroupChannel extends Component {

    constructor(props) {
        super(props);
    }

    selectChannel() {
        const { channel } = this.props;
        this.props.history.push(`groups/${channel.key}`)
    }

    render() {
        const { channel } = this.props;
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
                        <MenuItemWithConfirmationDialog title="Apagar" confirmationTitle={`Deseja realmente apagar o grupo ${channel.name}?`}
                                            onConfirm={() => this.props.deleteGroup(channel)}/>
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