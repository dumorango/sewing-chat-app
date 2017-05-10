import React from 'react';
import { ListItem } from 'material-ui';

const Channel = ({ channel, selectChannel}) => {
    function selectChannelPreventing(event) {
        event.preventDefault();
        selectChannel(channel);
    }
    return (
            <ListItem onTouchTap={selectChannelPreventing}>{channel}</ListItem>
        );
};

export default Channel;