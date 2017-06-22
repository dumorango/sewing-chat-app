import ExitToApp from "material-ui/svg-icons/action/exit-to-app";
import GroupAdd from "material-ui/svg-icons/social/group-add";
import * as React from "react";
import { Field, reduxForm, startSubmit, touch } from "redux-form/immutable";

import { connect } from "react-redux";

import { push } from "react-router-redux";
import { logout  } from "../../actions";
import AppBar from "../../components/AppBar";
import ChannelList from "../../components/ChannelList";
import Content from "../../components/Content";
import ToolBarFixed from "../../components/ToolBarFixed";

import { IStateRecord } from "../../store/state";

import { List } from "immutable";
import { Group, User } from "../../models";

import {
    Card,
    CardHeader,
    Drawer,
    FlatButton,
    List as MuiList,
    ListItem,
    Subheader,
    TextField,
    ToolbarGroup,
} from "material-ui";

import { getFilteredGroups } from "./selectors";

const renderTextField = ({ input, meta: { touched, error }, ...custom }) => (
  <TextField
    errorText={touched && error}
    {...input}
    {...custom}
  />);

interface IStateProps {
    filteredChannels: List<Group>;
    filteredUsers: List<User>;
    user: User;
}
interface IActionProps {
    logout: () => void;
    goToAddGroup: () => void;
}

interface IProps extends IStateProps, IActionProps {}

interface IState {
    isDrawerOpen: boolean;
}

class MainPage extends React.Component<IProps, IState> {

  constructor(props) {
    super(props);
    this.openDrawer = this.openDrawer.bind(this);
    this.state = {
      isDrawerOpen: false,
    };
  }

  public componentWillMount() {
    this.setState({
      isDrawerOpen: false,
    });
  }

  public render() {
    const { filteredChannels, user, filteredUsers } = this.props;
    return (
      <div>
        <AppBar
          title="Conversas"
          onLeftIconButtonTouchTap={this.openDrawer}
        />
        <ToolBarFixed>
          <ToolbarGroup
            firstChild={true}
            style={{
              width: "60%",
              marginLeft: "5%",
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
          <ToolbarGroup lastChild={true}>
            <FlatButton
              onTouchTap={this.props.goToAddGroup}
              label="CRIAR"
              labelPosition="before"
              primary={true}
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
          onRequestChange={this.toggleDrawer}
        >
          <Card expanded={true}>
            <CardHeader
              title={user.displayName}
              subtitle={user.email}
              avatar={user.photoURL}
              actAsExpanded={true}
            />
          </Card>
          <MuiList>
            <ListItem>
              <Subheader>Opcões</Subheader>
              <ListItem
                primaryText="Sair"
                onTouchTap={this.props.logout}
                rightIcon={<ExitToApp />}
              />
            </ListItem>
          </MuiList>
        </Drawer>
      </div>
    );
  }

  private openDrawer() {
    this.setState({
        isDrawerOpen: true,
    });
  }

  private toggleDrawer() {
    this.setState({ isDrawerOpen: !this.state.isDrawerOpen });
  }
}

const mapStateToProps = (state: IStateRecord) => {
    return {
    filteredChannels: getFilteredGroups(state),
    filteredUsers: state.main.users,
    user: state.login.user,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    goToAddGroup: () => dispatch(push("/addgroup")),
    logout: () => dispatch(logout()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: "main",
})(MainPage));
