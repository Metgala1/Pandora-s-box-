// src/context/FileContext.jsx
import { createContext, useState,  useCallback } from "react";
import axios from "axios";

export const FileContext = createContext();

export const FileProvider = ({ children }) => {
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [audios, setAudios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const BASE_URL = import.meta.env.VITE_BACKEND_URL

const uploadFile = async (formData, onProgress) => {
  try {
    setLoading(true);
    setError(null);

    const { data } = await axios.post(`${BASE_URL}/upload`, formData, {
      // The onUploadProgress callback gives us the progress event
      onUploadProgress: (progressEvent) => {
        // We calculate the percentage and call the onProgress callback
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
    // Also reset progress to 0 on error
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
      const { data } = await axios.get(`${BASE_URL}/files/images`, {
        withCredentials: true,
      });
      setImages(data);
    } catch (err) {
      setError(err.response?.data?.message || "Could not fetch images");
    }
  }, [BASE_URL]);

  const fetchVideos = useCallback(async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/files/videos`, {
        withCredentials: true,
      });
      setVideos(data);
    } catch (err) {
      setError(err.response?.data?.message || "Could not fetch videos");
    }
  }, [BASE_URL]);

  const fetchAudios = useCallback(async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/files/audios`, {
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
      }}
    >
      {children}
    </FileContext.Provider>
  );
};

