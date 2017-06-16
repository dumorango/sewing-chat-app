import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Chat from './Chat';
import Loading from './Loading';
import base from '../store/firebase';

class ChatPage extends Component {

    constructor(props){
        super(props);
    }

    getSelectedChannelByUser() {
        const { user, users } = this.props;
        const { uid } =  this.props.match.params;
        const key = [user.uid, uid].sort().join('-');
        const otherUser = users.find(user => user.key === uid);
        this.setState({
            channel: { name: otherUser.displayName },
            key
        });
        return this.bindMessages(key);
    }

    getSelectedChannelByGroup(){
        let key = this.props.match.params.group;
        const channel = this.props.channels.find(channel => channel.key === key);
        this.setState({ channel, key });
        base.bindToState(`channels/${key}`, {
            context: this,
            state: 'channel',
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
        this.getSelectedChannel();
    }


    render() {
        const { messages, channel, key } = this.state;
        if(!channel) return <Loading/>;
        const { name } = channel;
        return (
            <Chat key={key} channelName={name} channelKey={key} messages={messages}/>
        );
    }
}


export default withRouter(ChatPage);