import { useRef, useState, useContext, useEffect } from "react";
import styles from "../styles/FileUpload.module.css";
import { FaVideo, FaHeadphones, FaFilePdf, FaFileWord, FaFileExcel, FaFilePowerpoint, FaFile } from "react-icons/fa";
import { FileContext } from "../fileContext/FileContex";

const FileUpload = () => {
  // We use a ref to programmatically trigger the hidden file input
  const fileInputRef = useRef(null);
  // State to hold file previews for display before upload
  const [previews, setPreviews] = useState([]);
  // State for tracking the upload progress percentage
  const [progress, setProgress] = useState(0);

  // Destructure the necessary functions and state from the FileContext
  const { uploadFile, loading, error, setError } = useContext(FileContext);

  // Effect to automatically clear the error message after 3 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, setError]);

  // Handles adding files from either a drop or a browse event
  const handleFiles = (files) => {
    const fileArray = Array.from(files).map((file) => ({
      file,
      // Create a temporary URL for image previews
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
      type: file.type,
      name: file.name,
    }));
    setPreviews(fileArray);
    // Reset progress when new files are selected
    // and cleanup any previous object URLs
    previews.forEach(p => {
      if (p.preview) {
        URL.revokeObjectURL(p.preview);
      }
    });
    setProgress(0);
  };

  // Handles the file drop event on the dropzone
  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };
  
  // Triggers the hidden file input when the dropzone is clicked
  const handleBrowse = () => {
    fileInputRef.current.click();
  };

  // Handles the form submission to upload the selected file
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if a file has been selected
    if (previews.length === 0) {
      setError("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    // Your current context only handles one file, so we'll use the first one
    formData.append("file", previews[0].file);

    try {
      // Pass the setProgress function as a callback to the uploadFile context function
      await uploadFile(formData, (percent) => setProgress(percent));
      // Clear the previews after a successful upload
      previews.forEach(p => {
        if (p.preview) {
          URL.revokeObjectURL(p.preview);
        }
      });
      setPreviews([]);
    } catch (err) {
      // The error is handled by the context, so we just log here.
      console.error(err);
    }
  };

  // Renders the appropriate icon based on the file type
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
      
      {/* Conditionally render the progress bar when the upload is in progress */}
      {loading && (
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;