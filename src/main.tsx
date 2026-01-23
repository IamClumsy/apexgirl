import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CreateArtist from './CreateArtist';
import './index.css';

// Check for hidden route parameter
const urlParams = new URLSearchParams(window.location.search);
const showCreatePage =
  urlParams.get('page') === 'create' ||
  window.location.hash === '#create' ||
  urlParams.get('mode') === 'add';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>{showCreatePage ? <CreateArtist /> : <App />}</React.StrictMode>
);
