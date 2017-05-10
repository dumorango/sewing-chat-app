import React from 'react';
import Channel from './Channel';
import { CircularProgress, List, Card, IconMenu, MenuItem, IconButton }  from 'material-ui';
import AppBar from './AppBar';
import Content from './Content';
import Loading from './Loading';

import { withRouter } from 'react-router-dom';

const ChannelList = ({ channels = [], history, user }) => {

        function selectChannel(channel) {
            history.push(`groups/${channel.key}`)
        }

        let content;

        if(channels.length === 0) {
            content = (<Loading/>);
        }else {
            let channelNodes = channels.map(channel => <Channel key={channel.key} channel={channel.name} selectChannel={() => selectChannel(channel)} />);
            content = <List style={{
                            paddingTop: '50px',
                            zIndex: 1
                        }}>
                        {channelNodes}
                      </List>;
        }

        return (<div>
                  <AppBar title="Conversas"  avatar={user.photoURL}/>
                  <Content>
                      {content}
                  </Content>
                </div>);
};

export default withRouter(ChannelList);