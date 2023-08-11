import {BrowserRouter,Routes, Route} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from "./components/Navbar";
import Login from "./pages/LoginPage";
import Register from "./pages/RegistrationPage";
import Profile from "./pages/ProfilePage";
import NoPage from "./pages/NoPage";

function App() {
  return (
    <BrowserRouter>

      <div className="App">

        <ToastContainer theme="dark"/>

          <Navbar/>

          <Routes>

            <Route path="/" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="*" element={<NoPage/>}/>

          </Routes>

      </div>

    </BrowserRouter>

  );
}

export default App;
