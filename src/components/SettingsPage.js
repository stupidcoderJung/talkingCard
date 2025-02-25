import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

/**
 * 설정 페이지 컴포넌트
 * @param {object} props - 컴포넌트 속성
 * @param {function} props.onBackClick - 뒤로 가기 아이콘 클릭 이벤트 핸들러
 */
const SettingsPage = ({ onBackClick }) => {
  return (
    <div className="page settings-page" data-testid="settings-page">
      <div className="container">
        {/* 뒤로 가기 아이콘 */}
        <button 
          className="icon-button back-icon" 
          onClick={onBackClick}
          data-testid="back-icon"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        
        <h1>설정</h1>
        {/* 추후 설정 옵션들이 추가될 예정 */}
        <p>현재 버전에서는 설정 기능이 준비 중입니다.</p>
      </div>
    </div>
  );
};

export default SettingsPage;