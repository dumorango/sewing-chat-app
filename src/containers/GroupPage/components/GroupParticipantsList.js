import React, { Component } from 'react';
import {
    List
} from 'material-ui';
import GroupParticipantsItem from './GroupParticipantsItem';

const GroupParticipantsList = ({ users, currentUser, group, members = {}, isCurrentUserAdmin, setAdmin, removeMember }) => {
    let menuOpen = false;
    const membersList = members.map((key) => {
        let user = users.find(user => user.uid === key) || {};
        return group.members[user.uid]? <GroupParticipantsItem
            key={key}
            groupUser={user}
            isGroupUserAdmin={group.admin[user.uid]}
            isCurrentUser={isCurrentUserAdmin && currentUser.uid !== user.uid }
            isCurrentUserAdmin={isCurrentUserAdmin}
            setAdmin={setAdmin}
            removeMember={removeMember}
        /> : null
    });
    return <List> {membersList} </List>;
};

export default GroupParticipantsList;


