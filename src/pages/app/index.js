import React from 'react';
import {NavLink} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import './app.css';

export default class App extends React.PureComponent {
  render() {
    const {route} = this.props;
    return (
      <div className="app-container">
        <header className="app-header">
          {/*<NavLink to="/index">首页</NavLink>*/}
          <div>
            <NavLink to="/home">唐诗</NavLink>
            <NavLink to="/home">宋词</NavLink>
            <NavLink to="/home">元曲</NavLink>
            <NavLink to="/home">古典小说</NavLink>
          </div>
          <div>
            <NavLink to="/login">登陆</NavLink>
          </div>
        </header>

        <main className="app-main">
          {renderRoutes(route.routes)}
        </main>

        <footer className="app-footer">
          footer
        </footer>
      </div>
    );
  }
}
