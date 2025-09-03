import styles from "../styles/Main.module.css";

const Main = () => {
  let user = { name: "Roger" };

  return (
    <main className={styles.mainContainer}>
      {/* Hero Section */}
      <header className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1>Pandora's Box</h1>
          <p className={styles.tagLine}>
            Your personal cloud storage — safe, simple, and always accessible.
          </p>
        </div>
      </header>

      {/* Auth Section */}
      <section className={styles.authSection}>
        <h2>Get Started</h2>
        <p>Create a free account and start managing your files today.</p>
        <div className={styles.authBtn}>
          <button className={`${styles.btn} ${styles.signupBtn}`}>Sign Up</button>
          <button className={`${styles.btn} ${styles.loginBtn}`}>Login</button>
        </div>
      </section>

      {/* Welcome Section */}
      <section className={styles.welcomeSection}>
        <h2>Welcome back, {user.name}</h2>
        <p>Manage, preview, and share your files instantly.</p>
        <div className={styles.quickAction}>
          <button className={`${styles.btn} ${styles.uploadBtn}`}>Upload New File</button>
          <button className={`${styles.btn} ${styles.loginBtn}`}>View My Files</button>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <h2>Why Pandora’s Box?</h2>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <h3>Secure</h3>
            <p>Your files are encrypted and safe with us.</p>
          </div>
          <div className={styles.featureCard}>
            <h3>Fast</h3>
            <p>Quick uploads, previews, and downloads at your fingertips.</p>
          </div>
          <div className={styles.featureCard}>
            <h3>Share</h3>
            <p>Easily share files with friends or colleagues in one click.</p>
          </div>
          <div className={styles.featureCard}>
            <h3>Anywhere</h3>
            <p>Access your files on desktop, tablet, or mobile seamlessly.</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className={styles.cta}>
        <h2 style={{ color: "black" }}>Start Storing Smarter Today</h2>
        <p>Pandora’s Box makes managing your files simple and professional.</p>
        <a className={`${styles.btn} ${styles.signupBtn}`} href="/register">
          Create Free Account
        </a>
        <a className={`${styles.btn} ${styles.loginBtn}`} href="/files">
          Go To My Files
        </a>
      </section>
    </main>
  );
};

export default Main;
