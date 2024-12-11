import React, { useEffect, useState } from 'react';
import './RandomWord.css'; // Optional for styling
import axios from 'axios'

function RandomWord() {
    const [wordData, setWordData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchRandomWord = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:5000/api/japanese/random_word');
            if (!response.ok) {
              throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            
            setWordData(data);
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
    }

    const speakWord = async (word) => {
      try {
          const response = await axios.post('http://localhost:5000/speech', { word }, { responseType: 'arraybuffer' });
          const audioData = response.data;
          const audioBlob = new Blob([audioData], { type: 'audio/mpeg' });
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          audio.play();
      } catch (error) {
          console.error('Error with text-to-speech:', error);
      }
  };
  

    useEffect(() => {
        fetchRandomWord();
    }, []); 

    return (
        <div className="random-word-container">
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {wordData && (
            <div className="random-word">
              <h1>{wordData.word || 'No Word Available'}</h1>
              <p>Reading: {wordData.reading}</p>
              <p>Definition: {wordData.definition}</p>
              <p>Romaji: {wordData.romaji}</p>
              <button className="random-word-btn" onClick={fetchRandomWord}>Get Another Word</button>
              <button onClick={() => speakWord(wordData.reading)}>How to pronounce</button>
            </div>
          )}
        </div>
      );
}

export default RandomWord;