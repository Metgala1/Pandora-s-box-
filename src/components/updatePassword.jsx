import styles from "../styles/Signup.module.css";
import { FaKey } from "react-icons/fa6";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingDots from "../loading/Loading";
import { AuthContext } from "../authContext/AuthContext";
import { useContext } from "react";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const{updatePassword} = useContext(AuthContext)

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

    const result = await updatePassword(formData.email, formData.password);

    if (result.success) {
      setIsLoading(false);
      setSuccess("Password updated successfully! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } else {
      setError(result.message || "Failed to update password.");
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.authSection}>
      <div className={styles.formWrapper}>
        <h1>Change Password</h1>
        <p className={styles.tagline}>
          Update your password to keep your Pandora’s Box account secure.
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
            <label className={styles.mute}>New Password</label>
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
              <FaKey /> {isLoading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>

        {success && <p className={styles.success}>{success}</p>}
        {error && <p className={styles.error}>{error}</p>}
        {isLoading && <LoadingDots />}
      </div>

      <p className={styles.disclaimer}>
        Need help? Contact{" "}
        <a href="/support" className={styles.signUp}>Support</a>.
      </p>
    </div>
  );
};

export default ChangePassword;
