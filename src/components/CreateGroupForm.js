import React, { Component } from 'react';
import { TextField, Checkbox, AutoComplete, MenuItem, Avatar, FlatButton, Dialog } from 'material-ui';
import TitleAndBackHeader from './TitleAndBackHeader';
import AppBar from './AppBar';
import Content from './Content';
import Loading from './Loading';
import GroupParticipantsList from './GroupParticipantsList';
import ImageSelector from './ImageSelector';

import LockOpen from 'material-ui/svg-icons/action/lock-open';
import Lock from 'material-ui/svg-icons/action/lock';

import '../../node_modules/cropperjs/dist/cropper.css';
import ReactDOM from "react-dom";

class CreateGroupForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            searchText : ''
        };
        this.isAdmin = this.isAdmin.bind(this);
    }

    onChangeName = (event) => {
        this.props.changeName(event.target.value);
    };

    onAddMember = (event, userIndex) => {
        const { users = []} = this.props;
        this.props.addMember(users[userIndex].uid);
        this.setState({
            searchText : ''
        });
    };

    handleUpdateInput = (searchText) => {
        this.setState({
            searchText: searchText,
        });
    };

    isAdmin(){
        const { currentUser, group} = this.props;
        return group.admin[currentUser.uid]
    }

    render() {
        const {  createGroup, error, tooglePublic, users = [], currentUser, title, ready, group, setAdmin, removeMember, uploadPhoto } = this.props;
        const isPublic = group.privacy === 'public';
        if(!ready) return <Loading/>;
        const formElementStyle = {
            margin: '20px',
            maxWidth: '250px'
        };

        const usersList = users.map(user => ({
            text: user.displayName,
            value: ( <MenuItem
                primaryText={user.displayName}
                rightIcon={<Avatar src={user.photoURL} />}
            /> )
        }));

        return (
                <div>

                    <AppBar title={title}/>
                    <TitleAndBackHeader title="Criar Grupo" rightAction={createGroup} rightLegend="Criar"/>
                    <Content>
                        <div style={{ padding: 20 }}>
                            <ImageSelector
                                uploadPhoto={uploadPhoto}
                                originalImage={group.photoURL}
                            />
                            <TextField
                                hintText="Costureiras de Plantão"
                                floatingLabelText="Nome do Grupo"
                                multiLine={false}
                                onChange={this.onChangeName.bind(this)}
                                errorText={error}
                                style={formElementStyle}
                                value={group.name || ''}
                                disabled={!this.isAdmin()}
                            />
                            <Checkbox
                                checkedIcon={<LockOpen/>}
                                uncheckedIcon={<Lock/>}
                                label={ isPublic ? 'Público' : 'Privado'}
                                style={formElementStyle}
                                defaultChecked={isPublic}
                                onCheck={tooglePublic}
                                disabled={!this.isAdmin()}

                            />
                            <AutoComplete
                               hintText="Digite o nome de alguém..."
                               dataSource={usersList}
                               floatingLabelText="Participantes"
                               style={Object.assign({
                                   display: this.isAdmin() ? 'inherit' : 'none'
                               },formElementStyle)}
                               fullWidth={true}
                               searchText={this.state.searchText}
                               onNewRequest={this.onAddMember.bind(this)}
                               onUpdateInput={this.handleUpdateInput.bind(this)}
                               filter={AutoComplete.caseInsensitiveFilter}
                            />
                            <GroupParticipantsList
                                currentUser={currentUser}
                                users={users}
                                group={group}
                                members={group.members}
                                isCurrentUserAdmin={this.isAdmin()}
                                setAdmin={setAdmin}
                                removeMember={removeMember}
                            />
                        </div>
                    </Content>
                </div>
            );
        }
}

export default CreateGroupForm;