import React from 'react';
import ReactDOM from 'react-dom';
import './static/bootstrap.min.css';
import {HackerNewsUserActivity} from './pages/HackerNewsUserActivity';
import {HackerNewsTrends} from './pages/HackerNewsTrends';
import {Index} from './pages/Index';
import {App} from './pages/App';
import {useRoutes, useInterceptor} from 'hookrouter';
import * as mql from "./mql_";
import axios from "axios";
import ReactGA from 'react-ga';
ReactGA.initialize('UA-157292681-1');

let opts: mql.ClientOpts = {
  addr: (process.env.REACT_APP_HOST ? process.env.REACT_APP_HOST : "http://localhost") + "/httpjson",
  client: axios.create(),
};

let c = new mql.Client(opts);

const routes = {
  '/': () => <App navColor="#1e5dfa" title="Showcase"><Index/></App>,
  '/hackernews-user-activity': () => <App title="HackerNews User Activity" navColor="#FF6601"><HackerNewsUserActivity color="#FF6601" client={c}/></App>,
  '/hackernews-trends': () => <App title="HackerNews Search" navColor="#FF6601"><HackerNewsTrends color="#FF6601" client={c}/></App>
};

const trackInterceptor = (nextPath: string, currentPath: string) => {
  console.log(currentPath);
  console.log(nextPath);

  return nextPath;
};

const Root = () => {
  const routeResult = useRoutes(routes);

  const trackInterception = useInterceptor(trackInterceptor);

  trackInterception();

  return routeResult || 'Page Not Found';
};

ReactDOM.render(<Root/>, document.getElementById('root'));

