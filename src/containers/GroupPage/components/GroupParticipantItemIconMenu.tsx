import {
    IconMenu,
    IconButton,
    MenuItem,
} from "material-ui";
import Delete from "material-ui/svg-icons/action/delete";
import SupervisorAccount from "material-ui/svg-icons/action/supervisor-account";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import * as React from "react";
import MenuItemWithConfirmationDialog from "../../../components/MenuItemWithConfirmationDialog";
import {User} from "../../../models";

interface IProps {
    isGroupUserAdmin: boolean;
    removeMember: (uid: string, isAdmin: boolean) => void;
    setAdmin: (groupUser: User, isGroupUserAdmin: boolean) => void;
    canEditMember: boolean,
    groupUser: User;
}

interface IState {
    menuOpen: boolean;
}

const iconButton =
    <IconButton
        touch={true}
        tooltip="opcões"
    >
        <MoreVertIcon />
    </IconButton>;

export class GroupParticipantItemIconMenu extends React.Component<IProps, IState> {

    public constructor(props) {
        super(props);
        this.state = {
            menuOpen: false,
        };
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    public render() {
        const { isGroupUserAdmin, removeMember, setAdmin, groupUser, canEditMember } = this.props;
        const onTouchTapMenuItem = () => {
            this.toggleMenu();
            setAdmin(groupUser, !isGroupUserAdmin);
        };
        const onConfirm = () => removeMember(groupUser.uid, isGroupUserAdmin);
        if (canEditMember) {
            return <IconMenu
                open={this.state.menuOpen}
                touchTapCloseDelay={0}
                useLayerForClickAway={true}
                iconButtonElement={iconButton}
                onTouchTap={this.toggleMenu}
            >
                <MenuItem
                    rightIcon={<SupervisorAccount />}
                    onTouchTap={onTouchTapMenuItem}
                >
                    {isGroupUserAdmin ? "Tornar Usuário Comum" : "Tornar Administrador"}
                </MenuItem>
                <MenuItemWithConfirmationDialog
                    title={"Apagar"}
                    confirmationTitle={`Deseja realmente remover ${groupUser.displayName} do grupo ?`}
                    rightIcon={<Delete />}
                    onConfirm={onConfirm}
                />
            </IconMenu>;
        }
    }

    private toggleMenu() {
        this.setState({
            menuOpen: !this.state.menuOpen,
        });
    }
}
