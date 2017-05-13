import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Chat from './Chat';

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

    componentWillMount() {
        this.setState({
            selectedChannel: null
        });
    }

    getSelectedChannelByUser() {
         const { users = [], user } = this.props;
         const { uid } =  this.props.match.params;
         let receiver = users.find(user => user.uid === uid) || {};
         return {
             key: [user.uid, uid].sort().join('-'),
             name: receiver.displayName
         }

    }

    getSelectedChannelByGroup(){
        let selectedChannelKey = this.props.match.params.group;
        const { channels } = this.props;
        let selectedChannel = (channels.find(channel => channel.key === selectedChannelKey) || {});
        if (!selectedChannel && channels && channels.length > 0) {
            selectedChannel = channels[0];
        }
        return selectedChannel;
    }

    getSelectedChannel() {
        if(this.props.match.params.group) {
            return this.getSelectedChannelByGroup();
        } else {
            return this.getSelectedChannelByUser();
        }
    }



    render() {
        const { messages } = this.props;
        const { name, key } = this.getSelectedChannel();
        const channelMessages =  key ? messages.filter(message => message.channel === key) : [];

        return (
            <Chat channelName={name} channelKey={key} messages={channelMessages}/>
        );
    }
}


export default withRouter(ChatPage);