import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import GroupPage from 'containers/GroupPage';
import MainPage from 'containers/MainPage';
import ChatPage from 'components/ChatPage';

class App extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    const main =
        (<BrowserRouter history={this.props.history}>
          <Switch>
            <Route path="/" exact component={MainPage} />
            <Route path="/addgroup" exact component={GroupPage} />
            <Route path="/groups/:group" exact component={ChatPage} />
            <Route path="/groups/:group/details" exact component={GroupPage} />
            <Route path="/users/:uid/messages" exact component={ChatPage} />
          </Switch>
        </BrowserRouter>);
    return (
      <div>
        {main}
      </div>
    );
  }
}

export default App;
