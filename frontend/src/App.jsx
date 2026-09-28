// frontend/src/App.jsx

import React, { useState, useEffect, useRef } from "react";
import {
  Upload,
  FileText,
  FileAudio,
  FileVideo,
  FileCode,
  Trash2,
  Download,
  Search,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  User as UserIcon,
  LogOut,
  GraduationCap,
  BookOpen,
  X,
  File as GenericFile,
  RefreshCw,
  Eye,
  Activity,
  Copy,
  Check,
  RotateCcw,
  FileCheck,
} from "lucide-react";
import { authAPI, lecturesAPI, healthAPI } from "./api";
import "./App.css";

export default function App() {
  // Auth State
  const [token, setToken] = useState(localStorage.getItem("summify_token"));
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("summify_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [authModalOpen, setAuthModalOpen] = useState(!token);
  const [authMode, setAuthMode] = useState("login"); // 'login' | 'register'
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authFormData, setAuthFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  // Health State
  const [serverOnline, setServerOnline] = useState(true);

  // Lectures State
  const [lectures, setLectures] = useState([]);
  const [loadingLectures, setLoadingLectures] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedLecture, setSelectedLecture] = useState(null);

  // Module 2: Transcript & Processing State
  const [transcriptData, setTranscriptData] = useState(null);
  const [loadingTranscript, setLoadingTranscript] = useState(false);
  const [transcriptError, setTranscriptError] = useState("");
  const [transcriptSearch, setTranscriptSearch] = useState("");
  const [copiedTranscript, setCopiedTranscript] = useState(false);
  const [modalTab, setModalTab] = useState("transcript"); // 'transcript' | 'details'
  const [retrying, setRetrying] = useState(false);

  // Upload State
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [alert, setAlert] = useState(null); // { type: 'success' | 'danger', message: '' }
  const fileInputRef = useRef(null);

  // Check backend health & fetch user
  useEffect(() => {
    const checkStatus = async () => {
      try {
        await healthAPI.check();
        setServerOnline(true);
      } catch {
        setServerOnline(false);
      }
    };
    checkStatus();

    const handleAuthChanged = () => {
      setToken(null);
      setUser(null);
      setAuthModalOpen(true);
    };

    window.addEventListener("auth-changed", handleAuthChanged);
    return () => window.removeEventListener("auth-changed", handleAuthChanged);
  }, []);

  // Fetch logged in user profile and lectures on token change
  useEffect(() => {
    if (token) {
      loadUserProfile();
      loadLectures();
    } else {
      setLectures([]);
    }
  }, [token]);

  const loadUserProfile = async () => {
    try {
      const res = await authAPI.getMe();
      setUser(res.data);
      localStorage.setItem("summify_user", JSON.stringify(res.data));
    } catch {
      // Handled by axios interceptor
    }
  };

  const loadLectures = async () => {
    try {
      setLoadingLectures(true);
      const res = await lecturesAPI.getMyLectures();
      setLectures(res.data);
    } catch (err) {
      console.error("Failed to load lectures:", err);
    } finally {
      setLoadingLectures(false);
    }
  };

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => {
      setAlert(null);
    }, 4500);
  };

  // Poll status & fetch transcript when a lecture is selected
  useEffect(() => {
    if (!selectedLecture) {
      setTranscriptData(null);
      setTranscriptError("");
      setTranscriptSearch("");
      setCopiedTranscript(false);
      return;
    }

    let isMounted = true;
    let pollTimer = null;

    const fetchTranscript = async () => {
      try {
        setLoadingTranscript(true);
        setTranscriptError("");
        const res = await lecturesAPI.getTranscript(selectedLecture.id);
        if (isMounted) {
          setTranscriptData(res.data);
        }
      } catch (err) {
        if (isMounted) {
          const detail = err.response?.data?.detail || "Transcript could not be loaded.";
          setTranscriptError(typeof detail === "string" ? detail : JSON.stringify(detail));
        }
      } finally {
        if (isMounted) setLoadingTranscript(false);
      }
    };

    const pollStatus = async () => {
      try {
        const res = await lecturesAPI.getStatus(selectedLecture.id);
        if (!isMounted) return;

        setSelectedLecture((prev) => {
          if (!prev || prev.id !== selectedLecture.id) return prev;
          return {
            ...prev,
            processing_status: res.data.processing_status,
            status_message: res.data.status_message,
            error_message: res.data.error_message,
          };
        });

        // Keep main library list in sync
        setLectures((prev) =>
          prev.map((item) =>
            item.id === selectedLecture.id
              ? {
                  ...item,
                  processing_status: res.data.processing_status,
                  status_message: res.data.status_message,
                  error_message: res.data.error_message,
                }
              : item
          )
        );

        if (res.data.processing_status === "completed") {
          fetchTranscript();
        } else if (res.data.processing_status === "failed") {
          setTranscriptError(res.data.error_message || "Processing failed.");
        } else {
          pollTimer = setTimeout(pollStatus, 1800);
        }
      } catch (err) {
        console.error("Status polling error:", err);
      }
    };

    if (selectedLecture.processing_status === "completed") {
      fetchTranscript();
    } else if (["uploaded", "extracting", "transcribing"].includes(selectedLecture.processing_status)) {
      pollStatus();
    } else if (selectedLecture.processing_status === "failed") {
      setTranscriptError(selectedLecture.error_message || "Processing failed.");
    }

    return () => {
      isMounted = false;
      if (pollTimer) clearTimeout(pollTimer);
    };
  }, [selectedLecture?.id, selectedLecture?.processing_status]);

  const handleRetryProcessing = async (lectureId) => {
    try {
      setRetrying(true);
      const res = await lecturesAPI.retryProcessing(lectureId);
      setSelectedLecture((prev) => ({
        ...prev,
        processing_status: res.data.processing_status,
        status_message: res.data.status_message,
        error_message: null,
      }));
      setLectures((prev) =>
        prev.map((item) =>
          item.id === lectureId
            ? {
                ...item,
                processing_status: res.data.processing_status,
                status_message: res.data.status_message,
                error_message: null,
              }
            : item
        )
      );
      showAlert("success", "Processing re-queued!");
    } catch (err) {
      showAlert("danger", "Failed to re-trigger processing.");
    } finally {
      setRetrying(false);
    }
  };

  const handleCopyTranscript = () => {
    if (!transcriptData?.text) return;
    navigator.clipboard.writeText(transcriptData.text);
    setCopiedTranscript(true);
    setTimeout(() => setCopiedTranscript(false), 2200);
  };

  const handleDownloadTranscript = () => {
    if (!transcriptData?.text || !selectedLecture) return;
    const blob = new Blob([transcriptData.text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const safeTitle = selectedLecture.title.replace(/[^a-zA-Z0-9_-]/g, "_");
    link.href = url;
    link.download = `${safeTitle}_transcript.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Auth Handlers
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");

    try {
      let res;
      if (authMode === "register") {
        res = await authAPI.register({
          name: authFormData.name,
          email: authFormData.email,
          password: authFormData.password,
          role: authFormData.role,
        });
      } else {
        res = await authAPI.login({
          email: authFormData.email,
          password: authFormData.password,
        });
      }

      const receivedToken = res.data.access_token;
      localStorage.setItem("summify_token", receivedToken);
      setToken(receivedToken);
      setAuthModalOpen(false);
      showAlert("success", authMode === "register" ? "Account created successfully!" : "Welcome back!");
    } catch (err) {
      if (err.code === "ECONNABORTED" || err.message?.includes("timeout")) {
        setAuthError("Request timed out. Please ensure the backend server is running on http://localhost:8000.");
      } else if (!err.response) {
        setAuthError("Cannot connect to backend API (http://localhost:8000). Please check that 'npm run backend' is active.");
      } else {
        const detail = err.response?.data?.detail || "Authentication failed. Please check your credentials.";
        setAuthError(typeof detail === "string" ? detail : JSON.stringify(detail));
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("summify_token");
    localStorage.removeItem("summify_user");
    setToken(null);
    setUser(null);
    setAuthModalOpen(true);
    setAuthMode("login");
    showAlert("success", "Logged out successfully");
  };

  // Drag and Drop
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const handleFileSelection = (file) => {
    const maxSize = 25 * 1024 * 1024; // 25 MB
    if (file.size > maxSize) {
      showAlert("danger", "File is too large! Maximum allowed size is 25 MB.");
      return;
    }
    setSelectedFile(file);
    if (!uploadTitle) {
      // Strip extension for title
      const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf(".")) || file.name;
      setUploadTitle(nameWithoutExt);
    }
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      showAlert("danger", "Please select a file to upload");
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("title", uploadTitle);
    formData.append("file", selectedFile);

    try {
      const res = await lecturesAPI.upload(formData, (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setUploadProgress(percentCompleted);
      });

      showAlert("success", `Lecture "${res.data.title}" uploaded! Processing started...`);
      setSelectedFile(null);
      setUploadTitle("");
      setUploadProgress(0);
      if (fileInputRef.current) fileInputRef.current.value = "";
      loadLectures();
      setSelectedLecture(res.data);
      setModalTab("transcript");
    } catch (err) {
      const detail = err.response?.data?.detail || "Upload failed. Please check file format and size.";
      showAlert("danger", typeof detail === "string" ? detail : JSON.stringify(detail));
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteLecture = async (lectureId, e) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this lecture?")) return;

    try {
      await lecturesAPI.deleteLecture(lectureId);
      showAlert("success", "Lecture deleted successfully");
      setLectures((prev) => prev.filter((item) => item.id !== lectureId));
      if (selectedLecture?.id === lectureId) setSelectedLecture(null);
    } catch (err) {
      showAlert("danger", "Failed to delete lecture.");
    }
  };

  // Helper Formatter functions
  const formatBytes = (bytes, decimals = 2) => {
    if (!+bytes) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const d = new Date(dateString);
    return d.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getFileCategory = (fileType, filename = "") => {
    const ext = filename.split(".").pop().toLowerCase();
    if (fileType?.includes("pdf") || ext === "pdf") return "pdf";
    if (fileType?.includes("word") || ["docx", "doc"].includes(ext)) return "doc";
    if (fileType?.includes("audio") || ["mp3", "wav", "m4a"].includes(ext)) return "audio";
    if (fileType?.includes("video") || ["mp4", "webm"].includes(ext)) return "video";
    if (fileType?.includes("text") || ["txt", "md"].includes(ext)) return "text";
    return "generic";
  };

  const renderFileIcon = (category) => {
    switch (category) {
      case "pdf":
        return <FileText size={22} />;
      case "doc":
        return <BookOpen size={22} />;
      case "audio":
        return <FileAudio size={22} />;
      case "video":
        return <FileVideo size={22} />;
      case "text":
        return <FileCode size={22} />;
      default:
        return <GenericFile size={22} />;
    }
  };

  // Filter & Search lectures
  const filteredLectures = lectures.filter((lecture) => {
    const matchesSearch =
      lecture.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lecture.original_filename.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || lecture.processing_status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalStorage = lectures.reduce((acc, curr) => acc + (curr.file_size || 0), 0);

  return (
    <div className="app-container">
      {/* NAVIGATION BAR */}
      <nav className="navbar">
        <div className="brand-container" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div className="brand-icon-wrapper">
            <Sparkles size={20} />
          </div>
          <span>Summify</span>
        </div>

        <div className="nav-actions">
          <div className="user-badge" title={serverOnline ? "Backend API Connected" : "Backend Disconnected"}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: serverOnline ? "var(--success)" : "var(--danger)",
                display: "inline-block",
              }}
            />
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              {serverOnline ? "API Live" : "API Offline"}
            </span>
          </div>

          {token && user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div className="user-badge">
                {user.role === "educator" ? <BookOpen size={14} /> : <GraduationCap size={14} />}
                <span>{user.name || user.email}</span>
                <span className={`role-pill ${user.role}`}>{user.role}</span>
              </div>
              <button className="btn btn-secondary btn-icon" onClick={handleLogout} title="Log Out">
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button className="btn btn-primary" onClick={() => setAuthModalOpen(true)}>
              <UserIcon size={16} /> Sign In
            </button>
          )}
        </div>
      </nav>

      {/* MAIN CONTAINER */}
      <main className="main-content">
        {/* ALERT NOTIFICATIONS */}
        {alert && (
          <div className={`alert-banner alert-${alert.type}`}>
            {alert.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span>{alert.message}</span>
          </div>
        )}

        {/* HERO SECTION */}
        <section className="hero-banner">
          <div className="hero-text">
            <h1>Intelligent Study Workspace</h1>
            <p>
              Upload lectures, PDFs, audio recordings, or video sessions. Manage your learning library and prepare for AI-powered summaries & study guides.
            </p>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-val">{lectures.length}</div>
              <div className="stat-label">Lectures</div>
            </div>
            <div className="stat-card">
              <div className="stat-val">{formatBytes(totalStorage, 0)}</div>
              <div className="stat-label">Storage</div>
            </div>
          </div>
        </section>

        {/* UPLOAD SECTION (MODULE 1 REQUIREMENT) */}
        <section className="upload-card">
          <div className="section-header" style={{ marginBottom: "1.25rem" }}>
            <div className="section-title">
              <Upload size={22} color="var(--accent-primary)" />
              <h2>Upload New Lecture</h2>
            </div>
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
              Supported: PDF, DOCX, TXT, MP3, WAV, MP4 (Max 25 MB)
            </span>
          </div>

          <form onSubmit={handleUploadSubmit}>
            {/* DROPZONE */}
            <div
              className={`dropzone ${dragActive ? "active" : ""}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                style={{ display: "none" }}
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.txt,.md,.mp3,.wav,.m4a,.mp4,.webm"
              />
              <div className="dropzone-icon-circle">
                <Upload size={28} />
              </div>
              <div className="dropzone-text">
                {selectedFile ? selectedFile.name : "Drag & drop your lecture file here, or browse"}
              </div>
              <div className="dropzone-subtext">
                Audio, video, documents, and transcripts are automatically validated
              </div>

              <div className="supported-chips">
                <span className="chip">PDF / DOCX</span>
                <span className="chip">Audio (MP3, WAV)</span>
                <span className="chip">Video (MP4, WebM)</span>
                <span className="chip">Notes (TXT, MD)</span>
              </div>
            </div>

            {/* SELECTED FILE METADATA & TITLE INPUT */}
            {selectedFile && (
              <div className="upload-form">
                <div className="selected-file-banner">
                  <div className="file-meta-info">
                    <div className={`file-type-icon ${getFileCategory(selectedFile.type, selectedFile.name)}`}>
                      {renderFileIcon(getFileCategory(selectedFile.type, selectedFile.name))}
                    </div>
                    <div style={{ textAlign: "left" }}>
                      <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>{selectedFile.name}</div>
                      <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                        {formatBytes(selectedFile.size)} • {selectedFile.type || "Document"}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-icon"
                    onClick={() => {
                      setSelectedFile(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="input-group">
                  <label htmlFor="lectureTitle">Lecture / Topic Title</label>
                  <input
                    id="lectureTitle"
                    type="text"
                    className="input-control"
                    placeholder="e.g. Introduction to Quantum Computing - Lecture 1"
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    required
                  />
                </div>

                {uploading && (
                  <div className="progress-container">
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem" }}>
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="progress-track">
                      <div className="progress-bar" style={{ width: `${uploadProgress}%` }} />
                    </div>
                  </div>
                )}

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setSelectedFile(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    disabled={uploading}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={uploading}>
                    {uploading ? (
                      <>
                        <RefreshCw size={16} className="spin-animation" /> Uploading...
                      </>
                    ) : (
                      <>
                        <Upload size={16} /> Confirm & Upload
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </section>

        {/* LECTURES WORKSPACE (MODULE 1 REQUIREMENT) */}
        <section style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div className="section-header">
            <div className="section-title">
              <BookOpen size={22} color="var(--accent-secondary)" />
              <h2>Your Lecture Library</h2>
            </div>
            <button className="btn btn-secondary btn-icon" onClick={loadLectures} title="Refresh Library">
              <RefreshCw size={16} className={loadingLectures ? "spin-animation" : ""} />
            </button>
          </div>

          {/* SEARCH & FILTERS TOOLBAR */}
          <div className="toolbar">
            <div className="search-input-wrapper">
              <Search size={16} />
              <input
                type="text"
                className="input-control"
                placeholder="Search lectures by title or filename..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="filter-pills">
              {["all", "completed", "extracting", "transcribing", "failed", "uploaded"].map((st) => (
                <button
                  key={st}
                  className={`filter-btn ${filterStatus === st ? "active" : ""}`}
                  onClick={() => setFilterStatus(st)}
                >
                  {st.charAt(0).toUpperCase() + st.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* LECTURE CARDS GRID */}
          {filteredLectures.length > 0 ? (
            <div className="lectures-grid">
              {filteredLectures.map((lecture) => {
                const category = getFileCategory(lecture.file_type, lecture.original_filename);
                return (
                  <div
                    key={lecture.id}
                    className="lecture-card"
                    onClick={() => {
                      setSelectedLecture(lecture);
                      setModalTab("transcript");
                    }}
                  >
                    <div className="card-top">
                      <div className={`file-type-icon ${category}`}>
                        {renderFileIcon(category)}
                      </div>
                      <div className="card-header-text">
                        <div className="card-title" title={lecture.title}>
                          {lecture.title}
                        </div>
                        <div className="card-filename">{lecture.original_filename}</div>
                      </div>
                    </div>

                    <div>
                      <span className={`status-badge ${lecture.processing_status}`}>
                        {lecture.processing_status === "completed" && <CheckCircle2 size={12} />}
                        {lecture.processing_status === "extracting" && <RefreshCw size={12} className="spin-animation" />}
                        {lecture.processing_status === "transcribing" && <Activity size={12} className="pulse-animation" />}
                        {lecture.processing_status === "failed" && <AlertCircle size={12} />}
                        {lecture.processing_status === "uploaded" && <Clock size={12} />}
                        {lecture.processing_status}
                      </span>
                    </div>

                    <div className="card-meta-row">
                      <span>{formatBytes(lecture.file_size)}</span>
                      <span>{formatDate(lecture.upload_date)}</span>
                    </div>

                    <div className="card-actions">
                      <button
                        className="btn btn-secondary btn-icon"
                        title="View Processing & Transcript"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedLecture(lecture);
                          setModalTab("transcript");
                        }}
                      >
                        <FileText size={16} />
                      </button>
                      <a
                        href={lecturesAPI.downloadFileUrl(lecture.id)}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-secondary btn-icon"
                        title="Download Source File"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Download size={16} />
                      </a>
                      <button
                        className="btn btn-danger btn-icon"
                        title="Delete Lecture"
                        onClick={(e) => handleDeleteLecture(lecture.id, e)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">
                <BookOpen size={36} />
              </div>
              <h3 style={{ fontSize: "1.25rem" }}>
                {searchQuery || filterStatus !== "all"
                  ? "No matching lectures found"
                  : "No lectures uploaded yet"}
              </h3>
              <p style={{ color: "var(--text-muted)", maxWidth: "400px" }}>
                {searchQuery || filterStatus !== "all"
                  ? "Try adjusting your search query or filter tags."
                  : "Upload your first PDF, audio, or video lecture above to get started."}
              </p>
            </div>
          )}
        </section>
      </main>

      {/* MODULE 2: PROCESSING STATUS & TRANSCRIPT MODAL */}
      {selectedLecture && (
        <div className="modal-overlay" onClick={() => setSelectedLecture(null)}>
          <div className="modal-content transcript-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedLecture(null)} title="Close">
              <X size={20} />
            </button>

            {/* Header */}
            <div className="modal-header-section">
              <div className="modal-header-info">
                <div className={`file-type-icon ${getFileCategory(selectedLecture.file_type, selectedLecture.original_filename)}`}>
                  {renderFileIcon(getFileCategory(selectedLecture.file_type, selectedLecture.original_filename))}
                </div>
                <div className="modal-title-wrap">
                  <h3>{selectedLecture.title}</h3>
                  <div className="subtitle">
                    {selectedLecture.original_filename} • {formatBytes(selectedLecture.file_size)} • {formatDate(selectedLecture.upload_date)}
                  </div>
                </div>
              </div>
              <span className={`status-badge ${selectedLecture.processing_status}`}>
                {selectedLecture.processing_status === "completed" && <CheckCircle2 size={12} />}
                {selectedLecture.processing_status === "extracting" && <RefreshCw size={12} className="spin-animation" />}
                {selectedLecture.processing_status === "transcribing" && <Activity size={12} className="pulse-animation" />}
                {selectedLecture.processing_status === "failed" && <AlertCircle size={12} />}
                {selectedLecture.processing_status === "uploaded" && <Clock size={12} />}
                {selectedLecture.processing_status}
              </span>
            </div>

            {/* Tab navigation */}
            <div className="tab-nav">
              <button
                type="button"
                className={`tab-nav-btn ${modalTab === "transcript" ? "active" : ""}`}
                onClick={() => setModalTab("transcript")}
              >
                Processing & Transcript
              </button>
              <button
                type="button"
                className={`tab-nav-btn ${modalTab === "details" ? "active" : ""}`}
                onClick={() => setModalTab("details")}
              >
                File Details
              </button>
            </div>

            {/* TAB 1: PROCESSING & TRANSCRIPT */}
            {modalTab === "transcript" && (
              <>
                {/* 1. Stepper Card */}
                {(() => {
                  const cat = getFileCategory(selectedLecture.file_type, selectedLecture.original_filename);
                  let steps = [];
                  if (cat === "video") {
                    steps = [
                      { key: "uploaded", label: "Uploaded" },
                      { key: "extracting", label: "Extract Audio" },
                      { key: "transcribing", label: "Transcribing" },
                      { key: "completed", label: "Completed" },
                    ];
                  } else if (cat === "audio") {
                    steps = [
                      { key: "uploaded", label: "Uploaded" },
                      { key: "transcribing", label: "Transcribing" },
                      { key: "completed", label: "Completed" },
                    ];
                  } else {
                    steps = [
                      { key: "uploaded", label: "Uploaded" },
                      { key: "extracting", label: "Extracting" },
                      { key: "completed", label: "Completed" },
                    ];
                  }

                  const currentStatus = selectedLecture.processing_status;
                  const isFailed = currentStatus === "failed";
                  const stepKeys = steps.map((s) => s.key);
                  let currentIndex = stepKeys.indexOf(currentStatus);
                  if (isFailed) {
                    currentIndex = 1;
                  } else if (currentStatus === "completed") {
                    currentIndex = steps.length - 1;
                  } else if (currentIndex === -1) {
                    currentIndex = 0;
                  }

                  const progressPercent = (currentIndex / (steps.length - 1)) * 100;

                  return (
                    <div className="stepper-card">
                      <div className="stepper-flow">
                        <div className="step-line">
                          <div
                            className="step-line-progress"
                            style={{
                              width: `${progressPercent}%`,
                              background: isFailed ? "var(--danger)" : "var(--success)",
                            }}
                          />
                        </div>
                        {steps.map((st, idx) => {
                          let nodeClass = "step-node";
                          let circleContent = idx + 1;

                          if (currentStatus === "completed" || idx < currentIndex) {
                            nodeClass += " completed";
                            circleContent = <Check size={16} />;
                          } else if (st.key === currentStatus) {
                            nodeClass += " active";
                            circleContent = <RefreshCw size={16} className="spin-animation" />;
                          } else if (isFailed && idx === currentIndex) {
                            nodeClass += " failed";
                            circleContent = <AlertCircle size={16} />;
                          }

                          return (
                            <div key={st.key} className={nodeClass}>
                              <div className="step-circle">{circleContent}</div>
                              <span className="step-label">{st.label}</span>
                            </div>
                          );
                        })}
                      </div>

                      <div className="live-status-card">
                        <div className="live-status-left">
                          <span
                            className={`live-status-dot ${["extracting", "transcribing"].includes(currentStatus) ? "active" : ""}`}
                            style={{
                              background:
                                currentStatus === "completed"
                                  ? "var(--success)"
                                  : currentStatus === "failed"
                                  ? "var(--danger)"
                                  : "var(--warning)",
                            }}
                          />
                          <span style={{ fontWeight: 600 }}>
                            {selectedLecture.status_message ||
                              (currentStatus === "completed"
                                ? "Content processed and saved to database"
                                : currentStatus === "failed"
                                ? "Processing failed"
                                : "Queued for processing...")}
                          </span>
                        </div>
                        {["uploaded", "extracting", "transcribing"].includes(currentStatus) && (
                          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.78rem", color: "var(--text-muted)" }}>
                            <RefreshCw size={12} className="spin-animation" />
                            <span>Live sync</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })()}

                {/* 2. Failure State */}
                {selectedLecture.processing_status === "failed" && (
                  <div className="failure-box">
                    <div className="failure-header">
                      <AlertCircle size={18} />
                      <span>Processing Failure</span>
                    </div>
                    <div className="failure-message">
                      {selectedLecture.error_message || transcriptError || "An error occurred during extraction or transcription."}
                    </div>
                    {(selectedLecture.error_message?.includes("HF_TOKEN") ||
                      transcriptError?.includes("HF_TOKEN") ||
                      selectedLecture.error_message?.includes("Hugging Face")) && (
                      <p style={{ fontSize: "0.82rem", color: "var(--accent-cream)", marginTop: "0.25rem" }}>
                        💡 <strong>Hugging Face Token Required:</strong> Audio and video transcription use OpenAI Whisper hosted inference. Add <code>HF_TOKEN=hf_...</code> to your <code>.env</code> file, then click Retry below.
                      </p>
                    )}
                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "0.5rem" }}>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => handleRetryProcessing(selectedLecture.id)}
                        disabled={retrying}
                      >
                        <RotateCcw size={14} className={retrying ? "spin-animation" : ""} />
                        {retrying ? "Retrying..." : "Retry Processing"}
                      </button>
                    </div>
                  </div>
                )}

                {/* 3. In Progress Spinner */}
                {["uploaded", "extracting", "transcribing"].includes(selectedLecture.processing_status) && (
                  <div style={{ padding: "2.5rem 1rem", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.85rem" }}>
                    <RefreshCw size={32} className="spin-animation" color="var(--accent-sage-light)" />
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem" }}>
                      {selectedLecture.processing_status === "transcribing"
                        ? "Hugging Face Whisper model is transcribing speech..."
                        : "Extracting readable content from document..."}
                    </p>
                  </div>
                )}

                {/* 4. Transcript Content Viewer */}
                {selectedLecture.processing_status === "completed" && (
                  <>
                    {loadingTranscript ? (
                      <div style={{ padding: "2.5rem 1rem", textAlign: "center" }}>
                        <RefreshCw size={28} className="spin-animation" color="var(--accent-cream)" />
                        <p style={{ color: "var(--text-muted)", marginTop: "0.75rem" }}>Loading transcript...</p>
                      </div>
                    ) : transcriptData ? (
                      <div className="transcript-container">
                        {/* Toolbar */}
                        <div className="transcript-toolbar">
                          <div className="transcript-stats-pills">
                            <span className="stat-pill">
                              <FileCheck size={13} />
                              <strong>{transcriptData.word_count || 0}</strong> words
                            </span>
                            <span className="stat-pill">
                              <strong>{transcriptData.character_count || 0}</strong> chars
                            </span>
                            <span className="stat-pill">
                              Source:{" "}
                              <strong>{transcriptData.source_type === "audio" ? "Whisper Transcription" : "Document Extraction"}</strong>
                            </span>
                            {transcriptData.metadata?.extractor && (
                              <span className="stat-pill">
                                Engine: <strong>{transcriptData.metadata.extractor}</strong>
                              </span>
                            )}
                            {transcriptData.metadata?.total_pages && (
                              <span className="stat-pill">
                                Pages: <strong>{transcriptData.metadata.total_pages}</strong>
                              </span>
                            )}
                          </div>

                          <div className="transcript-actions">
                            <div className="transcript-search-wrap">
                              <Search size={14} />
                              <input
                                type="text"
                                className="input-control"
                                placeholder="Search in transcript..."
                                value={transcriptSearch}
                                onChange={(e) => setTranscriptSearch(e.target.value)}
                              />
                            </div>
                            <button
                              type="button"
                              className="btn btn-secondary"
                              onClick={handleCopyTranscript}
                              title="Copy to clipboard"
                            >
                              {copiedTranscript ? (
                                <>
                                  <Check size={14} color="#a7f3d0" /> Copied!
                                </>
                              ) : (
                                <>
                                  <Copy size={14} /> Copy
                                </>
                              )}
                            </button>
                            <button
                              type="button"
                              className="btn btn-secondary"
                              onClick={handleDownloadTranscript}
                              title="Download as text file"
                            >
                              <Download size={14} /> Export .txt
                            </button>
                          </div>
                        </div>

                        {/* Scroll Canvas */}
                        <div className="transcript-scroll-canvas">
                          {(() => {
                            const paragraphs = transcriptData.text.split("\n\n").filter((p) => p.trim());
                            const searchLower = transcriptSearch.trim().toLowerCase();

                            if (paragraphs.length === 0) {
                              return <p style={{ color: "var(--text-muted)" }}>[No text available in transcript]</p>;
                            }

                            return paragraphs.map((para, idx) => {
                              if (!searchLower) {
                                return <p key={idx}>{para}</p>;
                              }
                              const regex = new RegExp(`(${searchLower.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
                              const parts = para.split(regex);
                              return (
                                <p key={idx}>
                                  {parts.map((part, pIdx) =>
                                    part.toLowerCase() === searchLower ? (
                                      <mark key={pIdx} className="search-highlight">
                                        {part}
                                      </mark>
                                    ) : (
                                      part
                                    )
                                  )}
                                </p>
                              );
                            });
                          })()}
                        </div>
                      </div>
                    ) : (
                      <div style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)" }}>
                        {transcriptError || "Transcript record could not be loaded."}
                      </div>
                    )}
                  </>
                )}
              </>
            )}

            {/* TAB 2: FILE DETAILS */}
            {modalTab === "details" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginTop: "0.5rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", fontSize: "0.9rem", textAlign: "left" }}>
                  <div className="user-badge" style={{ justifyContent: "space-between" }}>
                    <span style={{ color: "var(--text-muted)" }}>Filename</span>
                    <span style={{ fontWeight: 600 }}>{selectedLecture.original_filename}</span>
                  </div>
                  <div className="user-badge" style={{ justifyContent: "space-between" }}>
                    <span style={{ color: "var(--text-muted)" }}>File Size</span>
                    <span>{formatBytes(selectedLecture.file_size)}</span>
                  </div>
                  <div className="user-badge" style={{ justifyContent: "space-between" }}>
                    <span style={{ color: "var(--text-muted)" }}>File Type</span>
                    <span>{selectedLecture.file_type}</span>
                  </div>
                  <div className="user-badge" style={{ justifyContent: "space-between" }}>
                    <span style={{ color: "var(--text-muted)" }}>Upload Date</span>
                    <span>{formatDate(selectedLecture.upload_date)}</span>
                  </div>
                  <div className="user-badge" style={{ justifyContent: "space-between" }}>
                    <span style={{ color: "var(--text-muted)" }}>Lecture ID</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem" }}>{selectedLecture.id}</span>
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1rem" }}>
                  <a
                    href={lecturesAPI.downloadFileUrl(selectedLecture.id)}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary"
                  >
                    <Download size={16} /> Download Source File
                  </a>
                  <button
                    className="btn btn-danger"
                    onClick={(e) => {
                      handleDeleteLecture(selectedLecture.id, e);
                    }}
                  >
                    <Trash2 size={16} /> Delete Lecture
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* AUTHENTICATION MODAL */}
      {authModalOpen && (
        <div className="modal-overlay" onClick={() => token && setAuthModalOpen(false)}>
          <div className="modal-content auth-modal" onClick={(e) => e.stopPropagation()}>
            {token && (
              <button className="modal-close" onClick={() => setAuthModalOpen(false)}>
                <X size={18} />
              </button>
            )}

            <div className="auth-header">
              <div className="auth-icon-badge">
                <Sparkles size={18} />
              </div>
              <h2 className="auth-title">
                {authMode === "login" ? "Welcome Back" : "Create Account"}
              </h2>
              <p className="auth-subtitle">
                {authMode === "login"
                  ? "Sign in to access your lecture workspace & summaries"
                  : "Join as a student or educator to summarize lectures"}
              </p>
            </div>

            <div className="auth-tabs">
              <button
                type="button"
                className={`auth-tab ${authMode === "login" ? "active" : ""}`}
                onClick={() => {
                  setAuthMode("login");
                  setAuthError("");
                }}
              >
                Sign In
              </button>
              <button
                type="button"
                className={`auth-tab ${authMode === "register" ? "active" : ""}`}
                onClick={() => {
                  setAuthMode("register");
                  setAuthError("");
                }}
              >
                Register
              </button>
            </div>

            {authError && (
              <div className="alert-banner alert-danger">
                <AlertCircle size={16} />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleAuthSubmit} className="auth-form">
              {authMode === "register" && (
                <>
                  <div className="input-group">
                    <label htmlFor="regName">Full Name</label>
                    <input
                      id="regName"
                      type="text"
                      className="input-control"
                      placeholder="e.g. John Doe"
                      value={authFormData.name}
                      onChange={(e) => setAuthFormData({ ...authFormData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="input-group">
                    <label>Account Role</label>
                    <div className="role-selector-group">
                      <button
                        type="button"
                        className={`role-btn ${authFormData.role === "student" ? "active" : ""}`}
                        onClick={() => setAuthFormData({ ...authFormData, role: "student" })}
                      >
                        <GraduationCap size={16} />
                        <span>Student</span>
                      </button>
                      <button
                        type="button"
                        className={`role-btn ${authFormData.role === "educator" ? "active" : ""}`}
                        onClick={() => setAuthFormData({ ...authFormData, role: "educator" })}
                      >
                        <BookOpen size={16} />
                        <span>Educator</span>
                      </button>
                    </div>
                  </div>
                </>
              )}

              <div className="input-group">
                <label htmlFor="authEmail">Email Address</label>
                <input
                  id="authEmail"
                  type="email"
                  className="input-control"
                  placeholder="you@example.com"
                  value={authFormData.email}
                  onChange={(e) => setAuthFormData({ ...authFormData, email: e.target.value })}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="authPassword">Password</label>
                <input
                  id="authPassword"
                  type="password"
                  className="input-control"
                  placeholder="••••••••"
                  minLength={6}
                  value={authFormData.password}
                  onChange={(e) => setAuthFormData({ ...authFormData, password: e.target.value })}
                  required
                />
              </div>

              <div className="submit-btn-wrapper">
                <button
                  type="submit"
                  className="btn btn-primary auth-submit-btn"
                  disabled={authLoading}
                >
                  {authLoading ? (
                    <>
                      <RefreshCw size={16} className="spin-animation" /> Processing...
                    </>
                  ) : authMode === "login" ? (
                    <>
                      <UserIcon size={16} /> Sign In
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={16} /> Create Account
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
