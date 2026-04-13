import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const user = localStorage.getItem("currentUser");

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <h2 className="logo" onClick={()=>navigate("/")}>
        🌍 Travel Planner
      </h2>

      <div className="nav-right">
        <span onClick={()=>window.scrollTo({top:300, behavior:"smooth"})}>
          Explore
        </span>

        {user ? (
          <div className="profile" onClick={()=>setShowMenu(!showMenu)}>
            👤 {user}

            {showMenu && (
              <div className="dropdown">
                <p onClick={handleLogout}>Logout</p>
              </div>
            )}
          </div>
        ) : (
          <button onClick={()=>navigate("/login")}>Login</button>
        )}
      </div>
    </div>
  );
}

export default Navbar;