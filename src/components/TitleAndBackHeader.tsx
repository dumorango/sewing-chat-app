import * as React from 'react';
import { ToolbarGroup, Avatar, FlatButton } from 'material-ui';
import { withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import ArrowFoward from 'material-ui/svg-icons/navigation/arrow-forward';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

import ToolBarFixed from './ToolBarFixed';

const TitleAndBackHeader = ({ avatar, rightLegend, rightAction, leftLegend, dispatch }) => {
  function goBack() {
    dispatch(push('/'));
  }

  return (
    <ToolBarFixed>
      <ToolbarGroup firstChild onTouchTap={goBack}>
        <FlatButton
          label={leftLegend || 'Voltar'}
          labelPosition="after"
          primary
          icon={<ArrowBack />}
        />
      </ToolbarGroup>

      <ToolbarGroup lastChild onTouchTap={rightAction}>
        {avatar ? <Avatar src={avatar} /> :
        <FlatButton
          label={rightLegend}
          labelPosition="before"
          primary
          icon={<ArrowFoward />}
          style={rightAction ? {} : { display: 'none' }}
        /> }
      </ToolbarGroup>
    </ToolBarFixed>
  );
};

const mapStateToProps = () => ({});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TitleAndBackHeader));
