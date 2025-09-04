import { useState } from "react";
import styles from "../styles/Navbar.module.css";
import { FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [user, setUser] = useState(true)

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
          <button onClick={() => setUser(!user)} className={`${styles.logoutBtn} ${styles.btn}`}><FaSignOutAlt /> Logout</button>
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
