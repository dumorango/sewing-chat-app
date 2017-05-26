import React from 'react';
import { ToolbarGroup, Avatar, FlatButton  } from 'material-ui';
import { withRouter } from 'react-router-dom';
import ToolBarFixed from './ToolBarFixed';

import ArrowFoward from 'material-ui/svg-icons/navigation/arrow-forward';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

const TitleAndBackHeader = ({ history, avatar, rightLegend, rightAction, leftLegend }) => {
    function goBack() {
        history.replace('/');
    }
    return (
        <ToolBarFixed>
            <ToolbarGroup firstChild={true} onTouchTap={goBack}>
                <FlatButton
                    label={leftLegend || 'Voltar'}
                    labelPosition="after"
                    primary={true}
                    icon={ <ArrowBack/> }
                />
            </ToolbarGroup>

            <ToolbarGroup lastChild={true} onTouchTap={rightAction}>
             {avatar ? <Avatar src={avatar}/> :
             <FlatButton
             label={rightLegend}
             labelPosition="before"
             primary={true}
             icon={ <ArrowFoward/> }
             style={rightAction ? {} : { display: 'none' }}
             /> }
             </ToolbarGroup>
        </ToolBarFixed>
    );
};

export default withRouter(TitleAndBackHeader);
