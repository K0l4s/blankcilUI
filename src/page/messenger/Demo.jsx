import React, { useState, useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useParams } from 'react-router-dom';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const clientRef = useRef(null);
  const chatId = useParams().id;
  useEffect(() => {
    const socket = new SockJS('http://localhost:9090/ws');
    const client = new Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log(str),
      onConnect: () => {
        console.log('Connected');
        client.subscribe('/group/'+chatId, (message) => {
          setMessages((prevMessages) => [...prevMessages, JSON.parse(message.body)]);
        });
      },
      onDisconnect: () => {
        console.log('Disconnected');
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, []);

  const sendMessage = () => {
    const message = {
      content: input,
      chatEntity: { id: chatId }
    };
    clientRef.current.publish({
      destination: '/app/message',
      body: JSON.stringify(message),
    });
    setInput('');
  };

  return (
    <div>
      <h1>Chat App</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg.content}</div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default App;
