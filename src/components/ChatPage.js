import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Chat from './Chat';
import base from '../store/rebase';

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
        const { user } = this.props;
        const { uid } =  this.props.match.params;
        let key = [user.uid, uid].sort().join('-');
        this.bindMessages(key);
        return base.listenTo(`users/${uid}`, {
            context: this,
            then(receiver){
                this.setState({
                    channel: {
                        key,
                        name: receiver.displayName
                    }
                });
            }
        });
    }

    getSelectedChannelByGroup(){
        let key = this.props.match.params.group;
        this.bindMessages(key);
        return base.listenTo(`channels/${key}`, {
            context: this,
            then(channel){
                this.setState({
                    channel: {
                        name: channel.name,
                        key
                    }
                });
            }
        })
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
        const channelMessages =  key ? messages.filter(message => message.channel === key) : [];

        return (
            <Chat key={key} channelName={name} channelKey={key} messages={channelMessages}/>
        );
    }
}


export default withRouter(ChatPage);