import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SettingsPage from '../components/SettingsPage';

// 설정 페이지 컴포넌트 테스트
describe('SettingsPage 컴포넌트', () => {
  // 초기 렌더링 테스트
  test('설정 페이지가 올바르게 렌더링되어야 함', () => {
    render(<SettingsPage onBackClick={() => {}} />);
    
    // 설정 페이지가 표시되는지 확인
    expect(screen.getByTestId('settings-page')).toBeInTheDocument();
    
    // 각 설정 옵션이 있는지 확인
    expect(screen.getByLabelText('카드 애니메이션 속도:')).toBeInTheDocument();
    expect(screen.getByLabelText('카드 디자인 테마:')).toBeInTheDocument();
    expect(screen.getByLabelText('질문 폰트 크기:')).toBeInTheDocument();
  });
  
  // 설정 저장 테스트
  test('설정을 저장할 수 있어야 함', () => {
    render(<SettingsPage onBackClick={() => {}} />);
    
    // 설정 값 변경
    fireEvent.change(screen.getByLabelText('카드 애니메이션 속도:'), { target: { value: 'fast' } });
    fireEvent.change(screen.getByLabelText('카드 디자인 테마:'), { target: { value: 'theme2' } });
    fireEvent.change(screen.getByLabelText('질문 폰트 크기:'), { target: { value: '20' } });
    
    // 저장 버튼 클릭
    fireEvent.click(screen.getByText('저장'));
    
    // localStorage에 설정이 저장되었는지 확인
    const savedSettings = JSON.parse(localStorage.getItem('settings'));
    expect(savedSettings).toEqual({
      animationSpeed: 'fast',
      theme: 'theme2',
      fontSize: 20,
    });
  });
  
  // 설정 로드 테스트
  test('설정을 로드할 수 있어야 함', () => {
    // localStorage에 설정 저장
    const settings = {
      animationSpeed: 'slow',
      theme: 'theme3',
      fontSize: 18,
    };
    localStorage.setItem('settings', JSON.stringify(settings));
    
    render(<SettingsPage onBackClick={() => {}} />);
    
    // 설정 값이 올바르게 로드되었는지 확인
    expect(screen.getByLabelText('카드 애니메이션 속도:').value).toBe('slow');
    expect(screen.getByLabelText('카드 디자인 테마:').value).toBe('theme3');
    expect(screen.getByLabelText('질문 폰트 크기:').value).toBe('18');
  });
  
  // 뒤로 가기 버튼 테스트
  test('뒤로 가기 버튼 클릭 시 콜백 함수가 호출되어야 함', () => {
    const onBackClickMock = jest.fn();
    render(<SettingsPage onBackClick={onBackClickMock} />);
    
    // 뒤로 가기 버튼 클릭
    fireEvent.click(screen.getByTestId('back-icon'));
    
    // 콜백 함수가 호출되었는지 확인
    expect(onBackClickMock).toHaveBeenCalled();
  });
});
