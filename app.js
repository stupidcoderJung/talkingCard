// 설정
const config = {
    cardStack: '#cardStack',
    activeCard: '#activeCard',
    cardInner: '.card-inner',
    cardBack: '.card-back',
    cardFront: '.card-front',
    settingsIcon: '#settingsIcon',
    questions: [
        "가장 기억에 남는 생일은 언제였어?",
        "여행 가본 곳 중에 다시 가보고 싶은 곳이 있다면?",
        "하루 동안 시간과 돈이 무한정 있다면 뭘 할래?",
        // ... 나머지 질문들 ...
    ]
};

// 상태
let state = {
    currentCardStatus: 'fold',
    currentQuestionIndex: 0
};

// DOM 요소
const elements = {
    cardStack: document.querySelector(config.cardStack),
    activeCard: document.querySelector(config.activeCard),
    cardInner: document.querySelector(config.cardInner),
    cardBack: document.querySelector(config.cardBack),
    cardFront: document.querySelector(config.cardFront),
    settingsIcon: document.querySelector(config.settingsIcon)
};

// 설정 관련 함수
function toggleSettings() {
    console.log('설정 토글');
    // 여기에 설정 패널을 열거나 닫는 로직을 추가할 수 있습니다.
}

// 유틸리티 함수
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// 카드 관련 함수
function flipCard() {
    elements.cardInner.style.transform = 'rotateY(180deg)';
    elements.cardBack.textContent = config.questions[state.currentQuestionIndex];
}

function resetCard() {
    elements.cardInner.style.transform = 'rotateY(0deg)';
    setTimeout(() => {
        elements.cardBack.textContent = '';
    }, 250);
}

function selectCard() {
    if(state.currentCardStatus === 'fold'){
        elements.activeCard.style.transform = 'translateY(-50px) scale(1.1)';
        setTimeout(() => {
            flipCard();
            elements.activeCard.style.transform = 'translateY(0) scale(1.1)';
            state.currentCardStatus = 'open';
        }, 300);
    } else {
        shuffleCards();
        state.currentCardStatus = 'fold';
    }
}

function shuffleCards() {
    elements.cardStack.style.animation = 'shake 0.3s ease-in-out';

    setTimeout(() => {
        document.querySelectorAll('.card:not(.active)').forEach((card, index) => {
            card.style.transition = 'all 0.4s ease-in-out';
            card.style.transform = `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(${Math.random() * 360}deg)`;
        });

        setTimeout(() => {
            document.querySelectorAll('.card:not(.active)').forEach((card, index) => {
                card.style.transition = 'all 0.3s ease-in-out';
                card.style.transform = `translateX(${(index - 2) * 5}px) translateY(${(index - 2) * 5}px) rotate(${(index - 2) * 2.5}deg)`;
            });

            state.currentQuestionIndex = (state.currentQuestionIndex + 1) % config.questions.length;
            resetCard();

            setTimeout(() => {
                elements.cardStack.style.animation = '';
            }, 300);
        }, 400);
    }, 300);
}

// 이벤트 리스너
function setupEventListeners() {
    elements.activeCard.addEventListener('click', selectCard);
    elements.activeCard.addEventListener('touchstart', selectCard);
    elements.settingsIcon.addEventListener('click', toggleSettings);
}

// 초기화
function init() {
    shuffleArray(config.questions);
    setupEventListeners();
}

// 앱 시작
init();
