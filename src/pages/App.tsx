import React from 'react';
import ReactGA from 'react-ga';

interface Props {
  title: string
  navColor: string
}

export const App: React.FC<Props> = (p: React.PropsWithChildren<Props>) => {
  React.useEffect(() => {
    document.title = p.title;
    ReactGA.pageview(window.location.pathname + window.location.search);
  });

  return <span>
    <nav className="navbar navbar-expand-lg navbar-light" style={{"background": p.navColor}}>
      <a className="navbar-brand" href="/" style={{"color": "#fff"}}>
        <img src="/white_transparent.svg" width="30" height="30" className="d-inline-block align-top"
             alt=""/>
        &nbsp;&nbsp;{p.title}
      </a>
      <ul className="navbar-nav flex-row mr-auto">
        <li className="nav-item">
          <a className="nav-link" href="https://metamate.io" target="_blank" rel="noopener">Website</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="https://github.com/metamatex/metamate" target="_blank" rel="noopener">&nbsp;&nbsp;Github</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="https://twitter.com/metamatex" target="_blank" rel="noopener">&nbsp;&nbsp;Twitter</a>
        </li>
      </ul>
    </nav>
    <div className="container-fluid" style={{"paddingTop": "15px"}}>
          {p.children}
    </div>
  </span>
};