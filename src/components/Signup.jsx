import styles from "../styles/Signup.module.css";
import { FaUserPlus, FaRightToBracket } from "react-icons/fa6";
import { useState, useContext } from "react";
import { AuthContext } from "../authContext/AuthContext";
import LoadingDots from "../loading/Loading";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const { signup, loading, setLoading, setError, error, success, message } =
    useContext(AuthContext);

  function handleInput(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      await signup(formData.name, formData.email, formData.password);

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch {
      // errors are already handled in signup
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.authSection}>
      <div className={styles.formWrapper}>
        <h1>Sign Up</h1>
        <p className={styles.tagline}>
          Create your Pandora’s Box account to securely store and manage your
          files.
        </p>

        <form onSubmit={handleSubmit} className={styles.card}>

          <div className={styles.field}>
            <label className={styles.mute}>Full Name</label>
            <input
              className={styles.input}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInput}
              placeholder="John Doe"
              required
            />
          </div>


          <div className={styles.field}>
            <label className={styles.mute}>Email Address</label>
            <input
              className={styles.input}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInput}
              placeholder="example@email.com"
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.mute}>Password</label>
            <input
              className={styles.input}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInput}
              placeholder="••••••••"
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.mute}>Confirm Password</label>
            <input
              className={styles.input}
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInput}
              placeholder="••••••••"
              required
            />
          </div>

          <div className={styles.row}>
            <button
              className={`${styles.btn} ${styles.btnPrimary}`}
              type="submit"
              disabled={loading}
            >
              <FaUserPlus /> {loading ? "Signing Up..." : "Sign Up"}
            </button>
            <a className={styles.btn} href="/login">
              <FaRightToBracket /> Login
            </a>
          </div>
        </form>

        {success && <p className={styles.success}>{message}</p>}
        {error && <p className={styles.error}>{error}</p>}
        {loading && <LoadingDots />}
      </div>


      <p className={styles.disclaimer}>
        By signing up, you agree to our{" "}
        <a href="#" className={styles.signUp}>
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className={styles.signUp}>
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
};

export default SignUp;
