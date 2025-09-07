import styles from "../styles/Main.module.css";
import {
  FaBoxArchive,
  FaUserPlus,
  FaRightToBracket,
  FaUser,
  FaUpload,
  FaFolderOpen,
  FaLock,
  FaBolt,
  FaShareNodes,
  FaMobileScreen,
  FaArrowRight,
} from "react-icons/fa6";
import { AuthContext } from "../authContext/AuthContext";
import { useContext } from "react";

import { Link } from "react-router-dom";

const Main = () => {
 const {user} = useContext(AuthContext)

  return (
    <main className={styles.mainContainer}>
      <header className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1>
            <FaBoxArchive /> Pandora's Box
          </h1>
          <p className={styles.tagLine}>
            Your personal cloud storage — safe, simple, and always accessible.
          </p>
        </div>
      </header>

      {!user ? (
        <section className={styles.authSection}>
          <h2>Get Started</h2>
          <p>Create a free account and start managing your files today.</p>
          <div className={styles.authBtn}>
            <Link to={"signup"}>
            <p className={`${styles.btn} ${styles.signupBtn}`} href="/register">
              <FaUserPlus /> Sign Up
            </p>
            </Link>
            <Link to={"login"}>
            <p className={`${styles.btn} ${styles.loginBtn}`} href="/login">
              <FaRightToBracket /> Login
            </p>
            </Link>
          </div>
        </section>
      ) : (
        <section className={styles.welcomeSection}>
          <h2>
            Welcome back, {user.username}{" "}
            <FaUser style={{ color: "burlywood" }} />
          </h2>
          <p>Manage, preview, and share your files instantly.</p>
          <div className={styles.quickAction}>
            <Link to={"upload"}>
            <p className={`${styles.btn} ${styles.uploadBtn}`} href="/upload">
              <FaUpload /> Upload File
            </p>
            </Link>
            <Link to={"files"}>
            <p className={`${styles.btn} ${styles.loginBtn}`}>
              <FaFolderOpen /> View Files
            </p>
            </Link>
          </div>
        </section>
      )}

      <section className={styles.features}>
        {!user && <h2>Why Pandora’s Box?</h2>}
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <FaLock className={styles.icon} size={32} />
            <h3>Secure</h3>
            <p>Your files are encrypted and safe with us.</p>
          </div>
          <div className={styles.featureCard}>
            <FaBolt className={styles.icon} size={32} />
            <h3>Fast</h3>
            <p>Quick uploads, previews, and downloads at your fingertips.</p>
          </div>
          <div className={styles.featureCard}>
            <FaShareNodes className={styles.icon}size={32} />
            <h3>Share</h3>
            <p>Easily share files with friends or colleagues in one click.</p>
          </div>
          <div className={styles.featureCard}>
            <FaMobileScreen className={styles.icon} size={32} />
            <h3>Anywhere</h3>
            <p>Access your files on desktop, tablet, or mobile seamlessly.</p>
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <h2 style={{ color: "white" }}>Start Storing Smarter Today</h2>
        <p>Pandora’s Box makes managing your files simple and professional.</p>
        {!user ? (
          <a className={`${styles.btn} ${styles.signupBtn}`} href="/register">
            <FaArrowRight /> Create Free Account
          </a>
        ) : (
          <a className={`${styles.btn} ${styles.loginBtn}`} href="/files">
            <FaArrowRight /> Go To My Files
          </a>
        )}
      </section>
    </main>
  );
};

export default Main;
