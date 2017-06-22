import {
    Dialog,
    FlatButton,
    MenuItem,
    SvgIcon,
} from "material-ui";
import * as React from "react";

interface IProps {
    title: string;
    onConfirm: () => void;
    rightIcon: SvgIcon;
    confirmationTitle: string;
    confirmationSubTitle?: string;
}

interface IState {
    open: boolean;
}

export default class MenuItemWithConfirmationDialog extends React.Component<IProps, IState> {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    public render() {
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
            >{this.props.title}
            </MenuItem>
            <Dialog
                    style={{
                        zIndex: 3000,
                    }}
                    title={confirmationTitle}
                    subTitle={confirmationSubTitle}
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
            />
            </div>
        );
    }

    private handleOpen() {
        this.setState({open: true});
    }

    private handleClose() {
        this.setState({open: false});
    }

    private handleConfirm() {
        this.handleClose();
        this.props.onConfirm();
    }
}
