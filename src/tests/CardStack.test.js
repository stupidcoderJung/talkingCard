import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardStack from '../components/CardStack';

// 카드 스택 컴포넌트 테스트
describe('CardStack 컴포넌트', () => {
  // 테스트용 질문 배열
  const testQuestions = [
    '테스트 질문 1',
    '테스트 질문 2',
    '테스트 질문 3'
  ];
  
  // 초기 렌더링 테스트
  test('CardStack이 올바르게 렌더링되어야 함', () => {
    render(<CardStack questions={testQuestions} />);
    
    // 카드 스택이 렌더링되었는지 확인
    expect(screen.getByTestId('card-stack')).toBeInTheDocument();
    
    // 카드가 6개(배경 카드 5개 + 활성 카드 1개) 렌더링되었는지 확인
    expect(screen.getAllByTestId('card')).toHaveLength(6);
  });
  
  // 카드 클릭 테스트
  test('카드 클릭 시 카드가 뒤집혀야 함', async () => {
    // 타이머 모킹
    jest.useFakeTimers();
    
    render(<CardStack questions={testQuestions} />);
    
    // 활성 카드 클릭
    const cards = screen.getAllByTestId('card');
    const activeCard = cards[5]; // 마지막 카드가 활성 카드
    
    fireEvent.click(activeCard);
    
    // 카드가 선택된 상태로 변경되었는지 확인 (selected 클래스 추가)
    expect(activeCard).toHaveClass('selected');
    
    // 타이머 진행 (300ms 후 상태 변경)
    act(() => {
      jest.advanceTimersByTime(300);
    });
    
    // 카드가 열린 상태로 변경되었는지 확인 (open 클래스 추가)
    expect(activeCard).toHaveClass('open');
    
    // 타이머 복원
    jest.useRealTimers();
  });
  
  // 카드 뒤집기 후 다시 클릭 테스트
  test('열린 카드 클릭 시 카드가 섞이고 다음 질문으로 넘어가야 함', async () => {
    // 타이머 모킹
    jest.useFakeTimers();
    
    render(<CardStack questions={testQuestions} />);
    
    const cards = screen.getAllByTestId('card');
    const activeCard = cards[5]; // 마지막 카드가 활성 카드
    
    // 첫 번째 클릭 - 카드 뒤집기
    fireEvent.click(activeCard);
    
    // 타이머 진행 (300ms - 카드 선택 상태)
    act(() => {
      jest.advanceTimersByTime(300);
    });
    
    // 다시 클릭 - 카드 섞기
    fireEvent.click(activeCard);
    
    // 카드 스택에 섞기 애니메이션 클래스가 추가되었는지 확인
    const cardStack = screen.getByTestId('card-stack');
    expect(cardStack).toHaveClass('shake-animation');
    
    // 타이머 진행 (700ms - 애니메이션 종료)
    act(() => {
      jest.advanceTimersByTime(700);
    });
    
    // 카드가 접힌 상태로 돌아갔는지 확인 (selected, open 클래스 제거)
    expect(activeCard).not.toHaveClass('selected');
    expect(activeCard).not.toHaveClass('open');
    
    // 타이머 복원
    jest.useRealTimers();
  });
});