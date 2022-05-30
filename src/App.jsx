import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import MainLayout from "./containers/MainLayout";

import Todo from './containers/Todo'
import TodoDetail from './containers/TodoDetail'

export default function App() {
  return (
    <MainLayout>
      <Router>
        <Switch>
          <Route path="/TodoDetail/:id">
            <TodoDetail />
          </Route>
          <Route exact path="/">
            <Todo />
          </Route>
        </Switch>
      </Router>
    </MainLayout>
  );
}