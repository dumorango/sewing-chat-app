import React from 'react';
import { Card, CardText, CardHeader } from 'material-ui';
import moment from 'moment';


class Message extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { user, message, createdDate } = this.props.message;
        const { displayName } = user || {};
        return (
            <Card initiallyExpanded={true}>
                <CardHeader
                    title={displayName}
                    subtitle={createdDate ? moment(createdDate).fromNow() : ''}
                />
                <CardText style={{
                    wordBreak: 'break-all',
                }}>{message}</CardText></Card>
        );
    }

}

export default Message;