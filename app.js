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
        "지금 당장 떠날 수 있다면 어디로 가고 싶어?",
        "어렸을 때 좋아했던 놀이가 뭐였어?",
        "혼자 있는 시간이 주어지면 가장 하고 싶은 건 뭐야?",
        "가장 좋아하는 휴일에 꼭 하고 싶은 일이 있어?",
        "평생 꼭 한 번 해보고 싶은 경험이 있다면?",
        "최근에 보고 가장 감명 깊었던 영화는?",
        "언젠가 만나고 싶은 유명인이 있다면 누구야?",
        "가끔 생각나는 어린 시절의 추억은 뭐야?",
        "가장 오래도록 기억에 남는 선물은 무엇이었어?",
        "어렸을 때 제일 좋아했던 과목은?",
        "가장 특별하게 느껴졌던 날은 언제였어?",
        "지금 가장 듣고 싶은 노래가 뭐야?",
        "가장 자주 쓰는 이모티콘은 뭐야?",
        "어렸을 때 무조건 가고 싶었던 곳이 있어?",
        "최근에 가장 크게 웃었던 이유는 뭐였어?",
        "이상적인 휴가를 보낼 수 있다면 뭐 할래?",
        "하루가 딱 1시간 더 주어진다면 뭘 할 거야?",
        "요즘 즐겨 듣는 음악 장르는?",
        "언제 가장 창의적으로 느껴져?",
        "좋아하는 향기나 냄새가 있어?",
        "언젠가 꼭 다시 보고 싶은 영화나 드라마가 있니?",
        "가장 좋아하는 명절 음식은 뭐야?",
        "친구들이 너에 대해 가장 많이 하는 말은 뭐야?",
        "언제 가장 스스로 뿌듯하다고 느껴?",
        "가장 좋아하는 시간대는 언제야?",
        "만약 시간 여행을 할 수 있다면 어느 시기로 가고 싶어?",
        "언젠가 가보고 싶은 특별한 축제가 있어?"
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
