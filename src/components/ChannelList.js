import React, { Component } from 'react';
import GroupChannel from './GroupChannel';
import UserChannel from './UserChannel'
import { List, Divider, Snackbar }  from 'material-ui';
import base from '../store/rebase';

import Loading from './Loading';

class ChannelList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    deleteGroup(channel) {
        base.remove(`channels/${channel.key}`).then(() => {
            this.setState({
                open: true,
                deletedGroupName: channel.name
            });
        })
    }

    handleTouchTap = () => {
        this.setState({
            open: true,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    render() {
        let { channels, users, user, style } = this.props;
        let content = <Loading/>;
        if (channels || users) {
            let channelNodes = [
                ...channels
                    .map(channel => <GroupChannel deleteGroup={this.deleteGroup.bind(this)} key={channel.key} channel={channel} user={user}/>),
                ...users
                    .filter(u => u.uid !== user.uid) // Filter currentUser
                    .map(u => <UserChannel key={u.key} user={u} />)
            ].map((node, i) => (<div key={`channelDivider${i}`}>{node}<Divider inset={true}/></div>));
            content = <List style={Object.assign({
                paddingTop: '70px',
                zIndex: 1
            }, style)}>
                {channelNodes}
                <Snackbar
                    open={this.state.open}
                    message={`O grupo ${this.state.deletedGroupName} foi deletado`}
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                />
            </List>;
        }

        return content;
    }
}
export default ChannelList;