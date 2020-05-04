import React from 'react';
import ReactDOM from 'react-dom';
import './static/bootstrap.min.css';
import {HackerNewsUserActivity} from './pages/HackerNewsUserActivity';
import {Index} from './pages/Index';
import {App} from './pages/App';
import {useRoutes} from 'hookrouter';
import * as mql from "./mql_";
import axios from "axios";

let opts: mql.ClientOpts = {
  addr: (process.env.REACT_APP_HOST ? process.env.REACT_APP_HOST : "http://localhost") + "/httpjson",
  client: axios.create(),
};

let c = new mql.Client(opts);

const routes = {
  '/': () => <App navColor="#1e5dfa" title="Showcase"><Index/></App>,
  '/hackernews-user-activity': () => <App title="HackerNews User Activity" navColor="#FF6601"><HackerNewsUserActivity client={c}/></App>
};

const Root = () => {
  const routeResult = useRoutes(routes);

  return routeResult || 'Page Not Found';
};

ReactDOM.render(<Root/>, document.getElementById('root'));

