import { createContext, useState,  useCallback } from "react";
import axios from "axios";

export const FileContext = createContext();

export const FileProvider = ({ children }) => {
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [audios, setAudios] = useState([]);
  const [documents, setDocuments] = useState()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const BASE_URL = import.meta.env.VITE_BACKEND_URL

const uploadFile = async (formData, onProgress) => {
  try {
    setLoading(true);
    setError(null);

    const { data } = await axios.post(`${BASE_URL}/upload`, formData, {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress(percentCompleted);
      },
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });

    setFiles((prev) => [data.file, ...prev]);
    return data.file;
  } catch (err) {
    setError(err.response?.data?.message || "Upload failed");
    onProgress(0);
  } finally {
    setLoading(false);
  }
};

  const fetchFiles = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${BASE_URL}/files`, {
        withCredentials: true,
      });
      setFiles(data);
    } catch (err) {
      setError(err.response?.data?.message || "Could not fetch files");
    } finally {
      setLoading(false);
    }
  }, [BASE_URL]);

  const fetchImages = useCallback(async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/images`, {
        withCredentials: true,
      });
      setImages(data);
    } catch (err) {
      setError(err.response?.data?.message || "Could not fetch images");
    }
  }, [BASE_URL]);

  const fetchVideos = useCallback(async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/videos`, {
        withCredentials: true,
      });
      setVideos(data);
    } catch (err) {
      setError(err.response?.data?.message || "Could not fetch videos");
    }
  }, [BASE_URL]);

  const fetchAudios = useCallback(async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/audios`, {
        withCredentials: true,
      });
      setAudios(data);
    } catch (err) {
      setError(err.response?.data?.message || "Could not fetch audios");
    }
  }, [BASE_URL]);

  const deleteFile = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/delete/${id}`, {
        withCredentials: true,
      });
      setFiles((prev) => prev.filter((file) => file.id !== id));
      setImages((prev) => prev.filter((file) => file.id !== id));
      setVideos((prev) => prev.filter((file) => file.id !== id));
      setAudios((prev) => prev.filter((file) => file.id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting file");
    }
  };

 const downloadFile = async (url, filename) => {
  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error(`Failed to fetch file: ${response.statusText}`);

    // Try to get the filename from the Content-Disposition header
    const contentDisposition = response.headers.get('Content-Disposition');
    let extractedFilename = filename;

    if (contentDisposition && contentDisposition.includes('filename=')) {
      const match = contentDisposition.match(/filename="(.+)"/);
      if (match && match[1]) {
        extractedFilename = match[1];
      }
    }

    // If no filename is extracted, use the provided filename
    const finalFilename = extractedFilename || filename;

    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = finalFilename;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (err) {
    console.error("Download error:", err);
    alert("Error downloading file");
  }
};



  const fetchDocuments = useCallback( async () => {
      try {
    const { data } = await axios.get(`${BASE_URL}/documents`, {
      withCredentials: true,
    });
    setDocuments(data);
  } catch (err) {
    console.error("Error fetching documents:", err);
    setDocuments([]); // fallback to empty array if request fails
  }

  },[BASE_URL])



  return (
    <FileContext.Provider
      value={{
        files,
        images,
        videos,
        audios,
        loading,
        error,
        uploadFile,
        fetchFiles,
        fetchImages,
        fetchVideos,
        fetchAudios,
        deleteFile,
        downloadFile,
        fetchDocuments,
        setDocuments,
        documents
      }}
    >
      {children}
    </FileContext.Provider>
  );
};
