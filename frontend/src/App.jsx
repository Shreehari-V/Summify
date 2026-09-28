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

      showAlert("success", `Lecture "${res.data.title}" uploaded successfully!`);
      setSelectedFile(null);
      setUploadTitle("");
      setUploadProgress(0);
      if (fileInputRef.current) fileInputRef.current.value = "";
      loadLectures();
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
              {["all", "uploaded", "processing", "completed"].map((st) => (
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
                    onClick={() => setSelectedLecture(lecture)}
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
                        {lecture.processing_status === "completed" ? (
                          <CheckCircle2 size={12} />
                        ) : (
                          <Clock size={12} />
                        )}
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
                        title="View Details"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedLecture(lecture);
                        }}
                      >
                        <Eye size={16} />
                      </button>
                      <a
                        href={lecturesAPI.downloadFileUrl(lecture.id)}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-secondary btn-icon"
                        title="Download File"
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

      {/* LECTURE DETAIL MODAL */}
      {selectedLecture && (
        <div className="modal-overlay" onClick={() => setSelectedLecture(null)}>
          <div className="modal-content lecture-detail-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedLecture(null)}>
              <X size={20} />
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <div className={`file-type-icon ${getFileCategory(selectedLecture.file_type, selectedLecture.original_filename)}`}>
                {renderFileIcon(getFileCategory(selectedLecture.file_type, selectedLecture.original_filename))}
              </div>
              <div>
                <h3 style={{ fontSize: "1.25rem" }}>{selectedLecture.title}</h3>
                <span className={`status-badge ${selectedLecture.processing_status}`} style={{ marginTop: "0.25rem" }}>
                  {selectedLecture.processing_status}
                </span>
              </div>
            </div>

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

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1.75rem" }}>
              <a
                href={lecturesAPI.downloadFileUrl(selectedLecture.id)}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                <Download size={16} /> Download Source
              </a>
              <button
                className="btn btn-danger"
                onClick={(e) => {
                  handleDeleteLecture(selectedLecture.id, e);
                }}
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
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
