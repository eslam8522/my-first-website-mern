import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import "../App.css"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!gmailRegex.test(email)) {
      alert("Please use a valid @gmail.com address.");
      return; 
    }

    try {
      const response = await axios.post("http://my-first-website-mern-production.up.railway.app/api/login", { email, password });
      
      // Check for 200 (Success) or 201 (Created)
      if (response.status === 200 || response.status === 201) {
        alert("Login Successful!");
        localStorage.setItem("userToken", "true");
        localStorage.setItem("userEmail", email);
        navigate("/Home"); 
      }
    } // <--- THIS BRACE WAS MISSING
    catch (error) {
      if (error.response) {
        alert(error.response.data.message); 
      } else {
        alert("Cannot connect to server. Check port 5000.");
      }
    }
  };
  
  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleLogin}>
        <h1>Login</h1>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
        <Link to="/Register" style={{color:"white"}}>Go to Signup</Link>
      </form>
    </div>
  );
}

export default Login;