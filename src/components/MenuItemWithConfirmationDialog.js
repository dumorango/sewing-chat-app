import { FlatButton, Dialog, MenuItem } from 'material-ui';
import React, { Component } from 'react';

export default class MenuItemWithConfirmationDialog extends Component {

    constructor(props){
        super(props);
        this.state = {
            open: false
        };
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleConfirm = () => {
        this.handleClose();
        this.props.onConfirm();
    };

    render() {
        const actions = [
            <FlatButton
                label="Cancelar"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Confirmar"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleConfirm}
            />,
        ];

        const { rightIcon, confirmationTitle, confirmationSubTitle } = this.props;
        return (
            <div>
            <MenuItem
                rightIcon={rightIcon}
                onTouchTap={this.handleOpen}
            >{this.props.title}</MenuItem>
            <Dialog
                    style={{
                        zIndex: 3000
                    }}
                    title={confirmationTitle}
                    subTitle={confirmationSubTitle}
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                {this.props.confirmationContent}
            </Dialog>
            </div>
        );
    }

}