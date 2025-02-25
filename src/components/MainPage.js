import React from 'react';
import CardStack from './CardStack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

/**
 * 메인 페이지 컴포넌트
 * @param {object} props - 컴포넌트 속성
 * @param {array} props.questions - 질문 배열
 * @param {function} props.onSettingsClick - 설정 아이콘 클릭 이벤트 핸들러
 * @param {function} props.onBackClick - 뒤로 가기 아이콘 클릭 이벤트 핸들러
 */
const MainPage = ({ questions, onSettingsClick, onBackClick }) => {
  return (
    <div className="page main-page" data-testid="main-page">
      <div className="container">
        {/* 설정 아이콘 */}
        <button 
          className="icon-button settings-icon" 
          onClick={onSettingsClick}
          data-testid="settings-icon"
        >
          <FontAwesomeIcon icon={faCog} />
        </button>
        
        {/* 카드 스택 */}
        <CardStack questions={questions} />
        
        {/* 뒤로 가기 아이콘 */}
        <button 
          className="icon-button back-icon"
          onClick={onBackClick}
          data-testid="back-to-topic-button"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </div>
    </div>
  );
};

export default MainPage;