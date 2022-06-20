import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './components/pages/NotFound';
import AddEmployee from './components/pages/AddEmployee';
import EditEmployee from './components/pages/EditEmployee';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route exact="true"  path="/" element={<Home />} />
        <Route exact="true"   path="/about" element={<About />} />
        <Route exact="true"  path="/contact" element={<Contact />} />
        <Route exact="true"  path="/addemployee" element={<AddEmployee />} />
        <Route exact="true"  path="/editemployee/:id" element={<EditEmployee />} />
        <Route  element={<NotFound />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
