import { List, Map, Record } from "immutable";
import * as React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";

import { IStateRecord } from "../../store/state";

import Loading from "../../components/Loading";

import CreateGroupForm from "./components/CreateGroupForm";

import { Group , User } from "../../models/index";
import { getGroupsAsList } from "./selectors";

export interface IStateProps {
    user: User;
    users: List<User>;
    groups: List<Group>;
    match?: {params: {group: string}};
}

export interface IActionProps {
    dispatch: (Object) => void;
}

export interface IProps extends IStateProps, IActionProps {
    match: {
        params: {
            group: string,
        },
    };
}

class GroupPage extends React.Component<IProps, undefined> {

  public static goToGroup(group, props: IProps) {
    props.dispatch(push(`/groups/${group.key}`));
  }

  public constructor(props: IProps) {
    super(props);
    this.isLoading = this.isLoading.bind(this);
  }

  public render() {
    if (this.isLoading(this.props)) {
        return <Loading style={{}}/>;
    }
    const { user, users, groups }: IProps = this.props;
    return (
        <CreateGroupForm
            groupId={this.getGroupId()}
            currentUser={user}
            users={users}
            groups={groups}
        />
    );
  }

  private getGroupId() {
    return this.props.match.params.group;
  }

  private isLoading(props: IProps) {
    const { groups, user } = props;
    return (!user || (this.getGroupId() && !props.groups && groups.isEmpty()));
  }
}

const mapStateToProps = (state: IStateRecord) => {
  return {
    groups: getGroupsAsList(state),
    user: state.login.user,
    users: state.main.users,
  };
};

function mapDispatchToProps(dispatch: (object) => void): IActionProps {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupPage);
