import { useState } from "react";
import styles from "../styles/Navbar.module.css";

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
          <button onClick={() => setUser(!user)} className={`${styles.logoutBtn} ${styles.btn}`}>Logout</button>
        ) : (
          <div className={styles.loginRegDiv}>
            <button className={`${styles.loginBtn} ${styles.btn}`}>Login</button>
            <button className={`${styles.registerBtn} ${styles.btn}`}>Register</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
