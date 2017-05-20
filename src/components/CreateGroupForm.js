import React, { Component } from 'react';
import { TextField, Checkbox, FontIcon, AutoComplete, MenuItem, Avatar, List, ListItem, Toggle } from 'material-ui';
import TitleAndBackHeader from './TitleAndBackHeader';
import AppBar from './AppBar';
import Content from './Content';
import Loading from './Loading';
import GroupParticipantsList from './GroupParticipantsList';

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
        const {  saveGroup, error, tooglePublic, users = [], currentUser, title, ready, group, setAdmin, removeMember} = this.props;
        const isPublic = group.privacy === 'public';
        const members = group.members;
        if(!ready) return <Loading/>;
        const { searchText } = this.state;
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
                    <TitleAndBackHeader/>
                    <Content>
                        <div style={{ marginBottom: '60px', marginTop: '60px', marginLeft: '20px'}}>
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
                                checkedIcon={<FontIcon className="fa fa-unlock"/>}
                                uncheckedIcon={<FontIcon className="fa fa-lock"/>}
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