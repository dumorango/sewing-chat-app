import React from 'react';
import Channel from './Channel';
import { List }  from 'material-ui';

import Loading from './Loading';

import { withRouter } from 'react-router-dom';

const ChannelList = ({ channels = [], history, style }) => {

    function selectChannel(channel) {
        history.push(`groups/${channel.key}`)
    }

    let content = <Loading/>;

    if (channels.length > 0) {
        let channelNodes = channels.map(channel => <Channel key={channel.key} channel={channel.name}
                                                            selectChannel={() => selectChannel(channel)}/>);
        content = <List style={Object.assign({
            paddingTop: '50px',
            zIndex: 1
        }, style)}>
            {channelNodes}
        </List>;
    }

    return content;
}

export default withRouter(ChannelList);