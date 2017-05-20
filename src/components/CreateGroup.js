import React from 'react';
import base from '../store/rebase';
import CreateGroupForm from './CreateGroupForm';
import { withRouter } from 'react-router-dom';
import trim from 'trim';
import moment from 'moment';

class CreateGroup extends React.Component {
    constructor(props) {
        super(props);
        this.changeName = this.changeName.bind(this);
        this.createGroup = this.createGroup.bind(this);
        this.goToGroup = this.goToGroup.bind(this);
        this.alreadyExists = this.alreadyExists.bind(this);
        this.togglePublic = this.togglePublic.bind(this);
        this.addMember = this.addMember.bind(this);
        this.removeMember = this.removeMember.bind(this);
        this.getGroupId = this.getGroupId.bind(this);
        this.updateGroup = this.updateGroup.bind(this);
        this.setAdmin = this.setAdmin.bind(this);
        const user = base.getCurrentUser();
        const members = {};
        members[user.uid] = true;
        const admin = {};
        admin[user.uid] = true;
        this.state = {
            group : {
                privacy: 'public',
                members,
                admin
            },
            ready: false,
            user
        };
    }

    validateGroup(group){
        let error;
        if(!group.name) {
            error = 'Defina um nome pro grupo';
        }else if(this.alreadyExists(group)){
            error =  'Já existe um grupo com esse nome'
        } else {
           error = null;
        }
        this.setState({ error });
        return error;
    }

    isAdmin() {

    }

    changeName(name) {
        let group = this.state.group;
        group.name = name;
        this.setState({ group });
        this.validateGroup(group);
    }

    addMember(memberUid) {
        let group = this.state.group;
        group.members[memberUid] = true;
        this.setState({ group });
    }

    setAdmin(userId, value){
        let group = this.state.group;
        group.admin[userId] = value;
        this.setState({ group });
    }

    removeMember(memberUid) {
        let group = Object.assign(this.state.group);
        group.members[memberUid] = false;
        this.setState({ group });
    }

    togglePublic(_, isPublic){
        let group = this.state.group;
        group.privacy = isPublic ?  'public' : 'private';
        this.setState({ group });
        this.validateGroup(group);
    }

    goToGroup(group) {
        this.props.history.replace(`/groups/${group.key}`);
    }

    goToHome() {
        this.props.history.replace('/');
    }

    alreadyExists(newGroup) {
        const { channels } = this.props;
        return channels
            .filter(channel => channel.type === 'group' && channel.key !== this.getGroupId())
            .find(channel => trim(channel.name) === trim(newGroup.name) && channel.privacy === newGroup.privacy);
    }

    createGroup() {
        const { group, user }  = this.state;
        const { channels } = this.props;
        let admin = {};
        admin[user.uid] = true;
        if(!this.validateGroup(group)) {
            group.creator = user;
            group.type = 'group';
            group.createdAt = moment.now();
            group.admin = admin;
            base.push('channels', {
                data: Object.assign({
                    name: trim(group.name),
                    creator: user,
                    type: 'group',
                    createdAt:  moment.now(),
                    admin
                }, group)
            }).then((group) => {
                this.goToGroup(group);
            });
        }
    }

    updateGroup(){
        const { group }  = this.state;
        if(!this.validateGroup(group)) {
            group.updateAt = moment.now();
            base.update(`channels/${this.getGroupId()}`, {
                data: group,
            });
            this.goToHome();
        }
    }

    getGroupId() {
        return this.props.match.params.group;
    }

    componentWillMount(){
        base.bindToState('users', {
            context: this,
            state: 'users',
            asArray: true
        });
        const groupId =  this.getGroupId();
        if(!groupId) {
            this.setState({
                ready: true
            })
        }
        base.syncState(`channels/${groupId}`, {
            context: this,
            state: 'group',
            then() {
                this.setState({
                    ready: true
                })
            }
        });
    }

    render() {
        return (
            <CreateGroupForm
                title={this.state.ready && this.getGroupId() ? this.state.group.name : 'Criar Grupo' }
                changeName={this.changeName}
                saveGroup={this.getGroupId()? this.updateGroup : this.createGroup }
                goBack={this.goBack}
                error={this.state.error}
                isPublic={this.state.isPublic}
                tooglePublic={this.togglePublic}
                users={this.state.users}
                currentUser={this.state.user}
                addMember={this.addMember}
                removeMember={this.removeMember}
                ready={this.state.ready}
                group={this.state.group}
                setAdmin={this.setAdmin}
            />
        );
    }
}

export default withRouter(CreateGroup);