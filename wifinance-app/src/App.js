import React from 'react';
import NavBar from './navbar';
import Home from './home';
import About from './insertexpenses';
import RetrieveHistory from './ViewHistory';
import { Route, Routes } from 'react-router-dom';
import './App.css';

const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Krub:wght@400;700&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

const fontLink2 = document.createElement('link');
fontLink2.href = 'https://fonts.googleapis.com/css2?family=Numans&display=swap';
fontLink2.rel = 'stylesheet';
document.head.appendChild(fontLink2);

function App() {
  return (
    <body style={{ fontFamily: 'Numans, Krub, sans-serif' }}>
      
      <NavBar/>

      <nav>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/Submit-Transaction" element={<About />} />
          <Route path="/View-History" element={<RetrieveHistory />} />
        </Routes>
      </nav>


      <div className="background"></div>

    </body>
  );
}

export default App;
