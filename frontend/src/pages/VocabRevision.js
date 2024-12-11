import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './VocabRevision.css';

function VocabRevision() {
  const [words, setWords] = useState([]);
  const [category, setCategory] = useState('verbs'); 
  const [error, setError] = useState(null);

  const fetchWords = async () => {
    if (!category) {
      setError('Please select a category');
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/japanese-words?category=${category}`);
      setWords(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch words');
    }
  };

  useEffect(() => {
    fetchWords();
  }, [])

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSearch = () => {
    fetchWords();
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
    <div className="word-revision-container">
      <h2>Word Revision</h2>

      
      <div className="category-selection">
        <label htmlFor="category">Choose a category:</label>
        <select
          id="category"
          value={category}
          onChange={handleCategoryChange}
        >
          <option value="verbs">Verbs</option>
          <option value="animals">Animals</option>
          <option value="adjectives">Adjectives</option>
          <option value="numbers">Numbers</option>
        </select>
      </div>

      
      <div className="search-button">
        <button onClick={handleSearch}>Load Words</button>
      </div>

      
      {error && <p className="error">{error}</p>}

     
      {words.length > 0 ? (
        <div className="word-revision">
          {words.map((word, index) => (
            <div key={index} className="word-card">
              <h3>Kanji: {word.kanji}</h3>
              <h4>Hiragana: {word.hiragana}</h4>
              <p>Meaning: {word.meaning}</p>
              <p>Romaji: {word.romaji}</p>
              <button onClick={() => speakWord(word.hiragana)}>How to pronounce</button>
            </div>
          ))}
        </div>
      ) : (
        <p className="loading">Loading words...</p>
      )}
    </div>
  );
}

export default VocabRevision;
