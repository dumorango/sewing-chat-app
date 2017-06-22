
import * as React from "react";
import {User} from "../../../models/User";

export interface IGroupParticipantComponentProps {
    key?: string;
    groupUser: User;
    isGroupUserAdmin: boolean;
    setAdmin: (user: User, isAdmin: boolean) => void;
    removeMember: (uid: string, isAdmin: boolean) => void;
}

export abstract class GroupParticipantComponent<S> extends React.Component<IGroupParticipantComponentProps, S> {}
