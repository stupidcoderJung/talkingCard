import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

// 앱 컴포넌트 테스트
describe('App 컴포넌트', () => {
  
  // 초기 렌더링 테스트
  test('처음에는 주제 입력 페이지가 렌더링되어야 함', () => {
    render(<App />);
    
    // 주제 입력 페이지가 표시되는지 확인
    expect(screen.getByTestId('topic-input-page')).toBeInTheDocument();
    
    // 입력 필드와 시작 버튼이 있는지 확인
    expect(screen.getByTestId('topic-input')).toBeInTheDocument();
    expect(screen.getByTestId('start-button')).toBeInTheDocument();
  });
  
  // 페이지 전환 테스트
  test('주제 입력 후 메인 페이지로 이동해야 함', () => {
    render(<App />);
    
    // 주제 입력
    const topicInput = screen.getByTestId('topic-input');
    fireEvent.change(topicInput, { target: { value: '가족' } });
    
    // 시작 버튼 클릭
    const startButton = screen.getByTestId('start-button');
    fireEvent.click(startButton);
    
    // 메인 페이지로 이동했는지 확인
    expect(screen.getByTestId('main-page')).toBeInTheDocument();
  });
  
  // 빈 주제 입력 시 알림 테스트
  test('빈 주제 입력 시 알림이 표시되어야 함', () => {
    render(<App />);
    
    // alert 모킹
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();
    
    // 빈 주제로 시작 버튼 클릭
    const startButton = screen.getByTestId('start-button');
    fireEvent.click(startButton);
    
    // 알림이 표시되었는지 확인
    expect(alertMock).toHaveBeenCalledWith('주제를 입력해주세요.');
    
    // 모킹 복원
    alertMock.mockRestore();
  });
  
  // 설정 페이지 이동 테스트
  test('설정 아이콘 클릭 시 설정 페이지로 이동해야 함', () => {
    render(<App />);
    
    // 먼저 메인 페이지로 이동
    const topicInput = screen.getByTestId('topic-input');
    fireEvent.change(topicInput, { target: { value: '가족' } });
    
    const startButton = screen.getByTestId('start-button');
    fireEvent.click(startButton);
    
    // 설정 아이콘 클릭
    const settingsIcon = screen.getByTestId('settings-icon');
    fireEvent.click(settingsIcon);
    
    // 설정 페이지로 이동했는지 확인
    expect(screen.getByTestId('settings-page')).toBeInTheDocument();
  });
  
  // 설정 페이지에서 뒤로 가기 테스트
  test('설정 페이지에서 뒤로 가기 아이콘 클릭 시 메인 페이지로 돌아가야 함', () => {
    render(<App />);
    
    // 주제 입력 및 메인 페이지 이동
    const topicInput = screen.getByTestId('topic-input');
    fireEvent.change(topicInput, { target: { value: '가족' } });
    
    const startButton = screen.getByTestId('start-button');
    fireEvent.click(startButton);
    
    // 설정 페이지로 이동
    const settingsIcon = screen.getByTestId('settings-icon');
    fireEvent.click(settingsIcon);
    
    // 뒤로 가기 아이콘 클릭
    const backIcon = screen.getByTestId('back-icon');
    fireEvent.click(backIcon);
    
    // 메인 페이지로 돌아갔는지 확인
    expect(screen.getByTestId('main-page')).toBeInTheDocument();
  });
});