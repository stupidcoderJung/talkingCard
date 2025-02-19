import React from 'react';

const Card = ({ content, onFlip }) => {
  return (
    <div className="card" onClick={onFlip}>
      <div className="card-inner">
        <div className="card-front">
          {content.front}
        </div>
        <div className="card-back">
          {content.back}
        </div>
      </div>
    </div>
  );
};

export default Card;
