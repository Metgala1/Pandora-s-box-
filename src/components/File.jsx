// src/components/FileManager.jsx
import styles from "../styles/File.module.css";
import { FileContext } from "../fileContext/FileContext";
import { useContext, useEffect } from "react";

const FileManager = () => {
  const BASE_URL = "https://pandora-s-box-production.up.railway.app";

  const { fetchFiles, files } = useContext(FileContext);
  

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>My Files</h1>
      <p className={styles.mute}>
        All files you’ve uploaded. Click download to save locally, preview, or delete.
      </p>

      {files.length === 0 ? (
        <div className={`${styles.card} ${styles.noFiles}`}>
          <p className={styles.mute}>No files uploaded yet.</p>
          <a className={`${styles.btn} ${styles.btnPrimary}`} href="/upload">
            Upload your first file
          </a>
        </div>
      ) : (
        <div className={styles.filesGrid}>
          {files.map((file) => {
            const fileUrl = new URL(file.url, BASE_URL).href;
            
            return (
              <div className={styles.fileCard} key={file.id}>
                {file.mimetype.startsWith("image/") ? (
                  <img
                    src={fileUrl}
                    alt={file.filename}
                    className={styles.filePreview}
                  />
                ) : file.mimetype.startsWith("video/") ? (
                  <video className={styles.filePreview} controls>
                    <source src={fileUrl} type={file.mimetype} />
                    Your browser does not support video playback.
                  </video>
                ) : file.mimetype.startsWith("audio/") ? (
                  <audio className={styles.filePreview} controls>
                    <source src={fileUrl} type={file.mimetype} />
                    Your browser does not support audio playback.
                  </audio>
                ) : (
                  <div className={styles.fileIcon}>📄</div>
                )}

                <div className={styles.fileInfo}>
                  <span className={`${styles.filename} ${styles.mono}`}>
                    {file.filename}
                  </span>
                  <span className={styles.fileMeta}>
                    {file.mimetype} • {(file.size / 1024).toFixed(1)} KB
                  </span>
                  <span className={styles.fileMeta}>
                    Added: {new Date(file.createdAt).toLocaleString()}
                  </span>
                </div>

                <div className={styles.fileActions}>
                  <a
                    className={`${styles.btn} ${styles.btnPrimary}`}
                    href={`/download/${file.id}`}
                  >
                    Download
                  </a>
                  <form
                    action={`/delete/${file.id}`}
                    method="POST"
                    onSubmit={(e) => {
                      if (
                        !window.confirm("Delete this file? This cannot be undone.")
                      ) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <button
                      className={`${styles.btn} ${styles.btnDanger}`}
                      type="submit"
                    >
                      Delete
                    </button>
                  </form>
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
    </div>
  );
};

export default FileManager;