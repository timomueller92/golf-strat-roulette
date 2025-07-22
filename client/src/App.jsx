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

  const vote = async (id, type) => {
    try {
      const res = await axios.post(`https://golf-strat-roulette.onrender.com/api/vote/${id}`, { vote: type });
      // Falls Challenge gelöscht wurde (bei 10 Downvotes)
      if (res.data.deleted) {
        setActiveChallenge(null);
        fetchChallenges();
      } else {
        setActiveChallenge(res.data); // Aktualisierte Challenge anzeigen
      }
    } catch (error) {
      console.error('Fehler beim Voten:', error);
    }
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
          <div className="votes">
            <button onClick={() => vote(activeChallenge._id, 'up')}>👍 {activeChallenge.upvotes}</button>
            <button onClick={() => vote(activeChallenge._id, 'down')}>👎 {activeChallenge.downvotes}</button>
          </div>
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
    </div>
  );
}

export default App;
