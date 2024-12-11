import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './VocabRevision.css';
<<<<<<< HEAD
import VocabFlashcard from '../components/VocabFlashcard';
=======
>>>>>>> c01f1e8edb28fb80b6273c8c3b0facd1a7a0490c

function VocabRevision() {
  const [words, setWords] = useState([]);
  const [category, setCategory] = useState('verbs'); 
  const [error, setError] = useState(null);

  const fetchWords = async () => {
    if (!category) {
      setError('Please select a category');
<<<<<<< HEAD
      return;
=======
>>>>>>> c01f1e8edb28fb80b6273c8c3b0facd1a7a0490c
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
<<<<<<< HEAD
    fetchWords(); // Fetch words whenever the category changes
  }, [category]); // This effect runs every time 'category' changes

  const handleCategoryChange = (e) => {
    setCategory(e.target.value); // Update category when dropdown value changes
=======
    fetchWords();
  }, [])

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSearch = () => {
    fetchWords();
>>>>>>> c01f1e8edb28fb80b6273c8c3b0facd1a7a0490c
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
<<<<<<< HEAD
  };
=======
  }
>>>>>>> c01f1e8edb28fb80b6273c8c3b0facd1a7a0490c

  return (
    <div className="word-revision-container">
      <h2>Word Revision</h2>

<<<<<<< HEAD
=======
      
>>>>>>> c01f1e8edb28fb80b6273c8c3b0facd1a7a0490c
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

<<<<<<< HEAD
      {error && <p className="error">{error}</p>}

      {words.length > 0 ? (
        <div className="flashcard-grid">
          {words.map((word, index) => (
            <VocabFlashcard
              key={index}
              word={word.kanji || word.hiragana} // Show Kanji or Hiragana on the front
              meaning={word.meaning}
              romaji={word.romaji}
              furigana={word.hiragana} // Furigana for learning Kanji pronunciation
              speakWord={speakWord}
            />
=======
      
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
>>>>>>> c01f1e8edb28fb80b6273c8c3b0facd1a7a0490c
          ))}
        </div>
      ) : (
        <p className="loading">Loading words...</p>
      )}
    </div>
  );
}

export default VocabRevision;
