import './App.css'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login';
function App() {
  return (
    <div className="App">
    <Router>
      
        <Routes>
          <Route path='/' element = {<><Header/><Home/></>}/>
          <Route path='/checkout' element = {<><Header/><Checkout/></>}/>
          <Route path='/login' element = {<Login/>}/>

        </Routes>
      
    </Router>
    
    
    </div>
  );
}

export default App;
