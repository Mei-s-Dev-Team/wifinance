import React from 'react';
import NavBar from './navbar';
import CursorBlob from './cursorblob';
import Home from './home';
import About from './insertexpenses';
import Contact from './contact';
import PieData from './piedata';
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
      
      <NavBar />
      <CursorBlob />

      <div className="content">
        <h1>.</h1>
      </div>

      <div className="fixed-background"></div>

      <div className="container">
        <nav>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/Submit-Transaction" element={<About />} />
            <Route path="/View-History" element={<Contact />} />
            <Route path="/View-Data" element={<PieData />} />
          </Routes>
        </nav>
      </div>

      <div className="background"></div>

    </body>
  );
}

export default App;
