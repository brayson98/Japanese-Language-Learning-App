import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Hiragana from './pages/Hiragana';
import Katakana from './pages/Katakana';
import Navigation from './components/Nav';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import JLPTRevision from './pages/JLPTRevision';
import VocabRevision from './pages/VocabRevision';
import './App.css'
function App() {

  const [user, setUser] = useState(null);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    localStorage.setItem('user', JSON.stringify(loggedInUser)); 
  };

  
  
  
  
  return (
    <Router>
      <Navigation /> 
      <Routes>
      
        <Route path="/" element={<Home />} />
        <Route path="/hiragana" element={<Hiragana />} />
        <Route path="/katakana" element={<Katakana />} />
        <Route path="/login" element={<Login onLogin={handleLogin}/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/jlptrevision" element={<JLPTRevision />} />
        <Route path="/vocabrevision" element={<VocabRevision />} />
      </Routes>
    </Router>
  );
}

export default App;
