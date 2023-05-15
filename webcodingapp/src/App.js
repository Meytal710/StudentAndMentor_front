import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Lobby from './Lobby';
import CodeBlock from './CodeBlock';

function App() {

  const [codes, setCodes] = useState(null);

  // get all the codes
  useEffect(() => {
    // fetch('http://localhost:3000/')
    fetch('https://studentandmentorback-production.up.railway.app/')
    .then(response => response.json())
    .then((data) => {
      setCodes(data);
    })
  }, []);


  return (
    <div>
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={codes && < Lobby codes={codes}/>}/>
          <Route exact path="/code/:id" element={codes && <CodeBlock codes={codes}/>}/>
        </Routes>
      </div>
      </Router>
      </div>
  );
}

export default App;
