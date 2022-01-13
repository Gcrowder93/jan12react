import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './views/Home/Home';
import Auth from './views/Auth/Auth';
import AddTeam from './views/Teams/AddTeam';
import Team from './views/Teams/Team';
import EditTeam from './views/Teams/EditTeam';
import NotFound from './views/NotFound/NotFound';
import { useState, useEffect } from 'react';
import { getUser } from './services/users';
import Teams from './views/Teams/Teams';
import Header from './components/Header/Header';
import ProtectedRoute from '../src/utils/ProtectedRoute';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const session = getUser();

    if (session?.user) setCurrentUser(session.user);
  }, []);

  return (
    <BrowserRouter>
      <Header user={currentUser} setCurrentUser={setCurrentUser} />
      <Switch>
        <Route exact path="/">
          <Home user={currentUser} />
        </Route>
        <Route exact path="/sign-in">
          <Auth setCurrentUser={setCurrentUser} />
        </Route>
        <ProtectedRoute exact path="/teams/new" currentUser={currentUser}>
          <AddTeam user={currentUser} />
        </ProtectedRoute>
        <ProtectedRoute exact path="/teams/:id/edit" currentUser={currentUser}>
          <EditTeam user={currentUser} />
        </ProtectedRoute>
        <Route
          exact
          path="/teams"
          render={(routeProps) => (
            <Teams {...routeProps} user={currentUser} currentUser={currentUser} />
          )}
        />
        <Route
          exact
          path="/teams/:id"
          render={(routeProps) => <Team {...routeProps} user={currentUser} />}
        />
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
