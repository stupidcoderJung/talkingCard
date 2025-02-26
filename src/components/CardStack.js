import React, { useState, useEffect, useRef } from 'react';
import Card from './Card';

/**
 * 카드 스택 컴포넌트
 * @param {object} props - 컴포넌트 속성
 * @param {array} props.questions - 질문 배열
 * @param {string} props.animationSpeed - 카드 애니메이션 속도
 * @param {number} props.fontSize - 질문 폰트 크기
 */
const CardStack = ({ questions, animationSpeed, fontSize }) => {
  // 상태 관리
  const [currentCardStatus, setCurrentCardStatus] = useState('fold'); // fold, selected, open
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardPositions, setCardPositions] = useState([]);
  
  // ref 생성
  const stackRef = useRef(null);
  
  // 카드 상태가 변경될 때마다 처리
  useEffect(() => {
    if (currentCardStatus === 'selected') {
      // 선택된 상태에서 일정 시간 후 카드 뒤집기
      const timer = setTimeout(() => {
        setIsFlipped(true);
        setCurrentCardStatus('open');
        console.log('카드 상태 변경: open, 카드 뒤집힘');
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [currentCardStatus]);
  
  // 카드 섞기 효과를 위한 랜덤 위치 설정
  useEffect(() => {
    if (isShaking) {
      const newPositions = Array(5).fill(0).map(() => ({
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
        rotation: Math.random() * 360
      }));
      
      setCardPositions(newPositions);
      
      // 카드 섞기 효과가 끝난 후 원래 위치로 돌아오기
      const timer = setTimeout(() => {
        setCardPositions([]);
        setIsShaking(false);
      }, 400);
      
      return () => clearTimeout(timer);
    }
  }, [isShaking]);
  
  // 카드 선택 함수
  const selectCard = () => {
    console.log('카드 클릭됨:', currentCardStatus);
    if (currentCardStatus === 'fold') {
      // 접힌 상태에서는 카드 선택 효과 적용
      setCurrentCardStatus('selected');
      console.log('카드 상태 변경: selected');
    } else {
      // 열린 상태에서는 카드 섞기 효과 적용
      shuffleCards();
      console.log('카드 섞기 실행');
    }
  };
  
  // 카드 섞기 함수
  const shuffleCards = () => {
    setIsShaking(true);
    
    // 애니메이션 완료 후 상태 변경
    setTimeout(() => {
      // 다음 질문으로 이동
      setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
      setIsFlipped(false);
      setCurrentCardStatus('fold');
    }, 700);
  };
  
  // 비활성 카드 스타일 계산 함수
  const getInactiveCardStyle = (index) => {
    if (isShaking && cardPositions.length > 0) {
      const position = cardPositions[index];
      return {
        transform: `translate(${position.x}px, ${position.y}px) rotate(${position.rotation}deg)`
      };
    }
    
    return {}; // 기본 CSS 클래스로 처리
  };
  
  return (
    <div 
      className={`card-stack ${isShaking ? 'shake-animation' : ''}`} 
      ref={stackRef}
      data-testid="card-stack"
    >
      {/* 배경 카드들 */}
      {[1, 2, 3, 4, 5].map((num) => (
        <Card 
          key={`background-card-${num}`}
          className={`stack-card-${num}`}
          style={getInactiveCardStyle(num - 1)}
        />
      ))}
      
      {/* 활성 카드 */}
      <Card 
        isActive
        isFlipped={isFlipped}
        question={questions[currentQuestionIndex]}
        onClick={selectCard}
        className={currentCardStatus === 'selected' ? 'selected' : (currentCardStatus === 'open' ? 'open' : '')}
        animationSpeed={animationSpeed}
        fontSize={fontSize}
      />
    </div>
  );
};

export default CardStack;
