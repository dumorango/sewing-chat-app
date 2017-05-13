import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom'
import { Route } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import Login from './Login'
import CreateGroup from './CreateGroup'
import InitialPage from './InitialPage'
import ChatPage from './ChatPage'
import base from '../store/rebase';
import moment from 'moment';
import Loading from './Content'

class App extends React.Component {
    constructor(props) {
        super(props);
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
            });
            base.bindToState('users', {
                context: this,
                state: 'users',
                asArray: true,
                queries: {
                    orderByChild: 'createdDate'
                }
            });
            if(user){
                base.update(`users/${user.uid}`,{
                    data : base.getCurrentUser()
                }).then((err) => console.log('User details updated'));
            }
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
        let { messages, channels, user, initialized, users } = this.state;

        const main = (!user) ?
            (initialized ? <Login/> : <Loading/>) :
                    <Switch>
                            <Route path="/" exact render={() => <InitialPage channels={channels} user={user} users={users}/>}/>
                            <Route path="/addgroup" exact render={() => <CreateGroup channels={channels}/>}/>
                            <Route path="/groups/:group" exact render={() => <ChatPage channels={channels} messages={messages} />}/>
                            <Route path="/users/:uid/messages" exact render={() => <ChatPage channels={channels} messages={messages} users={users} user={user}/>}/>
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