import React from 'react';
import ReactDOM from 'react-dom';
import { TextField, FloatingActionButton, Paper, FontIcon } from 'material-ui';
import trim from 'trim';
import base from '../store/rebase';

class MessageBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };
        this.clickSendButton = this.clickSendButton.bind(this);
    }

    onChange(evt) {
        this.setState({
            message: evt.target.value
        })
    }

    clickSendButton(evt){
        this.blurTextField();
        this.sendMessage(evt);
    }

    blurTextField() {
        const textFieldNode = document.getElementsByName('message-box')[0];
        textFieldNode.blur();
    }

    onKeyUp(evt) {
        const { message } = this.state;
        const { selectedChannel } = this.props;
        this.props.scrollToBottom();
        if(evt.keyCode === 13 && trim(message) != '') {
            this.blurTextField();
            this.sendMessage(evt);
        }
    }

    sendMessage(evt) {
        let message = trim(this.state.message);
        this.setState({
            message: ''
        });
        const user = base.getCurrentUser();
        const { selectedChannel } = this.props;
        this.props.scrollToBottom();
        base.push(
            `messages/channel/${selectedChannel}`,
            {
                data: {
                    message,
                    createdDate: new Date().getTime(),
                    channel: selectedChannel,
                    user ,
                    author: user.uid
                },
                then(err){
                    console.log('Sent a new message:', message);
                }
            }
        );
    }

    render() {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'row'
            }}>
                <Paper style={{
                    borderRadius: 20,
                    resize: 'none',
                    color: '#555',
                    fontSize: '1em',
                    flexGrow: 5,
                    marginLeft: '5%',
                    marginBottom: '5px',
                    marginTop: '5px',
                    paddingLeft: '5%',
                }} zDepth={5}>
                    <TextField
                        name="message-box"
                        onChange={this.onChange.bind(this)}
                        onKeyUp={this.onKeyUp.bind(this)}
                        value={this.state.message}
                        style={{
                            width: '90%',
                        }}
                        multiLine={true}
                        rowsMax={1}
                        onFocus={this.props.scrollToBottom}
                        />
                </Paper>
                <div style={{
                    flexGrow: 1,
                    padding: '5px',
                    marginTop: '1%',
                }}><FloatingActionButton
                    mini={true}
                    onTouchTap={this.clickSendButton}
                    disabled={!this.state.message}
                >
                    <FontIcon color='blue' className="fa fa-send" style={{
                        marginRight: '3px'
                    }}/>
                </FloatingActionButton></div>
            </div>
        );
    }
}

export default MessageBox;