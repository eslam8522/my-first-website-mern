import "../App.css"
import EagleItem from "../assets/images.jpg"
import { useNavigate } from "react-router-dom"; 
import { useState, useEffect } from "react";

function NavComp(){
const [showMenu, setShowMenu] = useState(false);
const [shb, setShb] = useState(false);
const navigate = useNavigate();

useEffect(() => {
  console.log("The menu state just changed to:", shb);
}, [shb]); // <--- This is the "Listener"

return (
  <nav className="nav-bar">
    <img src={EagleItem} alt="an eagle" />
    
    <div className="nav-links">
      <a href="https://facebook.com">Facebook</a>
      <a href="https://youtube.com">YouTube</a>
      <a href="https://google.com">Google</a>
      <div className="container-try">
        <button className="t1" onClick={ ()=> { setShb(!shb)}}> Menu</button>
        { shb && (
          <div className="menu-ops">
            <button> Hi </button>
            <button> Bye </button>
            <hr></hr>
            <button> Wow </button>
          </div>
        )

        }
      </div>
    </div>

    <div className="drop-container">
      <button className="drop-trigger" onClick={() => setShowMenu(!showMenu)}>
        User Menu ▾
      </button>

      {showMenu && (
        <div className="drop-list">
          <button onClick={() => navigate("/profile")}>Profile</button>
          <button onClick={() => navigate("/settings")}>Settings</button>
          <button onClick={() => navigate("/Whatever")}>ChatWith people</button>
          <hr />
          <button 
          className="logout-btn"onClick={()=>{localStorage.removeItem("userToken");navigate("/");}}>Log out</button>
        </div>
      )}
    </div>
  </nav>
);
}

export default NavComp;