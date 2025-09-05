import styles from "../styles/Signup.module.css";
import { FaRightToBracket, FaUserPlus } from "react-icons/fa6";
import { useState, useContext } from "react";
import { AuthContext } from "../authContext/AuthContext";
import LoadingDots from "../loading/Loading";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    const result = await login(formData.email, formData.password);

    if (result.success) {
      setIsLoading(false);
      setSuccess("Login successful! Redirecting...");
      setTimeout(() => navigate("/"), 2000);
    } else {
      setError(result.message || "Login failed.");
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.authSection}>
      <div className={styles.formWrapper}>
        <h1>Login</h1>
        <p className={styles.tagline}>
          Access your Pandora’s Box account and manage your files securely.
        </p>

        <form onSubmit={handleSubmit} className={styles.card}>
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

          <div className={styles.row}>
            <button
              className={`${styles.btn} ${styles.btnPrimary}`}
              type="submit"
              disabled={isLoading}
            >
              <FaRightToBracket /> {isLoading ? "Logging In..." : "Login"}
            </button>
            <a className={styles.btn} href="/signup">
              <FaUserPlus /> Sign Up
            </a>
          </div>
        </form>

        {success && <p className={styles.success}>{success}</p>}
        {error && <p className={styles.error}>{error}</p>}
        {isLoading && <LoadingDots />}
      </div>

      <p className={styles.disclaimer}>
        By logging in, you agree to our{" "}
        <a href="#" className={styles.signUp}>Terms of Service</a>{" "}
        and{" "}
        <a href="#" className={styles.signUp}>Privacy Policy</a>.
      </p>
    </div>
  );
};

export default Login;
