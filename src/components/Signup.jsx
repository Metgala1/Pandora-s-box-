import styles from "../styles/Signup.module.css"
import { FaUserPlus, FaRightToBracket } from "react-icons/fa6";
import { useState } from "react";

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPasswrd] = useState('')
  const [fullName, setFullName] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    // handle form submit
  }

  return (
    <div className={styles.authSection}>
      <div className={styles.formWrapper}>
        <h1>Sign Up</h1>
        <p className={styles.tagline}>
          Create your Pandora’s Box account to securely store and manage your files.
        </p>

        <form onSubmit={handleSubmit} method="POST" className={styles.card}>
          {/* Full Name */}
          <div className={styles.field}>
            <label className={styles.mute}>Full Name</label>
            <input
              className={styles.input}
              type="text"
              name="name"
              placeholder="John Doe"
              required
            />
          </div>

          {/* Email */}
          <div className={styles.field}>
            <label className={styles.mute}>Email Address</label>
            <input
              className={styles.input}
              type="email"
              name="email"
              placeholder="example@email.com"
              required
            />
          </div>

          {/* Password */}
          <div className={styles.field}>
            <label className={styles.mute}>Password</label>
            <input
              className={styles.input}
              type="password"
              name="password"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className={styles.field}>
            <label className={styles.mute}>Confirm Password</label>
            <input
              className={styles.input}
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Buttons */}
          <div className={styles.row}>
            <button className={`${styles.btn} ${styles.btnPrimary}`} type="submit">
              <FaUserPlus /> Sign Up
            </button>
            <a className={styles.btn} href="/login">
              <FaRightToBracket /> Login
            </a>
          </div>
        </form>
      </div>

      {/* Disclaimer at the bottom */}
      <p className={styles.disclaimer}>
        By signing up, you agree to our{" "}
        <a href="#" className={styles.signUp}>Terms of Service</a>{" "}
        and{" "}
        <a href="#" className={styles.signUp}>Privacy Policy</a>.
      </p>
    </div>
  );
};

export default SignUp;
