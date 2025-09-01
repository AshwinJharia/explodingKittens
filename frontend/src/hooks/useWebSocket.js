import { useEffect, useState } from 'react';
import websocketService from '../services/websocketService';

export const useWebSocket = (roomId) => {
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (roomId) {
      websocketService.connect(roomId);
    }

    const handleConnected = () => setConnected(true);
    const handleDisconnected = () => setConnected(false);
    const handleMessage = (message) => {
      setMessages(prev => [...prev, message]);
    };

    websocketService.on('connected', handleConnected);
    websocketService.on('disconnected', handleDisconnected);
    websocketService.on('message', handleMessage);

    return () => {
      websocketService.off('connected', handleConnected);
      websocketService.off('disconnected', handleDisconnected);
      websocketService.off('message', handleMessage);
      websocketService.disconnect();
    };
  }, [roomId]);

  const sendMessage = (type, payload) => {
    websocketService.send(type, payload);
  };

  return {
    connected,
    messages,
    sendMessage,
  };
};