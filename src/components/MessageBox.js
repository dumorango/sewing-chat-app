import React from 'react';
import { TextField, Card } from 'material-ui';
import BottomFixed from './BottomFixed';
import trim from 'trim';
import base from '../store/rebase';

class MessageBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };
    }

    onChange(evt) {
        this.setState({
            message: evt.target.value
        })
    }

    onKeyUp(evt) {
        const { message } = this.state;
        const { selectedChannel } = this.props;
        const cleanMessage = () => {
            this.setState({
                message: ''
            });
        };
        if(evt.keyCode === 13 && trim(message) != '') {
            evt.preventDefault();
            cleanMessage();
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
            )
        }
    }

    render() {
        return (
            <BottomFixed style={{
                height: this.props.height
            }}>
                <Card style={{
                    borderRadius: 20,
                    resize: 'none',
                    color: '#555',
                    fontSize: '1em',
                    outline: 'auto 0px',
                    width: '90%',
                    border: '2px black',
                    marginLeft: '5%',
                    marginBottom: '5%',
                    paddingLeft: '5%'
                }}>
                    <TextField
                        name="message-box"
                        onChange={this.onChange.bind(this)}
                        onKeyUp={this.onKeyUp.bind(this)}
                        value={this.state.message}
                        style={{
                            width: '90%',
                        }}
                        onFocus={this.props.scrollToBottom}
                        />
                </Card>
            </BottomFixed>
        );
    }
}

export default MessageBox;