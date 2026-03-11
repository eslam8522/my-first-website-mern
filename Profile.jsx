import axios from "axios";
import "../profile.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfilePic from "../components/image";

const menuOpt = [
    { id: "security", label: "Security", icon: "🔒" },
    { id: "settings", label: "Settings", icon: "🔑" },
    { id: "IMAGE",    label: "Image",    icon: "✨" }
];

// 1. ProfileEl now takes props (the state and the function) from the parent
function ProfileEl({ activeTab, onTabClick }) {
    return (
        // Added { } around map so the JavaScript runs inside JSX
        menuOpt.map((option) => (
            <button 
                key={option.id} 
                onClick={() => onTabClick(option.id)}
                className={activeTab === option.id ? "active" : ""} 
            >
                {option.label} {option.icon}
            </button>
        ))
    );
}

function Profile() {
    // 2. State LIVES HERE. Both the sidebar and content can see it.
    const [activeTab, setActiveTab] = useState("");
    const [pass1, setPass1] = useState("");
    const [pass2, setPass2] = useState("");
    const nav= useNavigate();
    const hpchange = async (e) => {
        e.preventDefault();
        if ( pass1 !== pass2)
        {
           alert("the passwords are not the same, please try again");
           setPass1("");
           setPass2("");
           return;
        }
       try{
        const userEmail= localStorage.getItem("userEmail");
        const response= await axios.post("my-first-website-mern-production.up.railway.app/api/passwordChange",{userEmail, pass1})
        alert("Password has been changed successfully!");
        setPass1("");
        setPass2("");


       } catch (error) {    
      if (error.response) {
        alert(error.response.data.message); 
      } else {
        alert("Cannot connect to server. Check port 5000.");
      }
    }
  }


    return (
        <div className="profile-container"> 
            <header className="profile-header">
                <button className="profilebtn" onClick={ ()=> nav("/Home")}>
                    Profile</button>
            </header>
            <main className="main-container">
                <aside className="profile-sidebar">
                    <h1>Menu</h1>
                    {/* 3. Pass the state and the setter function as PROPS */}
                    <ProfileEl activeTab={activeTab} onTabClick={setActiveTab} />
                </aside>

                <section className="profile-content">
                    {/* 4. This now works because it uses the SAME state as the sidebar */}
                    {activeTab === "security" && (
                        <>
                        <form className="f1">
                            <h3>Hi, would you like to change your password?</h3>
                            <input type="password" placeholder="password 1st time"
                            onChange={(e)=> setPass1(e.target.value) } required
                            value={pass1}
                            />
                            <input type="password" placeholder="password 2nd time"
                            onChange={(e)=>  setPass2(e.target.value) } required
                            value={pass2}
                            />
                            <input type="submit" onClick={hpchange}/>
                        </form>
                        </>
                    )}
                    
                    {activeTab === "settings" && (
                        <h1>Settings are displayed</h1> 
                    )}

                    {activeTab === "IMAGE" && (
                        // <ProfilePic/>
                        <h1> For images</h1>
                    )}
                </section>
            </main>
        </div>   
    );
}

export default Profile;     