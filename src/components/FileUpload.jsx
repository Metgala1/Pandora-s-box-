import { useRef, useState, useContext, useEffect } from "react";
import styles from "../styles/FileUpload.module.css";
import { FaVideo, FaHeadphones, FaFilePdf, FaFileWord, FaFileExcel, FaFilePowerpoint, FaFile } from "react-icons/fa";
import { FileContext } from "../fileContext/MyFileContext";

const FileUpload = () => {
  const fileInputRef = useRef(null);
  const [previews, setPreviews] = useState([]);
  const [progress, setProgress] = useState(0);

  const { uploadFile, loading, error, setError } = useContext(FileContext);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, setError]);

  const handleFiles = (files) => {
    const fileArray = Array.from(files).map((file) => ({
      file,
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
      type: file.type,
      name: file.name,
    }));
    setPreviews(fileArray);
    previews.forEach(p => {
      if (p.preview) {
        URL.revokeObjectURL(p.preview);
      }
    });
    setProgress(0);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };
  
  const handleBrowse = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (previews.length === 0) {
      setError("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", previews[0].file);

    try {
      await uploadFile(formData, (percent) => setProgress(percent));
      previews.forEach(p => {
        if (p.preview) {
          URL.revokeObjectURL(p.preview);
        }
      });
      setPreviews([]);
    } catch (err) {
      console.error(err);
    }
  };

  const renderIcon = (p) => {
    if (p.preview) return <img src={p.preview} alt={p.name} className={styles.filePreview} />;
    if (p.type.startsWith("video/")) return <FaVideo size={48} color="#f59e0b" />;
    if (p.type.startsWith("audio/")) return <FaHeadphones size={48} color="#3b82f6" />;
    if (p.name.endsWith(".pdf")) return <FaFilePdf size={48} color="#ef4444" />;
    if (p.name.endsWith(".doc") || p.name.endsWith(".docx")) return <FaFileWord size={48} color="#2563eb" />;
    if (p.name.endsWith(".xls") || p.name.endsWith(".xlsx")) return <FaFileExcel size={48} color="#16a34a" />;
    if (p.name.endsWith(".ppt") || p.name.endsWith(".pptx")) return <FaFilePowerpoint size={48} color="#ea580c" />;
    return <FaFile size={48} color="#9ca3af" />;
  };

  return (
    <div className={styles.container}>
      <h1>Upload Files</h1>
      <p className={styles.mute}>
        Drag and drop files here or click to select. Supports images, videos, and documents.
      </p>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div
          className={styles.uploadDropzone}
          onClick={handleBrowse}
          onDragOver={(e) => {
            e.preventDefault();
            e.currentTarget.classList.add(styles.uploadDropzoneDragover);
          }}
          onDragLeave={(e) => {
            e.currentTarget.classList.remove(styles.uploadDropzoneDragover);
          }}
          onDrop={(e) => {
            e.currentTarget.classList.remove(styles.uploadDropzoneDragover);
            handleDrop(e);
          }}
        >
          <p className={styles.mute}>Drop files here or click to browse</p>
          <input
            type="file"
            multiple
            hidden
            ref={fileInputRef}
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>

        <div className={styles.previewContainer}>
          {previews.map((p, idx) => (
            <div key={idx} className={styles.filePreviewItem}>
              <div className={styles.filePreviewItemIcon}>
                {renderIcon(p)}
              </div>
              <span>{p.name}</span>
            </div>
          ))}
        </div>
        
        {error && <p className={styles.error}>{error}</p>}
        
        <button className={`${styles.btn} ${styles.btnPrimary}`} type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
      
      {loading && (
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;