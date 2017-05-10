/**
 * Created by dumorango on 07/05/17.
 */

import React from 'react';
import { Toolbar, ToolbarGroup, ToolbarTitle, FontIcon, Avatar, RaisedButton, FlatButton  } from 'material-ui';
import { withRouter } from 'react-router-dom';

const style = {
    marginLeft: 5,
}

const TitleAndBackHeader = ({ title, history, avatar, rightLegend, rightAction, leftLegend, leftAction }) => {
    function goBack() {
        history.replace('/');
    }
    return (
        <Toolbar style={{
            backgroundColor: 'white',
            position: 'fixed',
            zIndex: 3,
            top: '60px',
            width: '100%',
            noGutter: true
            // justifyContent: 'center'
        }}>
            <ToolbarGroup firstChild={true} onTouchTap={goBack}>
                <FlatButton
                    label={leftLegend || 'Voltar'}
                    labelPosition="after"
                    primary={true}
                    icon={ <FontIcon className="fa fa-chevron-left"/>}
                />
            </ToolbarGroup>
            <ToolbarGroup style={{ }}>
                <ToolbarTitle style={{

                }} text={title} />
            </ToolbarGroup>
        </Toolbar>
    );
};

export default withRouter(TitleAndBackHeader);
