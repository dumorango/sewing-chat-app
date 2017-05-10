import React from 'react';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Route } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import Login from './Login'
import CreateGroup from './CreateGroup'
import ChannelList from './ChannelList'
import Chat from './Chat'
import base from '../store/rebase';
import moment from 'moment';
import AppBar from './AppBar';

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
            (initialized ? <Login/> : <div> Carregando... </div>) :
                    <Switch>
                            <Route path="/" exact render={() => <ChannelList channels={channels}/>}/>
                            <Route path="/addgroup" exact render={() => <CreateGroup channels={channels}/>}/>
                            <Route path="/groups/:group" exact render={() => <Chat channels={channels} messages={messages}/>}/>
                            <Route path="/login" component={Login}/>
                    </Switch>
                ;
        return (

            <BrowserRouter history={ history } >
                <div style={{
                    height: '100%'
                }}>
                    <AppBar user={user}/>
                    <div style={{
                        padding: '1px',
                        paddingTop: '60px',
                        bottom: '0px',
                        height: '100%'
                    }}>
                        {main}
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;