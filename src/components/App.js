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
            base.bindToState('channels/public/', {
                context: this,
                asArray: true,
                state: 'channels'
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
            user,
            initialized: false
        });
    }

    render() {
        let history = createBrowserHistory();
        let { channels, user, initialized, users } = this.state;
        let main = <Loading/>;
        if(initialized && !user) {
            main = <Login/>;
        }else if(users && channels) {
            main =
                <Switch>
                    <Route path="/" exact render={() => <InitialPage channels={channels} user={user} users={users}/>}/>
                    <Route path="/addgroup" exact render={() => <CreateGroup channels={channels}/>}/>
                    <Route path="/groups/:group" exact render={() => <ChatPage channels={channels}/>}/>
                    <Route path="/groups/:group/details" exact render={() => <CreateGroup channels={channels}/>}/>
                    <Route path="/users/:uid/messages" exact
                           render={() => <ChatPage channels={channels} users={users} user={user}/>}/>
                </Switch>;
        }
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