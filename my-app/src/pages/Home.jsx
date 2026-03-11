import NavComp from "../components/NavComp"
import SideBar from "../components/SideBar"
import Footer from "../components/Footer"
import "../App.css"

function Home(){


 return(

 <div className="app-container">
      <NavComp /> {/* Top Section */}

      <div className="main-wrapper">
        <SideBar />
        
        <div className="home">
          <h1>Welcome to the Dashboard</h1>
        </div>
      </div>

      <Footer />
    </div>
 )

}

export default Home;