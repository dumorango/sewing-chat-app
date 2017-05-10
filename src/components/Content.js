import React from 'react';

const Content = ({ children, style }) => {
            style = Object.assign({
                    padding: '1px',
                    paddingTop: '60px',
                    bottom: '0px',
                    height: '100%'
                }, style);
            return <div style={ style }>
                { children }
            </div>;
        };

export default Content;