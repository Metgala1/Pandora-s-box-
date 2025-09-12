// src/components/Audios.jsx
import styles from "../styles/Image.module.css"; // you can make a dedicated Audio.module.css if needed
import { FileContext } from "../fileContext/MyFileContext";
import { useContext, useEffect } from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const Audios = () => {
  const BASE_URL = "https://pandora-s-box-production.up.railway.app";
  const { fetchAudios, audios, deleteFile, downloadFile } = useContext(FileContext);

  useEffect(() => {
    fetchAudios();
  }, [fetchAudios]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Delete this audio? This cannot be undone."
    );
    if (confirmDelete) {
      deleteFile(id);
    }
  };

  return (
    <div className={styles.wrapper}>
    <div className={styles.container}>
      <h1 className={styles.heading}>My Audios</h1>
      <p className={styles.mute}>
        All uploaded audio files. Play, download, or delete your tracks.
      </p>

      {audios.length === 0 ? (
        <div className={`${styles.card} ${styles.noFiles}`}>
          <p className={styles.mute}>No audio files uploaded yet.</p>
          <Link className={`${styles.btn} ${styles.btnPrimary}`} to="/upload">
            Upload your first audio
          </Link>
        </div>
      ) : (
        <div className={styles.filesGrid}>
          {audios.map((file) => {
            const fileUrl = file.url

            return (
              <div className={styles.fileCard} key={file.id}>
                <audio
                  controls
                  src={fileUrl}
                  className={styles.filePreview}
                >
                  Your browser does not support the audio element.
                </audio>

                <div className={styles.fileInfo}>
                  <span className={`${styles.filename} ${styles.mono}`}>
                    {file.filename}
                  </span>
                  <span className={`${styles.fileMeta} ${styles.mute}`}>
                    Added: {new Date(file.createdAt).toLocaleString()}
                  </span>
                </div>

                <div className={styles.fileActions}>
                  <button
                    className={`${styles.btn} ${styles.btnPrimary}`}
                    onClick={() => downloadFile(file.id, file.filename)}
                  >
                    Download
                  </button>
                  <button
                    className={`${styles.btn} ${styles.btnDanger}`}
                    onClick={() => handleDelete(file.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className={styles.row} style={{ marginTop: "14px" }}>
        <Link className={`${styles.btn} ${styles.btnPrimary}`} to="/upload">
          Upload More
        </Link>
      </div>
      
    </div>
    <Footer />
    </div>
  );
};

export default Audios;
