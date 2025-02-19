import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CardStack from '../features/cards/CardStack';
import SettingsPage from './SettingsPage';
import TopicInputPage from './TopicInputPage';

const MainPage = () => {
  return (
    <Router>
      <div className="main-page">
        <Switch>
          <Route exact path="/" component={TopicInputPage} />
          <Route path="/settings" component={SettingsPage} />
          <Route path="/cards" component={CardStack} />
        </Switch>
      </div>
    </Router>
  );
};

export default MainPage;
