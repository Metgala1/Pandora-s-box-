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

const Main = () => {
  let user = { name: "Roger" };

  return (
    <main className={styles.mainContainer}>
      {/* Hero Section */}
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

      {/* Auth Section */}
      {!user ? (
        <section className={styles.authSection}>
          <h2>Get Started</h2>
          <p>Create a free account and start managing your files today.</p>
          <div className={styles.authBtn}>
            <a className={`${styles.btn} ${styles.signupBtn}`} href="/register">
              <FaUserPlus /> Sign Up
            </a>
            <a className={`${styles.btn} ${styles.loginBtn}`} href="/login">
              <FaRightToBracket /> Login
            </a>
          </div>
        </section>
      ) : (
        /* Welcome Section */
        <section className={styles.welcomeSection}>
          <h2>
            Welcome back, {user.name}{" "}
            <FaUser style={{ color: "burlywood" }} />
          </h2>
          <p>Manage, preview, and share your files instantly.</p>
          <div className={styles.quickAction}>
            <a className={`${styles.btn} ${styles.uploadBtn}`} href="/upload">
              <FaUpload /> Upload New File
            </a>
            <a className={`${styles.btn} ${styles.loginBtn}`} href="/files">
              <FaFolderOpen /> View My Files
            </a>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className={styles.features}>
        {!user && <h2>Why Pandora’s Box?</h2>}
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <FaLock size={32} />
            <h3>Secure</h3>
            <p>Your files are encrypted and safe with us.</p>
          </div>
          <div className={styles.featureCard}>
            <FaBolt size={32} />
            <h3>Fast</h3>
            <p>Quick uploads, previews, and downloads at your fingertips.</p>
          </div>
          <div className={styles.featureCard}>
            <FaShareNodes size={32} />
            <h3>Share</h3>
            <p>Easily share files with friends or colleagues in one click.</p>
          </div>
          <div className={styles.featureCard}>
            <FaMobileScreen size={32} />
            <h3>Anywhere</h3>
            <p>Access your files on desktop, tablet, or mobile seamlessly.</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className={styles.cta}>
        <h2 style={{ color: "black" }}>Start Storing Smarter Today</h2>
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
