import { useState } from "react";
import styles from "../styles/Footer.module.css";
import {
  FaHouseUser,
  FaRegImage,
  FaVideo,
  FaHeadphones,
  FaRegComment,
  FaRegUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../authContext/AuthContext";
import { useContext } from "react";

const Footer = () => {
  const {user} = useContext(AuthContext)
  
  const [activeIcon, setActiveIcon] = useState("/");

  const handleClick = (path) => {
    setActiveIcon(path);
  };

  return (
    <footer className={styles.footer}>
      {user ? (
        <div className={styles.icons}>
          <Link to="/" onClick={() => handleClick("/")}>
            <FaHouseUser
              className={`${styles.icon} ${
                activeIcon === "/" ? styles.active : ""
              }`}
            />
          </Link>
          <Link to="/images" onClick={() => handleClick("/images")}>
            <FaRegImage
              className={`${styles.icon} ${
                activeIcon === "/images" ? styles.active : ""
              }`}
            />
          </Link>
          <Link to="/videos" onClick={() => handleClick("/videos")}>
            <FaVideo
              className={`${styles.icon} ${
                activeIcon === "/videos" ? styles.active : ""
              }`}
            />
          </Link>
          <Link to="/audios" onClick={() => handleClick("/audios")}>
            <FaHeadphones
              className={`${styles.icon} ${
                activeIcon === "/audios" ? styles.active : ""
              }`}
            />
          </Link>
          <Link to="/comments" onClick={() => handleClick("/comments")}>
            <FaRegComment
              className={`${styles.icon} ${
                activeIcon === "/comments" ? styles.active : ""
              }`}
            />
          </Link>
          <Link to="/profile" onClick={() => handleClick("/profile")}>
            <FaRegUser
              className={`${styles.icon} ${
                activeIcon === "/profile" ? styles.active : ""
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
