import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from '../../pages/home/Home';
import { BoardPage } from '../../pages/board/BoardPage';

export default function RouteChess() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/board">Board</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/board">
            <BoardPage />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
