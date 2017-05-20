import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Chat from './Chat';
import base from '../store/rebase';
import _ from 'lodash';

class ChatPage extends Component {

    constructor(props){
        super(props);
        this.selectChannel = this.selectChannel.bind(this);
    }

    selectChannel(channel){
        this.setState({
            selectedChannel: channel
        });
    }

    getSelectedChannelByUser() {
        const { user, users } = this.props;
        const { uid } =  this.props.match.params;
        const key = [user.uid, uid].sort().join('-');
        const otherUser = users.find(user => user.key === uid);
        this.setState({
            channel: { key, name: otherUser.displayName }
        });
        return this.bindMessages(key);
    }

    getSelectedChannelByGroup(){
        let key = this.props.match.params.group;
        this.setState({
            channel: this.props.channels.find(channel => channel.key === key)
        });
        return this.bindMessages(key);
    }

    bindMessages(key){
        base.bindToState(`messages/channel/${key}`, {
            context: this,
            state: 'messages',
            asArray: true,
            queries: {
                orderByChild: 'createdDate'
            }
        });
    }

    getSelectedChannel() {
            this.props.match.params.group ?
            this.getSelectedChannelByGroup() :
            this.getSelectedChannelByUser()
    }

    componentWillMount() {
        this.setState({
            channel: {}
        });
        this.getSelectedChannel();
    }


    render() {
        const { messages, channel } = this.state;
        const { key, name } = channel;
        return (
            <Chat key={key} channelName={name} channelKey={key} messages={messages}/>
        );
    }
}


export default withRouter(ChatPage);