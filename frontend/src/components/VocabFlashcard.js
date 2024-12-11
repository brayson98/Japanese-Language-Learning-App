import React, { useState } from "react";
import './VocabFlashcard.css';

const VocabFlashcard = ({ word, meaning, romaji, furigana, speakWord }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleSpeakClick = (e) => {
    e.stopPropagation(); // Prevents the card from flipping when the button is clicked
    speakWord(word); // Calls the speakWord function with the word
  };

  return (
    <div className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={handleFlip}>
      {!flipped ? (
        <div className="front">
          <h3>{word}</h3>
        </div>
      ) : (
        <div className="back">
          <p><strong>Meaning:</strong> {meaning}</p>
          <p><strong>Romaji:</strong> {romaji}</p>
          <p><strong>Furigana:</strong> {furigana}</p>
          <button onClick={handleSpeakClick}>🔊</button>
        </div>
      )}
    </div>
  );
};

export default VocabFlashcard;
