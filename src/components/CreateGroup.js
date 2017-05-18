import React from 'react';
import base from '../store/rebase';
import CreateGroupForm from './CreateGroupForm';
import { withRouter } from 'react-router-dom';
import trim from 'trim';

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
        this.state = {
            isPublic: true,
            members: {}
        };
    }

    validateGroup(params){
        const { isPublic, name } = params;
        if(!name){
            this.setState({
                error: 'Defina um nome pro grupo'
            })
        }else if(isPublic && this.alreadyExists(name)){
            this.setState({
                error: 'Já existe um grupo público com esse nome'
            })
        } else {
            this.setState({
                error: undefined
            })
        }
    }

    changeName(rawName) {
        const name = trim(rawName);
        this.setState({
            name
        });
        this.validateGroup({ name, isPublic: this.state.isPublic });
    }

    addMember(memberUid) {
        let members = this.state.members;
        members[memberUid] = true;
        this.setState({ members });
    }

    removeMember(memberUid) {
        let members = this.state.members;
        delete members[memberUid];
        this.setState({ members });
    }

    togglePublic(_, isPublic){
        this.setState({ isPublic });
        this.validateGroup({ name: this.state.name, isPublic });
    }

    goToGroup(group) {
        this.props.history.replace(`/groups/${group.key}`);
    }

    alreadyExists(name) {
        const { channels } = this.props;
        return channels
            .filter(channel => channel.type === 'group')
            .find(channel => channel.name === name);
    }

    createGroup() {
        let { name, isPublic, members } = this.state;
        const { channels } = this.props;
        const user = base.getCurrentUser();
        members[user.uid] = true;
        let admin = {};
        admin[user.uid] = true;
        if(name && !this.validateGroup({ name, isPublic })) {
            base.push('channels', {
                data: {
                    name,
                    creator: user,
                    admin,
                    members,
                    type: 'group',
                    privacy: isPublic ? 'public' : 'private'
                }
            }).then((group) => {
                this.goToGroup(group);
            });
        }
    }

    componentDidMount(){
        base.bindToState('users', {
            context: this,
            state: 'users',
            asArray: true
        });
    }

    render() {
        return (
            <CreateGroupForm
                changeName={this.changeName}
                createGroup={this.createGroup}
                goBack={this.goBack}
                error={this.state.error}
                isPublic={this.state.isPublic}
                tooglePublic={this.togglePublic}
                users={this.state.users}
                addMember={this.addMember}
                removeMember={this.removeMember}
                members={this.state.members}
            />
        );
    }
}

export default withRouter(CreateGroup);