// import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import createBrowserHistory from "history/createBrowserHistory";
import { blue100, blue500, blue700, pink400 } from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import * as injectTapEventPlugin from "react-tap-event-plugin";
import {recordify} from 'typed-immutable-record';
import { Route } from "react-router";

import "rxjs";

//import { ChatPage } from "./components/ChatPage";

import GroupPage from "./containers/GroupPage";
// import MainPage from "./containers/MainPage";

import * as contants from "./constants";
import { configureStore } from "./store";
import {initialState} from "./store/state";

injectTapEventPlugin();

// OfflinePluginRuntime.install();

const history = createBrowserHistory();
const store = configureStore(initialState, history);

store.dispatch({ type: contants.BOOT });

const muiTheme = getMuiTheme({
  appBar: {
    height: 50,
  },
  palette: {
    accent1Color: pink400,
    primary1Color: blue500,
    primary2Color: blue700,
    primary3Color: blue100,
  },
});

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <MuiThemeProvider muiTheme={muiTheme}>
        <ConnectedRouter history={history}>
          <div>
            <Route path="/addgroup" exact={true} component={GroupPage} />
          </div>
        </ConnectedRouter>
      </MuiThemeProvider>
    </Provider>,
    document.getElementById("root"),
    );
};

render();

// // Hot Module Replacement API
// if (module.hot) {
//   module.hot.accept('./containers/MainPage', () => {
//     render();
//   });
// }
