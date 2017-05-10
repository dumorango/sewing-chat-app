import React from 'react';
import { TextField, FloatingActionButton, FontIcon } from 'material-ui';
import TitleAndBackHeader from './TitleAndBackHeader';

const CreateGroupForm = ({ updateField, createGroup, error }) => {
    return (
        <div>
            <TitleAndBackHeader title="Criar Grupo" rightAction={createGroup} rightLegend="Criar"/>
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
        </div>
    );
};

export default CreateGroupForm;