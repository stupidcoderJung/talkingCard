import React, { useEffect } from 'react';

/**
 * 카드 컴포넌트
 * @param {object} props - 컴포넌트 속성
 * @param {string} props.className - 추가 CSS 클래스
 * @param {boolean} props.isActive - 활성화된 카드 여부
 * @param {boolean} props.isFlipped - 뒤집힌 상태 여부
 * @param {string} props.question - 카드 뒷면에 표시할 질문
 * @param {function} props.onClick - 클릭 이벤트 핸들러
 * @param {string} props.frontText - 카드 앞면 텍스트
 * @param {string} props.animationSpeed - 카드 애니메이션 속도
 * @param {number} props.fontSize - 질문 폰트 크기
 */
const Card = ({ 
  className = "", 
  isActive = false, 
  isFlipped = false, 
  question = "", 
  onClick = () => {}, 
  frontText = "카드를 클릭하세요",
  animationSpeed = "normal",
  fontSize = 16
}) => {
  
  // 카드 클래스 계산
  const cardClasses = `card ${isActive ? 'active' : ''} ${className}`;
  
  // 카드 내부 클래스 계산
  const innerClasses = `card-inner ${isFlipped ? 'flipped' : ''}`;
  
  // 애니메이션 속도 클래스 계산
  const animationClass = `animation-${animationSpeed}`;
  
  useEffect(() => {
    if (isFlipped) {
      console.log(`Font size: ${fontSize}px`);
    }
  }, [isFlipped, fontSize]);

  return (
    <div className={`${cardClasses} ${animationClass}`} onClick={onClick} data-testid="card">
      <div className={innerClasses}>
        <div className="card-face card-front" style={{ fontSize: `${fontSize}px` }}>
          {frontText}
        </div>
        <div className="card-face card-back" style={{ fontSize: `${fontSize}px` }}>
          {question}
        </div>
      </div>
    </div>
  );
};

export default Card;
