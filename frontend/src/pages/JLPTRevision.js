import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './JLPTRevision.css'; 

function JLPTRevision() {
  const [level, setLevel] = useState('5');
  const [vocabList, setVocabList] = useState([]);
  const [error, setError] = useState(null);

  const fetchVocab = async () => {
    if (!level) {
      setError('Please select a JLPT level');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/vocab?level=${level}`);
      setVocabList(response.data);  
      setError(null);  
    } catch (err) {
      setError('Failed to fetch vocabulary.');
    }
  };

  useEffect(() => {
    fetchVocab();
  }, []);

  const handleLevelChange = (e) => {
    setLevel(e.target.value);
  };

  const handleSearch = () => {
    fetchVocab();
  };

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
  }

  return (
    <div className="vocab-container">
      <h1>Vocabulary by JLPT Level</h1>
      <div className="search-bar">
        <label>Select JLPT Level:</label>
        <select onChange={handleLevelChange} value={level}>
          <option value="">--Select Level--</option>
          <option value="5">N5</option>
          <option value="4">N4</option>
          <option value="3">N3</option>
          <option value="2">N2</option>
          <option value="1">N1</option>
        </select>
        <button onClick={handleSearch}>Fetch Vocabulary</button>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="vocab-list">
        {vocabList.length > 0 ? (
          vocabList.map((vocab, index) => (
            <div key={index} className="vocab-card">
              <h3>{vocab.word}</h3>
              <p><strong>Translation:</strong> {vocab.meaning}</p>
              <p><strong>Romaji:</strong> {vocab.romaji}</p>
              <p><strong>Furigana:</strong> {vocab.furigana}</p>
              <button onClick={() => speakWord(vocab.furigana)}>How to pronounce</button>
            </div>
          ))
        ) : (
          <p>No vocabulary found for the selected level.</p>
        )}
      </div>
    </div>
  );
}

export default JLPTRevision;
