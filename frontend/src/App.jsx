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
  Layers,
  Tag,
  ChevronLeft,
  ChevronRight,
  List,
  Shield,
  Users,
  Share2,
  Edit3,
  Plus,
  Lock,
  UserCheck,
  UserX,
  ExternalLink,
  Save,
} from "lucide-react";
import { authAPI, lecturesAPI, healthAPI, adminAPI } from "./api";
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

  // Modal & Pipeline Navigation
  const [modalTab, setModalTab] = useState("summary"); // 'summary' | 'keywords' | 'flashcards' | 'transcript' | 'details'
  const [retrying, setRetrying] = useState(false);

  // Module 2: Transcript State
  const [transcriptData, setTranscriptData] = useState(null);
  const [loadingTranscript, setLoadingTranscript] = useState(false);
  const [transcriptError, setTranscriptError] = useState("");
  const [transcriptSearch, setTranscriptSearch] = useState("");
  const [copiedTranscript, setCopiedTranscript] = useState(false);

  // Module 3: Summary State
  const [summaryData, setSummaryData] = useState(null);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [summaryError, setSummaryError] = useState("");
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Module 3: Keywords & Concepts State
  const [keywordsData, setKeywordsData] = useState(null);
  const [loadingKeywords, setLoadingKeywords] = useState(false);
  const [keywordsError, setKeywordsError] = useState("");
  const [keywordSearch, setKeywordSearch] = useState("");

  // Module 3: Flashcards State
  const [flashcardsData, setFlashcardsData] = useState(null);
  const [loadingFlashcards, setLoadingFlashcards] = useState(false);
  const [flashcardsError, setFlashcardsError] = useState("");
  const [regeneratingCards, setRegeneratingCards] = useState(false);
  const [flashcardCountSelect, setFlashcardCountSelect] = useState(10);
  const [flashcardViewMode, setFlashcardViewMode] = useState("carousel"); // 'carousel' | 'list'
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  // Module 4: Educator Flashcard Review/Edit State
  const [isEditingDeck, setIsEditingDeck] = useState(false);
  const [editableCards, setEditableCards] = useState([]);
  const [savingDeck, setSavingDeck] = useState(false);

  // Module 4: Share Deck State
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareInfo, setShareInfo] = useState(null);
  const [sharingLoading, setSharingLoading] = useState(false);
  const [copiedShareLink, setCopiedShareLink] = useState(false);

  // Module 4: Admin Console State
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [adminStats, setAdminStats] = useState(null);
  const [adminUsers, setAdminUsers] = useState([]);
  const [loadingAdmin, setLoadingAdmin] = useState(false);
  const [adminUserSearch, setAdminUserSearch] = useState("");
  const [adminRoleFilter, setAdminRoleFilter] = useState("all");
  const [adminStatusFilter, setAdminStatusFilter] = useState("all");
  const [createUserModalOpen, setCreateUserModalOpen] = useState(false);
  const [newUserData, setNewUserData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const [adminActionLoading, setAdminActionLoading] = useState(false);
  const [adminNotice, setAdminNotice] = useState("");

  // Module 4: Public Shared View State (?shared=...)
  const [sharedParam, setSharedParam] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("shared") || null;
  });
  const [sharedDeck, setSharedDeck] = useState(null);
  const [loadingSharedDeck, setLoadingSharedDeck] = useState(false);
  const [sharedDeckError, setSharedDeckError] = useState("");

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

  // Poll status & fetch all artifacts when a lecture is selected
  useEffect(() => {
    if (!selectedLecture) {
      setTranscriptData(null);
      setTranscriptError("");
      setTranscriptSearch("");
      setCopiedTranscript(false);

      setSummaryData(null);
      setSummaryError("");
      setCopiedSummary(false);

      setKeywordsData(null);
      setKeywordsError("");
      setKeywordSearch("");

      setFlashcardsData(null);
      setFlashcardsError("");
      setCurrentCardIndex(0);
      setIsCardFlipped(false);
      return;
    }

    let isMounted = true;
    let pollTimer = null;

    const fetchAllArtifacts = async (lectureId) => {
      // 1. Fetch Summary
      try {
        setLoadingSummary(true);
        setSummaryError("");
        const res = await lecturesAPI.getSummary(lectureId);
        if (isMounted) setSummaryData(res.data);
      } catch (err) {
        if (isMounted) {
          const detail = err.response?.data?.detail || "Summary not ready yet.";
          setSummaryError(typeof detail === "string" ? detail : JSON.stringify(detail));
        }
      } finally {
        if (isMounted) setLoadingSummary(false);
      }

      // 2. Fetch Keywords
      try {
        setLoadingKeywords(true);
        setKeywordsError("");
        const res = await lecturesAPI.getKeywords(lectureId);
        if (isMounted) setKeywordsData(res.data);
      } catch (err) {
        if (isMounted) {
          const detail = err.response?.data?.detail || "Keywords not ready yet.";
          setKeywordsError(typeof detail === "string" ? detail : JSON.stringify(detail));
        }
      } finally {
        if (isMounted) setLoadingKeywords(false);
      }

      // 3. Fetch Flashcards
      try {
        setLoadingFlashcards(true);
        setFlashcardsError("");
        const res = await lecturesAPI.getFlashcards(lectureId);
        if (isMounted) {
          setFlashcardsData(res.data);
          setCurrentCardIndex(0);
          setIsCardFlipped(false);
        }
      } catch (err) {
        if (isMounted) {
          const detail = err.response?.data?.detail || "Flashcards not ready yet.";
          setFlashcardsError(typeof detail === "string" ? detail : JSON.stringify(detail));
        }
      } finally {
        if (isMounted) setLoadingFlashcards(false);
      }

      // 4. Fetch Transcript
      try {
        setLoadingTranscript(true);
        setTranscriptError("");
        const res = await lecturesAPI.getTranscript(lectureId);
        if (isMounted) setTranscriptData(res.data);
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
          fetchAllArtifacts(selectedLecture.id);
        } else if (res.data.processing_status === "failed") {
          setTranscriptError(res.data.error_message || "Processing failed.");
        } else {
          pollTimer = setTimeout(pollStatus, 1600);
        }
      } catch (err) {
        console.error("Status polling error:", err);
      }
    };

    if (selectedLecture.processing_status === "completed") {
      fetchAllArtifacts(selectedLecture.id);
    } else if (
      [
        "uploaded",
        "extracting",
        "transcribing",
        "summarizing",
        "extracting_keywords",
        "generating_flashcards",
      ].includes(selectedLecture.processing_status)
    ) {
      pollStatus();
    } else if (selectedLecture.processing_status === "failed") {
      setTranscriptError(selectedLecture.error_message || "Processing failed.");
    }

    return () => {
      isMounted = false;
      if (pollTimer) clearTimeout(pollTimer);
    };
  }, [selectedLecture?.id, selectedLecture?.processing_status]);

  // Flashcards keyboard navigation (Arrows & Space)
  useEffect(() => {
    if (!selectedLecture || modalTab !== "flashcards" || flashcardViewMode !== "carousel") {
      return;
    }
    const cards = flashcardsData?.cards || [];
    if (cards.length === 0) return;

    const handleKeyDown = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.tagName === "SELECT") {
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setIsCardFlipped(false);
        setCurrentCardIndex((prev) => (prev + 1 < cards.length ? prev + 1 : 0));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setIsCardFlipped(false);
        setCurrentCardIndex((prev) => (prev - 1 >= 0 ? prev - 1 : cards.length - 1));
      } else if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        setIsCardFlipped((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedLecture, modalTab, flashcardViewMode, flashcardsData]);

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

  const handleCopySummary = () => {
    if (!summaryData?.summary_text) return;
    navigator.clipboard.writeText(summaryData.summary_text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2200);
  };

  const handleDownloadSummary = () => {
    if (!summaryData?.summary_text || !selectedLecture) return;
    const content = `SUMMIFY LECTURE SUMMARY
Lecture: ${selectedLecture.title}
Date: ${new Date(summaryData.created_at).toLocaleDateString()}
Model: ${summaryData.model}

SUMMARY:
${summaryData.summary_text}

${
  summaryData.key_points && summaryData.key_points.length > 0
    ? `\nKEY HIGHLIGHTS:\n${summaryData.key_points.map((p, i) => `${i + 1}. ${p}`).join("\n")}`
    : ""
}
`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const safeTitle = selectedLecture.title.replace(/[^a-zA-Z0-9_-]/g, "_");
    link.href = url;
    link.download = `${safeTitle}_summary.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleRegenerateFlashcards = async () => {
    if (!selectedLecture) return;
    try {
      setRegeneratingCards(true);
      const countToGen = Number(flashcardCountSelect) || 10;
      const res = await lecturesAPI.generateFlashcards(selectedLecture.id, countToGen);
      setFlashcardsData(res.data);
      setCurrentCardIndex(0);
      setIsCardFlipped(false);
      const totalCount = res.data.total_cards || res.data.cards?.length || countToGen;
      showAlert("success", `Generated ${totalCount} flashcards!`);
    } catch (err) {
      const msg =
        err.response?.data?.detail ||
        (err.message?.includes("timeout")
          ? "Generation timed out on the client. Please try again."
          : "Failed to generate flashcards.");
      showAlert("danger", typeof msg === "string" ? msg : JSON.stringify(msg));
    } finally {
      setRegeneratingCards(false);
    }
  };

  // Module 4: Educator Flashcard Review & Edit Handlers
  const handleStartEditDeck = () => {
    if (!flashcardsData?.cards) return;
    setEditableCards(JSON.parse(JSON.stringify(flashcardsData.cards)));
    setIsEditingDeck(true);
  };

  const handleCancelEditDeck = () => {
    setIsEditingDeck(false);
    setEditableCards([]);
  };

  const handleCardFieldChange = (index, field, value) => {
    setEditableCards((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleAddCard = () => {
    setEditableCards((prev) => [
      ...prev,
      {
        id: `custom-${Date.now()}`,
        question: "",
        answer: "",
        category: "Key Concept",
      },
    ]);
  };

  const handleDeleteCard = (index) => {
    setEditableCards((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveDeck = async () => {
    if (!selectedLecture) return;
    const validCards = editableCards.filter(
      (c) => c.question.trim().length > 0 && c.answer.trim().length > 0
    );
    if (validCards.length === 0) {
      showAlert("danger", "Deck must contain at least one question and answer.");
      return;
    }
    setSavingDeck(true);
    try {
      const res = await lecturesAPI.updateFlashcards(selectedLecture.id, validCards);
      setFlashcardsData(res.data);
      setIsEditingDeck(false);
      showAlert("success", "Flashcard deck updated and saved successfully!");
    } catch (err) {
      console.error("Save deck failed:", err);
      showAlert("danger", err.response?.data?.detail || "Failed to save flashcard deck.");
    } finally {
      setSavingDeck(false);
    }
  };

  // Module 4: Flashcard Share Handlers
  const handleOpenShareModal = async () => {
    if (!selectedLecture) return;
    setSharingLoading(true);
    try {
      const res = await lecturesAPI.shareFlashcards(selectedLecture.id);
      setShareInfo(res.data);
      setShareModalOpen(true);
      setCopiedShareLink(false);
    } catch (err) {
      console.error("Share failed:", err);
      showAlert("danger", err.response?.data?.detail || "Failed to generate share link.");
    } finally {
      setSharingLoading(false);
    }
  };

  const handleCopyShareLink = () => {
    if (!shareInfo) return;
    const url = `${window.location.origin}/?shared=${shareInfo.share_id}`;
    navigator.clipboard.writeText(url);
    setCopiedShareLink(true);
    setTimeout(() => setCopiedShareLink(false), 2500);
  };

  // Module 4: Admin Console Handlers
  const fetchAdminData = async () => {
    if (!token || user?.role !== "admin") return;
    setLoadingAdmin(true);
    setAdminNotice("");
    try {
      const [statsRes, usersRes] = await Promise.all([
        adminAPI.getStats(),
        adminAPI.getUsers({
          role: adminRoleFilter !== "all" ? adminRoleFilter : undefined,
          is_active:
            adminStatusFilter === "active"
              ? true
              : adminStatusFilter === "deactivated"
              ? false
              : undefined,
          search: adminUserSearch.trim() || undefined,
        }),
      ]);
      setAdminStats(statsRes?.data || null);
      setAdminUsers(Array.isArray(usersRes?.data) ? usersRes.data : []);
    } catch (err) {
      console.error("Failed to load admin console data:", err);
      setAdminNotice(err.response?.data?.detail || "Failed to load admin data");
    } finally {
      setLoadingAdmin(false);
    }
  };

  useEffect(() => {
    if (adminModalOpen && user?.role === "admin") {
      fetchAdminData();
    }
  }, [adminModalOpen, adminRoleFilter, adminStatusFilter, adminUserSearch]);

  const handleToggleUserStatus = async (targetUser) => {
    if (!targetUser) return;
    const isSelf = Boolean(user && (targetUser.id === user.id || targetUser.id === user.user_id));
    if (isSelf) {
      setAdminNotice("You cannot deactivate your own administrative account.");
      return;
    }
    setAdminActionLoading(true);
    try {
      const res = await adminAPI.toggleUserStatus(targetUser.id);
      const isNowActive = res?.data?.is_active ?? !targetUser.is_active;
      setAdminNotice(`Account status for ${targetUser.name || targetUser.email} updated to ${isNowActive ? "Active" : "Deactivated"}.`);
      await fetchAdminData();
    } catch (err) {
      setAdminNotice(err.response?.data?.detail || "Failed to update user status");
    } finally {
      setAdminActionLoading(false);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (!newUserData.email || !newUserData.password) return;
    setAdminActionLoading(true);
    try {
      await adminAPI.createUser(newUserData);
      setCreateUserModalOpen(false);
      setNewUserData({ name: "", email: "", password: "", role: "student" });
      setAdminNotice("User account created successfully.");
      await fetchAdminData();
    } catch (err) {
      setAdminNotice(err.response?.data?.detail || "Failed to create user");
    } finally {
      setAdminActionLoading(false);
    }
  };

  const handleUpdateUserRole = async (userId, newRole) => {
    setAdminActionLoading(true);
    try {
      await adminAPI.updateUser(userId, { role: newRole });
      setAdminNotice("User role updated successfully.");
      await fetchAdminData();
    } catch (err) {
      setAdminNotice(err.response?.data?.detail || "Failed to update user role");
    } finally {
      setAdminActionLoading(false);
    }
  };

  // Module 4: Fetch Shared Deck if sharedParam present
  useEffect(() => {
    if (sharedParam) {
      setLoadingSharedDeck(true);
      lecturesAPI
        .getSharedFlashcards(sharedParam)
        .then((res) => {
          setSharedDeck(res.data);
        })
        .catch((err) => {
          console.error("Failed to load shared flashcards:", err);
          setSharedDeckError(
            err.response?.data?.detail || "Shared study deck not found or link has expired."
          );
        })
        .finally(() => {
          setLoadingSharedDeck(false);
        });
    }
  }, [sharedParam]);

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

  if (sharedParam) {
    return (
      <div className="app-container">
        <nav className="navbar">
          <div
            className="brand-container"
            onClick={() => {
              window.location.href = window.location.pathname;
            }}
          >
            <div className="brand-icon-wrapper">
              <Sparkles size={20} />
            </div>
            <span>Summify</span>
            <span
              style={{
                fontSize: "0.75rem",
                padding: "0.2rem 0.6rem",
                borderRadius: "var(--radius-full)",
                background: "var(--accent-primary)",
                color: "var(--accent-cream)",
                marginLeft: "0.5rem",
                fontWeight: 700,
              }}
            >
              Public Study Set
            </span>
          </div>
          <div className="nav-actions">
            <button
              className="btn btn-secondary"
              onClick={() => {
                window.location.href = window.location.pathname;
              }}
            >
              Return to Workspace
            </button>
          </div>
        </nav>

        <main className="main-content" style={{ maxWidth: 860, margin: "2rem auto", width: "100%" }}>
          {loadingSharedDeck ? (
            <div style={{ textAlign: "center", padding: "4rem 1rem" }}>
              <RefreshCw size={32} className="spin-animation" color="var(--accent-cream)" />
              <p style={{ marginTop: "1rem", color: "var(--text-muted)" }}>Loading shared study set...</p>
            </div>
          ) : sharedDeckError ? (
            <div className="alert-banner alert-danger" style={{ textAlign: "center", padding: "2rem" }}>
              <AlertCircle size={24} style={{ marginBottom: "0.5rem" }} />
              <h3>{sharedDeckError}</h3>
              <p style={{ marginTop: "0.5rem", fontSize: "0.9rem" }}>Please verify the link with your educator.</p>
            </div>
          ) : sharedDeck && sharedDeck.cards && sharedDeck.cards.length > 0 ? (
            <div className="shared-deck-card">
              <div className="shared-deck-header">
                <div>
                  <div className="flashcard-category-badge" style={{ marginBottom: "0.5rem" }}>
                    Shared Flashcards
                  </div>
                  <h2 style={{ color: "var(--accent-cream)", margin: "0.25rem 0" }}>{sharedDeck.lecture_title}</h2>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: 0 }}>
                    {sharedDeck.total_cards} Flashcards &bull; Interactive Study Mode
                  </p>
                </div>
                <div className="view-mode-toggles">
                  <button
                    type="button"
                    className={`view-mode-btn ${flashcardViewMode === "carousel" ? "active" : ""}`}
                    onClick={() => {
                      setFlashcardViewMode("carousel");
                      setIsCardFlipped(false);
                    }}
                  >
                    <Layers size={13} /> <span>Study Mode</span>
                  </button>
                  <button
                    type="button"
                    className={`view-mode-btn ${flashcardViewMode === "list" ? "active" : ""}`}
                    onClick={() => setFlashcardViewMode("list")}
                  >
                    <List size={13} /> <span>All Cards ({sharedDeck.cards.length})</span>
                  </button>
                </div>
              </div>

              {flashcardViewMode === "carousel" ? (
                <div className="flashcard-carousel-stage">
                  <div className="flashcard-progress-bar-wrap">
                    <span>
                      Card {currentCardIndex + 1} of {sharedDeck.cards.length}
                    </span>
                    <div className="flashcard-progress-track">
                      <div
                        className="flashcard-progress-fill"
                        style={{
                          width: `${((currentCardIndex + 1) / sharedDeck.cards.length) * 100}%`,
                        }}
                      />
                    </div>
                    <span>{Math.round(((currentCardIndex + 1) / sharedDeck.cards.length) * 100)}%</span>
                  </div>

                  {(() => {
                    const card = sharedDeck.cards[currentCardIndex];
                    return (
                      <div
                        className="flashcard-perspective-box"
                        onClick={() => setIsCardFlipped((prev) => !prev)}
                        title="Click to flip card"
                      >
                        <div className={`flashcard-3d-card ${isCardFlipped ? "flipped" : ""}`}>
                          <div className="flashcard-face front">
                            <div className="flashcard-top-row">
                              <span className="flashcard-category-badge">{card?.category || "Concept"}</span>
                              <span className="flashcard-side-indicator">QUESTION</span>
                            </div>
                            <div className="flashcard-body-text">{card?.question}</div>
                            <div className="flashcard-footer-prompt">
                              <span className="flashcard-flip-cue">
                                <RotateCcw size={13} /> Click to reveal answer
                              </span>
                            </div>
                          </div>

                          <div className="flashcard-face back">
                            <div className="flashcard-top-row">
                              <span className="flashcard-category-badge">{card?.category || "Concept"}</span>
                              <span className="flashcard-side-indicator" style={{ color: "var(--accent-sage-light)" }}>
                                ANSWER
                              </span>
                            </div>
                            <div className="flashcard-body-text answer-text">{card?.answer}</div>
                            <div className="flashcard-footer-prompt">
                              <span className="flashcard-flip-cue">
                                <RotateCcw size={13} /> Click to flip back
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  <div className="flashcard-nav-controls">
                    <button
                      type="button"
                      className="flashcard-nav-btn"
                      onClick={() => {
                        setCurrentCardIndex((prev) => (prev > 0 ? prev - 1 : sharedDeck.cards.length - 1));
                        setIsCardFlipped(false);
                      }}
                      title="Previous card"
                    >
                      <ChevronLeft size={18} />
                      <span>Prev</span>
                    </button>

                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setIsCardFlipped((prev) => !prev)}
                      style={{ padding: "0.5rem 1.25rem", fontSize: "0.85rem" }}
                    >
                      <RotateCcw size={14} />
                      <span>Flip Card</span>
                    </button>

                    <button
                      type="button"
                      className="flashcard-nav-btn"
                      onClick={() => {
                        setCurrentCardIndex((prev) => (prev + 1 < sharedDeck.cards.length ? prev + 1 : 0));
                        setIsCardFlipped(false);
                      }}
                      title="Next card"
                    >
                      <span>Next</span>
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flashcards-list-view">
                  {sharedDeck.cards.map((card, idx) => (
                    <div key={card.id || idx} className="flashcard-list-item">
                      <div className="flashcard-list-header">
                        <span className="flashcard-number-tag">CARD #{idx + 1}</span>
                        <span className="flashcard-category-badge">{card.category || "Concept"}</span>
                      </div>
                      <div className="flashcard-list-qa">
                        <div className="flashcard-list-q">Q: {card.question}</div>
                        <div className="flashcard-list-a">A: {card.answer}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "3rem" }}>
              <p>No flashcards found in this study set.</p>
            </div>
          )}
        </main>
      </div>
    );
  }

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
              {user.role === "admin" && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setAdminModalOpen(true)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.45rem",
                    padding: "0.4rem 0.85rem",
                    fontSize: "0.85rem",
                  }}
                  title="Open Admin Management Console"
                >
                  <Shield size={14} color="var(--accent-cream)" />
                  <span>Admin Console</span>
                </button>
              )}
              <div className="user-badge">
                {user.role === "admin" ? (
                  <Shield size={14} color="var(--accent-cream)" />
                ) : user.role === "educator" ? (
                  <BookOpen size={14} />
                ) : (
                  <GraduationCap size={14} />
                )}
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
                      setModalTab(lecture.processing_status === "completed" ? "summary" : "transcript");
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

                    <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", flexWrap: "wrap" }}>
                      <span className={`status-badge ${lecture.processing_status}`}>
                        {lecture.processing_status === "completed" && <CheckCircle2 size={12} />}
                        {lecture.processing_status === "extracting" && <RefreshCw size={12} className="spin-animation" />}
                        {lecture.processing_status === "transcribing" && <Activity size={12} className="pulse-animation" />}
                        {lecture.processing_status === "summarizing" && <RefreshCw size={12} className="spin-animation" />}
                        {lecture.processing_status === "extracting_keywords" && <RefreshCw size={12} className="spin-animation" />}
                        {lecture.processing_status === "generating_flashcards" && <RefreshCw size={12} className="spin-animation" />}
                        {lecture.processing_status === "failed" && <AlertCircle size={12} />}
                        {lecture.processing_status === "uploaded" && <Clock size={12} />}
                        {lecture.processing_status.replace(/_/g, " ")}
                      </span>
                      {lecture.processing_status === "completed" && (
                        <span className="stat-pill" style={{ fontSize: "0.68rem", padding: "0.15rem 0.45rem" }}>
                          <Sparkles size={10} color="var(--accent-sage-light)" /> Summary & Cards
                        </span>
                      )}
                    </div>

                    <div className="card-meta-row">
                      <span>{formatBytes(lecture.file_size)}</span>
                      <span>{formatDate(lecture.upload_date)}</span>
                    </div>

                    <div className="card-actions">
                      <button
                        className="btn btn-secondary btn-icon"
                        title="View Summary & Materials"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedLecture(lecture);
                          setModalTab(lecture.processing_status === "completed" ? "summary" : "transcript");
                        }}
                      >
                        <Eye size={16} />
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

            {/* Stepper & Failure Alert (shown while processing or failed) */}
            {(() => {
              const currentStatus = selectedLecture.processing_status;
              const isFailed = currentStatus === "failed";
              const isProcessing = ["uploaded", "extracting", "transcribing", "summarizing", "extracting_keywords", "generating_flashcards"].includes(currentStatus);

              if (!isProcessing && !isFailed && modalTab !== "transcript") {
                return null;
              }

              const cat = getFileCategory(selectedLecture.file_type, selectedLecture.original_filename);
              const steps = [
                { key: "uploaded", label: "Uploaded" },
                { key: "extracting", label: cat === "audio" || cat === "video" ? "Transcribe" : "Extract" },
                { key: "summarizing", label: "Summarize" },
                { key: "extracting_keywords", label: "Keywords" },
                { key: "generating_flashcards", label: "Flashcards" },
                { key: "completed", label: "Completed" },
              ];

              const stepKeys = ["uploaded", "extracting", "summarizing", "extracting_keywords", "generating_flashcards", "completed"];
              let currentIndex = stepKeys.indexOf(currentStatus);
              if (currentStatus === "transcribing") currentIndex = 1;
              if (isFailed) currentIndex = Math.max(1, currentIndex);
              else if (currentStatus === "completed") currentIndex = steps.length - 1;
              else if (currentIndex === -1) currentIndex = 0;

              const progressPercent = (currentIndex / (steps.length - 1)) * 100;

              return (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", marginBottom: "0.5rem" }}>
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

                        const isStepActive =
                          st.key === currentStatus || (st.key === "extracting" && currentStatus === "transcribing");

                        if (currentStatus === "completed" || idx < currentIndex) {
                          nodeClass += " completed";
                          circleContent = <Check size={16} />;
                        } else if (isStepActive) {
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
                          className={`live-status-dot ${isProcessing ? "active" : ""}`}
                          style={{
                            background:
                              currentStatus === "completed"
                                ? "var(--success)"
                                : isFailed
                                ? "var(--danger)"
                                : "var(--warning)",
                          }}
                        />
                        <span style={{ fontWeight: 600 }}>
                          {selectedLecture.status_message ||
                            (currentStatus === "completed"
                              ? "All artifacts processed and stored in database."
                              : isFailed
                              ? "Processing failed"
                              : "Queued for processing...")}
                        </span>
                      </div>
                      {isProcessing && (
                        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.78rem", color: "var(--text-muted)" }}>
                          <RefreshCw size={12} className="spin-animation" />
                          <span>AI Pipeline Active</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {isFailed && (
                    <div className="failure-box">
                      <div className="failure-header">
                        <AlertCircle size={18} />
                        <span>Processing Failure</span>
                      </div>
                      <div className="failure-message">
                        {selectedLecture.error_message || transcriptError || "An error occurred during pipeline execution."}
                      </div>
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
                </div>
              );
            })()}

            {/* Tab navigation */}
            <div className="tab-nav">
              <button
                type="button"
                className={`tab-nav-btn ${modalTab === "summary" ? "active" : ""}`}
                onClick={() => setModalTab("summary")}
              >
                <Sparkles size={14} />
                <span>Summary</span>
              </button>
              <button
                type="button"
                className={`tab-nav-btn ${modalTab === "keywords" ? "active" : ""}`}
                onClick={() => setModalTab("keywords")}
              >
                <Tag size={14} />
                <span>Key Concepts</span>
                {keywordsData?.keywords?.length > 0 && (
                  <span className="tab-count-badge">{keywordsData.keywords.length}</span>
                )}
              </button>
              <button
                type="button"
                className={`tab-nav-btn ${modalTab === "flashcards" ? "active" : ""}`}
                onClick={() => setModalTab("flashcards")}
              >
                <Layers size={14} />
                <span>Flashcards</span>
                {flashcardsData?.cards?.length > 0 && (
                  <span className="tab-count-badge">{flashcardsData.cards.length}</span>
                )}
              </button>
              <button
                type="button"
                className={`tab-nav-btn ${modalTab === "transcript" ? "active" : ""}`}
                onClick={() => setModalTab("transcript")}
              >
                <FileText size={14} />
                <span>Full Transcript</span>
              </button>
              <button
                type="button"
                className={`tab-nav-btn ${modalTab === "details" ? "active" : ""}`}
                onClick={() => setModalTab("details")}
              >
                <BookOpen size={14} />
                <span>File Details</span>
              </button>
            </div>

            {/* TAB 1: SUMMARY */}
            {modalTab === "summary" && (
              <div className="summary-container">
                {loadingSummary ? (
                  <div style={{ padding: "3rem 1rem", textAlign: "center" }}>
                    <RefreshCw size={30} className="spin-animation" color="var(--accent-cream)" />
                    <p style={{ color: "var(--text-muted)", marginTop: "0.75rem" }}>Generating concise summary with BART AI...</p>
                  </div>
                ) : summaryData ? (
                  <>
                    <div className="summary-toolbar">
                      <div className="summary-stats-pills">
                        <span className="stat-pill">
                          <FileCheck size={13} />
                          <strong>{summaryData.word_count || 0}</strong> words
                        </span>
                        <span className="stat-pill">
                          <strong>{summaryData.character_count || 0}</strong> chars
                        </span>
                        <span className="stat-pill">
                          Chunks: <strong>{summaryData.chunks_processed || 1}</strong>
                        </span>
                        <span className="stat-pill">
                          Model: <strong>{summaryData.model || "facebook/bart-large-cnn"}</strong>
                        </span>
                      </div>

                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={handleCopySummary}
                          title="Copy Summary"
                        >
                          {copiedSummary ? (
                            <>
                              <Check size={14} color="#a7f3d0" /> Copied!
                            </>
                          ) : (
                            <>
                              <Copy size={14} /> Copy Summary
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={handleDownloadSummary}
                          title="Download Summary as .txt"
                        >
                          <Download size={14} /> Export .txt
                        </button>
                      </div>
                    </div>

                    <div className="summary-content-grid">
                      <div className="summary-text-box">
                        {summaryData.summary_text.split("\n\n").map((para, pIdx) => (
                          <p key={pIdx}>{para}</p>
                        ))}
                      </div>

                      {summaryData.key_points && summaryData.key_points.length > 0 && (
                        <div className="key-points-card">
                          <div className="key-points-header">
                            <CheckCircle2 size={18} color="var(--accent-sage-light)" />
                            <span>Key Highlights & Concept Takeaways</span>
                          </div>
                          <div className="key-points-list">
                            {summaryData.key_points.map((point, kIdx) => (
                              <div key={kIdx} className="key-point-item">
                                <Check size={16} className="key-point-icon" />
                                <span>{point}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div style={{ padding: "2.5rem 1rem", textAlign: "center", color: "var(--text-muted)" }}>
                    <p>{summaryError || "Summary is not available yet."}</p>
                    {selectedLecture.processing_status === "completed" && (
                      <button
                        type="button"
                        className="btn btn-secondary"
                        style={{ marginTop: "1rem" }}
                        onClick={() => handleRetryProcessing(selectedLecture.id)}
                      >
                        <RotateCcw size={14} /> Generate Summary
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: KEY CONCEPTS */}
            {modalTab === "keywords" && (
              <div className="keywords-container">
                {loadingKeywords ? (
                  <div style={{ padding: "3rem 1rem", textAlign: "center" }}>
                    <RefreshCw size={30} className="spin-animation" color="var(--accent-cream)" />
                    <p style={{ color: "var(--text-muted)", marginTop: "0.75rem" }}>Extracting concepts via TF-IDF...</p>
                  </div>
                ) : keywordsData ? (
                  <>
                    <div className="keywords-toolbar">
                      <div className="summary-stats-pills">
                        <span className="stat-pill">
                          <Tag size={13} />
                          <strong>{keywordsData.keywords?.length || 0}</strong> Key Concepts
                        </span>
                        <span className="stat-pill">
                          Method: <strong>{keywordsData.method || "TF-IDF (scikit-learn)"}</strong>
                        </span>
                      </div>

                      <div className="transcript-search-wrap">
                        <Search size={14} />
                        <input
                          type="text"
                          className="input-control"
                          placeholder="Filter concepts..."
                          value={keywordSearch}
                          onChange={(e) => setKeywordSearch(e.target.value)}
                        />
                      </div>
                    </div>

                    {(() => {
                      const list = (keywordsData.keywords || []).filter((kw) =>
                        kw.term.toLowerCase().includes(keywordSearch.trim().toLowerCase())
                      );
                      if (list.length === 0) {
                        return (
                          <div style={{ padding: "2.5rem 1rem", textAlign: "center", color: "var(--text-muted)" }}>
                            No concepts found matching "{keywordSearch}".
                          </div>
                        );
                      }
                      const maxScore = Math.max(...list.map((k) => k.score), 0.1);
                      return (
                        <div className="keywords-grid">
                          {list.map((kw, idx) => (
                            <div key={idx} className="keyword-card">
                              <div className="keyword-card-top">
                                <span className="keyword-term">{kw.term}</span>
                                <span className="keyword-freq-pill">{kw.frequency}x</span>
                              </div>
                              <div className="keyword-bar-wrap">
                                <div className="keyword-bar-info">
                                  <span>Relevance</span>
                                  <strong>{kw.score.toFixed(3)}</strong>
                                </div>
                                <div className="keyword-bar-track">
                                  <div
                                    className="keyword-bar-fill"
                                    style={{ width: `${Math.min(100, Math.round((kw.score / maxScore) * 100))}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                  </>
                ) : (
                  <div style={{ padding: "2.5rem 1rem", textAlign: "center", color: "var(--text-muted)" }}>
                    {keywordsError || "No keywords available yet."}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: FLASHCARDS */}
            {modalTab === "flashcards" && (
              <div className="flashcards-container">
                {loadingFlashcards ? (
                  <div style={{ padding: "3rem 1rem", textAlign: "center" }}>
                    <RefreshCw size={30} className="spin-animation" color="var(--accent-cream)" />
                    <p style={{ color: "var(--text-muted)", marginTop: "0.75rem" }}>Generating Q&A flashcards with Llama 3.1 AI...</p>
                  </div>
                ) : flashcardsData && flashcardsData.cards && flashcardsData.cards.length > 0 ? (
                  <>
                    <div className="flashcards-header-bar">
                      <div className="view-mode-toggles">
                        <button
                          type="button"
                          className={`view-mode-btn ${flashcardViewMode === "carousel" && !isEditingDeck ? "active" : ""}`}
                          onClick={() => {
                            setIsEditingDeck(false);
                            setFlashcardViewMode("carousel");
                            setIsCardFlipped(false);
                          }}
                        >
                          <Layers size={13} />
                          <span>Study Mode</span>
                        </button>
                        <button
                          type="button"
                          className={`view-mode-btn ${flashcardViewMode === "list" && !isEditingDeck ? "active" : ""}`}
                          onClick={() => {
                            setIsEditingDeck(false);
                            setFlashcardViewMode("list");
                          }}
                        >
                          <List size={13} />
                          <span>All Cards ({flashcardsData.cards.length})</span>
                        </button>

                        {(user?.role === "educator" || user?.role === "admin" || user?.id === selectedLecture?.user_id) && (
                          <button
                            type="button"
                            className={`view-mode-btn ${isEditingDeck ? "active" : ""}`}
                            onClick={() => {
                              if (isEditingDeck) {
                                handleCancelEditDeck();
                              } else {
                                handleStartEditDeck();
                              }
                            }}
                            title="Edit questions, answers, and categories"
                          >
                            <Edit3 size={13} />
                            <span>{isEditingDeck ? "Exit Edit" : "Edit Deck"}</span>
                          </button>
                        )}
                      </div>

                      <div className="flashcard-actions-right">
                        <button
                          type="button"
                          className="btn btn-secondary share-btn"
                          onClick={handleOpenShareModal}
                          disabled={sharingLoading}
                          title="Share study set with students"
                        >
                          <Share2 size={13} />
                          <span>{sharingLoading ? "Sharing..." : "Share"}</span>
                        </button>

                        <div className="flashcard-regen-controls">
                          <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Target:</span>
                          <select
                            className="card-count-select"
                            value={flashcardCountSelect}
                            onChange={(e) => setFlashcardCountSelect(Number(e.target.value))}
                            disabled={regeneratingCards || isEditingDeck}
                          >
                            <option value={5}>5 Cards</option>
                            <option value={8}>8 Cards</option>
                            <option value={10}>10 Cards</option>
                          </select>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={handleRegenerateFlashcards}
                            disabled={regeneratingCards || isEditingDeck}
                            title="Regenerate flashcards from current summary"
                          >
                            <RefreshCw size={14} className={regeneratingCards ? "spin-animation" : ""} />
                            {regeneratingCards ? "Generating..." : "Regenerate"}
                          </button>
                        </div>
                      </div>
                    </div>

                    {regeneratingCards && (
                      <div className="flashcard-generating-overlay">
                        <RefreshCw size={15} className="spin-animation" color="var(--accent-cream)" />
                        <span>Regenerating {flashcardCountSelect} flashcards with AI...</span>
                      </div>
                    )}

                    {isEditingDeck ? (
                      <div className="flashcard-edit-stage">
                        <div className="flashcard-edit-header">
                          <div>
                            <h4 style={{ margin: 0, color: "var(--accent-cream)", fontSize: "1.05rem" }}>
                              Educator Flashcard Review & Edit
                            </h4>
                            <p style={{ margin: "0.25rem 0 0", fontSize: "0.82rem", color: "var(--text-muted)" }}>
                              Fine-tune questions, answers, categories, or append custom cards before sharing with students.
                            </p>
                          </div>
                          <div style={{ display: "flex", gap: "0.5rem" }}>
                            <button
                              type="button"
                              className="btn btn-secondary"
                              onClick={handleCancelEditDeck}
                              disabled={savingDeck}
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={handleSaveDeck}
                              disabled={savingDeck}
                            >
                              <Save size={14} />
                              <span>{savingDeck ? "Saving..." : "Save Deck"}</span>
                            </button>
                          </div>
                        </div>

                        <div className="flashcard-edit-list">
                          {editableCards.map((card, idx) => (
                            <div key={card.id || idx} className="card-edit-item">
                              <div className="card-edit-header-row">
                                <span className="card-index-badge">Card #{idx + 1}</span>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                  <input
                                    type="text"
                                    className="card-category-input"
                                    placeholder="Category / Tag"
                                    value={card.category || ""}
                                    onChange={(e) => handleCardFieldChange(idx, "category", e.target.value)}
                                  />
                                  <button
                                    type="button"
                                    className="btn-delete-card"
                                    onClick={() => handleDeleteCard(idx)}
                                    title="Delete Card"
                                  >
                                    <Trash2 size={15} />
                                  </button>
                                </div>
                              </div>
                              <div className="card-edit-body">
                                <div className="card-edit-field">
                                  <label>Question</label>
                                  <textarea
                                    className="card-textarea"
                                    rows={2}
                                    placeholder="Enter question..."
                                    value={card.question}
                                    onChange={(e) => handleCardFieldChange(idx, "question", e.target.value)}
                                  />
                                </div>
                                <div className="card-edit-field">
                                  <label>Answer</label>
                                  <textarea
                                    className="card-textarea answer"
                                    rows={3}
                                    placeholder="Enter answer..."
                                    value={card.answer}
                                    onChange={(e) => handleCardFieldChange(idx, "answer", e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flashcard-edit-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={handleAddCard}
                          >
                            <Plus size={15} /> Add Flashcard
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleSaveDeck}
                            disabled={savingDeck}
                          >
                            <Save size={15} /> {savingDeck ? "Saving Changes..." : "Save Deck"}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        {/* Mode 1: 3D Flip Carousel */}
                        {flashcardViewMode === "carousel" && (
                          <div className="flashcard-carousel-stage">
                            <div className="flashcard-progress-bar-wrap">
                              <span>
                                Card {currentCardIndex + 1} of {flashcardsData.cards.length}
                              </span>
                              <div className="flashcard-progress-track">
                                <div
                                  className="flashcard-progress-fill"
                                  style={{
                                    width: `${((currentCardIndex + 1) / flashcardsData.cards.length) * 100}%`,
                                  }}
                                />
                              </div>
                              <span>{Math.round(((currentCardIndex + 1) / flashcardsData.cards.length) * 100)}%</span>
                            </div>

                            {(() => {
                              const card = flashcardsData.cards[currentCardIndex];
                              return (
                                <div
                                  className="flashcard-perspective-box"
                                  onClick={() => setIsCardFlipped((prev) => !prev)}
                                  title="Click to flip card"
                                >
                                  <div className={`flashcard-3d-card ${isCardFlipped ? "flipped" : ""}`}>
                                    <div className="flashcard-face front">
                                      <div className="flashcard-top-row">
                                        <span className="flashcard-category-badge">{card?.category || "Concept"}</span>
                                        <span className="flashcard-side-indicator">QUESTION</span>
                                      </div>
                                      <div className="flashcard-body-text">{card?.question}</div>
                                      <div className="flashcard-footer-prompt">
                                        <span className="flashcard-flip-cue">
                                          <RotateCcw size={13} /> Click to reveal answer
                                        </span>
                                        <span style={{ color: "var(--text-muted)" }}>[Space to flip]</span>
                                      </div>
                                    </div>

                                    <div className="flashcard-face back">
                                      <div className="flashcard-top-row">
                                        <span className="flashcard-category-badge">{card?.category || "Concept"}</span>
                                        <span className="flashcard-side-indicator" style={{ color: "var(--accent-sage-light)" }}>
                                          ANSWER
                                        </span>
                                      </div>
                                      <div className="flashcard-body-text answer-text">{card?.answer}</div>
                                      <div className="flashcard-footer-prompt">
                                        <span className="flashcard-flip-cue">
                                          <RotateCcw size={13} /> Click to flip back
                                        </span>
                                        <span style={{ color: "var(--text-muted)" }}>[Space to flip]</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })()}

                            <div className="flashcard-nav-controls">
                              <button
                                type="button"
                                className="flashcard-nav-btn"
                                onClick={() => {
                                  setIsCardFlipped(false);
                                  setCurrentCardIndex((prev) => (prev > 0 ? prev - 1 : flashcardsData.cards.length - 1));
                                }}
                                title="Previous card (Left Arrow)"
                              >
                                <ChevronLeft size={22} />
                              </button>

                              <button
                                type="button"
                                className="flashcard-flip-btn"
                                onClick={() => setIsCardFlipped((prev) => !prev)}
                              >
                                <RotateCcw size={15} />
                                <span>{isCardFlipped ? "Show Question" : "Reveal Answer"}</span>
                              </button>

                              <button
                                type="button"
                                className="flashcard-nav-btn"
                                onClick={() => {
                                  setIsCardFlipped(false);
                                  setCurrentCardIndex((prev) => (prev + 1 < flashcardsData.cards.length ? prev + 1 : 0));
                                }}
                                title="Next card (Right Arrow)"
                              >
                                <ChevronRight size={22} />
                              </button>
                            </div>
                            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                              Keyboard shortcuts: [←] Previous • [→] Next • [Space] Flip
                            </div>
                          </div>
                        )}

                        {/* Mode 2: All Cards List View */}
                        {flashcardViewMode === "list" && (
                          <div className="flashcards-list-view">
                            {flashcardsData.cards.map((card, idx) => (
                              <div key={card.id || idx} className="flashcard-list-item">
                                <div className="flashcard-list-header">
                                  <span className="flashcard-number-tag">CARD #{idx + 1}</span>
                                  <span className="flashcard-category-badge">{card.category || "Key Concept"}</span>
                                </div>
                                <div className="flashcard-list-qa">
                                  <div className="flashcard-list-q">Q: {card.question}</div>
                                  <div className="flashcard-list-a">A: {card.answer}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <div style={{ padding: "2.5rem 1rem", textAlign: "center", color: "var(--text-muted)" }}>
                    <p>{flashcardsError || "No flashcards generated yet."}</p>
                    <button
                      type="button"
                      className="btn btn-primary"
                      style={{ marginTop: "1rem" }}
                      onClick={handleRegenerateFlashcards}
                      disabled={regeneratingCards}
                    >
                      <Sparkles size={16} /> Generate Flashcards Now
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: FULL TRANSCRIPT */}
            {modalTab === "transcript" && (
              <>
                {loadingTranscript ? (
                  <div style={{ padding: "2.5rem 1rem", textAlign: "center" }}>
                    <RefreshCw size={28} className="spin-animation" color="var(--accent-cream)" />
                    <p style={{ color: "var(--text-muted)", marginTop: "0.75rem" }}>Loading transcript...</p>
                  </div>
                ) : transcriptData ? (
                  <div className="transcript-container">
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

      {/* MODULE 4: FLASHCARD SHARE MODAL */}
      {shareModalOpen && shareInfo && (
        <div className="modal-overlay" onClick={() => setShareModalOpen(false)}>
          <div className="modal-content share-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Share2 size={20} color="var(--accent-cream)" />
                <h3 style={{ margin: 0, color: "var(--accent-cream)" }}>Share Study Deck</h3>
              </div>
              <button className="btn-close" onClick={() => setShareModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="share-modal-body">
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.5, margin: 0 }}>
                Anyone with this link can practice and study this deck in interactive mode without creating an account.
              </p>

              <div className="share-link-box">
                <input
                  type="text"
                  readOnly
                  className="share-link-input"
                  value={`${window.location.origin}/?shared=${shareInfo.share_id}`}
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleCopyShareLink}
                  style={{ padding: "0.45rem 0.95rem" }}
                >
                  {copiedShareLink ? <Check size={16} /> : <Copy size={16} />}
                  <span>{copiedShareLink ? "Copied!" : "Copy"}</span>
                </button>
              </div>

              <div className="share-meta-info">
                <span>Lecture: <strong>{shareInfo.lecture_title || selectedLecture?.title}</strong></span>
                <span>Total Cards: <strong>{shareInfo.total_cards}</strong></span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 4: ADMIN CONSOLE MODAL */}
      {adminModalOpen && user?.role === "admin" && (
        <div className="modal-overlay" onClick={() => setAdminModalOpen(false)}>
          <div className="modal-content admin-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Shield size={20} color="var(--accent-cream)" />
                  <h3 style={{ margin: 0, color: "var(--accent-cream)" }}>Summify Administration Console</h3>
                </div>
                <div className="admin-header-subtitle">
                  System Oversight, Usage Metrics, and User Account Management (No sensitive password data exposed)
                </div>
              </div>
              <button className="btn-close" onClick={() => setAdminModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: "1.25rem 0 0", display: "flex", flexDirection: "column", gap: "1rem", overflowY: "auto" }}>
              {adminNotice && (
                <div
                  className="alert-banner"
                  style={{
                    padding: "0.6rem 1rem",
                    fontSize: "0.85rem",
                    background: "rgba(109, 2, 2, 0.4)",
                    border: "1px solid var(--border-subtle)",
                    color: "var(--accent-cream)",
                  }}
                >
                  <AlertCircle size={16} />
                  <span>{adminNotice}</span>
                </div>
              )}

              {/* STATS OVERVIEW */}
              {adminStats && (() => {
                const totalUsers = adminStats?.users?.total ?? adminStats?.total_users ?? 0;
                const activeUsers = adminStats?.users?.active ?? adminStats?.active_users ?? 0;
                const deactUsers = adminStats?.users?.deactivated ?? adminStats?.deactivated_users ?? Math.max(0, totalUsers - activeUsers);
                const students = adminStats?.users?.students ?? adminStats?.students_count ?? 0;
                const educators = adminStats?.users?.educators ?? adminStats?.educators_count ?? 0;
                const admins = adminStats?.users?.admins ?? adminStats?.admins_count ?? 0;
                const totalLectures = adminStats?.lectures?.total ?? adminStats?.total_lectures ?? 0;
                const transcripts = adminStats?.lectures?.with_transcripts ?? 0;
                const flashcards = adminStats?.lectures?.with_flashcards ?? 0;
                const summaries = adminStats?.lectures?.with_summaries ?? 0;

                return (
                  <div className="admin-stats-grid">
                    <div className="admin-stat-card">
                      <span className="admin-stat-label">Total Users</span>
                      <span className="admin-stat-num">{totalUsers}</span>
                      <span className="admin-stat-sub">
                        {students} Students • {educators} Educators • {admins} Admins
                      </span>
                    </div>

                    <div className="admin-stat-card">
                      <span className="admin-stat-label">Active Accounts</span>
                      <span className="admin-stat-num">{activeUsers}</span>
                      <span className="admin-stat-sub">
                        {deactUsers} Deactivated
                      </span>
                    </div>

                    <div className="admin-stat-card">
                      <span className="admin-stat-label">Total Lectures</span>
                      <span className="admin-stat-num">{totalLectures}</span>
                      <span className="admin-stat-sub">
                        {transcripts} Transcripts Processed
                      </span>
                    </div>

                    <div className="admin-stat-card">
                      <span className="admin-stat-label">Study Materials</span>
                      <span className="admin-stat-num">{flashcards}</span>
                      <span className="admin-stat-sub">
                        {summaries} Summaries Generated
                      </span>
                    </div>
                  </div>
                );
              })()}

              {/* USER MANAGEMENT TOOLBAR */}
              <div className="admin-toolbar">
                <div className="admin-filter-group">
                  <div className="search-box" style={{ maxWidth: 220 }}>
                    <Search size={14} className="search-icon" />
                    <input
                      type="text"
                      placeholder="Search name or email..."
                      value={adminUserSearch}
                      onChange={(e) => setAdminUserSearch(e.target.value)}
                      style={{ fontSize: "0.82rem", paddingLeft: "2rem" }}
                    />
                  </div>

                  <select
                    className="admin-select"
                    value={adminRoleFilter}
                    onChange={(e) => setAdminRoleFilter(e.target.value)}
                  >
                    <option value="all">All Roles</option>
                    <option value="student">Students</option>
                    <option value="educator">Educators</option>
                    <option value="admin">Administrators</option>
                  </select>

                  <select
                    className="admin-select"
                    value={adminStatusFilter}
                    onChange={(e) => setAdminStatusFilter(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="deactivated">Deactivated</option>
                  </select>
                </div>

                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={fetchAdminData}
                    disabled={loadingAdmin}
                    title="Refresh data"
                  >
                    <RefreshCw size={14} className={loadingAdmin ? "spin-animation" : ""} />
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setCreateUserModalOpen(true)}
                  >
                    <Plus size={14} /> Add User
                  </button>
                </div>
              </div>

              {/* USER TABLE */}
              <div className="admin-table-container">
                {loadingAdmin ? (
                  <div style={{ padding: "2.5rem", textAlign: "center" }}>
                    <RefreshCw size={24} className="spin-animation" color="var(--accent-cream)" />
                    <p style={{ marginTop: "0.5rem", color: "var(--text-muted)", fontSize: "0.85rem" }}>
                      Loading accounts...
                    </p>
                  </div>
                ) : (!adminUsers || adminUsers.length === 0) ? (
                  <div style={{ padding: "2.5rem", textAlign: "center", color: "var(--text-muted)" }}>
                    No users matching criteria.
                  </div>
                ) : (
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Joined</th>
                        <th style={{ textAlign: "right" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(Array.isArray(adminUsers) ? adminUsers : []).map((u) => {
                        const isSelf = Boolean(user && (u.id === user.id || u.id === user.user_id));
                        let joinedDate = "—";
                        if (u.created_at) {
                          try {
                            const d = new Date(u.created_at);
                            if (!isNaN(d.getTime())) {
                              joinedDate = d.toLocaleDateString();
                            }
                          } catch {
                            joinedDate = "—";
                          }
                        }

                        return (
                          <tr key={u.id}>
                            <td>
                              <div className="admin-user-cell">
                                <span className="admin-user-name">
                                  {u.name || "User"} {isSelf && <span style={{ fontSize: "0.72rem", color: "var(--accent-sage-light)" }}>(You)</span>}
                                </span>
                                <span className="admin-user-email">{u.email}</span>
                              </div>
                            </td>
                            <td>
                              <select
                                className="admin-select"
                                style={{ padding: "0.2rem 0.5rem", fontSize: "0.78rem" }}
                                value={u.role || "student"}
                                onChange={(e) => handleUpdateUserRole(u.id, e.target.value)}
                                disabled={adminActionLoading || isSelf}
                              >
                                <option value="student">student</option>
                                <option value="educator">educator</option>
                                <option value="admin">admin</option>
                              </select>
                            </td>
                            <td>
                              <span className={`status-badge ${u.is_active ? "active" : "deactivated"}`}>
                                <span className={`status-dot ${u.is_active ? "active" : "deactivated"}`} />
                                {u.is_active ? "Active" : "Deactivated"}
                              </span>
                            </td>
                            <td style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                              {joinedDate}
                            </td>
                            <td style={{ textAlign: "right" }}>
                              <button
                                type="button"
                                className="btn btn-secondary"
                                style={{
                                  padding: "0.25rem 0.65rem",
                                  fontSize: "0.78rem",
                                  opacity: isSelf ? 0.4 : 1,
                                }}
                                onClick={() => handleToggleUserStatus(u)}
                                disabled={adminActionLoading || isSelf}
                                title={isSelf ? "Cannot deactivate yourself" : u.is_active ? "Deactivate account" : "Activate account"}
                              >
                                {u.is_active ? (
                                  <>
                                    <UserX size={12} /> Deactivate
                                  </>
                                ) : (
                                  <>
                                    <UserCheck size={12} /> Activate
                                  </>
                                )}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CREATE USER SUBMODAL */}
      {createUserModalOpen && (
        <div className="modal-overlay" style={{ zIndex: 110 }} onClick={() => setCreateUserModalOpen(false)}>
          <div className="modal-content" style={{ maxWidth: 450 }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ margin: 0, color: "var(--accent-cream)" }}>Add User Account</h3>
              <button className="btn-close" onClick={() => setCreateUserModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleCreateUser} style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
              <div className="input-group">
                <label>Full Name</label>
                <input
                  type="text"
                  className="input-control"
                  placeholder="Full Name"
                  value={newUserData.name}
                  onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
                  required
                />
              </div>

              <div className="input-group">
                <label>Email Address</label>
                <input
                  type="email"
                  className="input-control"
                  placeholder="email@example.com"
                  value={newUserData.email}
                  onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                  required
                />
              </div>

              <div className="input-group">
                <label>Initial Password</label>
                <input
                  type="password"
                  className="input-control"
                  placeholder="At least 6 characters"
                  minLength={6}
                  value={newUserData.password}
                  onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })}
                  required
                />
              </div>

              <div className="input-group">
                <label>Assigned Role</label>
                <select
                  className="admin-select"
                  style={{ width: "100%", padding: "0.6rem" }}
                  value={newUserData.role}
                  onChange={(e) => setNewUserData({ ...newUserData, role: e.target.value })}
                >
                  <option value="student">Student</option>
                  <option value="educator">Educator</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginTop: "0.5rem" }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setCreateUserModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={adminActionLoading}
                >
                  {adminActionLoading ? "Creating..." : "Create User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
