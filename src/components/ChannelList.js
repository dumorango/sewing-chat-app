import React from 'react';
import Channel from './Channel';
import { RaisedButton, CircularProgress, List, Card, FontIcon }  from 'material-ui';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import { withRouter } from 'react-router-dom';

const ChannelList = ({ channels = [], history }) => {

        function selectChannel(channel) {
            history.push(`groups/${channel.key}`)
        }

        if(channels.length === 0) {
            return (<Card style={{

            }}>
                <CircularProgress
                    mode="indeterminate"
                    style={{
                        paddingTop: '20px',
                        paddingBottom: '20px',
                        margin: '0 auto',
                        display: 'block',
                        width: '60px'
                    }}
                />
            </Card>);
        }

        let channelNodes = channels.map(channel => <Channel key={channel.key} channel={channel.name} selectChannel={() => selectChannel(channel)} />);

        return (
            <div>
                <Toolbar style={{
                    backgroundColor: 'white',
                    position: 'fixed',
                    zIndex: 2,
                    width: '100%',
                    justifyContent: 'center'
                }}>
                    <ToolbarGroup>
                        <ToolbarTitle style={{
                        }} text="Conversas" />
                    </ToolbarGroup>
                </Toolbar>
                <List style={{
                    paddingTop: '50px',
                    zIndex: 1
                }}>
                    {channelNodes}
                </List>

            </div>
        );
};

export default withRouter(ChannelList);