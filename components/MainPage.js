import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CardStack from '../features/cards/CardStack';
import Settings from '../features/settings/Settings';
import TopicInput from '../features/topicInput/TopicInput';

const MainPage = () => {
  return (
    <Router>
      <div className="main-page">
        <Switch>
          <Route exact path="/" component={CardStack} />
          <Route path="/settings" component={Settings} />
          <Route path="/topic-input" component={TopicInput} />
        </Switch>
      </div>
    </Router>
  );
};

export default MainPage;
