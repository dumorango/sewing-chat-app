import React from 'react';
import base from '../store/rebase';
import CreateGroupForm from './CreateGroupForm';
import { withRouter } from 'react-router-dom';
import trim from 'trim';

class CreateGroup extends React.Component {
    constructor(props) {
        super(props);
        this.updateField = this.updateField.bind(this);
        this.createGroup = this.createGroup.bind(this);
        this.goToGroup = this.goToGroup.bind(this);
        this.alreadyExists = this.alreadyExists.bind(this);
    }

    componentWillMount() {
        this.setState({
            group: {}
        });
    }

    updateField(event) {
        const field = event.target.name;
        let group = this.state.group;
        group[field] = trim(event.target.value);
        this.setState({group});
        if(this.alreadyExists(group)){
            this.setState({
                error: 'Já existe um grupo com esse nome'
            })
        } else {
            this.setState({
                error: undefined
            })
        }
    }

    goToGroup(group) {
        this.props.history.replace(`/groups/${group.key}`);
    }

    alreadyExists(group) {
        const { channels } = this.props;
        return channels
            .filter(channel => channel.type === 'group')
            .find(channel => channel.name === group.name);
    }

    createGroup(event) {
        const { group } = this.state;
        const { channels } = this.props;
        const members = {};
        const user = base.getCurrentUser();
        members[user.uid] = user;
        if(group && !this.alreadyExists(group)) {
            base.push('channels', {
                data: {
                    name: group.name,
                    creator: user,
                    members,
                    type: 'group'
                }
            }).then((group) => {
                this.goToGroup(group);
            });
        }
    }

    render() {
        return (
            <CreateGroupForm updateField={this.updateField} createGroup={this.createGroup} goBack={this.goBack} error={this.state.error}/>
        );
    }
}

export default withRouter(CreateGroup);