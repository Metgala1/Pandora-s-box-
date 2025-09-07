// src/components/Documents.jsx
import styles from "../styles/Image.module.css"; 
import { FileContext } from "../fileContext/MyFileContext";
import { useContext, useEffect } from "react";
import Footer from "./Footer";

const Documents = () => {
  const { fetchDocuments, documents, deleteFile, downloadFile } =
    useContext(FileContext);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Delete this document? This cannot be undone."
    );
    if (confirmDelete) {
      deleteFile(id);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>My Documents</h1>
      <p className={styles.mute}>
        All uploaded document files. Click to download or delete.
      </p>

      {!documents || documents.length === 0 ? (
        <div className={`${styles.card} ${styles.noFiles}`}>
          <p className={styles.mute}>No documents uploaded yet.</p>
          <a className={`${styles.btn} ${styles.btnPrimary}`} href="/upload">
            Upload your first document
          </a>
        </div>
      ) : (
        <div className={styles.filesGrid}>
          {documents.map((file) => (
            <div className={styles.fileCard} key={file.id}>
              <div className={styles.filePreview}>
                <i className="fa fa-file-text fa-3x" aria-hidden="true"></i>
              </div>

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
          ))}
        </div>
      )}

      <div className={styles.row} style={{ marginTop: "14px" }}>
        <Link className={`${styles.btn} ${styles.btnPrimary}`} to="/upload">
          Upload More
        </Link>
      </div>

      <Footer />
    </div>
  );
};

export default Documents;
