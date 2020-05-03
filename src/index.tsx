import React from 'react';
import ReactDOM from 'react-dom';
import './static/bootstrap.min.css';
import {HackerNewsActivity} from './pages/HackerNewsActivity';
import {useRoutes} from 'hookrouter';
import * as mql from "./mql_";
import axios from "axios";

let opts: mql.ClientOpts = {
  addr: (process.env.REACT_APP_HOST ? process.env.REACT_APP_HOST : "http://localhost") + "/httpjson",
  client: axios.create(),
};

let c = new mql.Client(opts);

const routes = {
  '/hackernews-activity': () => <HackerNewsActivity client={c}/>
};

const Root = () => {
  const routeResult = useRoutes(routes);

  return routeResult || 'Page Not Found';
};

ReactDOM.render(<Root/>, document.getElementById('root'));

