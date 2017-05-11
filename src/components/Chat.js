import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MessageList from './MessageList';
import MessageBox from './MessageBox';
import TitleAndBackHeader from './TitleAndBackHeader';
import { withRouter } from 'react-router-dom';
import AppBar from './AppBar';
import Content from './Content';
import BottomFixed from './BottomFixed';
import { lightBlue50 } from 'material-ui/styles/colors';

class Chat extends Component {

    constructor(props){
        super(props);
        this.selectChannel = this.selectChannel.bind(this);
        this.toAddGroup = this.toAddGroup.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
    }

    selectChannel(channel){
        this.setState({
            selectedChannel: channel
        });
    }

    toAddGroup(){
        this.props.history.push('addgroup');
    }

    componentWillMount() {
        this.setState({
            selectedChannel: null
        });
    }

    scrollToBottom = () => {
        const { channels, messages } = this.props;
        const node = ReactDOM.findDOMNode(this.messagesEnd);
        if(node) {
            node.scrollIntoView({ behavior: 'smooth' });
        }
        console.log('scrollToBottom', node);
    };

    render() {
        let selectedChannel = this.props.match.params.group;
        const { channels, messages } = this.props;
        const selectedChannelName = (channels.find(channel => channel.key === selectedChannel) || {}).name;
        if (!selectedChannel && channels && channels.length > 0) {
            selectedChannel = channels[0].key;
        }
        const channelMessageList = selectedChannel ? messages.filter(message => message.channel === selectedChannel) : {};
        return (
            <div>
                <AppBar title={selectedChannelName}/>
                <TitleAndBackHeader title={selectedChannelName}/>
                <Content>
                    <MessageList messages={channelMessageList}  style={{
                        marginTop: '60px',
                        display: 'flex',
                        backgroundColor: lightBlue50,
                        paddingTop: channelMessageList.length < 5 ? '1000px' : '10px',
                        paddingBottom: '60px',
                        flexDirection: 'column'
                    }}/>
                </Content>
                <div id="bottom" ref={(el) => { this.messagesEnd = el; }}/>
                <BottomFixed style={{
                    height: '60px'
                }}>
                    <MessageBox  selectedChannel={selectedChannel} scrollToBottom={this.scrollToBottom}/>
                </BottomFixed>

            </div>
        );
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    componentDidMount() {
        this.scrollToBottom();
    }
}


export default withRouter(Chat);