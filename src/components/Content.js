import React from 'react';

const Content = ({ children, style }) => {
            style = Object.assign({
                    paddingTop: '60px',
                    zIndex: 0
                }, style);
            return <div style={ style }>
                { children }
            </div>;
        };

export default Content;