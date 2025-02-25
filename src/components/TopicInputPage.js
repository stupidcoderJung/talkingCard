import React, { useState } from 'react';

/**
 * 주제 입력 페이지 컴포넌트
 * @param {object} props - 컴포넌트 속성
 * @param {function} props.onStartClick - 시작 버튼 클릭 이벤트 핸들러
 */
const TopicInputPage = ({ onStartClick }) => {
  // 입력된 주제 상태 관리
  const [topic, setTopic] = useState('');
  
  // 주제 입력 변경 핸들러
  const handleTopicChange = (e) => {
    setTopic(e.target.value);
  };
  
  // 시작 버튼 클릭 핸들러
  const handleStart = () => {
    if (topic.trim()) {
      // 입력된 주제가 있으면 콜백 함수 호출
      onStartClick(topic);
    } else {
      // 주제가 입력되지 않았을 경우 알림
      alert('주제를 입력해주세요.');
    }
  };
  
  return (
    <div className="page topic-input-page" data-testid="topic-input-page">
      <div className="container">
        <input 
          type="text" 
          className="topic-input"
          id="topicInput"
          data-testid="topic-input"
          value={topic}
          onChange={handleTopicChange}
          placeholder="사랑, 우정, 가족 등등"
        />
        <button 
          className="start-button"
          data-testid="start-button"
          onClick={handleStart}
        >
          시작
        </button>
      </div>
    </div>
  );
};

export default TopicInputPage;