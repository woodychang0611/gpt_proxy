//index.js
import React from 'react';
import ReactDOM from 'react-dom/client';

function Index() {
  return (
    <React.StrictMode>
      <div>
        <h1>React Hello World!</h1>
      </div>
    </React.StrictMode>
  );
}

document.addEventListener('DOMContentLoaded', () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <Index />
  );
});

export default Index;