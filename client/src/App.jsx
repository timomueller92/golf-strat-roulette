import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [challenges, setChallenges] = useState([]);
  const [newChallenge, setNewChallenge] = useState('');
  const [activeChallenge, setActiveChallenge] = useState(null);

  const fetchChallenges = async () => {
    try {
      const res = await axios.get('https://golf-strat-roulette.onrender.com/api/challenges');
      setChallenges(res.data);
    } catch (error) {
      console.error('Fehler beim Laden der Challenges:', error);
    }
  };

  const addChallenge = async () => {
    if (!newChallenge.trim()) return;
    try {
      await axios.post('https://golf-strat-roulette.onrender.com/api/challenges', { text: newChallenge });
      setNewChallenge('');
      fetchChallenges();
    } catch (error) {
      console.error('Fehler beim Hinzufügen der Challenge:', error);
    }
  };

  const getRandomChallenge = () => {
    if (challenges.length === 0) return;
    const randomIndex = Math.floor(Math.random() * challenges.length);
    setActiveChallenge(challenges[randomIndex]);
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  return (
    <div className="app">
      <h1>Golf Strat Roulette</h1>

      <button onClick={getRandomChallenge} className="random-button">
        🎲 Nächste Challenge
      </button>

      {activeChallenge && (
        <div className="active-challenge">
          <h2>{activeChallenge.text}</h2>
        </div>
      )}

      <div className="form">
        <input
          type="text"
          placeholder="Neue Challenge..."
          value={newChallenge}
          onChange={(e) => setNewChallenge(e.target.value)}
        />
        <button onClick={addChallenge}>Hinzufügen</button>
      </div>

      {/* Challenge-Liste ist ausgeblendet
      <ul>
        {challenges.map((challenge) => (
          <li key={challenge._id} className="challenge">
            <span>{challenge.text}</span>
            <div className="votes">
              <button onClick={() => vote(challenge._id, 'up')}>👍 {challenge.upvotes}</button>
              <button onClick={() => vote(challenge._id, 'down')}>👎 {challenge.downvotes}</button>
            </div>
          </li>
        ))}
      </ul>
      */}
    </div>
  );
}

export default App;
