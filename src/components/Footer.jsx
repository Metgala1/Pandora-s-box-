import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../styles/Footer.module.css";
import {
  FaHouseUser,
  FaRegImage,
  FaVideo,
  FaHeadphones,
  FaUpload,
  FaRegFileAlt
} from "react-icons/fa";
import { AuthContext } from "../authContext/AuthContext";
import { useContext } from "react";

const Footer = () => {
  const {user} = useContext(AuthContext)
  const location = useLocation();

  return (
    <footer className={styles.footer}>
      {user ? (
        <div className={styles.icons}>
          <Link to="/">
            <FaHouseUser
              className={`${styles.icon} ${
                location.pathname === "/" ? styles.active : ""
              }`}
            />
          </Link>
          <Link to="/images">
            <FaRegImage
              className={`${styles.icon} ${
                location.pathname === "/images" ? styles.active : ""
              }`}
            />
          </Link>
          <Link to="/videos">
            <FaVideo
              className={`${styles.icon} ${
                location.pathname === "/videos" ? styles.active : ""
              }`}
            />
          </Link>
          <Link to="/audios">
            <FaHeadphones
              className={`${styles.icon} ${
                location.pathname === "/audios" ? styles.active : ""
              }`}
            />
          </Link>
          <Link to="/documents">
            <FaRegFileAlt
              className={`${styles.icon} ${
                location.pathname === "/documents" ? styles.active : ""
              }`}
            />
          </Link>
          <Link to="/upload">
            <FaUpload
              className={`${styles.icon} ${
                location.pathname === "/upload" ? styles.active : ""
              }`}
            />
          </Link>
        </div>
      ) : (
        <p>
          © {new Date().getFullYear()} Pandora’s Box By ATAGWE ROGER — secure,
          simple storage.
        </p>
      )}
    </footer>
  );
};

export default Footer;
