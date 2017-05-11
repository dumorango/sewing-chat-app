import React, { Component } from 'react';
import AppBar from './AppBar';
import Content from './Content';
import ChannelList from './ChannelList';
import { Avatar, IconButton, FontIcon, Drawer, Card, CardHeader, List, ListItem, Subheader,  } from 'material-ui';
import base from '../store/rebase';


class InitialPage extends Component {

    constructor(props){
        super(props);
    }

    componentWillMount(){
        this.setState({
            isDrawerOpen : false
        })
    }

    openDrawer() {
        this.setState({
            isDrawerOpen: true
        })
    }

    singOut(){
        base.signOut();
    }

    render() {
        const { channels, user } = this.props;
        return (
            <div>
                <AppBar
                    title="Conversas"
                    iconElementLeft={<IconButton onTouchTap={this.openDrawer.bind(this)}><FontIcon style={{
                        color: 'white',
                    }} className="fa fa-bars"/></IconButton>}
                />

                <Content>
                    <ChannelList channels={channels}/>
                </Content>
                <Drawer open={this.state.isDrawerOpen}
                        docked={false}
                        onRequestChange={(isDrawerOpen) => this.setState({isDrawerOpen})}
                    >
                    <Card expanded={true}>
                        <CardHeader
                            title={user.displayName}
                            subtitle={user.email}
                            avatar={user.photoURL}
                            actAsExpander={true}
                        />
                    </Card>
                    <List>
                        <ListItem>
                            <Subheader>Opcões</Subheader>
                            <ListItem
                                primaryText="Sair"
                                onTouchTap={this.singOut.bind(this)}
                                rightIcon={<FontIcon className="fa fa-sign-out"/>}
                            />
                        </ListItem>
                    </List>
                </Drawer>
            </div>
        );
    }

}

export default InitialPage;