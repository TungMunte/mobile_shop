import { Link } from "react-router-dom";
import { useAuth } from "../security/AuthContext";
import "../css/Header.css";

function Header() {
  const authContext = useAuth();
  function logout() {
    authContext.logout();
  }

  return (
    <header className="site-header">
      <div className="site-identity">
        <h1>
          <Link to="/">Mobile </Link>
        </h1>
      </div>

      <nav className="site-navigation">
        <ul className="nav">
          <li>
            {authContext.isUser && <Link to="yourOrder">Your order</Link>}
          </li>
          <li>{authContext.isUser && <Link to="yourCart">Your cart</Link>}</li>
          <li>
            {authContext.isAdmin && (
              <Link to="/smartphoneManagement">Smartphone_Admin</Link>
            )}
          </li>
          <li>
            {authContext.isAdmin && (
              <Link to="/addSmartPhone">add_smartphone</Link>
            )}
          </li>
          <li>
            {authContext.isAdmin && <Link to="/packetCheck">Packet_Admin</Link>}
          </li>
          <li>
            {authContext.isDeliver && (
              <Link to="/packetManagement">My_packet</Link>
            )}
          </li>
          <li>
            {authContext.isDeliver && (
              <Link to="/packetSelect">packet_uncompleted</Link>
            )}
          </li>
          <li>
            {!authContext.isAuthenticated && <Link to="login">Login</Link>}
          </li>
          <li>
            {!authContext.isAuthenticated && (
              <Link to="register">Register</Link>
            )}
          </li>
          <li>
            {authContext.isAuthenticated && (
              <Link onClick={logout}>Logout</Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
