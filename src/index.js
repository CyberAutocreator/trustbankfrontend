import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css'; // if you have styles, otherwise remove

const root = createRoot(document.getElementById('root'));
root.render(<App />);
