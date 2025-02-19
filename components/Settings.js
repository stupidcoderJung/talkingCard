import React from 'react';
import { useHistory } from 'react-router-dom';

const Settings = () => {
  const history = useHistory();

  const handleBackClick = () => {
    history.push('/');
  };

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <button onClick={handleBackClick}>Back to Main</button>
    </div>
  );
};

export default Settings;
