import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import websocketService from '../../services/websocketService';

const RoomLobby = ({ onStartGame }) => {
  const [roomId, setRoomId] = useState('');
  const [players, setPlayers] = useState([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    websocketService.on('connected', () => setConnected(true));
    websocketService.on('disconnected', () => setConnected(false));
    websocketService.on('room_update', handleRoomUpdate);
    websocketService.on('game_start', onStartGame);

    return () => {
      websocketService.off('connected');
      websocketService.off('disconnected');
      websocketService.off('room_update', handleRoomUpdate);
      websocketService.off('game_start', onStartGame);
    };
  }, [onStartGame]);

  const handleRoomUpdate = (data) => {
    setPlayers(data.payload.players || []);
  };

  const joinRoom = () => {
    if (roomId.trim()) {
      websocketService.connect(roomId);
    }
  };

  const createRoom = () => {
    const newRoomId = Math.random().toString(36).substring(7);
    setRoomId(newRoomId);
    websocketService.connect(newRoomId);
  };

  const startGame = () => {
    websocketService.send('start_game', {});
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="room-lobby"
    >
      <h2>Multiplayer Lobby</h2>
      
      <div className="room-controls">
        <div className="join-room">
          <input
            type="text"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <button onClick={joinRoom} disabled={!roomId.trim()}>
            Join Room
          </button>
        </div>
        
        <div className="create-room">
          <button onClick={createRoom}>Create New Room</button>
        </div>
      </div>

      {connected && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="room-info"
        >
          <h3>Room: {roomId}</h3>
          <div className="connection-status">
            <span className={`status ${connected ? 'connected' : 'disconnected'}`}>
              {connected ? '🟢 Connected' : '🔴 Disconnected'}
            </span>
          </div>
          
          <div className="players-list">
            <h4>Players ({players.length}/4)</h4>
            {players.map((player, index) => (
              <div key={index} className="player-item">
                {player.username || `Player ${index + 1}`}
              </div>
            ))}
          </div>

          {players.length >= 2 && (
            <button onClick={startGame} className="start-game-btn">
              Start Game
            </button>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default RoomLobby;