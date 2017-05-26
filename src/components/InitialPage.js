import React, { Component } from 'react';
import AppBar from './AppBar';
import Content from './Content';
import ChannelList from './ChannelList';
import ToolBarFixed from './ToolBarFixed';
import { TextField, Drawer, Card, CardHeader, List, ListItem, Subheader, ToolbarGroup, FlatButton } from 'material-ui';
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import GroupAdd from 'material-ui/svg-icons/social/group-add';
import base from '../store/rebase';
import { withRouter } from 'react-router-dom';

class InitialPage extends Component {

    constructor(props){
        super(props);
        this.openDrawer = this.openDrawer.bind(this);
        this.state = {
            filter: ''
        }
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
        this.props.history.push('/');
    }

    setFilter(evt) {
        this.setState({
            filter: evt.target.value.toUpperCase()
        })
    }

    goToAddGroup() {
        this.props.history.replace('/addgroup');
    }

    render() {
        const { channels, user, users } = this.props;
        const { filter } = this.state;
        const filteredChannels = channels.filter(channel => channel.name.toUpperCase().indexOf(filter) != -1);
        const filteredUsers = users.filter(user => user.displayName.toUpperCase().indexOf(filter) != -1);
        return (
            <div>
                <AppBar
                    title="Conversas"
                    onLeftIconButtonTouchTap={this.openDrawer}
                />
                <ToolBarFixed>
                    <ToolbarGroup firstChild={true} style={{
                        width: '60%',
                        marginLeft: '5%'
                    }}>
                        <TextField
                            hintText="Grupo ou pessoa..."
                            floatingLabelText="Buscar"
                            multiLine={false}
                            name="filter"
                            onChange={this.setFilter.bind(this)}
                        />
                    </ToolbarGroup>
                    <ToolbarGroup lastChild={true}>
                            <FlatButton
                                onTouchTap={((evt) => this.goToAddGroup(evt.target.value))}
                                label='CRIAR'
                                labelPosition="before"
                                primary={true}
                                icon={ <GroupAdd/> }
                            />
                    </ToolbarGroup>
                </ToolBarFixed>
                <Content>
                    <ChannelList channels={filteredChannels} users={filteredUsers} user={user}/>
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
                                rightIcon={<ExitToApp/>}
                            />
                        </ListItem>
                    </List>
                </Drawer>
            </div>
        );
    }

}

export default withRouter(InitialPage);