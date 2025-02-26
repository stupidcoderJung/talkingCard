import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

/**
 * 설정 페이지 컴포넌트
 * @param {object} props - 컴포넌트 속성
 * @param {function} props.onBackClick - 뒤로 가기 아이콘 클릭 이벤트 핸들러
 */
const SettingsPage = ({ onBackClick }) => {
  const [animationSpeed, setAnimationSpeed] = useState('normal');
  const [theme, setTheme] = useState('theme1');
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem('settings'));
    if (savedSettings) {
      setAnimationSpeed(savedSettings.animationSpeed);
      setTheme(savedSettings.theme);
      setFontSize(savedSettings.fontSize);
    }
  }, []);

  const handleSave = () => {
    const settings = {
      animationSpeed,
      theme,
      fontSize,
    };
    localStorage.setItem('settings', JSON.stringify(settings));
    alert('설정이 저장되었습니다.');
  };

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
        
        <div className="setting-option">
          <label htmlFor="animationSpeed">카드 애니메이션 속도:</label>
          <select
            id="animationSpeed"
            value={animationSpeed}
            onChange={(e) => setAnimationSpeed(e.target.value)}
          >
            <option value="fast">빠름</option>
            <option value="normal">보통</option>
            <option value="slow">느림</option>
          </select>
        </div>

        <div className="setting-option">
          <label htmlFor="theme">카드 디자인 테마:</label>
          <select
            id="theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="theme1">테마 1</option>
            <option value="theme2">테마 2</option>
            <option value="theme3">테마 3</option>
            <option value="theme4">테마 4</option>
            <option value="theme5">테마 5</option>
          </select>
        </div>

        <div className="setting-option">
          <label htmlFor="fontSize">질문 폰트 크기:</label>
          <input
            type="range"
            id="fontSize"
            min="12"
            max="24"
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
          />
        </div>

        <button onClick={handleSave}>저장</button>
      </div>
    </div>
  );
};

export default SettingsPage;
