import React from 'react';
import Home from './home';
import About from './insertexpenses';
import Contact from './contact';
import {Route, Routes} from 'react-router-dom';
import NavBar from './navbar';

function App() {
  return (
    <body>
      <NavBar />
      <div>
      <h1>Welcome to WiFinance</h1>
      <p>Submit a new expense !</p>
      </div>

      <div className="container">
        <nav>
          <Routes>
            <Route path= "/home" element={<Home/>}/>
            <Route path= "/about" element={<About/>}/>
            <Route path= "/contact" element={<Contact/>}/>
          </Routes>
        </nav>
      </div>
      
    </body>
    
  );
}

export default App;
