import { FlatButton, Dialog, MenuItem, FontIcon } from 'material-ui';
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

        return (
            <div>
            <MenuItem
                rightIcon={<FontIcon className="fa fa-trash"/>}
                onTouchTap={this.handleOpen}
            >{this.props.title}</MenuItem>
            <Dialog
                    style={{
                        zIndex: 3000
                    }}
                    title={this.props.confirmationTitle}
                    subTitle={this.props.confirmationSubTitle}
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