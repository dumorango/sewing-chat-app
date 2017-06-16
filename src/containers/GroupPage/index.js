import React from 'react';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Loading from 'components/Loading';

import CreateGroupForm from './components/CreateGroupForm';

import { getGroupsAsList } from './selectors';

class GroupPage extends React.Component {
  constructor(props) {
    super(props);
    this.isCurrentUser = this.isCurrentUser.bind(this);
  }

  goToGroup(group) {
    this.props.dispatch(push(`/groups/${group.key}`));
  }

  getGroupId() {
    return this.props.match.params.group;
  }

  isLoading() {
    const { user } = this.props;
    return (!user);
  }

  isCurrentUser(user) {
    return this.props.user.uid === user.uid;
  }

  render() {
    if (this.isLoading()) return <Loading />;
    const { user, users, groups } = this.props;
    return (
      <CreateGroupForm
        title={this.getGroupId() ? this.state.group.name : 'Criar Grupo'}
        createGroup={this.getGroupId() ? null : this.createGroup}
        currentUser={user}
        users={users}
        groups={groups}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { main = {}, login = {} } = state.toJS();
  return {
    groups: getGroupsAsList(state),
    users: main.users,
    user: login.user,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupPage);
