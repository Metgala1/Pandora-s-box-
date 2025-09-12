// src/components/Images.jsx
import styles from "../styles/Image.module.css";
import { FileContext } from "../fileContext/MyFileContext";
import { useContext, useEffect } from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const Images = () => {
  const { fetchImages, images, deleteFile, downloadFile } = useContext(FileContext);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Delete this image? This cannot be undone."
    );
    if (confirmDelete) {
      deleteFile(id);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.heading}>My Images</h1>
        <p className={styles.mute}>
          All uploaded image files. Click to view, download, or delete.
        </p>

        {images.length === 0 ? (
          <div className={`${styles.card} ${styles.noFiles}`}>
            <p className={styles.mute}>No images uploaded yet.</p>
            <Link className={`${styles.btn} ${styles.btnPrimary}`} to="/upload">
              Upload your first image
            </Link>
          </div>
        ) : (
          <div className={styles.filesGrid}>
            {images.map((file) => (
              <div className={styles.fileCard} key={file.id}>
                <img
                  src={file.url} // Cloudinary URL directly
                  alt={file.filename}
                  className={styles.filePreview}
                />

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
                    onClick={() => downloadFile(file.url, file.filename)}
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
            ))}
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

export default Images;
