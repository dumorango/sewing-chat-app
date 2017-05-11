import React, { Component, PropTypes } from 'react';
import Message from './Message';

const MessageList = ({ messages = [], style }) => {
    let messagesComponents = [];
    messages.map(message => {
        messagesComponents.push(
            <Message key={message.key} message={message}/>
        )
    });
    return (
        <div style={style}>
            {messagesComponents}
        </div>
    );
};

export default MessageList;