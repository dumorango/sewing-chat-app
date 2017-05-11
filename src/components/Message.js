import React from 'react';
import { Avatar, Paper } from 'material-ui';
import moment from 'moment';
import { grey100 } from 'material-ui/styles/colors';
import base from '../store/rebase';

const MESSAGE_BOX_RADIUS = 10;

class Message extends React.Component {
    constructor(props) {
        super(props);
        this.isUserMessage = this.isUserMessage.bind(this);
    }

    isUserMessage(){
        const { user } = this.props.message;
        const currentUser = base.getCurrentUser();
        return currentUser.uid === user.uid;
    }
    render() {
        const { user, message, createdDate } = this.props.message;
        const { displayName, photoURL } = user || {};
        const avatar =  !this.isUserMessage() ? <Avatar
                src={photoURL}
                size={30}
                style={{
                    resize: 'none'
                }}
            /> : <div/>;
        const msgHeader =  !this.isUserMessage() ? <div>
                {`${displayName} - ${createdDate ? moment(createdDate).fromNow() : ''}`}
            </div> : <div> { createdDate ? moment(createdDate).fromNow() : ''}</div>;
        return (
            <div
                  style={{
                      margin: '20px',
                      marginBottom: '10px',
                      marginTop: '0px',
                      display: 'flex',
                      flexDirection: 'row',
                      backgroundColor: 'transparent',
                      marginLeft: this.isUserMessage() ? '20%' : '10px',
                      marginRight: !this.isUserMessage() ? '20%' : '10px',
                      justifyContent: this.isUserMessage() ? 'flex-end' : 'flex-start',
                      wordBreak: 'break-all'
                  }}>
                { avatar }
                <div style={{
                        flexDirection: 'column-reverse',
                        justifyContent: 'flex-end'
                     }}>
                    <Paper style={{
                        margin: '5px',
                        backgroundColor: this.isUserMessage() ? grey100 : 'white' ,
                        flexGrow: 5,
                        padding: '10px',
                        borderRadius: MESSAGE_BOX_RADIUS,
                        borderTopLeftRadius: this.isUserMessage() ? MESSAGE_BOX_RADIUS : 0 ,
                        borderTopRightRadius: this.isUserMessage() ? 0 : MESSAGE_BOX_RADIUS ,
                    }}>
                        {message}
                    </Paper>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row-reverse'
                    }}>{msgHeader}</div>
                 </div>
            </div>
        );
    }

}

export default Message;