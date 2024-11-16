import React from 'react';
import ReactDOM from 'react-dom';

function Popup() {
  return (
    <div>
      <h1>Hello, Chrome Extension!</h1>
      <p>This is a React-powered popup.</p>
    </div>
  );
}

ReactDOM.render(<Popup />, document.getElementById('root'));

