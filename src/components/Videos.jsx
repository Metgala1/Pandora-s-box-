import styles from "../styles/Image.module.css";
import { FileContext } from "../fileContext/MyFileContext";
import { useContext, useEffect } from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const Videos = () => {
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
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.heading}>My Videos</h1>
        <p className={styles.mute}>
          All uploaded video files. Click to play, download, or delete.
        </p>

        {videos.length === 0 ? (
          <div className={`${styles.card} ${styles.noFiles}`}>
            <p className={styles.mute}>No videos uploaded yet.</p>
            <Link className={`${styles.btn} ${styles.btnPrimary}`} to="/upload">
              Upload your first video
            </Link>
          </div>
        ) : (
          <div className={styles.filesGrid}>
            {videos.map((file) => (
              <div className={styles.fileCard} key={file.id}>
                <video
                  className={styles.filePreview}
                  controls
                  controlsList="nodownload noremoteplayback"
                  preload="metadata"
                  playsInline
                  poster={file.thumbnail || "/video-placeholder.jpg"} // Supabase thumbnail if available
                  disablePictureInPicture={false} // allows PiP
                >
                  <source src={file.url} type={file.mimetype} />
                  Your browser does not support video playback.
                </video>

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

export default Videos;
