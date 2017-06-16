import React, { Component } from 'react';
import { Field, reduxForm, startSubmit, touch } from 'redux-form/immutable';
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import GroupAdd from 'material-ui/svg-icons/social/group-add';

import { connect } from 'react-redux';

import AppBar from 'components/AppBar';
import Content from 'components/Content';
import ChannelList from 'components/ChannelList';
import ToolBarFixed from 'components/ToolBarFixed';
import { push } from 'react-router-redux';

import { TextField, Drawer, Card, CardHeader, List, ListItem, Subheader, ToolbarGroup, FlatButton } from 'material-ui';

import { logout } from './actions';
import { getFilteredGroups } from './selectors';

const renderTextField = ({ input, meta: { touched, error }, ...custom }) => (
  <TextField
    errorText={touched && error}
    {...input}
    {...custom}
  />);

class MainPage extends Component {

  constructor(props) {
    super(props);
    this.openDrawer = this.openDrawer.bind(this);
    this.state = {
      filter: '',
    };
  }

  componentWillMount() {
    this.setState({
      isDrawerOpen: false,
    });
  }

  setFilter(evt) {
    this.setState({
      filter: evt.target.value.toUpperCase(),
    });
  }

  singOut() {
    this.props.dispatch(logout());
  }

  openDrawer() {
    this.setState({
      isDrawerOpen: true,
    });
  }

  goToAddGroup() {
    this.props.dispatch(push('/addgroup'));
  }

  render() {
    const { filteredChannels = [], user = {}, users = [] } = this.props;
    const { filter } = this.state;
    // const filteredChannels = channels.values().filter((channel) => channel.name.toUpperCase().indexOf(filter) != -1);
    const filteredUsers = [];
    return (
      <div>
        <AppBar
          title="Conversas"
          onLeftIconButtonTouchTap={this.openDrawer}
        />
        <ToolBarFixed>
          <ToolbarGroup
            firstChild style={{
              width: '60%',
              marginLeft: '5%',
            }}
          >
            <Field
              name="filter"
              hintText="Grupo ou pessoa..."
              floatingLabelText="Buscar"
              autoFocus={false}
              multiLine={false}
              component={renderTextField}
            />
          </ToolbarGroup>
          <ToolbarGroup lastChild>
            <FlatButton
              onTouchTap={((evt) => this.goToAddGroup(evt.target.value))}
              label="CRIAR"
              labelPosition="before"
              primary
              icon={<GroupAdd />}
            />
          </ToolbarGroup>
        </ToolBarFixed>
        <Content>
          <ChannelList channels={filteredChannels} users={filteredUsers} user={user} />
        </Content>
        <Drawer
          open={this.state.isDrawerOpen}
          docked={false}
          onRequestChange={(isDrawerOpen) => this.setState({ isDrawerOpen })}
        >
          <Card expanded>
            <CardHeader
              title={user.displayName}
              subtitle={user.email}
              avatar={user.photoURL}
              actAsExpander
            />
          </Card>
          <List>
            <ListItem>
              <Subheader>Opcões</Subheader>
              <ListItem
                primaryText="Sair"
                onTouchTap={this.singOut.bind(this)}
                rightIcon={<ExitToApp />}
              />
            </ListItem>
          </List>
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { main = {}, login = {} } = state.toJS();
  return {
    filteredChannels: getFilteredGroups(state, props),
    users: main.users,
    user: login.user,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'main',
})(MainPage));
