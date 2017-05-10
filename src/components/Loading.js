import React from 'react';
import { CircularProgress } from 'material-ui';

const Loading = ({ style }) => {
    style = Object.assign({
        paddingTop: '20px',
        paddingBottom: '20px',
        margin: '0 auto',
        display: 'block',
        width: '60px'
    }, style);
    return <CircularProgress
        mode="indeterminate"
        style={style}/>;
};

export default Loading;