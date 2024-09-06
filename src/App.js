import './App.css';
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import BuildingOwner from './pages/BuildingOwner'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" Component={Home}></Route>
          <Route path="/login" Component={Login}></Route>
          <Route path="/register" Component={Register}></Route>
          
          <Route path="/building-owner" Component={BuildingOwner}></Route>
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
