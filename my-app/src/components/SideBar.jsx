import { Link } from 'react-router-dom';
import "../App.css"

function SideBar() {
  return (
    <div className="sidebar">
      <h3>Game Menu</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li><Link to="/Home" style={{ color: 'white' }}>Dashboard</Link></li>
        <li><Link to="/gg" style={{ color: 'white' }}>Snake Game</Link></li>
        <li><Link to="/Leaderboard" style={{ color: 'white' }}>Top Scores</Link></li>
      </ul>
    </div>
  );
}

export default SideBar;