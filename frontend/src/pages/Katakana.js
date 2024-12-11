import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Flashcards.css';
import KatakanaQuiz from '../components/KatakanaQuiz';

function Katakana() {
  const [katakana, setKatakana] = useState([]);
  const [flipped, setFlipped] = useState({});
  const [showQuiz, setShowQuiz] = useState(false)


  useEffect(() => {
    axios.get('http://localhost:5000/api/japanese/characters')
      .then(response => {
        setKatakana(response.data.katakana);
      })
      .catch(error => console.error(error));
  }, []);

  
  const handleClick = (index) => {
    setFlipped((prevState) => ({
      ...prevState,
      [index]: !prevState[index], 
    }));
  };

  
  const resetFlipState = () => {
    setFlipped({});
  };

  const toggleQuiz = () => {
    setShowQuiz((prev) => !prev);  
    resetFlipState();  
  };

  return (
    <div>
      <h1>Katakana</h1>
      <button onClick={toggleQuiz} className="toggle-button">
        {showQuiz ? 'Learn' : 'Quiz Me'}
      </button>

      {showQuiz ? (
        <div className="quiz-container">
          <KatakanaQuiz />
          
        </div>
      ) : (
        <div className="character-list">
          {katakana.map((card, index) => (
            <div key={index} className="character" onClick={() => handleClick(index)}>
              <div className={`character-inner ${flipped[index] ? 'flipped' : ''}`}>
                <div className="character-front">
                  <h2>{card.character}</h2>
                </div>
                <div className="character-back">
                  <h3>{card.romaji}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Katakana;