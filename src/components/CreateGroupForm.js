import React, { Component } from 'react';
import { TextField, Checkbox, FontIcon, AutoComplete, MenuItem, Avatar, Chip } from 'material-ui';
import TitleAndBackHeader from './TitleAndBackHeader';
import AppBar from './AppBar';
import Content from './Content';

class CreateGroupForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            searchText : ''
        }
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

    handleRequestDelete = (uid) => {
        this.props.removeMember(uid);
    };

    render() {
        const { changeName, createGroup, error, isPublic, tooglePublic, users = [], addMember, members = {}} = this.props;
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

        const membersList = Object.keys(members).map((key) => {
            let user = users.find(user => user.uid === key) || {};
            return <Chip
                onRequestDelete={() => this.handleRequestDelete(key)}
                key={key}
                style={{
                    marginBottom: '10px'
                }}
                >
                <Avatar src={user.photoURL} />
                {user.displayName}
            </Chip>
        });
        return (
                <div>
                    <AppBar title="Criar Grupo"/>
                    <TitleAndBackHeader title="Criar Grupo" rightAction={createGroup} rightLegend="Criar"/>
                    <Content>
                        <div style={{ marginBottom: '60px', marginTop: '60px', marginLeft: '20px'}}>
                            <TextField
                                hintText="Costureiras de Plantão"
                                floatingLabelText="Nome do Grupo"
                                multiLine={false}
                                name="name"
                                onChange={this.onChangeName.bind(this)}
                                errorText={error}
                                style={formElementStyle}
                            />
                            <Checkbox
                                checkedIcon={<FontIcon className="fa fa-unlock"/>}
                                uncheckedIcon={<FontIcon className="fa fa-lock"/>}
                                label={ isPublic ? 'Público' : 'Privado'}
                                style={formElementStyle}
                                defaultChecked={isPublic}
                                onCheck={tooglePublic}
                            />
                            <AutoComplete
                               hintText="Digite o nome de alguém..."
                               dataSource={usersList}
                               floatingLabelText="Participantes"
                               style={formElementStyle}
                               fullWidth={true}
                               searchText={this.state.searchText}
                               onNewRequest={this.onAddMember.bind(this)}
                               onUpdateInput={this.handleUpdateInput.bind(this)}
                               filter={AutoComplete.caseInsensitiveFilter}
                            />
                            { membersList }
                        </div>
                    </Content>
                </div>
            );
        }
}

export default CreateGroupForm;