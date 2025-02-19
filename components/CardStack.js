import React, { useState } from 'react';
import Card from './Card';

const CardStack = ({ questions }) => {
  const [currentCardStatus, setCurrentCardStatus] = useState('fold');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const flipCard = () => {
    setCurrentCardStatus('open');
  };

  const shuffleCards = () => {
    setCurrentCardStatus('fold');
    setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
  };

  const handleCardClick = () => {
    if (currentCardStatus === 'fold') {
      flipCard();
    } else {
      shuffleCards();
    }
  };

  return (
    <div className="card-stack">
      {questions.map((question, index) => (
        <Card
          key={index}
          content={{ front: 'Click to reveal', back: question }}
          onFlip={handleCardClick}
        />
      ))}
    </div>
  );
};

export default CardStack;
