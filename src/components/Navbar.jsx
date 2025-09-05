import styles from "../styles/Navbar.module.css";
import { FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../authContext/AuthContext";
import { useContext } from "react";

const Navbar = () => {
    const {user, logout} = useContext(AuthContext)

  return (
    <nav className={styles.navBar}>
          <a className={styles.brand} href="/">
            <img
              src="logo.png"
              alt="Pandora’s Box Logo"
              className={styles.logo}
            />
            <p className={styles.gradientText}>Pandora’s Box</p>
          </a>

      <div className={styles.controll}>
        {user ? (
          <button onClick={logout} className={`${styles.logoutBtn} ${styles.btn}`}><FaSignOutAlt /> Logout</button>
        ) : (
          <div className={styles.loginRegDiv}>
           <Link to={"login"}> <button className={`${styles.loginBtn} `}>Login</button></Link>
           <Link to={'signup'}><button className={`${styles.registerBtn} `}>Register</button></Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
