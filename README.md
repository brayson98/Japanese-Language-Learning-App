# Japanese Vocabulary Learning App

## Overview
The **Japanese Vocabulary Learning App** is an interactive platform designed to help users improve their Japanese language skills. It provides features for revising vocabulary, learning Hiragana and Katakana, and preparing for the JLPT (Japanese Language Proficiency Test). The app also includes multimedia enhancements, such as a carousel with inspiring Japanese-related images, and supports text-to-speech functionality for pronunciation practice.

---

## Features
- **Vocabulary Revision**: Explore words categorized by JLPT levels (N1-N5) with details like Kanji, Furigana, Romaji, and English meaning.
- **Kana Practice**: Learn and revise Hiragana and Katakana characters.
- **Text-to-Speech**: Hear correct pronunciations of words and Kana for better learning.
- **Multimedia Enhancements**: A carousel showcasing iconic Japanese imagery.
- **User Authentication**: Login and sign-up features for personalized experiences.

---

## Technologies Used
- **Frontend**: React.js (including `react-router-dom` for navigation and `slick-carousel` for the image carousel).
- **Backend**: Flask for API routes and handling text-to-speech via Google Text-to-Speech.
- **Database**: SQLite for storing vocabulary and user data.
- **Styling**: Custom CSS and external libraries.

---

**Version Control**
Git and Github for source control

---

## Setup Instructions
### Prerequisites
- Node.js and npm
- Python 3 and pip

### Steps
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/japanese-vocabulary-app.git
   cd japanese-vocabulary-app
2. **Install frontend dependencies**:
  cd frontend
  npm install
3. **Install backend dependancies**:
   cd ../backend
   pip install -r requirements.txt
4. **Set up enviroment variables**:
   Create a .env file in the backend directory and include required API keys:
   Google - text-to-speech
   WaniKani
5. **Run the app**:
   Run the backend with - python app.py
   Run the frontend with - npm start
6. **Access the app**:
   Access the app on http://localhost:3000

---

## Sprint Plan (2 Weeks)

### **Sprint Goals**
- Deliver a functional Japanese vocabulary learning app with basic user authentication and core learning features.
- Ensure the app has a visually appealing user interface with responsive design.

---

### **Week 1: Backend and Core Features**
#### Day 1-2:
- Set up Flask backend and create basic API routes for:
  - Vocabulary retrieval.
  - Text-to-speech functionality.
- Integrate SQLite database to store vocabulary data.

#### Day 3-4:
- Test and debug API endpoints.
- Create seed data for vocabulary by JLPT levels.
- Implement text-to-speech using Google Text-to-Speech API.

#### Day 5:
- Set up React frontend project structure.
- Create reusable components for navigation and layout.

#### Day 6:
- Build a functional page for vocabulary revision.
- Test API integration between frontend and backend.

#### Day 7:
- Create user authentication system with sign-up and login functionality.
- Store user credentials in the database and handle session management.

---

### **Week 2: Frontend Enhancements and Styling**
#### Day 8-9:
- Implement the home page with a carousel showcasing Japanese-themed images.
- Style the home page with a focus on aesthetics and responsiveness.

#### Day 10:
- Add Hiragana and Katakana learning pages.
- Ensure navigation works seamlessly across all pages.

#### Day 11:
- Refine vocabulary revision page:
  - Display words with Kanji, Furigana, Romaji, and English meaning.
  - Add text-to-speech functionality for pronunciation.

#### Day 12:
- Test and debug the app across different devices and screen sizes.
- Ensure all features are functional and error handling is in place.

#### Day 13:
- Write unit tests for both backend and frontend.
- Conduct usability testing to identify potential improvements.

#### Day 14:
- Finalize the README with installation instructions, features, and future plans.
- Deploy the application to a hosting platform for public use.

---

### **Post-Sprint Review**
At the end of the sprint, review the app for:
- Feature completeness.
- User experience quality.
- Performance and responsiveness.

---

**Future Enhancements**:
- Add flashcard-based games for vocabulary practice.
- Implement a scoring system for JLPT quiz attempts.
- Expand vocabulary database.
- Add Canvas tracing to practice stroke order.




   
