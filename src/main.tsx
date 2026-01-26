import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import SRArtist from './SRArtist';
import { ErrorBoundary } from './components/ErrorBoundary';
import './index.css';

function Router() {
  const [currentPage, setCurrentPage] = useState<'app' | 'sr'>('app');

  useEffect(() => {
    const checkRoute = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const hash = window.location.hash;
      const shouldShowSR =
        urlParams.get('page') === 'create' ||
        hash === '#create' ||
        urlParams.get('mode') === 'add';
      setCurrentPage(shouldShowSR ? 'sr' : 'app');
    };

    // Check on mount
    checkRoute();

    // Listen for URL changes
    window.addEventListener('popstate', checkRoute);
    window.addEventListener('hashchange', checkRoute);

    // Also check periodically in case of programmatic navigation
    const interval = setInterval(checkRoute, 100);

    return () => {
      window.removeEventListener('popstate', checkRoute);
      window.removeEventListener('hashchange', checkRoute);
      clearInterval(interval);
    };
  }, []);

  return (
    <React.StrictMode>
      <ErrorBoundary>
        {currentPage === 'sr' ? <SRArtist /> : <App />}
      </ErrorBoundary>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<Router />);
