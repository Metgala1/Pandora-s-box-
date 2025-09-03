import { useState } from 'react';
import styles from '../styles/Footer.module.css';
import { FaHouseUser, FaImage, FaVideo, FaHeadphones, FaComment, FaUser } from 'react-icons/fa';

const Footer = () => {
    const [user, setUser] = useState(true)
    return (
        <footer className={styles.footer}>
            {user ? (
             <div className={styles.icons}>
            <a href="/"><FaHouseUser className={styles.icon}/></a>
            <a href=""><FaImage className={styles.icon}/></a>
            <a href=""><FaVideo className={styles.icon}/></a>
            <a href=""><FaHeadphones className={styles.icon}/></a>
            <a href=""><FaComment className={styles.icon}/></a>
            <a href=""><FaUser className={styles.icon}/></a>
            </div>
            ) : (
                <p> © {new Date().getFullYear()}  Pandora’s Box By ATAGWE ROGER — secure, simple storage.</p>
            )}
           
        </footer>
    )
}

export default Footer