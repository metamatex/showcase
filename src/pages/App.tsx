import React from 'react';

interface Props {
  title: string
  navColor: string
}

export const App: React.FC<Props> = (p: React.PropsWithChildren<Props>) => {
  return <span>
    <nav className="navbar navbar-expand-lg navbar-light" style={{"background": p.navColor}}>
      <a className="navbar-brand" href="#">{p.title}</a>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <a className="nav-link" href="#" target="_blank" rel="noopener">Website</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="https://github.com/metamatex/metamate" target="_blank" rel="noopener">Github</a>
        </li>
      </ul>
      <a className="navbar-brand" href="#" style={{"color": "#fff", "float": "right"}}>built with&nbsp;&nbsp;
        <img src="/white_transparent.svg" width="30" height="30" className="d-inline-block align-top"
             alt=""/>
      </a>
    </nav>
    <div className="container-fluid" style={{"paddingTop": "15px"}}>
          {p.children}
    </div>
  </span>
};