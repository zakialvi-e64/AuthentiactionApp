import React, {useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar';
import Login from './pages/LoginPage';
import Register from './pages/RegistrationPage';
import Profile from './pages/ProfilePage';
import NoPage from './pages/NoPage';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const updateLoggedInUser = (user) => {
    setLoggedInUser(user);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar updateLoggedInUser={updateLoggedInUser} loggedInUser={loggedInUser}/>

        <Routes>
          <Route path="/" element={<Login updateLoggedInUser={updateLoggedInUser} loggedInUser={loggedInUser}/>} />
          <Route path="/register" element={<Register  loggedInUser={loggedInUser}/>} />
          <Route path="/profile" element={<Profile  loggedInUser={loggedInUser}/>} />
          <Route path="*" element={<NoPage  loggedInUser={loggedInUser}/>} />
        </Routes>

        <ToastContainer theme="dark" />
      </div>
    </BrowserRouter>
  );
}

export default App;
