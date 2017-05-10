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
        console.log(textFieldNode);
        textFieldNode.blur();
    }

    sendMessage(evt) {
        // evt.preventDefault();
        const { message } = this.state;
        const { selectedChannel } = this.props;
        this.setState({
            message: ''
        });
        this.props.scrollToBottom();
        base.push(
            `messages`,
            {
                data: {
                    message,
                    createdDate: new Date().getTime(),
                    channel: selectedChannel,
                    user: base.getCurrentUser()
                },
                then(err){
                    console.log('Sent a new message', message);
                }
            }
        );
    }

    onKeyUp(evt) {
        const { message } = this.state;
        const { selectedChannel } = this.props;
        const cleanMessage = () => {
            this.setState({
                message: ''
            });
        };
        this.props.scrollToBottom();
        if(evt.keyCode === 13 && trim(message) != '') {
                this.sendMessage(evt);
        }
    }

    render() {
        return (
            <div style={{
                display: 'flex'
            }}>
                <Paper style={{
                    borderRadius: 20,
                    resize: 'none',
                    color: '#555',
                    fontSize: '1em',
                    outline: 'auto 0px',
                    // width: '70%',
                    flexGrow: 2,
                    border: '2px black',
                    marginLeft: '5%',
                    marginBottom: '5%',
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
                        onFocus={this.props.scrollToBottom}
                        ref={(el) => { this.textField = el; }}
                        />
                </Paper>
                <div style={{
                    flexGrow: 1,
                    padding: '5px'

                }}><FloatingActionButton mini={true} onTouchTap={this.clickSendButton}>
                    <FontIcon color='blue' className="fa fa-send" style={{
                        marginRight: '3px'
                    }}/>
                </FloatingActionButton></div>
            </div>
        );
    }
}

export default MessageBox;