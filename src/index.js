import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { blue500, blue100, blue700, pink400 } from 'material-ui/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';
// import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import createBrowserHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';

import { Route } from 'react-router';

import 'rxjs';

import App from 'containers/App';
import GroupPage from 'containers/GroupPage';
import MainPage from 'containers/MainPage';
import ChatPage from 'components/ChatPage';

import { BOOT } from './constants';
import configureStore from './store';

injectTapEventPlugin();

// OfflinePluginRuntime.install();

const initialState = {};

const history = createBrowserHistory();
const store = configureStore(initialState, history);

store.dispatch({ type: BOOT });


const muiTheme = getMuiTheme({
  appBar: {
    height: 50,
  },
  palette: {
    primary1Color: blue500,
    primary2Color: blue700,
    primary3Color: blue100,
    accent1Color: pink400,
  },
});

const render = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <MuiThemeProvider muiTheme={muiTheme}>
        <ConnectedRouter history={history}>
          <div>
            <Route path="/" exact component={MainPage} />
            <Route path="/addgroup" exact component={GroupPage} />
            <Route path="/groups/:group" exact component={ChatPage} />
            <Route path="/groups/:group/details" exact component={GroupPage} />
            <Route path="/users/:uid/messages" exact component={ChatPage} />
          </div>
        </ConnectedRouter>
      </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
    );
};

render(App);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./containers/App', () => {
    render(App);
  });
}
