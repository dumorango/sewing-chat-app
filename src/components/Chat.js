import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MessageList from './MessageList';
import MessageBox from './MessageBox';
import TitleAndBackHeader from './TitleAndBackHeader';
import AppBar from './AppBar';
import Content from './Content';
import BottomFixed from './BottomFixed';
import { lightBlue50 } from 'material-ui/styles/colors';

class ChatPage extends Component {

    constructor(props){
        super(props);
        this.scrollToBottom = this.scrollToBottom.bind(this);
    }

    scrollToBottom = () => {
        const node = ReactDOM.findDOMNode(this.messagesEnd);
        if(node) {
            node.scrollIntoView({ behavior: 'smooth' });
        }
    };

    render() {
        const { channelKey, channelName, messages } = this.props;
        return (
            <div>
                <AppBar title={channelName}/>
                <TitleAndBackHeader/>
                <Content>
                    <MessageList messages={ messages } style={{
                        marginTop: '60px',
                        display: 'flex',
                        backgroundColor: lightBlue50,
                        paddingTop: messages.length < 5 ? '1000px' : '10px',
                        paddingBottom: '60px',
                        flexDirection: 'column'
                    }}/>
                </Content>
                <div id="bottom" ref={(el) => { this.messagesEnd = el; }}/>
                <BottomFixed style={{
                    height: '60px'
                }}>
                    <MessageBox selectedChannel={channelKey} scrollToBottom={this.scrollToBottom}/>
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


export default ChatPage;