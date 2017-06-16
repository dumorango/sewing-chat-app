import React from 'react';
import { CircularProgress } from 'material-ui';
import Content from 'components/Content';

const Loading = ({ style }) => {
    style = Object.assign({
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }, style);
    return <Content><CircularProgress
        mode="indeterminate"
        style={style}/>
    </Content>
};

export default Loading;