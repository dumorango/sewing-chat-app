import React from 'react';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom'
import { Route } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import Login from './Login'
import CreateGroup from './CreateGroup'
import ChannelList from './ChannelList'
import Chat from './Chat'
import base from '../store/rebase';
import moment from 'moment';
import Loading from './Content'

import {Paper, BottomNavigation, BottomNavigationItem, FontIcon } from 'material-ui';

class App extends React.Component {
    constructor() {
        super();
        moment.locale('pt-br');
        base.initializedApp.auth().onAuthStateChanged((user) => {
            this.setState({
                user,
                initialized: true
            });
            base.bindToState('channels', {
                context: this,
                state: 'channels',
                asArray: true
            });
            base.bindToState(`messages`, {
                context: this,
                state: 'messages',
                asArray: true,
                queries: {
                    orderByChild: 'createdDate'
                }
            })
        })
    }

    setTitle(title){
        this.setState({ title })
    }

    componentWillMount() {
        const user = base.getCurrentUser();
        this.setState({
            messages: [],
            channels: [],
            user,
            initialized: false
        });
    }

    render() {
        let history = createBrowserHistory();
        const { messages, channels, user, initialized } = this.state;

        const main = (!user) ?
            (initialized ? <Login/> : <Loading/>) :
                    <Switch>
                            <Route path="/" exact render={() => <ChannelList channels={channels} user={user}/>}/>
                            <Route path="/addgroup" exact render={() => <CreateGroup channels={channels}/>}/>
                            <Route path="/groups/:group" exact render={() => <Chat channels={channels} messages={messages}/>}/>
                    </Switch>
                ;
        return (

            <BrowserRouter history={ history } >
                <div>
                    {main}
                </div>
            </BrowserRouter>
        );
    }
}

export default App;