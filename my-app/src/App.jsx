import { Routes, Route, Link } from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login'
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Settings from "./pages/Settings"
import SnakeGame from "./pages/SnakeGame"
import Whatever from "./pages/Whatever"
import "./App.css"
import "./Privacy/ProtectedRoute"
import ProtectedRoute from "./Privacy/ProtectedRoute";



function App() {
  return (
  
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
            <Route path="/Home" element={<Home />} />
            <Route path="/gg" element={<SnakeGame />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/Settings" element={<Settings />} />
            <Route path="/Whatever" element={<Whatever />} />
        </Route>      
      </Routes>

  );
}

export default App;