import Navbar from './Components/Navbar';
import Game from './Components/Game';
import UserSt from './Components/UserSt';
import Score from './Components/Score';
import Leaderboard from './Components/Leaderboard';
import Inventory from './Components/Inventory';
import Toast from './Components/Toast';

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="game-container">
        <div className="game-main">
          <UserSt />
          <Game />
        </div>
        <div className="game-sidebar">
          <Score />
          <Inventory />
          <Leaderboard />
        </div>
      </div>
      <Toast />
    </div>
  );
}

export default App;