import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Quiz.css';

function KatakanaQuiz() {
  const [katakana, setKatakana] = useState([]);
  const [currentFlashcard, setCurrentFlashcard] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/japanese/characters')
      .then((response) => {
        const shuffledKatakana = shuffleArray(response.data.katakana).slice(0, 10); 
        setKatakana(shuffledKatakana);
        setCurrentFlashcard(shuffledKatakana[0]);
      })
      .catch((error) => console.error(error));
  }, []);

  
  const shuffleArray = (array) => {
    return array
      .map((item) => ({ ...item, sortKey: Math.random() }))
      .sort((a, b) => a.sortKey - b.sortKey)
      .map((item) => {
        const { sortKey, ...rest } = item;
        return rest;
      });
  };

  const handleAnswer = () => {
    if (currentFlashcard) {
      if (userInput.toLowerCase() === currentFlashcard.romaji) {
        setFeedback('Correct!');
        setScore(score + 1);
      } else {
        setFeedback(`Incorrect. The correct answer is ${currentFlashcard.romaji}.`);
      }

      setTimeout(() => {
        const nextIndex = questionCount + 1;
        if (nextIndex < katakana.length) {
          setCurrentFlashcard(katakana[nextIndex]);
          setUserInput('');
          setFeedback('');
          setQuestionCount(nextIndex);
        } else {
          setCurrentFlashcard(null); 
        }
      }, 1000);
    }
  };

  return (
    <div className="flashcard-quiz-container">
      <h1 className="quiz-title">Katakana Quiz</h1>
      <div className="score-display">
        <span className="score-label">Score:</span>
        <span className="score-value">{score}</span>
      </div>
      {currentFlashcard ? (
        <div className="flashcard-quiz">
          <div className="flashcard">
            <h1 className="flashcard-character">{currentFlashcard.character}</h1>
            <input
              className="user-input"
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type the romaji"
            />
            <div className="feedback-container">
              <button className="check-button" onClick={handleAnswer}>
                Submit Answer
              </button>
              <p className="feedback">{feedback}</p>
            </div>
          </div>
        </div>
      ) : (
        <p className="quiz-end-message">
            {

            `Quiz Complete! Your final score is ${score}.`
          }
            
        </p>
      )}
    </div>
  );
}

export default KatakanaQuiz;
