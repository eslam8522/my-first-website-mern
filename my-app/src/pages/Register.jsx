import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // 1. Import the hook
import axios from "axios";
import "../App.css"


function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Define the Gmail Regex
    // This checks that the string ends exactly with @gmail.com
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    // 2. Validate the email
    if (!gmailRegex.test(email)) {
      alert("Please use a valid @gmail.com address.");
      return; // Stop the function here
    }

    try {
      const response = await axios.post("http://localhost:5000/api/register", { name, email, password });
      
      if (response.status === 201) {
        alert("Registration Successful!");
        navigate("/");
      }
    } catch (err) {
      console.error("Registration failed", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="page-Register">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1>Signup</h1>
        <input 
          placeholder="Name" 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <input 
          type="email" 
          placeholder="Email (must be @gmail.com)" 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Sign Up</button>
        <Link to="/" style={{color:"white"}}>If you already have an email, then login, please</Link>
      </form>
    </div> 
  );
}

export default Register;