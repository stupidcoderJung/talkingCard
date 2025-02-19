import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './pages/MainPage';
import SettingsPage from './pages/SettingsPage';
import TopicInputPage from './pages/TopicInputPage';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/settings" component={SettingsPage} />
        <Route path="/topic-input" component={TopicInputPage} />
      </Switch>
    </Router>
  );
};

export default App;
