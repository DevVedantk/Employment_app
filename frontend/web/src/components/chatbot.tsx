import React, { useState, useRef } from 'react';
import systemPrompt from './systemPrompt'; // ensure this exports a string

// Extend window object to include webkitSpeechRecognition
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string;

type ChatMessage = {
  sender: 'user' | 'bot';
  text: string;
};

export const GeminiChatbot: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [listening, setListening] = useState<boolean>(false);
  const recognitionRef = useRef<any>(null);

  const appendMessage = (sender: 'user' | 'bot', text: string) => {
    setChat((prev) => [...prev, { sender, text }]);
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  };

  const sendMessage = async (textToSend = input) => {
    if (typeof textToSend !== 'string' || !textToSend.trim()) return;

    appendMessage('user', textToSend);
    const userMessage = { role: 'user', parts: [{ text: textToSend }] };
    const basePrompt = { role: 'user', parts: [{ text: systemPrompt }] };

    const newHistory = [...history, userMessage];
    const fullContent = history.length === 0
      ? [basePrompt, userMessage]
      : [basePrompt, ...newHistory];

    setInput('');

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: fullContent })
        }
      );

      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';

      appendMessage('bot', reply);
      speak(reply);
      setHistory([...newHistory, { role: 'model', parts: [{ text: reply }] }]);
    } catch (err: any) {
      const errorMsg = `⚠ Error: ${err.message}`;
      console.error(errorMsg);
      appendMessage('bot', errorMsg);
      speak(errorMsg);
    }
  };

  const toggleMic = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech Recognition is not supported in this browser.');
      return;
    }

    if (!recognitionRef.current) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      
      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        sendMessage(transcript);
        setListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        appendMessage('bot', `⚠ Speech recognition error: ${event.error}`);
        setListening(false);
      };

      recognitionRef.current.onend = () => {
        setListening(false);
      };
    }

    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
    } else {
      recognitionRef.current.start();
      setListening(true);
    }
  };

  return (
    <div style={{ maxWidth: 600,
      backgroundColor : 'white',
      borderRadius:10,
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      border: '5px solid #D6F34B',
    
    margin: '0 auto', padding: 20, fontFamily: 'Arial' }}>
      <h1 style={{ color: 'black' }}>AI Assistant</h1>

      <div
        style={{
          border: '1px solid #ccc',
          height: 400,
          overflowY: 'auto',
          padding: 10,
          marginBottom: 10,
          backgroundColor: '#fff'
        }}
      >
        {chat.map((msg, index) => (
          <div
            key={index}
            style={{
              margin: '5px 0',
              padding: 8,
              borderRadius: 5,
              backgroundColor: msg.sender === 'user' ? '#e3f2fd' : '#f5f5f5',
              marginLeft: msg.sender === 'user' ? '20%' : 0,
              marginRight: msg.sender === 'bot' ? '20%' : 0,
              color: '#000'
            }}
          >
            <strong>{msg.sender === 'user' ? 'You' : 'Bot'}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask me anything..."
        style={{ width: '80%', padding: 8, color: '#000' }}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
      />

      <div style={{ marginTop: 10 }}>
        <button onClick={() => sendMessage()} style={{ padding: '8px 16px', 
          backgroundColor: 'black',

          color : "#D6F34B",
          fontWeight: 'semibold',
          borderRadius: 5,
          marginRight: 10 }}>
          Send
        </button>
        <button onClick={toggleMic} style={{ padding: '8px 16px' ,
          backgroundColor: 'black',

          color : "#D6F34B",
          fontWeight: 'semibold',
          borderRadius: 5,
        }}>
          {listening ? '🎙️ Stop' : '🎤 Speak'}
        </button>
      </div>
    </div>
  );
};

export default GeminiChatbot;