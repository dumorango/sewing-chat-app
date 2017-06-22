import * as React from "react";
import Chat from "./Chat";

import { User } from "../models";
import Loading from "./Loading";

import { List } from "immutable";

export interface IProps {
    user: User;
    users: List<User>;
    match: {
        params: {
            uid: string,
        },
    };
}

export class ChatPage extends React.Component<IProps, any> {

    constructor(props: IProps) {
        super(props);
    }

    public componentWillMount() {
        // this.getSelectedChannel();
    }

    public render() {
        const { messages, channel, key } = this.state;
        if (!channel) {
            return <Loading style={{}}/>;
        }
        const { name } = channel;
        return (
            <Chat key={key} channelName={name} channelKey={key} messages={messages}/>
        );
    }

    private getSelectedChannelByUser() {
        const { user, users } = this.props;
        const { uid } =  this.props.match.params;
        const key = [user.uid, uid].sort().join("-");
        const otherUser = users.find((u: User) => u.uid === uid);
        this.setState({
            channel: { name: otherUser.displayName },
            key,
        });
        // return this.bindMessages(key);
    }

    // private getSelectedChannelByGroup() {
    //     const key = this.props.match.params.group;
    //     const channel = this.props.groups.find((channel) => channel.key === key);
    //     this.setState({ channel, key });
    //     base.bindToState(`channels/${key}`, {
    //         context: this,
    //         state: "channel",
    //     });
    //     return this.bindMessages(key);
    // }

    // private bindMessages(key) {
    //     base.bindToState(`messages/channel/${key}`, {
    //         context: this,
    //         state: "messages",
    //         asArray: true,
    //         queries: {
    //             orderByChild: "createdDate",
    //         },
    //     });
    // }

    // private getSelectedChannel() {
    //         this.props.match.params.group ?
    //         this.getSelectedChannelByGroup() :
    //         this.getSelectedChannelByUser();
    // }
}
