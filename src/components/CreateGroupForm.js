import React from 'react';
import { TextField, FloatingActionButton, FontIcon } from 'material-ui';
import TitleAndBackHeader from './TitleAndBackHeader';
import AppBar from './AppBar';
import Content from './Content';

const CreateGroupForm = ({ updateField, createGroup, error }) => {
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
                            onChange={updateField}
                            errorText={error}
                        /><br/>
                    </div>
                </Content>
            </div>
    );
};

export default CreateGroupForm;