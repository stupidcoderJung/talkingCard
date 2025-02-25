import React, { useState, useEffect } from 'react';
import MainPage from './components/MainPage';
import SettingsPage from './components/SettingsPage';
import TopicInputPage from './components/TopicInputPage';
import { questions as defaultQuestions, shuffleArray } from './config';
import './styles.css';

/**
 * App 컴포넌트 - 애플리케이션 최상위 컴포넌트
 */
const App = () => {
  // 상태 관리
  const [currentPage, setCurrentPage] = useState('topicInput'); // 'topicInput', 'main', 'settings'
  const [questions, setQuestions] = useState([]);
  
  // 애플리케이션 초기화
  useEffect(() => {
    // 질문 배열 섞기
    setQuestions(shuffleArray(defaultQuestions));
  }, []);
  
  // 페이지 전환 함수들
  const goToSettings = () => {
    setCurrentPage('settings');
  };
  
  const goToMain = () => {
    setCurrentPage('main');
  };
  
  const goToTopicInput = () => {
    setCurrentPage('topicInput');
  };
  
  // 주제 입력 후 시작 버튼 클릭 처리
  const handleStartClick = (topic) => {
    // 실제 애플리케이션에서는 여기서 AI를 통해 주제에 맞는 질문을 생성할 수 있음
    // 현재는 기존 질문을 섞어서 사용
    console.log(`입력한 주제: ${topic}`);
    setQuestions(shuffleArray(defaultQuestions));
    goToMain();
  };
  
  // 현재 페이지에 따라 다른 컴포넌트 렌더링
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'main':
        return (
          <MainPage 
            questions={questions}
            onSettingsClick={goToSettings}
            onBackClick={goToTopicInput}
          />
        );
      case 'settings':
        return (
          <SettingsPage 
            onBackClick={goToMain}
          />
        );
      case 'topicInput':
      default:
        return (
          <TopicInputPage 
            onStartClick={handleStartClick}
          />
        );
    }
  };
  
  return (
    <div className="app" data-testid="app">
      {renderCurrentPage()}
    </div>
  );
};

export default App;