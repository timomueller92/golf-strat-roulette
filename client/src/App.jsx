import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [challenges, setChallenges] = useState([]);
  const [newChallenge, setNewChallenge] = useState('');

  const fetchChallenges = async () => {
    const res = await axios.get('https://golf-strat-roulette.onrender.com/api/challenges');
    setChallenges(res.data);
  };

  const addChallenge = async () => {
    if (!newChallenge.trim()) return;
    await axios.post('http://localhost:5000/api/challenges', { text: newChallenge });
    setNewChallenge('');
    fetchChallenges();
  };

  const vote = async (id, type) => {
    await axios.post(`http://localhost:5000/api/vote/${id}`, { vote: type });
    fetchChallenges();
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  return (
    <div className="app">
      <h1>Golf Strat Roulette</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Neue Challenge..."
          value={newChallenge}
          onChange={(e) => setNewChallenge(e.target.value)}
        />
        <button onClick={addChallenge}>Hinzufügen</button>
      </div>

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
    </div>
  );
}

export default App;