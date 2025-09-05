// src/components/Videos.jsx
import styles from "../styles/Image.module.css";
import { FileContext } from "../fileContext/FileContext";
import { useContext, useEffect } from "react";
import Footer from "./Footer";

const Videos = () => {
  const BASE_URL = "https://pandora-s-box-production.up.railway.app";
  const { fetchVideos, videos, deleteFile, downloadFile } = useContext(FileContext);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Delete this video? This cannot be undone."
    );
    if (confirmDelete) {
      deleteFile(id);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>My Videos</h1>
      <p className={styles.mute}>
        All uploaded video files. Click to play, download, or delete.
      </p>

      {videos.length === 0 ? (
        <div className={`${styles.card} ${styles.noFiles}`}>
          <p className={styles.mute}>No videos uploaded yet.</p>
          <a className={`${styles.btn} ${styles.btnPrimary}`} href="/upload">
            Upload your first video
          </a>
        </div>
      ) : (
        <div className={styles.filesGrid}>
          {videos.map((file) => {
            const fileUrl = file.url.startsWith("http")
              ? file.url
              : `${BASE_URL}${file.url}`;

            return (
              <div className={styles.fileCard} key={file.id}>
                <video className={styles.filePreview} controls>
                  <source src={fileUrl} type={file.mimetype} />
                  Your browser does not support video playback.
                </video>

                <div className={styles.fileInfo}>
                  <span className={`${styles.filename} ${styles.mono}`}>
                    {file.filename}
                  </span>
                  <span className={`${styles.fileMeta} ${styles.mute}`}>
                    {file.mimetype} • {(file.size / 1024).toFixed(1)} KB
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
        <a className={`${styles.btn} ${styles.btnPrimary}`} href="/upload">
          Upload More
        </a>
      </div>
      <Footer />
    </div>
  );
};

export default Videos;
