import './App.css';
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar/>
        <Home/>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
