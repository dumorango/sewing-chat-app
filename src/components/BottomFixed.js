import React from 'react';
import { Paper } from 'material-ui';

class BottomFixed extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const style = Object.assign({
            zIndex: 1,
            position: 'fixed',
            width: '100%',
            display: 'block',
            border: '0px',
            backgroundColor: 'white',
            bottom: '0px'
        }, this.props.style);

        return (
            <div style={style}>
                <div style={{
                    display: 'fixed',
                    bottom: '0px'
                }}>
                    {this.props.children}
                </div>
            </div>
        );
    }

}

export default BottomFixed;