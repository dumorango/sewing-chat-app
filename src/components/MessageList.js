import React, { Component, PropTypes } from 'react';
import Message from './Message';
import { List } from 'material-ui';

const MessageList = ({ messages, style }) => {
    let messagesComponents = [];
    messages.map(message => {
        messagesComponents.push(
            <Message key={message.key} message={message}/>
        )
    });
    return (
        <List style={style}>
            {messagesComponents}
        </List>
    );
};

export default MessageList;