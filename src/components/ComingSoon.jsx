// src/components/ComingSoon.jsx
import styles from "../styles/ComingSoon.module.css"; // Create this CSS module
import { FaHourglassHalf } from "react-icons/fa";
import Footer from "./Footer";

const ComingSoon = ({ featureName = "This Feature" }) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <FaHourglassHalf className={styles.icon} />
        <h1 className={styles.heading}>Coming Soon!</h1>
        <p className={styles.text}>
          {featureName} is on its way. Stay tuned for updates!
        </p>
        <div className={styles.loader}></div>
      </div>
      <Footer />
    </div>
  );
};

export default ComingSoon;
