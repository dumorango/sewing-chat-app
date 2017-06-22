import {fromJS, List} from "immutable";
import { Map } from "immutable";
import {
    AutoComplete,
    Avatar,
    Checkbox,
    LinearProgress,
    List as MuiList,
    MenuItem,
    Snackbar,
    TextField,
} from "material-ui";
import * as React from "react";
import { push } from "react-router-redux";
import * as ReduxForm from "redux-form/immutable";
import { Member, User } from "../../../models";
import {GroupParticipantComponent} from "./GroupParticipantComponent";

interface IProps {
    name: string;
    users: List<User>;
    isCurrentUserAdmin: boolean;
    canEditMember: (user: User) => boolean;
    style: object;
    GroupParticipantsComponentElem: typeof GroupParticipantComponent;
}

export class UserAutoComplete extends React.Component<IProps, any> {

    public render() {
        const {
            canEditMember,
            isCurrentUserAdmin,
            style,
            users,
            name,
            GroupParticipantsComponentElem,
        }: IProps = this.props;
        const renderAutoComplete = ({input: {value}, onChange}) => {
            const mapValue: Map<string, Member> = (value === "") ? Map<string, Member>() : value;
            const nonIncludedUsers = users.filter((user: User) => !mapValue.get(user.uid));
            const usersList = nonIncludedUsers
                .map((user: User) => ({
                    text: user.displayName,
                    value: <MenuItem
                        primaryText={user.displayName}
                        rightIcon={<Avatar src={user.photoURL}/>}
                    />,
                }))
                .toJS();
            const onNewRequest = (event, userIndex: number) => {
                const user = nonIncludedUsers[userIndex];
                event.text = "";
                onChange(value.set(user.uid, fromJS({
                    isAdmin: false,
                    user,
                })));
            };
            const participantList = renderParticipantList(
                mapValue,
                GroupParticipantsComponentElem,
                onChange,
                canEditMember,
            );

            return (
                <div>
                    <AutoComplete
                        hintText="Digite o nome de alguém..."
                        dataSource={usersList}
                        floatingLabelText="Participantes"
                        style={{display: (isCurrentUserAdmin ? "inherit" : "none"), ...style}}
                        fullWidth={true}
                        onNewRequest={onNewRequest}
                        filter={AutoComplete.caseInsensitiveFilter}
                    />
                    <MuiList>{participantList}</MuiList>
                </div>);
        };
        return (
            <ReduxForm.Field
                 name= {name}
                 component= {renderAutoComplete}
                 users= {users}
                 canEditMember= {canEditMember}
                 isCurrentUserAdmin= {isCurrentUserAdmin}
                 style= {style}
            />);
    }
}

const makeSetAdmin = (
        onChange: (members: Map<string, Member>) => void,
        value: Map<string, Member>,
    ) => (user: User,
          isAdmin: boolean) =>
            onChange(value.set(user.uid, new Member({
                isAdmin: !isAdmin,
                user,
            })));

const makeRemoveUser = (
        onChange: (members: Map<string, Member>) => void,
        value: Map<string, Member>,
    ) => (uid: string, isAdmin: boolean) => onChange(value.delete(uid));

const renderParticipantList = (
        members: Map<string, Member>,
        GroupParticipantsComponentElem: typeof GroupParticipantComponent,
        onChange: () => void,
        canEditMember: (user: User, isAdmin: boolean) => boolean,
    ) =>
    members.toList().map((member: Member) => {
        const groupUser: User = member.user;
        const isGroupUserAdmin: boolean = member.isAdmin;
        return (
            <GroupParticipantsComponentElem
                key={groupUser.uid}
                isGroupUserAdmin={isGroupUserAdmin}
                groupUser={groupUser}
                setAdmin={makeSetAdmin(onChange, members)}
                removeMember={makeRemoveUser(onChange, members)}
            />);
    });
