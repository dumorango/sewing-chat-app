import React, { Component, PropTypes } from 'react';
import Message from './Message';

const MessageList = ({ messages = [], style }) => {
    let messagesComponents = [];
    //const fakeMsg = { user: {} };
    //console.log(messages);
    //if(messages.length < 5 ) {
    //     messages = [fakeMsg,fakeMsg,fakeMsg,fakeMsg, fakeMsg, fakeMsg].concat(messages);
    // }
    //messages = messages.concat([fakeMsg]);
    messages.map(message => {
        messagesComponents.push(
            <Message key={message.key} message={message}/>
        )
    });

    return (
        <div>
            <div style={style}>
                {messagesComponents}
            </div>
        </div>
    );
};

export default MessageList;