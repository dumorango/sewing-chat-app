import {
    Avatar, Divider, IconButton, IconMenu, ListItem, MenuItem,
} from "material-ui";
import * as React from "react";
import { GroupParticipantComponent, IGroupParticipantComponentProps } from "./GroupParticipantComponent";
import {GroupParticipantItemIconMenu} from "./GroupParticipantItemIconMenu";

class GroupParticipantsItem extends GroupParticipantComponent<any> {

  public render() {
    const { groupUser, isGroupUserAdmin, setAdmin, removeMember }: IGroupParticipantComponentProps = this.props;

    const iconMenu =
        <GroupParticipantItemIconMenu
            isGroupUserAdmin={isGroupUserAdmin}
            setAdmin={setAdmin}
            removeMember={removeMember}
            groupUser={groupUser}
            canEditMember={!!setAdmin && !!removeMember}
        />;

    return (<div><ListItem
      leftAvatar={<Avatar src={groupUser.photoURL} />}
      primaryText={groupUser.displayName}
      secondaryText={isGroupUserAdmin ? "Administrador" : "Membro"}
      rightIconButton={iconMenu}
    /><Divider inset={true} /></div>);
  }


}

export default GroupParticipantsItem;
