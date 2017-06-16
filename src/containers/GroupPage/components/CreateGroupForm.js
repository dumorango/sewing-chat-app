// @flow
import React, { Component } from 'react';
import { Field, reduxForm, startSubmit, touch } from 'redux-form/immutable';
import { fromJS, Map, List } from 'immutable';
import { connect } from 'react-redux';
import { TextField, Checkbox, AutoComplete, MenuItem, Avatar, List as MuiList, Snackbar, LinearProgress } from 'material-ui';
import LockOpen from 'material-ui/svg-icons/action/lock-open';
import Lock from 'material-ui/svg-icons/action/lock';
import { push } from 'react-router-redux';
import trim from 'trim';

import TitleAndBackHeader from 'components/TitleAndBackHeader';
import AppBar from 'components/AppBar';
import Content from 'components/Content';
import ImageSelector from 'components/ImageSelector';
import GroupParticipantsItem from './GroupParticipantsItem';
import Group from '../../../domain/Group';
import User from '../../../domain/User';


const renderTextField = ({ input, meta: { touched, error }, ...custom }) => (
  <TextField
    errorText={touched && error}
    {...input}
    {...custom}
  />);

const renderCheckBox = ({ input, meta, labelByValue, ...custom }) => <Checkbox
  label={labelByValue(input.value)}
  checked={!!input.value}
  onCheck={(e, value) => input.onChange(value)}
  {...custom}
/>;

const renderUsersAutoComplete = ({ input: { value, onChange }, meta, users = [], isCurrentUserAdmin, canEditMember, style, ...custom }) => {
  const valueJS = value.toJS();
  const nonIncludedUsers = users.filter((user) => !valueJS[user.uid]);
  const usersList = nonIncludedUsers
      .map((user) => ({
        text: user.displayName,
        value: (<MenuItem
          primaryText={user.displayName}
          rightIcon={<Avatar src={user.photoURL} />}
        />),
      }));
  return (<div>
    <AutoComplete
      hintText="Digite o nome de alguém..."
      dataSource={usersList}
      floatingLabelText="Participantes"
      style={Object.assign({ display: isCurrentUserAdmin ? 'inherit' : 'none' }, style)}
      fullWidth
      onNewRequest={(event, userIndex) => {
        const user = nonIncludedUsers[userIndex];
        event.text = '';
        onChange(value.set(user.uid, fromJS({
          user,
          isAdmin: false,
        })));
      }}
      filter={AutoComplete.caseInsensitiveFilter}
    />
    <MuiList>
      { value.toList().map((member) => {
        const { user, isAdmin } = member.toJS();
        return (<GroupParticipantsItem
          key={user.uid}
          groupUser={user}
          isGroupUserAdmin={isAdmin}
          setAdmin={
            canEditMember(user) && (() => {
              onChange(value.set(user.uid, fromJS({
                user,
                isAdmin: !isAdmin,
              })));
            })
        }
          removeMember={canEditMember(user) && (() => onChange(value.delete(user.uid)))}
        />);
      })}
    </MuiList>
  </div>);
};

const alreadyExists = (newGroup, channels = []) =>
    channels
        .filter((channel) => channel.key !== newGroup.key)
        .find((channel) => trim(channel.name) === trim(newGroup.name) && channel.privacy === newGroup.privacy);

const validateFunction = (groupMap: Map<string, Group>, props) => {
  const { groups } = props;
  const group = groupMap.toJS();
  const errors = {};
  if (!group.name) {
    errors.name = 'Defina um nome pro grupo';
  } else if (alreadyExists(group, groups)) {
    errors.name = 'Já existe um grupo com esse nome';
  }
  return errors;
};


class CreateGroupForm extends Component {

  onPictureChange: Function;
  isAdmin: Function; // noinspection-line Eslint

  constructor(props) {
    super(props);
    this.onPictureChange = this.onPictureChange.bind(this);
    this.isAdmin = this.isAdmin.bind(this);
  }


  onPictureChange(event, file) {
    console.log(file);
    this.props.uploadPhoto(file);
  }

  isAdmin() {
    const { members } = this.props.initialValues.toJS();
    const { currentUser } = this.props;
    return members[currentUser.uid].isAdmin;
  }

  componentWillMount() {
    // this.props.dispatch(registerField('group', 'key', Field));
  }

  componentWillReceiveProps({ dispatch, submitSucceeded }) {
    if (submitSucceeded) dispatch(push('/'));
  }

  props: {
      currentUser: User;
      initialValues: Map;
      title: string,
      dispatch: Function,
      handleSubmit: Function,
      submitting: boolean,
      submitFailed: boolean,
      submitSucceeded: boolean,
      users: List<User>,
      currentUser: User,
      valid: boolean,
      uploadPhoto: Function,
  };


  render() {
    const { title, dispatch, handleSubmit, submitting, submitFailed, users, currentUser, valid } = this.props;

    const formElementStyle = {
      margin: '20px',
      maxWidth: '250px',
    };

    return (
      <div>
        <AppBar title={title} />
        <TitleAndBackHeader
          rightAction={
              () =>
                dispatch(touch('group', 'name')) &&
                valid &&
                !submitting &&
                dispatch(startSubmit('group'))
          }
          rightLegend="Criar"
        />
        <Content>
          { submitting && <LinearProgress mode="indeterminate" /> }
          <form onSubmit={handleSubmit} autoComplete="off">
            <div style={{ padding: 20 }}>
              <Field
                type="file"
                name="image"
                component={ImageSelector}
                onChange={this.onPictureChange}
              />
              <Field
                name="name"
                hintText="Costureiras de Plantão"
                floatingLabelText="Nome do Grupo"
                multiLine={false}
                style={formElementStyle}
                disabled={!this.isAdmin()}
                component={renderTextField}
              />
              <Field
                name="privacy"
                checkedIcon={<Lock />}
                uncheckedIcon={<LockOpen />}
                disabled={!this.isAdmin()}
                style={formElementStyle}
                component={renderCheckBox}
                labelByValue={(value) => value ? 'Privado' : 'Público'}
              />
              <Field
                name="members"
                component={renderUsersAutoComplete}
                users={users}
                canEditMember={(user) => this.isAdmin() && currentUser.uid !== user.uid}
                isCurrentUserAdmin={this.isAdmin()}
                style={formElementStyle}
              />
              <Snackbar
                open={submitFailed}
                message="Houve um erro ao criar/editar o grupo"
                autoHideDuration={0}
              />
            </div>
          </form>
        </Content>
      </div>
    );
  }
}

const mapStateToProps = (state: Map, props: Object) => {
  const { currentUser } = props;
  const members = {};
  members[currentUser.uid] = { user: currentUser, isAdmin: true };
  return {
    initialValues: {
      members,
      privacy: false,
    },
  };
};

function mapDispatchToProps(dispatch: Function) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'group',
  validate: validateFunction,
})(CreateGroupForm));
