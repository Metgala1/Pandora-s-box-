import { useState } from 'react';
import styles from '../styles/Footer.module.css';
import { FaHouseUser, FaRegImage, FaVideo, FaHeadphones, FaRegComment, FaRegUser } from 'react-icons/fa';

const Footer = () => {
    const [user, setUser] = useState(true)
    return (
        <footer className={styles.footer}>
            {user ? (
             <div className={styles.icons}>
            <a href="/"><FaHouseUser className={`${styles.icon} ${styles.active}`}/></a>
            <a href=""><FaRegImage className={styles.icon}/></a>
            <a href=""><FaVideo className={styles.icon}/></a>
            <a href=""><FaHeadphones className={styles.icon}/></a>
            <a href=""><FaRegComment className={styles.icon}/></a>
            <a href=""><FaRegUser className={styles.icon}/></a>
            </div>
            ) : (
                <p> © {new Date().getFullYear()}  Pandora’s Box By ATAGWE ROGER — secure, simple storage.</p>
            )}
           
        </footer>
    )
}

export default Footer