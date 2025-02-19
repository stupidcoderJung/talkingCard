import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const TopicInput = ({ onStart }) => {
  const [topic, setTopic] = useState('');
  const history = useHistory();

  const handleInputChange = (e) => {
    setTopic(e.target.value);
  };

  const handleStartClick = () => {
    if (topic) {
      onStart(topic);
      history.push('/');
    } else {
      alert('주제를 입력해주세요.');
    }
  };

  return (
    <div className="topic-input-page">
      <input
        type="text"
        value={topic}
        onChange={handleInputChange}
        placeholder="주제를 입력하세요"
      />
      <button onClick={handleStartClick}>Start</button>
    </div>
  );
};

export default TopicInput;
