# Summify - Complete Project Structure & Source Code

> **Application Overview**: Summify is an AI-powered lecture and multimedia learning platform. It supports document (PDF, DOCX, TXT), audio, and video upload and processing, automated speech-to-text transcription via Whisper, AI-driven summarization with BART, dynamic flashcard generation using Llama-3.1-8B-Instruct, role-based access control (Admin/Student), and interactive study features.

- **Generated Date**: 2026-09-30 22:27:21
- **Total Documented Source Files**: 53
- **Total Lines of Source Code**: 10,909
- **Total Size**: 389.94 KB (399,298 bytes)
- **Security Notice**: `.env` secret files have been strictly excluded in accordance with security policies. Template configuration is preserved in `.env.example` files.

---

## 1. Project Directory Structure

```text
Summify/
├── backend/
│   ├── api/
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── auth.py
│   │   ├── health.py
│   │   └── lectures.py
│   ├── models/
│   │   ├── lecture.py
│   │   └── user.py
│   ├── schemas/
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   ├── lecture.py
│   │   └── user.py
│   ├── scripts/
│   │   └── seed_admin.py
│   ├── services/
│   │   ├── __init__.py
│   │   └── processing_service.py
│   ├── tests/
│   │   ├── __init__.py
│   │   ├── conftest.py
│   │   ├── test_access_control.py
│   │   ├── test_ai_endpoints_mocked.py
│   │   ├── test_auth.py
│   │   └── test_upload_and_ownership.py
│   ├── utils/
│   │   ├── jwt.py
│   │   └── password.py
│   ├── .env.example
│   ├── config.py
│   ├── database.py
│   ├── dependencies.py
│   ├── Dockerfile
│   ├── main.py
│   ├── processing_service.py
│   └── requirements.txt
├── frontend/
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   ├── src/
│   │   ├── assets/
│   │   │   ├── react.svg
│   │   │   └── vite.svg
│   │   ├── api.js
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── ErrorBoundary.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .gitignore
│   ├── .oxlintrc.json
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   └── vite.config.js
├── uploads/
│   └── .gitkeep
├── .env.example
├── .gitignore
├── package.json
├── pytest.ini
└── README.md
```

---

## 2. Table of Contents

### Root Configuration & Documentation

| File | Language / Type | Lines | Size |
| :--- | :--- | :---: | :---: |
| [.env.example](#envexample) | `sh` | 19 | 763 B |
| [.gitignore](#gitignore) | `gitignore` | 58 | 720 B |
| [README.md](#readmemd) | `markdown` | 313 | 18.9 KB |
| [package.json](#packagejson) | `json` | 11 | 340 B |
| [pytest.ini](#pytestini) | `ini` | 7 | 240 B |

### Backend - Core Configuration & Entry Points

| File | Language / Type | Lines | Size |
| :--- | :--- | :---: | :---: |
| [backend/.env.example](#backendenvexample) | `sh` | 19 | 763 B |
| [backend/Dockerfile](#backenddockerfile) | `dockerfile` | 25 | 614 B |
| [backend/config.py](#backendconfigpy) | `python` | 25 | 1.1 KB |
| [backend/database.py](#backenddatabasepy) | `python` | 63 | 2.0 KB |
| [backend/dependencies.py](#backenddependenciespy) | `python` | 85 | 2.8 KB |
| [backend/main.py](#backendmainpy) | `python` | 57 | 2.3 KB |
| [backend/processing_service.py](#backendprocessingservicepy) | `python` | 896 | 33.4 KB |
| [backend/requirements.txt](#backendrequirementstxt) | `text` | 14 | 183 B |

### Backend - API Endpoints

| File | Language / Type | Lines | Size |
| :--- | :--- | :---: | :---: |
| [backend/api/__init__.py](#backendapiinitpy) | `python` | 1 | 26 B |
| [backend/api/admin.py](#backendapiadminpy) | `python` | 287 | 9.6 KB |
| [backend/api/auth.py](#backendapiauthpy) | `python` | 122 | 4.4 KB |
| [backend/api/health.py](#backendapihealthpy) | `python` | 9 | 155 B |
| [backend/api/lectures.py](#backendapilecturespy) | `python` | 622 | 23.6 KB |

### Backend - Database Models

| File | Language / Type | Lines | Size |
| :--- | :--- | :---: | :---: |
| [backend/models/lecture.py](#backendmodelslecturepy) | `python` | 34 | 1.0 KB |
| [backend/models/user.py](#backendmodelsuserpy) | `python` | 15 | 579 B |

### Backend - Schemas & Validation

| File | Language / Type | Lines | Size |
| :--- | :--- | :---: | :---: |
| [backend/schemas/__init__.py](#backendschemasinitpy) | `python` | 1 | 30 B |
| [backend/schemas/auth.py](#backendschemasauthpy) | `python` | 7 | 167 B |
| [backend/schemas/lecture.py](#backendschemaslecturepy) | `python` | 109 | 2.9 KB |
| [backend/schemas/user.py](#backendschemasuserpy) | `python` | 74 | 2.0 KB |

### Backend - Services & Background Tasks

| File | Language / Type | Lines | Size |
| :--- | :--- | :---: | :---: |
| [backend/services/__init__.py](#backendservicesinitpy) | `python` | 1 | 31 B |
| [backend/services/processing_service.py](#backendservicesprocessingservicepy) | `python` | 22 | 573 B |

### Backend - Security & Token Utilities

| File | Language / Type | Lines | Size |
| :--- | :--- | :---: | :---: |
| [backend/utils/jwt.py](#backendutilsjwtpy) | `python` | 24 | 877 B |
| [backend/utils/password.py](#backendutilspasswordpy) | `python` | 26 | 845 B |

### Backend - Management Scripts

| File | Language / Type | Lines | Size |
| :--- | :--- | :---: | :---: |
| [backend/scripts/seed_admin.py](#backendscriptsseedadminpy) | `python` | 148 | 4.8 KB |

### Backend - Test Suite

| File | Language / Type | Lines | Size |
| :--- | :--- | :---: | :---: |
| [backend/tests/__init__.py](#backendtestsinitpy) | `python` | 1 | 28 B |
| [backend/tests/conftest.py](#backendtestsconftestpy) | `python` | 145 | 4.4 KB |
| [backend/tests/test_access_control.py](#backendteststestaccesscontrolpy) | `python` | 109 | 3.9 KB |
| [backend/tests/test_ai_endpoints_mocked.py](#backendteststestaiendpointsmockedpy) | `python` | 156 | 6.0 KB |
| [backend/tests/test_auth.py](#backendteststestauthpy) | `python` | 128 | 4.1 KB |
| [backend/tests/test_upload_and_ownership.py](#backendteststestuploadandownershippy) | `python` | 76 | 3.1 KB |

### Uploads & Storage

| File | Language / Type | Lines | Size |
| :--- | :--- | :---: | :---: |
| [uploads/.gitkeep](#uploadsgitkeep) | `text` | 1 | 32 B |

### Frontend - Configuration & Meta

| File | Language / Type | Lines | Size |
| :--- | :--- | :---: | :---: |
| [frontend/.gitignore](#frontendgitignore) | `gitignore` | 24 | 253 B |
| [frontend/.oxlintrc.json](#frontendoxlintrcjson) | `json` | 8 | 231 B |
| [frontend/README.md](#frontendreadmemd) | `markdown` | 16 | 1009 B |
| [frontend/index.html](#frontendindexhtml) | `html` | 17 | 1.0 KB |
| [frontend/package-lock.json](#frontendpackagelockjson) | `json` | 1,658 | 51.9 KB |
| [frontend/package.json](#frontendpackagejson) | `json` | 25 | 514 B |
| [frontend/vite.config.js](#frontendviteconfigjs) | `javascript` | 7 | 161 B |

### Frontend - React Source Code & Styles

| File | Language / Type | Lines | Size |
| :--- | :--- | :---: | :---: |
| [frontend/src/App.css](#frontendsrcappcss) | `css` | 2,193 | 42.0 KB |
| [frontend/src/App.jsx](#frontendsrcappjsx) | `jsx` | 2,898 | 119.7 KB |
| [frontend/src/ErrorBoundary.jsx](#frontendsrcerrorboundaryjsx) | `jsx` | 89 | 2.9 KB |
| [frontend/src/api.js](#frontendsrcapijs) | `javascript` | 85 | 2.9 KB |
| [frontend/src/index.css](#frontendsrcindexcss) | `css` | 138 | 3.3 KB |
| [frontend/src/main.jsx](#frontendsrcmainjsx) | `jsx` | 14 | 321 B |

### Frontend - Vector Assets

| File | Language / Type | Lines | Size |
| :--- | :--- | :---: | :---: |
| [frontend/src/assets/react.svg](#frontendsrcassetsreactsvg) | `xml` | 1 | 4.0 KB |
| [frontend/src/assets/vite.svg](#frontendsrcassetsvitesvg) | `xml` | 1 | 8.5 KB |

### Frontend - Public Resources

| File | Language / Type | Lines | Size |
| :--- | :--- | :---: | :---: |
| [frontend/public/favicon.svg](#frontendpublicfaviconsvg) | `xml` | 1 | 9.3 KB |
| [frontend/public/icons.svg](#frontendpubliciconssvg) | `xml` | 24 | 4.9 KB |

---

## 3. Project Source Codes

### Category: Root Configuration & Documentation

<a id="envexample"></a>
#### 1. `.env.example`

**Path**: `.env.example` &nbsp;|&nbsp; **Size**: 0.75 KB (763 bytes) &nbsp;|&nbsp; **Language**: `sh` &nbsp;|&nbsp; **Lines**: 19 lines

```sh
# Database Connection
# For local MongoDB: mongodb://localhost:27017/summify
# For MongoDB Atlas: mongodb+srv://<username>:<password>@<cluster>.mongodb.net/summify?retryWrites=true&w=majority
MONGODB_URI=mongodb://localhost:27017/summify

# Security & JWT Configuration
JWT_SECRET_KEY=YOUR_SUPER_SECRET_KEY_REPLACE_IN_PRODUCTION
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60

# Hugging Face Inference API for Whisper, BART, and Llama
# Obtain your token with read access at: https://huggingface.co/settings/tokens
HF_TOKEN=hf_your_actual_token_here
HF_WHISPER_MODEL=openai/whisper-large-v3-turbo
HF_SUMMARY_MODEL=facebook/bart-large-cnn
HF_FLASHCARD_MODEL=meta-llama/Llama-3.1-8B-Instruct

# Flashcard Defaults (Options: 5, 8, 10)
DEFAULT_FLASHCARD_COUNT=10

```

[Back to Table of Contents](#2-table-of-contents)

---

<a id="gitignore"></a>
#### 2. `.gitignore`

**Path**: `.gitignore` &nbsp;|&nbsp; **Size**: 0.70 KB (720 bytes) &nbsp;|&nbsp; **Language**: `gitignore` &nbsp;|&nbsp; **Lines**: 58 lines

```gitignore
# Environment variables & secrets (CRITICAL: Never commit .env files)
.env
.env.*
!.env.example
*.env

# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Python build and cache
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
env/
venv/
.venv/
ENV/
build/
dist/
dist-ssr/
*.egg-info/
.installed.cfg
*.egg
.pytest_cache/
.coverage
htmlcov/
.mypy_cache/

# Vite / Frontend build artifacts
frontend/dist/
frontend/dist-ssr/
frontend/node_modules/
*.local

# User uploads & runtime temp files
# Temp files
scratch/
uploads/*
!uploads/.gitkeep

# IDEs and OS metadata
.vscode/*
!.vscode/extensions.json
.idea/
.DS_Store
Thumbs.db
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

```

[Back to Table of Contents](#2-table-of-contents)

---

<a id="readmemd"></a>
#### 3. `README.md`

**Path**: `README.md` &nbsp;|&nbsp; **Size**: 18.94 KB (19398 bytes) &nbsp;|&nbsp; **Language**: `markdown` &nbsp;|&nbsp; **Lines**: 313 lines

````markdown
# Summify — Intelligent Lecture Summarization & Study Platform

Summify is an end-to-end AI-powered learning and study assistant designed to transform academic lectures, documents, audio recordings, and video sessions into structured transcripts, executive summaries, high-yield keywords, and interactive Q&A study flashcards.

---

## 🌟 Key Features Across Modules 1–4

### 1. Multi-Format Upload & Ingestion (Module 1)
- Supports **PDF**, **DOCX**, **TXT**, **Markdown**, **MP3**, **WAV**, **M4A**, **MP4**, and **WEBM** files up to 25 MB.
- Validates file extensions and MIME headers to block arbitrary or malicious binaries.
- Auto-generates unique, filesystem-safe storage paths in the `uploads/` directory.

### 2. Async Extraction & Audio Transcription (Module 2)
- **Background Processing Pipeline**: FastAPI `BackgroundTasks` transition lectures asynchronously through statuses: `uploaded` → `extracting` → `transcribing` → `completed` (or `failed`).
- **Text Extraction**: Uses `PyMuPDF` (`fitz`) and `pdfplumber` for robust PDF text extraction, `python-docx` for Word documents, and UTF-8 decoders for plain text.
- **Audio/Video Transcription**: Automatically extracts audio tracks from video files via `moviepy`/`pydub`, routes audio to Hugging Face hosted inference using `openai/whisper-large-v3-turbo`, and automatically cleans up temporary audio artifacts.
- Live status polling via `GET /api/lectures/{id}/status` and full transcript viewing with search and copy tools.

### 3. AI Summarization, Concept Extraction & Flashcard Generation (Module 3)
- **Executive Summaries**: Hugging Face inference via `facebook/bart-large-cnn`. Automatically segments long texts into ~1000-word chunks, generates intermediate summaries, and synthesizes a final executive summary pass with key takeaways.
- **Keyword & Concept Extraction**: Lightweight TF-IDF NLP model with stopword filtering that extracts top concepts and importance scores stored in MongoDB.
- **Interactive Flashcards**: Generates targeted question-and-answer pairs via `meta-llama/Llama-3.1-8B-Instruct`. Validates non-empty related Q&A pairs and handles regeneration for 5, 8, or 10 cards.
- **Interactive Study Interface**: 3D card-flip carousel with progress tracking, keyboard navigation (`Space` to flip, `←`/`→` arrows to navigate), and searchable full-list mode.

### 4. Role-Based Access, Educator Curation & Admin Oversight (Module 4)
- **Three Core Roles**:
  - **Student**: Upload personal lectures, access transcripts/summaries/flashcards, practice with interactive study decks, and access shared educator study sets.
  - **Educator**: All student features plus **Educator Flashcard Review & Edit** (inline editing of questions, answers, and tags, adding custom cards, deleting cards, and saving curated decks) and **Public Study Set Sharing** (generates shareable link `/?shared=<share_id>` accessible without an account).
  - **Administrator**: Dedicated **Administration Console** with system oversight, aggregated platform metrics, user directory table, role modification, account activation/deactivation (with self-deactivation protection), and manual user creation.
- **Strict Seed-Only Admin Creation**: Admin accounts can **never** be registered through public registration forms. They are created exclusively via a secure CLI seed script (`seed_admin.py`).
- **Security & Error Sanitization**:
  - Zero password hash exposure: Password hashes are excluded via Pydantic model schemas and MongoDB projections.
  - Sanitized, consistent error responses for invalid credentials, duplicate registrations, and system errors without leaking internal stack traces.
  - Ownership isolation enforced on the backend at the database query level.
- **Automated Test Suite**: 23 comprehensive `pytest` unit and integration tests with mocked AI responses to ensure zero paid external API usage during test runs.

---

## 🏗️ Technology Stack

| Layer | Technologies |
|---|---|
| **Backend API** | Python 3.10+, FastAPI, Uvicorn, Pydantic v2 |
| **Database** | MongoDB Atlas / Local MongoDB via Motor (AsyncIO driver) |
| **AI Inference** | Hugging Face Hosted Inference API (`whisper-large-v3-turbo`, `bart-large-cnn`, `Llama-3.1-8B-Instruct`) |
| **NLP & Text** | PyMuPDF (`fitz`), pdfplumber, python-docx, Scikit-learn (TF-IDF) |
| **Security** | Passlib (Bcrypt), PyJWT (HS256 tokens) |
| **Testing** | Pytest, Pytest-Asyncio, Mongomock-Motor, Starlette TestClient |
| **Frontend** | React 18, Vite, Axios, Lucide React Icons |
| **Styling** | Handcrafted Vanilla CSS Design System (Deep Crimson, Dark Maroon, Sage, Warm Cream — no neon effects) |

---

## 📁 Project Structure

```
Summify/
├── backend/
│   ├── api/
│   │   ├── admin.py                 # Admin dashboard endpoints (metrics, user management)
│   │   ├── auth.py                  # Register, login, current user endpoints
│   │   ├── health.py                # Health check and DB ping endpoint
│   │   └── lectures.py              # Lecture upload, status, artifacts, flashcard edit & share
│   ├── scripts/
│   │   └── seed_admin.py            # Secure CLI script to create administrator accounts
│   ├── services/
│   │   ├── summarization_service.py # BART chunked & recursive summarization
│   │   ├── keyword_service.py       # Scikit-learn TF-IDF keyword extraction
│   │   └── flashcard_service.py     # Llama 3.1 Q&A generation and parsing
│   ├── schemas/
│   │   ├── user.py                  # User authentication and admin schemas
│   │   └── lecture.py               # Lecture, transcript, summary, keyword, flashcard schemas
│   ├── tests/
│   │   ├── conftest.py              # Pytest fixtures and mock database harness
│   │   ├── test_access_control.py   # RBAC, student/educator/admin access tests
│   │   ├── test_ai_endpoints_mocked.py # Summary, flashcards, deck update & share tests (mocked AI)
│   │   ├── test_auth.py             # Registration, login, security, deactivated user tests
│   │   └── test_upload_and_ownership.py # Upload validation, mime check, ownership isolation
│   ├── config.py                    # Pydantic Settings and environment management
│   ├── database.py                  # Motor async MongoDB client & index initialization
│   ├── dependencies.py              # JWT authentication & require_admin / require_educator dependencies
│   ├── main.py                      # FastAPI application factory, CORS, and middleware
│   ├── processing_service.py        # Central background extraction & transcription coordinator
│   ├── requirements.txt             # Python backend dependencies
│   └── .env.example                 # Backend environment variable template
├── frontend/
│   ├── src/
│   │   ├── api.js                   # Axios client with JWT interceptors (Auth, Lectures, Admin)
│   │   ├── App.jsx                  # Main application, Admin Console, Educator Studio & Study Player
│   │   ├── App.css                  # Custom minimal aesthetic stylesheet
│   │   ├── main.jsx                 # React root bootstrap
│   │   └── index.css                # Global CSS variables and typography tokens
│   ├── index.html                   # HTML5 shell
│   ├── package.json                 # Frontend dependencies and Vite build scripts
│   └── vite.config.js               # Vite development server configuration
├── uploads/                         # Safe local storage for uploaded lecture files
├── .env.example                     # Root environment variable template
├── pytest.ini                       # Pytest configuration (asyncio mode = auto)
└── package.json                     # Root orchestrator scripts (run frontend & backend together)
```

---

## ⚙️ Environment Variables Setup

Create a `.env` file in the project root (or inside `backend/`):

```bash
cp .env.example .env
```

Configure the following variables:

```ini
# Database Connection (MongoDB Atlas or Local MongoDB)
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/summify?retryWrites=true&w=majority

# JWT Authentication
JWT_SECRET_KEY=generate_a_random_32_character_secret_key_here
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60

# Hugging Face Inference API
# Create a free token at https://huggingface.co/settings/tokens (Read role)
HF_TOKEN=hf_your_actual_token_here

# AI Models (Configurable)
HF_WHISPER_MODEL=openai/whisper-large-v3-turbo
HF_SUMMARY_MODEL=facebook/bart-large-cnn
HF_FLASHCARD_MODEL=meta-llama/Llama-3.1-8B-Instruct
DEFAULT_FLASHCARD_COUNT=10
```

> **Important**: Ensure your IP address is whitelisted in MongoDB Atlas under **Network Access** (`0.0.0.0/0` for development access).

---

## 🚀 Installation & Running the Servers

### 1. Install Backend Dependencies
```bash
# In project root:
pip install -r backend/requirements.txt
```

### 2. Install Frontend Dependencies
```bash
# In project root:
npm install
```

### 3. Run Both Servers Concurrently
```bash
# In project root:
npm start
```
- **Frontend**: Accessible at `http://localhost:5173`
- **Backend API**: Accessible at `http://localhost:8000`
- **Interactive Swagger Docs**: `http://localhost:8000/docs`

Alternatively, run each service independently:
```bash
# Terminal 1: Backend
python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload

# Terminal 2: Frontend
npm run dev --prefix frontend
```

---

## 🛡️ Creating an Admin Account & Implementing Admin Tasks

### 1. Why Admin Accounts Cannot be Registered Publicly
Public registration (`POST /api/auth/register`) strictly accepts only `"student"` or `"educator"` roles. Requests attempting to pass `"admin"` are rejected by both Pydantic schema validation and code-level verification. This prevents unauthorized privilege escalation.

### 2. Seeding the Initial Administrator
Run the secure CLI provisioning script from the repository root:

```bash
# Interactive Mode (Prompts safely for password):
python -m backend.scripts.seed_admin

# Or with CLI Arguments:
python -m backend.scripts.seed_admin --email admin@summify.io --name "Lead Administrator" --password "SuperSecretPass123!"
```

**Script Capabilities**:
- Checks if the email already exists: if the user already exists as a student or educator, it promotes them to `"admin"`.
- If new, creates a user with `role: "admin"`, `is_active: true`, hashes the password with bcrypt, and stores it securely.
- Never outputs password hashes to terminal logs.

### 3. Performing Admin Tasks in the Application
1. **Sign In**: Log in at `http://localhost:5173` using the admin credentials created via the seed script.
2. **Access Admin Console**: An **"Admin Console"** button appears in the top navigation bar next to your administrator badge. Click it to open the administrative modal.
3. **Review Platform Analytics**: View real-time aggregated metrics:
   - Total users, active users, breakdown of students, educators, and administrators.
   - Total uploaded lectures, processed transcripts, generated summaries, and flashcard decks.
4. **Search and Filter Accounts**:
   - Filter by role (`All Roles`, `Students`, `Educators`, `Administrators`).
   - Filter by account status (`All Status`, `Active`, `Deactivated`).
   - Search by name or email.
5. **Manage User Roles**: Change any user's role on the fly using the role select dropdown in the table.
6. **Activate / Deactivate Accounts**: Toggle user active status with one click. Deactivated users are blocked from logging in or making authenticated API calls.
   - *Self-Protection Safeguard*: The system disables the deactivate button for your own account so you can never accidentally lock yourself out.
7. **Add New Users Manually**: Click **"+ Add User"** to provision new accounts with custom roles (Student, Educator, Administrator) directly from the dashboard.

---

## 👨‍🏫 Educator Flashcard Review, Editing & Sharing Guide

1. **Log in as an Educator**: Sign up as an educator or switch an account to `educator` via the Admin Console.
2. **Upload a Lecture**: Upload any PDF, document, audio, or video lecture.
3. **Wait for Pipeline Completion**: The automated AI pipeline extracts text, summarizes, extracts keywords, and generates initial flashcards.
4. **Open Flashcard Studio**:
   - Click on the lecture and navigate to the **"Flashcards"** tab.
   - Click **"Edit Deck"**: The interactive deck editor opens.
   - **Edit Cards**: Change the question, answer, or category tag for any card.
   - **Add Cards**: Click **"+ Add Flashcard"** to create a custom study card.
   - **Delete Cards**: Click the trash icon to remove cards that are duplicate or out of scope.
   - **Save Deck**: Click **"Save Deck"** to persist your curated study set via `PUT /api/lectures/{id}/flashcards`.
5. **Share with Students**:
   - Click **"Share"**: The platform toggles the lecture's public share status and generates a unique share link (e.g. `http://localhost:5173/?shared=<share_id>`).
   - Click **"Copy"** to copy the link and distribute it to students.
   - **Public Access**: Students can open the link in any browser without logging in and practice using the full 3D flip card carousel and list mode.

---

## 📡 API Endpoint Reference

### Authentication (`/api/auth`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register new student or educator (Admin blocked) | Public |
| `POST` | `/api/auth/login` | Authenticate with email and password, returns JWT | Public |
| `GET` | `/api/auth/me` | Retrieve profile of authenticated user (No password data) | Authenticated |

### Lectures & Study Materials (`/api/lectures`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/lectures/upload` | Upload lecture file and start background processing | Authenticated |
| `GET` | `/api/lectures/my` | List all lectures belonging to the user | Authenticated |
| `GET` | `/api/lectures/{id}` | Get metadata for a specific lecture | Owner / Admin |
| `GET` | `/api/lectures/{id}/status` | Poll live processing status and artifact flags | Owner |
| `GET` | `/api/lectures/{id}/transcript` | Retrieve full extracted or transcribed text | Owner |
| `GET` | `/api/lectures/{id}/summary` | Retrieve executive summary and bullet points | Owner |
| `GET` | `/api/lectures/{id}/keywords` | Retrieve extracted TF-IDF keywords and scores | Owner |
| `GET` | `/api/lectures/{id}/flashcards` | Retrieve flashcards deck | Owner |
| `POST` | `/api/lectures/{id}/generate-flashcards` | Regenerate flashcards with count parameter (5, 8, 10) | Owner |
| `PUT` | `/api/lectures/{id}/flashcards` | Educator updates, edits, adds, or deletes flashcards | Educator / Admin / Owner |
| `POST` | `/api/lectures/{id}/share` | Enable public sharing and obtain shareable link | Educator / Admin / Owner |
| `GET` | `/api/lectures/shared/{share_id}` | Public read-only flashcard study set retrieval | Public |
| `DELETE` | `/api/lectures/{id}` | Delete lecture, uploaded file, and child documents | Owner / Admin |
| `GET` | `/api/lectures/{id}/file` | Download original uploaded lecture file | Owner / Admin |

### Administration Console (`/api/admin`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/admin/stats` | Platform statistics (users, lectures, artifacts) | Admin Only |
| `GET` | `/api/admin/users` | List users with search and role/status filters | Admin Only |
| `POST` | `/api/admin/users` | Create a user account directly | Admin Only |
| `PATCH` | `/api/admin/users/{id}` | Update user name, email, or role | Admin Only |
| `POST` | `/api/admin/users/{id}/toggle-status` | Toggle user active/deactivated state | Admin Only |

### System Health (`/api/health`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/health` | Service health status and MongoDB connectivity ping | Public |

---

## 🗄️ Database Collections & Schema

All data is stored in the `summify` database in MongoDB:

| Collection | Key Fields | Indexes |
|---|---|---|
| `users` | `name`, `email`, `hashed_password`, `role` (`student`/`educator`/`admin`), `is_active`, `created_at` | `email` (unique) |
| `lectures` | `user_id`, `title`, `original_filename`, `file_type`, `file_size`, `storage_path`, `processing_status`, `is_shared`, `share_slug` | `user_id` (1), `share_slug` (sparse) |
| `transcripts` | `lecture_id`, `user_id`, `full_text`, `char_count`, `word_count`, `source_type` | `lecture_id` + `user_id` (unique) |
| `summaries` | `lecture_id`, `user_id`, `summary_text`, `key_points`, `model`, `word_count`, `character_count` | `lecture_id` + `user_id` (unique) |
| `keywords` | `lecture_id`, `user_id`, `keywords` (`term`, `score`), `total_keywords`, `method` | `lecture_id` + `user_id` (unique) |
| `flashcards` | `lecture_id`, `user_id`, `cards` (`id`, `question`, `answer`, `category`), `total_cards`, `model` | `lecture_id` + `user_id` (unique) |

---

## 🧪 Running Automated Tests

Run the complete test suite using `pytest`:

```bash
# Run all tests with verbose output
python -m pytest backend/tests -v
```

**Coverage**:
- `test_access_control.py`: Unauthorized token rejection, role-guard checks (students and educators blocked from admin), admin stats/user listing, account activation/deactivation, self-deactivation protection.
- `test_auth.py`: Student and educator registration, admin role registration rejection, duplicate email detection, valid/invalid login, deactivated account lockout, password hash exclusion test (`test_get_me_never_exposes_password_hash`).
- `test_upload_and_ownership.py`: Unsupported file extension rejection, valid upload pipeline triggering (mocked background pipeline), ownership isolation between users.
- `test_ai_endpoints_mocked.py`: Summary and keyword retrieval, flashcard regeneration with mocked Hugging Face inference (0 paid API calls), educator flashcard deck inline editing and saving, public shared study set retrieval.

---

## 🔍 Troubleshooting & Common Issues

| Issue | Cause | Solution |
|---|---|---|
| `Database is unavailable` (503) | MongoDB Atlas connection timed out or IP not whitelisted | In MongoDB Atlas, go to **Network Access** and add your current IP address (or `0.0.0.0/0` for development). The backend includes auto-reconnect middleware that recovers as soon as Atlas is reachable. |
| `Hugging Face model loading (503)` | The model on Hugging Face is currently cold-booting | Hugging Face free inference endpoints can take 20–40 seconds on the first call to load model weights. The system includes automatic exponential backoff retries. Simply retry after 30 seconds. |
| `File too large (400)` | Upload exceeds 25 MB | Compress video or audio or split large PDFs before uploading. |
| `Cannot deactivate yourself (400)` | Admin attempting to deactivate own account | Intended security safeguard. Another administrator must deactivate the account. |
| `Registration rejected for admin role` | Public signup form sent `role: "admin"` | Admin accounts must be created using `python -m backend.scripts.seed_admin`. |

````

[Back to Table of Contents](#2-table-of-contents)

---

<a id="packagejson"></a>
#### 4. `package.json`

**Path**: `package.json` &nbsp;|&nbsp; **Size**: 0.33 KB (340 bytes) &nbsp;|&nbsp; **Language**: `json` &nbsp;|&nbsp; **Lines**: 11 lines

```json
{
  "name": "summify-root",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "npm --prefix frontend run dev",
    "build": "npm --prefix frontend run build",
    "frontend": "npm --prefix frontend run dev",
    "backend": "python -m uvicorn backend.main:app --reload --reload-dir backend --host 0.0.0.0 --port 8000"
  }
}

```

[Back to Table of Contents](#2-table-of-contents)

---

<a id="pytestini"></a>
#### 5. `pytest.ini`

**Path**: `pytest.ini` &nbsp;|&nbsp; **Size**: 0.23 KB (240 bytes) &nbsp;|&nbsp; **Language**: `ini` &nbsp;|&nbsp; **Lines**: 7 lines

```ini
[pytest]
asyncio_mode = auto
asyncio_default_fixture_loop_scope = function
filterwarnings =
    ignore::DeprecationWarning
    ignore::starlette.exceptions.StarletteDeprecationWarning
    ignore::pydantic.warnings.PydanticDeprecatedSince20

```

[Back to Table of Contents](#2-table-of-contents)

---

### Category: Backend - Core Configuration & Entry Points

<a id="backendenvexample"></a>
#### 6. `backend/.env.example`

**Path**: `backend/.env.example` &nbsp;|&nbsp; **Size**: 0.75 KB (763 bytes) &nbsp;|&nbsp; **Language**: `sh` &nbsp;|&nbsp; **Lines**: 19 lines

```sh
# Database Connection
# For local MongoDB: mongodb://localhost:27017/summify
# For MongoDB Atlas: mongodb+srv://<username>:<password>@<cluster>.mongodb.net/summify?retryWrites=true&w=majority
MONGODB_URI=mongodb://localhost:27017/summify

# Security & JWT Configuration
JWT_SECRET_KEY=YOUR_SUPER_SECRET_KEY_REPLACE_IN_PRODUCTION
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60

# Hugging Face Inference API for Whisper, BART, and Llama
# Obtain your token with read access at: https://huggingface.co/settings/tokens
HF_TOKEN=hf_your_actual_token_here
HF_WHISPER_MODEL=openai/whisper-large-v3-turbo
HF_SUMMARY_MODEL=facebook/bart-large-cnn
HF_FLASHCARD_MODEL=meta-llama/Llama-3.1-8B-Instruct

# Flashcard Defaults (Options: 5, 8, 10)
DEFAULT_FLASHCARD_COUNT=10

```

[Back to Table of Contents](#2-table-of-contents)

---

<a id="backenddockerfile"></a>
#### 7. `backend/Dockerfile`

**Path**: `backend/Dockerfile` &nbsp;|&nbsp; **Size**: 0.60 KB (614 bytes) &nbsp;|&nbsp; **Language**: `dockerfile` &nbsp;|&nbsp; **Lines**: 25 lines

```dockerfile
# backend/Dockerfile

# Use official Python slim image
FROM python:3.11-slim

# Set work directory
WORKDIR /app

# Install OS dependencies (ca-certificates, build-essential if needed)
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend source code
COPY backend/ ./

# Expose the FastAPI port
EXPOSE 8000

# Command to run the app
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]

```

[Back to Table of Contents](#2-table-of-contents)

---

<a id="backendconfigpy"></a>
#### 8. `backend/config.py`

**Path**: `backend/config.py` &nbsp;|&nbsp; **Size**: 1.08 KB (1111 bytes) &nbsp;|&nbsp; **Language**: `python` &nbsp;|&nbsp; **Lines**: 25 lines

```python
# backend/config.py

from pydantic import Field
from typing import ClassVar, Any
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    mongodb_uri: str = Field(..., env="MONGODB_URI")
    jwt_secret_key: str = Field(..., env="JWT_SECRET_KEY")
    jwt_algorithm: str = Field(default="HS256", env="JWT_ALGORITHM")
    access_token_expire_minutes: int = Field(default=60, env="ACCESS_TOKEN_EXPIRE_MINUTES")
    hf_token: str | None = Field(default=None, env="HF_TOKEN")
    hf_whisper_model: str = Field(default="openai/whisper-large-v3-turbo", env="HF_WHISPER_MODEL")
    hf_summary_model: str = Field(default="facebook/bart-large-cnn", env="HF_SUMMARY_MODEL")
    hf_flashcard_model: str = Field(default="meta-llama/Llama-3.1-8B-Instruct", env="HF_FLASHCARD_MODEL")
    default_flashcard_count: int = Field(default=10, env="DEFAULT_FLASHCARD_COUNT")
    # This will be set after the DB connection is established
    db: ClassVar[Any] = None

    class Config:
        env_file = (".env", "backend/.env")
        env_file_encoding = "utf-8"
        extra = "ignore"

settings = Settings()

```

[Back to Table of Contents](#2-table-of-contents)

---

<a id="backenddatabasepy"></a>
#### 9. `backend/database.py`

**Path**: `backend/database.py` &nbsp;|&nbsp; **Size**: 1.97 KB (2021 bytes) &nbsp;|&nbsp; **Language**: `python` &nbsp;|&nbsp; **Lines**: 63 lines

```python
import sys
import urllib.request
from motor.motor_asyncio import AsyncIOMotorClient
from .config import Settings, settings

try:
    import certifi
    CA_FILE = certifi.where()
except ImportError:
    CA_FILE = None

client: AsyncIOMotorClient | None = None


def get_public_ip() -> str:
    """Helper to detect current public IP for actionable diagnostics."""
    try:
        with urllib.request.urlopen("https://api.ipify.org", timeout=2.5) as resp:
            return resp.read().decode("utf-8").strip()
    except Exception:
        return "Unknown"


async def connect_to_mongo() -> None:
    """Initialize MongoDB client and expose database handle via Settings.db."""
    global client
    try:
        kwargs = {}
        if CA_FILE:
            kwargs["tlsCAFile"] = CA_FILE

        client = AsyncIOMotorClient(
            settings.mongodb_uri,
            serverSelectionTimeoutMS=4000,
            connectTimeoutMS=4000,
            **kwargs
        )
        
        # Determine target database name from URI
        uri_clean = settings.mongodb_uri.split("?")[0]
        db_name = uri_clean.rsplit("/", 1)[-1]
        if not db_name or db_name.startswith("mongodb"):
            db_name = "summify"

        # Verify connectivity with a quick ping
        await client.admin.command("ping")
        Settings.db = client[db_name]
        print(f" Connected to MongoDB Atlas successfully (database: '{db_name}')")
    except Exception as e:
        Settings.db = None
        ip = get_public_ip()
        print(f"❌ MongoDB connection failed: {e}")
        print(f"👉 Current Public IP: {ip}")
        print(f"👉 Fix: In MongoDB Atlas (cloud.mongodb.com) -> Security -> Network Access -> Add IP Address")
        print(f"       Add your current IP ({ip}) or add '0.0.0.0/0' (allow from anywhere).")


async def close_mongo_connection() -> None:
    """Close the global Motor client on app shutdown."""
    global client
    if client:
        client.close()
        print("MongoDB connection closed")

```

[Back to Table of Contents](#2-table-of-contents)

---

<a id="backenddependenciespy"></a>
#### 10. `backend/dependencies.py`

**Path**: `backend/dependencies.py` &nbsp;|&nbsp; **Size**: 2.76 KB (2826 bytes) &nbsp;|&nbsp; **Language**: `python` &nbsp;|&nbsp; **Lines**: 85 lines

```python
# backend/dependencies.py

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from bson import ObjectId
from jose import JWTError
from .config import settings
from .utils.jwt import decode_access_token

security = HTTPBearer()

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    """Validate bearer token, fetch live user document, verify account active status,
    and return user profile dictionary.
    """
    token = credentials.credentials
    try:
        payload = decode_access_token(token)
        user_id: str = payload.get("sub")
        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication token: missing subject",
            )
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
        )

    if settings.db is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database service is unavailable",
        )

    try:
        oid = ObjectId(user_id)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid user identification in token",
        )

    user = await settings.db.users.find_one({"_id": oid})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User account no longer exists",
        )

    # Check active status
    if not user.get("is_active", True):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account has been deactivated. Please contact an administrator.",
        )

    return {
        "user_id": str(user["_id"]),
        "name": user.get("name", "User"),
        "email": user["email"],
        "role": user.get("role", "student"),
        "is_active": user.get("is_active", True),
    }


async def require_admin(user: dict = Depends(get_current_user)) -> dict:
    """Enforce Administrator role requirement."""
    if user.get("role") != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Administrator access required for this action.",
        )
    return user


async def require_educator(user: dict = Depends(get_current_user)) -> dict:
    """Enforce Educator (or Administrator) role requirement."""
    if user.get("role") not in ["educator", "admin"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Educator permissions required for this action.",
        )
    return user

```

[Back to Table of Contents](#2-table-of-contents)

---

<a id="backendmainpy"></a>
#### 11. `backend/main.py`

**Path**: `backend/main.py` &nbsp;|&nbsp; **Size**: 2.31 KB (2364 bytes) &nbsp;|&nbsp; **Language**: `python` &nbsp;|&nbsp; **Lines**: 57 lines

```python
# backend/main.py

from contextlib import asynccontextmanager
import uvicorn
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from .config import Settings, settings
from .database import connect_to_mongo, close_mongo_connection
from .api import auth, lectures, health, admin

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifespan context manager handling startup and shutdown events."""
    await connect_to_mongo()
    if Settings.db is not None:
        try:
            await Settings.db.users.create_index("email", unique=True)
            await Settings.db.lectures.create_index("user_id")
            await Settings.db.transcripts.create_index([("lecture_id", 1), ("user_id", 1)], unique=True)
            await Settings.db.summaries.create_index([("lecture_id", 1), ("user_id", 1)], unique=True)
            await Settings.db.keywords.create_index([("lecture_id", 1), ("user_id", 1)], unique=True)
            await Settings.db.flashcards.create_index([("lecture_id", 1), ("user_id", 1)], unique=True)
        except Exception as e:
            print(f"Index creation notice: {e}")
    yield
    await close_mongo_connection()

app = FastAPI(
    title="Summify API",
    description="Intelligent Lecture Summarization and Study Platform",
    version="1.0.0",
    lifespan=lifespan,
)

# Auto-reconnect middleware: If DB was offline at boot, re-attempt on incoming request
@app.middleware("http")
async def db_auto_reconnect_middleware(request: Request, call_next):
    if Settings.db is None and not request.url.path.startswith("/api/health"):
        await connect_to_mongo()
    return await call_next(request)

# Robust CORS supporting localhost on any port (5173, 5174, 3000, 127.0.0.1, etc.)
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"^https?://(localhost|127\.0\.0\.1)(:\d+)?$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(lectures.router, prefix="/api/lectures", tags=["lectures"])
app.include_router(admin.router, prefix="/api/admin", tags=["admin"])
app.include_router(health.router, prefix="/api", tags=["health"])

if __name__ == "__main__":
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True, reload_dirs=["backend"])

```

[Back to Table of Contents](#2-table-of-contents)

---

<a id="backendprocessingservicepy"></a>
#### 12. `backend/processing_service.py`

**Path**: `backend/processing_service.py` &nbsp;|&nbsp; **Size**: 33.38 KB (34178 bytes) &nbsp;|&nbsp; **Language**: `python` &nbsp;|&nbsp; **Lines**: 896 lines

````python
# backend/processing_service.py

import os
import re
import json
import uuid
import asyncio
import subprocess
import tempfile
from pathlib import Path
from datetime import datetime
from typing import Tuple, Dict, Any, Optional, List
from bson import ObjectId
import httpx
import pymupdf
import docx
import imageio_ffmpeg
from sklearn.feature_extraction.text import TfidfVectorizer, ENGLISH_STOP_WORDS

from .config import settings

# Supported extensions
DOCUMENT_EXTENSIONS = {".pdf", ".docx", ".doc", ".txt", ".md"}
AUDIO_EXTENSIONS = {".mp3", ".wav", ".m4a"}
VIDEO_EXTENSIONS = {".mp4", ".webm"}

HF_ROUTER_URL = "https://router.huggingface.co/hf-inference/models"
HF_LEGACY_URL = "https://api-inference.huggingface.co/models"
HF_CHAT_COMPLETIONS_URL = "https://router.huggingface.co/v1/chat/completions"

ADDITIONAL_STOPWORDS = {
    "slide", "slides", "lecture", "chapter", "today", "page", "pages", 
    "thank", "thanks", "dr", "professor", "course", "class", "topic", 
    "hello", "welcome", "week", "next", "previous", "exam", "homework",
    "example", "summary", "overview", "section", "part", "discussed",
    "thing", "things", "going", "know", "really", "want", "like", "just"
}
CUSTOM_STOP_WORDS = list(ENGLISH_STOP_WORDS.union(ADDITIONAL_STOPWORDS))


def extract_text_from_pdf(file_path: Path) -> Tuple[str, Dict[str, Any]]:
    """Extract clean text and page count from a PDF using PyMuPDF."""
    doc = pymupdf.open(str(file_path))
    pages_text = []
    for page_num in range(len(doc)):
        page = doc[page_num]
        text = page.get_text().strip()
        if text:
            pages_text.append(text)
    
    full_text = "\n\n".join(pages_text)
    metadata = {
        "extractor": "PyMuPDF",
        "total_pages": len(doc),
        "pages_with_text": len(pages_text),
    }
    doc.close()
    return full_text, metadata


def extract_text_from_docx(file_path: Path) -> Tuple[str, Dict[str, Any]]:
    """Extract text from a DOCX file including paragraphs and tables."""
    doc = docx.Document(str(file_path))
    parts = []
    
    # Paragraphs
    for p in doc.paragraphs:
        t = p.text.strip()
        if t:
            parts.append(t)
            
    # Tables
    for table in doc.tables:
        for row in table.rows:
            row_text = " | ".join(cell.text.strip() for cell in row.cells if cell.text.strip())
            if row_text:
                parts.append(row_text)
                
    full_text = "\n\n".join(parts)
    metadata = {
        "extractor": "python-docx",
        "paragraphs_count": len(doc.paragraphs),
        "tables_count": len(doc.tables),
    }
    return full_text, metadata


def extract_text_from_txt(file_path: Path) -> Tuple[str, Dict[str, Any]]:
    """Directly read a plain text or markdown file with multi-encoding fallback."""
    encodings = ["utf-8", "utf-8-sig", "latin-1", "cp1252"]
    full_text = ""
    used_encoding = "utf-8"
    
    for enc in encodings:
        try:
            with open(file_path, "r", encoding=enc) as f:
                full_text = f.read()
            used_encoding = enc
            break
        except (UnicodeDecodeError, LookupError):
            continue
            
    metadata = {
        "extractor": "direct_read",
        "encoding": used_encoding,
        "line_count": len(full_text.splitlines()),
    }
    return full_text, metadata


def extract_audio_from_video(video_path: Path) -> Path:
    """Extract audio from video file to a temporary MP3 file using bundled imageio-ffmpeg."""
    ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
    temp_dir = Path(tempfile.gettempdir())
    temp_audio_path = temp_dir / f"summify_audio_{video_path.stem}_{int(datetime.utcnow().timestamp())}.mp3"
    
    cmd = [
        ffmpeg_exe,
        "-y",
        "-i", str(video_path),
        "-vn",
        "-acodec", "libmp3lame",
        "-ar", "16000",
        "-ac", "1",
        "-b:a", "64k",
        str(temp_audio_path),
    ]
    
    proc = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    if proc.returncode != 0:
        raise RuntimeError(f"Audio extraction from video failed: {proc.stderr[:300]}")
        
    if not temp_audio_path.exists() or temp_audio_path.stat().st_size == 0:
        raise RuntimeError("Extracted audio file is missing or empty")
        
    return temp_audio_path


async def transcribe_audio_hf(audio_path: Path) -> Tuple[str, Dict[str, Any]]:
    """Send audio file to Hugging Face hosted inference using openai/whisper-large-v3-turbo."""
    if not settings.hf_token or not settings.hf_token.strip():
        raise ValueError(
            "Hugging Face API token (HF_TOKEN) is not configured in .env. "
            "Please add HF_TOKEN to your .env file to enable Whisper audio/video transcription."
        )

    model_name = settings.hf_whisper_model or "openai/whisper-large-v3-turbo"
    endpoints = [
        f"{HF_ROUTER_URL}/{model_name}",
        f"{HF_LEGACY_URL}/{model_name}",
    ]
    
    mime_map = {
        ".mp3": "audio/mpeg",
        ".wav": "audio/wav",
        ".m4a": "audio/x-m4a",
        ".ogg": "audio/ogg",
        ".flac": "audio/flac",
    }
    content_type = mime_map.get(audio_path.suffix.lower(), "audio/mpeg")

    headers = {
        "Authorization": f"Bearer {settings.hf_token.strip()}",
        "Content-Type": content_type,
    }
    
    with open(audio_path, "rb") as f:
        audio_bytes = f.read()

    last_error = None
    async with httpx.AsyncClient(timeout=120.0) as client:
        for endpoint in endpoints:
            for attempt in range(3):
                try:
                    response = await client.post(endpoint, headers=headers, content=audio_bytes)
                    
                    if response.status_code == 200:
                        data = response.json()
                        text = ""
                        if isinstance(data, dict):
                            text = data.get("text", "")
                        elif isinstance(data, list):
                            text = " ".join(item.get("text", "") for item in data if isinstance(item, dict))
                            
                        text = text.strip()
                        metadata = {
                            "model": model_name,
                            "endpoint_used": endpoint,
                            "audio_size_bytes": len(audio_bytes),
                        }
                        return text, metadata
                    
                    if response.status_code == 503:
                        try:
                            data = response.json()
                            est_time = float(data.get("estimated_time", 15.0))
                        except Exception:
                            est_time = 15.0
                        sleep_seconds = min(est_time, 20.0)
                        await asyncio.sleep(sleep_seconds)
                        continue
                    
                    if response.status_code == 401:
                        raise ValueError("Invalid or unauthorized Hugging Face token (HF_TOKEN). Please check your token permissions.")
                    
                    if response.status_code == 404:
                        last_error = f"Model {model_name} not found at {endpoint}"
                        break

                    error_detail = response.text[:300]
                    last_error = f"Hugging Face API returned HTTP {response.status_code}: {error_detail}"
                    break
                except httpx.RequestError as exc:
                    last_error = f"Hugging Face network error: {str(exc)}"
                    await asyncio.sleep(2.0)
                    
    raise RuntimeError(last_error or "Transcription failed across Hugging Face endpoints.")


# =========================================================================
# MODULE 3: SUMMARIZATION, KEYWORDS & FLASHCARD SERVICES
# =========================================================================

def chunk_text(text: str, max_chars: int = 2500) -> List[str]:
    """Split text into coherent chunks of at most max_chars, breaking on sentences or paragraphs.
    Never truncates text.
    """
    paragraphs = [p.strip() for p in text.split("\n\n") if p.strip()]
    if not paragraphs:
        paragraphs = [text.strip()]

    chunks: List[str] = []
    current_chunk = ""

    for para in paragraphs:
        if len(para) > max_chars:
            # Paragraph itself is too big: split on sentence boundaries
            sentences = [s.strip() for s in re.split(r'(?<=[.!?])\s+', para) if s.strip()]
            for sentence in sentences:
                if len(sentence) > max_chars:
                    # Rare extreme sentence: split on words
                    words = sentence.split()
                    for word in words:
                        if len(current_chunk) + len(word) + 1 <= max_chars:
                            current_chunk += (" " if current_chunk else "") + word
                        else:
                            if current_chunk:
                                chunks.append(current_chunk)
                            current_chunk = word
                else:
                    if len(current_chunk) + len(sentence) + 1 <= max_chars:
                        current_chunk += ("\n" if current_chunk else "") + sentence
                    else:
                        if current_chunk:
                            chunks.append(current_chunk)
                        current_chunk = sentence
        else:
            if len(current_chunk) + len(para) + 2 <= max_chars:
                current_chunk += ("\n\n" if current_chunk else "") + para
            else:
                if current_chunk:
                    chunks.append(current_chunk)
                current_chunk = para

    if current_chunk:
        chunks.append(current_chunk)

    return chunks if chunks else [text]


async def query_bart_summary(
    client: httpx.AsyncClient,
    text: str,
    max_len: int = 150,
    min_len: int = 35,
) -> str:
    """Call Hugging Face inference for facebook/bart-large-cnn with retries."""
    if not settings.hf_token or not settings.hf_token.strip():
        raise ValueError("HF_TOKEN is missing. Please set your Hugging Face API token in .env.")

    model_name = settings.hf_summary_model or "facebook/bart-large-cnn"
    endpoints = [
        f"{HF_ROUTER_URL}/{model_name}",
        f"{HF_LEGACY_URL}/{model_name}",
    ]
    headers = {
        "Authorization": f"Bearer {settings.hf_token.strip()}",
        "Content-Type": "application/json",
    }

    # Ensure min/max length parameters are valid relative to input words
    input_word_count = len(text.split())
    eff_min_len = min(min_len, max(5, int(input_word_count * 0.4)))
    eff_max_len = max(eff_min_len + 15, min(max_len, max(30, int(input_word_count * 0.9))))

    payload = {
        "inputs": text,
        "parameters": {
            "max_length": eff_max_len,
            "min_length": eff_min_len,
            "do_sample": False,
        },
    }

    last_error = None
    for endpoint in endpoints:
        for attempt in range(3):
            try:
                res = await client.post(endpoint, headers=headers, json=payload, timeout=60.0)
                if res.status_code == 200:
                    data = res.json()
                    if isinstance(data, list) and len(data) > 0:
                        return data[0].get("summary_text", "").strip()
                    elif isinstance(data, dict):
                        return data.get("summary_text", "").strip()
                    return ""
                if res.status_code == 503:
                    # Model booting up
                    await asyncio.sleep(5.0)
                    continue
                if res.status_code == 401:
                    raise ValueError("Unauthorized HF_TOKEN. Please verify your Hugging Face token permissions.")
                last_error = f"BART API error ({res.status_code}): {res.text[:200]}"
                break
            except httpx.RequestError as e:
                last_error = f"Network error contacting BART: {str(e)}"
                await asyncio.sleep(2.0)

    raise RuntimeError(last_error or "BART summarization failed across Hugging Face endpoints.")


async def summarize_text_hf(text: str) -> Tuple[str, List[str], int]:
    """Chunk and hierarchically summarize text with facebook/bart-large-cnn, never silently truncating.
    Returns: (summary_text, key_points, chunks_processed)
    """
    clean_text = text.strip()
    if not clean_text:
        return "No text available to summarize.", [], 0

    # Short texts can be summarized directly
    if len(clean_text) <= 2500:
        async with httpx.AsyncClient(timeout=60.0) as client:
            summary = await query_bart_summary(client, clean_text, max_len=200, min_len=40)
            key_points = [
                s.strip() for s in re.split(r'(?<=[.!?])\s+', summary)
                if len(s.strip()) > 15
            ]
            return summary, key_points, 1

    # Text exceeds model input limit: Chunk -> Summarize each chunk -> Combine & synthesize
    chunks = chunk_text(clean_text, max_chars=2500)
    intermediate_summaries = []

    async with httpx.AsyncClient(timeout=90.0) as client:
        for chunk in chunks:
            chunk_summary = await query_bart_summary(client, chunk, max_len=130, min_len=30)
            if chunk_summary:
                intermediate_summaries.append(chunk_summary)

        combined_intermediate = " ".join(intermediate_summaries)

        # If combined intermediate summaries still exceed 2500 chars, chunk hierarchically
        if len(combined_intermediate) > 2500:
            second_chunks = chunk_text(combined_intermediate, max_chars=2500)
            second_summaries = []
            for sc in second_chunks:
                ss = await query_bart_summary(client, sc, max_len=120, min_len=30)
                if ss:
                    second_summaries.append(ss)
            combined_intermediate = " ".join(second_summaries)

        final_summary = await query_bart_summary(client, combined_intermediate, max_len=250, min_len=60)

    key_points = [
        s.strip() for s in re.split(r'(?<=[.!?])\s+', final_summary)
        if len(s.strip()) > 15
    ]
    return final_summary, key_points, len(chunks)


def extract_keywords_tfidf(text: str, top_n: int = 15) -> List[Dict[str, Any]]:
    """Extract key terms/concepts using TF-IDF with custom academic stopword filtering.
    Returns: List of dicts with keys: term, score, frequency.
    """
    clean_text = text.strip()
    if not clean_text:
        return []

    # Split into sentences to treat each sentence as a sub-document
    sentences = [s.strip() for s in re.split(r'[.\n!?]+', clean_text) if len(s.strip()) > 10]
    if len(sentences) <= 1:
        sentences = [clean_text]

    try:
        vec = TfidfVectorizer(
            stop_words=CUSTOM_STOP_WORDS,
            ngram_range=(1, 2),
            token_pattern=r'(?u)\b[a-zA-Z]{3,}\b',
            max_features=50,
        )
        X = vec.fit_transform(sentences)
        scores = X.mean(axis=0).A1
        feature_names = vec.get_feature_names_out()

        lowered = clean_text.lower()
        keywords = []
        for idx in scores.argsort()[::-1]:
            term = feature_names[idx]
            score = round(float(scores[idx]), 3)
            if score <= 0.02:
                continue
            freq = len(re.findall(r'\b' + re.escape(term) + r'\b', lowered))
            keywords.append({
                "term": term.title(),
                "score": score,
                "frequency": max(freq, 1),
            })
            if len(keywords) >= top_n:
                break
        return keywords
    except Exception as e:
        print(f"TF-IDF keyword extraction error: {e}")
        return []


def validate_qa_pair(card: Dict[str, Any], text_context: str) -> bool:
    """Robustly validate that question and answer are non-empty, related, and NEVER MCQs."""
    if not isinstance(card, dict):
        return False

    q = str(card.get("question", "")).strip()
    a = str(card.get("answer", "")).strip()

    # Minimum acceptable length
    if len(q) < 8 or len(a) < 3:
        return False

    # Strictly reject multiple-choice questions (never fall back to MCQs)
    mcq_pattern = r'(\b[A-D]\s*[\)\.:]|\bOption\s+[A-D]\b|\bWhich of the following\b|\bSelect the correct\b|\(A\)\s|\(B\)\s)'
    if re.search(mcq_pattern, q, re.IGNORECASE) or re.search(mcq_pattern, a, re.IGNORECASE):
        return False

    # Reject trivial placeholders
    placeholders = {"n/a", "none", "unknown", "tbd", "undefined", "true", "false", "yes", "no"}
    if a.lower() in placeholders:
        return False

    # Relatedness check: Q & A share vocabulary or connect to the lecture context
    q_words = set(re.findall(r'\b[a-zA-Z]{3,}\b', q.lower())) - set(ENGLISH_STOP_WORDS)
    a_words = set(re.findall(r'\b[a-zA-Z]{3,}\b', a.lower())) - set(ENGLISH_STOP_WORDS)
    ctx_words = set(re.findall(r'\b[a-zA-Z]{3,}\b', text_context.lower())) - set(ENGLISH_STOP_WORDS)

    shares_qa = bool(q_words & a_words)
    relates_to_ctx = bool((q_words | a_words) & ctx_words)

    return shares_qa or relates_to_ctx


async def generate_flashcards_hf(
    summary: str,
    keywords: List[Dict[str, Any]],
    count: int = 10,
) -> List[Dict[str, Any]]:
    """Generate high-yield Q&A flashcards using meta-llama/Llama-3.1-8B-Instruct via HF Router.
    Validates every card and skips/rejects malformed cards or MCQs.
    """
    if not settings.hf_token or not settings.hf_token.strip():
        raise ValueError("HF_TOKEN is missing. Please set your Hugging Face API token in .env.")

    target_count = min(max(1, count), 10)
    kw_list = [k["term"] for k in keywords[:10]]
    kw_str = ", ".join(kw_list) if kw_list else "General lecture content"

    prompt = f"""You are an expert academic tutor creating flashcards for students.
Create exactly {target_count} high-yield study flashcards based on the lecture summary and key concepts below.

RULES:
1. You MUST generate EXACTLY {target_count} flashcards in the JSON array (no more, no less).
2. Every card must have a clear "question" testing a concept, mechanism, definition, or distinction.
3. Every card must have a concise, accurate "answer" (1-3 sentences).
4. NEVER generate multiple choice questions (no options like A, B, C, D, no "Which of the following").
5. Both question and answer must be substantive and directly related to the material.
6. Provide a relevant academic "category" for each card (e.g. "Definition", "Architecture", "Key Concept").
7. Output ONLY a valid JSON array of objects with no surrounding conversation or markdown outside the array.

Format:
[
  {{
    "question": "What is ...?",
    "answer": "...",
    "category": "..."
  }}
]

Lecture Summary:
{summary}

Key Concepts:
{kw_str}
"""

    headers = {
        "Authorization": f"Bearer {settings.hf_token.strip()}",
        "Content-Type": "application/json",
    }
    payload = {
        "model": settings.hf_flashcard_model or "meta-llama/Llama-3.1-8B-Instruct",
        "messages": [
            {"role": "system", "content": "You are an expert educational study-aid assistant. You only output valid JSON arrays."},
            {"role": "user", "content": prompt},
        ],
        "temperature": 0.3,
        "max_tokens": 2000,
    }

    async with httpx.AsyncClient(timeout=90.0) as client:
        response = await client.post(HF_CHAT_COMPLETIONS_URL, headers=headers, json=payload)
        if response.status_code != 200:
            raise RuntimeError(f"Flashcard generation failed ({response.status_code}): {response.text[:200]}")

        data = response.json()
        content = data["choices"][0]["message"]["content"].strip()

        # Clean markdown fences if model returned them
        clean_content = re.sub(r"^```(?:json)?\s*", "", content, flags=re.MULTILINE)
        clean_content = re.sub(r"\s*```$", "", clean_content, flags=re.MULTILINE).strip()

        raw_cards = []
        try:
            raw_cards = json.loads(clean_content)
        except json.JSONDecodeError:
            match = re.search(r'\[\s*\{.*\}\s*\]', clean_content, re.DOTALL)
            if match:
                raw_cards = json.loads(match.group(0))
            else:
                raise RuntimeError("Failed to parse valid JSON flashcard output from LLM.")

        valid_cards = []
        fallback_candidates = []

        for card in raw_cards:
            if not isinstance(card, dict):
                continue
            q = str(card.get("question", "")).strip()
            a = str(card.get("answer", "")).strip()
            cat = str(card.get("category", "Key Concept")).strip() or "Key Concept"

            if validate_qa_pair(card, summary):
                valid_cards.append({
                    "id": str(uuid.uuid4())[:8],
                    "question": q,
                    "answer": a,
                    "category": cat,
                })
            elif len(q) >= 8 and len(a) >= 3:
                mcq_pattern = r'(\b[A-D]\s*[\)\.:]|\bOption\s+[A-D]\b|\bWhich of the following\b|\bSelect the correct\b|\(A\)\s|\(B\)\s)'
                if not re.search(mcq_pattern, q, re.IGNORECASE) and not re.search(mcq_pattern, a, re.IGNORECASE):
                    placeholders = {"n/a", "none", "unknown", "tbd", "undefined", "true", "false", "yes", "no"}
                    if a.lower() not in placeholders:
                        fallback_candidates.append({
                            "id": str(uuid.uuid4())[:8],
                            "question": q,
                            "answer": a,
                            "category": cat,
                        })

        # Backfill if strict validation produced fewer than target_count
        for fb in fallback_candidates:
            if len(valid_cards) >= target_count:
                break
            valid_cards.append(fb)

        # Strictly slice to target_count to guarantee the requested number of cards
        return valid_cards[:target_count]


async def generate_flashcards_for_lecture(
    lecture_id: str,
    user_id: str,
    count: Optional[int] = None,
) -> Dict[str, Any]:
    """Regenerate flashcards on demand for a lecture scoped to its owner."""
    if settings.db is None:
        raise RuntimeError("Database unavailable")

    target_count = min(count or settings.default_flashcard_count or 10, 10)

    # Retrieve summary or transcript to base flashcards on
    summary_doc = await settings.db.summaries.find_one({"lecture_id": lecture_id, "user_id": user_id})
    keywords_doc = await settings.db.keywords.find_one({"lecture_id": lecture_id, "user_id": user_id})

    summary_text = ""
    if summary_doc:
        summary_text = summary_doc.get("summary_text", "")
    else:
        transcript_doc = await settings.db.transcripts.find_one({"lecture_id": lecture_id, "user_id": user_id})
        if transcript_doc:
            summary_text = transcript_doc.get("text", "")[:3000]

    if not summary_text.strip():
        raise ValueError("Cannot generate flashcards: No summary or transcript found for this lecture.")

    keywords_list = keywords_doc.get("keywords", []) if keywords_doc else []

    cards = await generate_flashcards_hf(summary_text, keywords_list, count=target_count)

    flashcards_doc = {
        "lecture_id": lecture_id,
        "user_id": user_id,
        "cards": cards,
        "total_cards": len(cards),
        "model": settings.hf_flashcard_model,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
    }

    res = await settings.db.flashcards.update_one(
        {"lecture_id": lecture_id, "user_id": user_id},
        {"$set": flashcards_doc},
        upsert=True,
    )

    saved_doc = await settings.db.flashcards.find_one({"lecture_id": lecture_id, "user_id": user_id})
    saved_doc["id"] = str(saved_doc["_id"])
    return saved_doc


# =========================================================================
# LECTURE STATUS & PIPELINE ORCHESTRATION
# =========================================================================

async def update_lecture_status(
    lecture_id: str,
    status: str,
    status_message: Optional[str] = None,
    error_message: Optional[str] = None,
) -> None:
    """Helper to update a lecture's processing status in MongoDB."""
    if settings.db is None:
        return

    update_fields: Dict[str, Any] = {
        "processing_status": status,
        "updated_at": datetime.utcnow(),
    }
    if status_message is not None:
        update_fields["status_message"] = status_message
    if error_message is not None:
        update_fields["error_message"] = error_message
    elif status != "failed":
        update_fields["error_message"] = None

    try:
        oid = ObjectId(lecture_id)
        await settings.db.lectures.update_one({"_id": oid}, {"$set": update_fields})
    except Exception as e:
        print(f"Error updating lecture status for {lecture_id}: {e}")


async def process_lecture_background(lecture_id: str, user_id: str) -> None:
    """Orchestrates lecture processing through the full end-to-end pipeline:
    extract/transcribe -> summarize -> extract keywords -> generate flashcards -> completed.
    """
    if settings.db is None:
        print(f"Cannot process lecture {lecture_id}: Database handle is None")
        return

    try:
        oid = ObjectId(lecture_id)
    except Exception:
        return

    lecture_doc = await settings.db.lectures.find_one({"_id": oid, "user_id": user_id})
    if not lecture_doc:
        print(f"Lecture {lecture_id} not found for user {user_id}")
        return

    storage_path = Path(lecture_doc.get("storage_path", ""))
    if not storage_path.is_file():
        await update_lecture_status(
            lecture_id,
            status="failed",
            status_message="File missing on disk",
            error_message="Uploaded lecture source file could not be found on server storage.",
        )
        return

    ext = storage_path.suffix.lower()
    temp_audio_to_delete: Optional[Path] = None

    try:
        full_text = ""
        metadata: Dict[str, Any] = {}
        source_type = "document"

        # ---------------------------------------------------------
        # STEP 1: EXTRACT / TRANSCRIBE
        # ---------------------------------------------------------
        if ext in DOCUMENT_EXTENSIONS:
            await update_lecture_status(
                lecture_id,
                status="extracting",
                status_message=f"Extracting content from {ext.upper().replace('.', '')} document...",
            )
            await asyncio.sleep(0.3)

            if ext == ".pdf":
                full_text, metadata = extract_text_from_pdf(storage_path)
            elif ext in {".docx", ".doc"}:
                full_text, metadata = extract_text_from_docx(storage_path)
            elif ext in {".txt", ".md"}:
                full_text, metadata = extract_text_from_txt(storage_path)

            source_type = "document"

            if not full_text.strip():
                full_text = "[No selectable text could be extracted from this document.]"
                metadata["warning"] = "empty_or_scanned_document"

        elif ext in AUDIO_EXTENSIONS or ext in VIDEO_EXTENSIONS:
            audio_path = storage_path

            if ext in VIDEO_EXTENSIONS:
                await update_lecture_status(
                    lecture_id,
                    status="extracting",
                    status_message=f"Extracting audio track from {ext.upper().replace('.', '')} video...",
                )
                await asyncio.sleep(0.3)
                audio_path = extract_audio_from_video(storage_path)
                temp_audio_to_delete = audio_path

            await update_lecture_status(
                lecture_id,
                status="transcribing",
                status_message=f"Transcribing audio using Whisper AI ({settings.hf_whisper_model})...",
            )
            await asyncio.sleep(0.3)

            full_text, metadata = await transcribe_audio_hf(audio_path)
            source_type = "audio"

            if not full_text.strip():
                full_text = "[No speech was recognized in the audio track.]"
                metadata["warning"] = "no_speech_detected"

        else:
            raise ValueError(f"Unsupported file format for processing: {ext}")

        # Store transcript in "transcripts" collection
        word_count = len(full_text.split())
        char_count = len(full_text)

        transcript_doc = {
            "lecture_id": lecture_id,
            "user_id": user_id,
            "text": full_text,
            "source_type": source_type,
            "word_count": word_count,
            "character_count": char_count,
            "metadata": metadata,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
        }

        await settings.db.transcripts.update_one(
            {"lecture_id": lecture_id, "user_id": user_id},
            {"$set": transcript_doc},
            upsert=True,
        )

        # Check if text is meaningful enough for AI summarization & flashcards
        if word_count < 10 or metadata.get("warning"):
            await update_lecture_status(
                lecture_id,
                status="completed",
                status_message=f"Text extracted ({word_count} words). Note: Limited text available for deep AI analysis.",
            )
            return

        # ---------------------------------------------------------
        # STEP 2: SUMMARIZE (BART)
        # ---------------------------------------------------------
        await update_lecture_status(
            lecture_id,
            status="summarizing",
            status_message=f"Generating hierarchical summary with BART AI ({settings.hf_summary_model})...",
        )
        await asyncio.sleep(0.3)

        summary_text, key_points, chunks_processed = await summarize_text_hf(full_text)

        summary_doc = {
            "lecture_id": lecture_id,
            "user_id": user_id,
            "summary_text": summary_text,
            "key_points": key_points,
            "word_count": len(summary_text.split()),
            "character_count": len(summary_text),
            "chunks_processed": chunks_processed,
            "model": settings.hf_summary_model,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
        }

        await settings.db.summaries.update_one(
            {"lecture_id": lecture_id, "user_id": user_id},
            {"$set": summary_doc},
            upsert=True,
        )

        # ---------------------------------------------------------
        # STEP 3: EXTRACT KEYWORDS / CONCEPTS (TF-IDF)
        # ---------------------------------------------------------
        await update_lecture_status(
            lecture_id,
            status="extracting_keywords",
            status_message="Extracting key concepts and terms via TF-IDF analysis...",
        )
        await asyncio.sleep(0.3)

        keywords = extract_keywords_tfidf(full_text, top_n=15)

        keywords_doc = {
            "lecture_id": lecture_id,
            "user_id": user_id,
            "keywords": keywords,
            "method": "TF-IDF (scikit-learn)",
            "total_keywords": len(keywords),
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
        }

        await settings.db.keywords.update_one(
            {"lecture_id": lecture_id, "user_id": user_id},
            {"$set": keywords_doc},
            upsert=True,
        )

        # ---------------------------------------------------------
        # STEP 4: GENERATE FLASHCARDS (LLAMA 3.1)
        # ---------------------------------------------------------
        target_card_count = min(settings.default_flashcard_count or 10, 10)
        await update_lecture_status(
            lecture_id,
            status="generating_flashcards",
            status_message=f"Generating {target_card_count} study flashcards with Llama 3.1 AI...",
        )
        await asyncio.sleep(0.3)

        cards = await generate_flashcards_hf(summary_text, keywords, count=target_card_count)

        flashcards_doc = {
            "lecture_id": lecture_id,
            "user_id": user_id,
            "cards": cards,
            "total_cards": len(cards),
            "model": settings.hf_flashcard_model,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
        }

        await settings.db.flashcards.update_one(
            {"lecture_id": lecture_id, "user_id": user_id},
            {"$set": flashcards_doc},
            upsert=True,
        )

        # ---------------------------------------------------------
        # STEP 5: MARK COMPLETED
        # ---------------------------------------------------------
        await update_lecture_status(
            lecture_id,
            status="completed",
            status_message=f"Processing complete: Summary, {len(keywords)} concepts, and {len(cards)} flashcards ready.",
        )
        print(f" Lecture {lecture_id} fully processed through all Module 3 stages.")

    except Exception as exc:
        error_msg = str(exc)
        print(f"❌ Processing failed for lecture {lecture_id}: {error_msg}")
        await update_lecture_status(
            lecture_id,
            status="failed",
            status_message="Processing failed",
            error_message=error_msg,
        )

    finally:
        # Clean up temporary extracted audio file
        if temp_audio_to_delete and temp_audio_to_delete.exists():
            try:
                temp_audio_to_delete.unlink()
                print(f" Cleaned up temporary audio: {temp_audio_to_delete.name}")
            except Exception as e:
                print(f"Notice: Failed to delete temp audio file: {e}")

````

[Back to Table of Contents](#2-table-of-contents)

---

<a id="backendrequirementstxt"></a>
#### 13. `backend/requirements.txt`

**Path**: `backend/requirements.txt` &nbsp;|&nbsp; **Size**: 0.18 KB (183 bytes) &nbsp;|&nbsp; **Language**: `text` &nbsp;|&nbsp; **Lines**: 14 lines

```text
fastapi
uvicorn[standard]
python-jose[cryptography]
passlib[bcrypt]
motor
pydantic
pydantic-settings
python-multipart
email-validator
certifi
pymupdf
python-docx
httpx
imageio-ffmpeg

```

[Back to Table of Contents](#2-table-of-contents)

---

### Category: Backend - API Endpoints

<a id="backendapiinitpy"></a>
#### 14. `backend/api/__init__.py`

**Path**: `backend/api/__init__.py` &nbsp;|&nbsp; **Size**: 0.03 KB (26 bytes) &nbsp;|&nbsp; **Language**: `python` &nbsp;|&nbsp; **Lines**: 1 lines

```python
# backend/api/__init__.py

```

[Back to Table of Contents](#2-table-of-contents)

---

<a id="backendapiadminpy"></a>
#### 15. `backend/api/admin.py`

**Path**: `backend/api/admin.py` &nbsp;|&nbsp; **Size**: 9.62 KB (9846 bytes) &nbsp;|&nbsp; **Language**: `python` &nbsp;|&nbsp; **Lines**: 287 lines

```python
# backend/api/admin.py

from fastapi import APIRouter, Depends, HTTPException, Query, status
from bson import ObjectId
from datetime import datetime
from typing import List, Optional

from ..config import settings
from ..dependencies import require_admin
from ..utils.password import hash_password
from ..schemas.user import (
    AdminUserCreate,
    AdminUserUpdate,
    AdminUserRead,
    AdminStatsResponse,
    AdminStatsUsers,
    AdminStatsLectures,
)

router = APIRouter(dependencies=[Depends(require_admin)])


@router.get("/stats", response_model=AdminStatsResponse)
async def get_admin_dashboard_stats(admin_user: dict = Depends(require_admin)):
    """Retrieve high-level system analytics for the administrator dashboard."""
    if settings.db is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database service is unavailable",
        )

    users_col = settings.db.users
    lectures_col = settings.db.lectures

    total_users = await users_col.count_documents({})
    active_users = await users_col.count_documents({"is_active": {"$ne": False}})
    deactivated_users = await users_col.count_documents({"is_active": False})
    students_count = await users_col.count_documents({"role": "student"})
    educators_count = await users_col.count_documents({"role": "educator"})
    admins_count = await users_col.count_documents({"role": "admin"})
    total_lectures = await lectures_col.count_documents({})

    trans_count = await settings.db.transcripts.count_documents({}) if settings.db.transcripts is not None else 0
    sum_count = await settings.db.summaries.count_documents({}) if settings.db.summaries is not None else 0
    fc_count = await settings.db.flashcards.count_documents({}) if settings.db.flashcards is not None else 0

    return AdminStatsResponse(
        total_users=total_users,
        active_users=active_users,
        deactivated_users=deactivated_users,
        students_count=students_count,
        educators_count=educators_count,
        admins_count=admins_count,
        total_lectures=total_lectures,
        users=AdminStatsUsers(
            total=total_users,
            active=active_users,
            deactivated=deactivated_users,
            students=students_count,
            educators=educators_count,
            admins=admins_count,
        ),
        lectures=AdminStatsLectures(
            total=total_lectures,
            with_transcripts=trans_count,
            with_summaries=sum_count,
            with_flashcards=fc_count,
        ),
    )


@router.get("/users", response_model=List[AdminUserRead])
async def list_all_users(
    search: Optional[str] = None,
    role: Optional[str] = None,
    is_active: Optional[bool] = None,
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=100, ge=1, le=200),
    admin_user: dict = Depends(require_admin),
):
    """List registered users with optional search and filtering. Never returns password hashes."""
    if settings.db is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database service is unavailable",
        )

    query = {}
    if search and search.strip():
        term = search.strip()
        query["$or"] = [
            {"name": {"$regex": term, "$options": "i"}},
            {"email": {"$regex": term, "$options": "i"}},
        ]

    if role and role.strip() and role.strip() != "all":
        query["role"] = role.strip()

    if is_active is not None:
        query["is_active"] = is_active

    cursor = settings.db.users.find(query).sort("created_at", -1).skip(skip).limit(limit)
    users = await cursor.to_list(length=limit)

    results: List[AdminUserRead] = []
    for u in users:
        uid = str(u["_id"])
        # Get lecture count for this user
        lec_count = await settings.db.lectures.count_documents({"user_id": uid})
        results.append(
            AdminUserRead(
                id=uid,
                name=u.get("name", "User"),
                email=u["email"],
                role=u.get("role", "student"),
                is_active=u.get("is_active", True),
                lecture_count=lec_count,
                created_at=u.get("created_at"),
            )
        )

    return results


@router.post("/users", response_model=AdminUserRead, status_code=status.HTTP_201_CREATED)
async def create_user_by_admin(
    payload: AdminUserCreate,
    admin_user: dict = Depends(require_admin),
):
    """Admin creates a new user account (student, educator, or admin)."""
    if settings.db is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database service is unavailable",
        )

    users_col = settings.db.users
    existing = await users_col.find_one({"email": payload.email.lower().strip()})
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this email address already exists.",
        )

    hashed = hash_password(payload.password)
    user_doc = {
        "name": payload.name.strip(),
        "email": payload.email.lower().strip(),
        "hashed_password": hashed,
        "role": payload.role,
        "is_active": payload.is_active,
        "created_at": datetime.utcnow(),
    }
    result = await users_col.insert_one(user_doc)
    uid = str(result.inserted_id)

    return AdminUserRead(
        id=uid,
        name=user_doc["name"],
        email=user_doc["email"],
        role=user_doc["role"],
        is_active=user_doc["is_active"],
        lecture_count=0,
        created_at=user_doc["created_at"],
    )


@router.patch("/users/{user_id}", response_model=AdminUserRead)
async def update_user_by_admin(
    user_id: str,
    payload: AdminUserUpdate,
    admin_user: dict = Depends(require_admin),
):
    """Update user profile, role, or active status."""
    if settings.db is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database service is unavailable",
        )

    try:
        oid = ObjectId(user_id)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid user ID format",
        )

    target_user = await settings.db.users.find_one({"_id": oid})
    if not target_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    # Protect admin from demoting or deactivating their own self
    if str(oid) == admin_user["user_id"]:
        if payload.is_active is False:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="You cannot deactivate your own administrator account.",
            )
        if payload.role and payload.role != "admin":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="You cannot remove your own administrator role.",
            )

    updates = {}
    if payload.name is not None and payload.name.strip():
        updates["name"] = payload.name.strip()
    if payload.role is not None:
        updates["role"] = payload.role
    if payload.is_active is not None:
        updates["is_active"] = payload.is_active

    if updates:
        updates["updated_at"] = datetime.utcnow()
        await settings.db.users.update_one({"_id": oid}, {"$set": updates})

    updated_doc = await settings.db.users.find_one({"_id": oid})
    lec_count = await settings.db.lectures.count_documents({"user_id": user_id})

    return AdminUserRead(
        id=str(updated_doc["_id"]),
        name=updated_doc.get("name", "User"),
        email=updated_doc["email"],
        role=updated_doc.get("role", "student"),
        is_active=updated_doc.get("is_active", True),
        lecture_count=lec_count,
        created_at=updated_doc.get("created_at"),
    )


@router.post("/users/{user_id}/toggle-status", response_model=AdminUserRead)
async def toggle_user_active_status(
    user_id: str,
    admin_user: dict = Depends(require_admin),
):
    """Toggle a user's active/deactivated status. Deactivated users cannot log in."""
    if settings.db is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database service is unavailable",
        )

    try:
        oid = ObjectId(user_id)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid user ID format",
        )

    if str(oid) == admin_user["user_id"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You cannot toggle the active status of your own account.",
        )

    target_user = await settings.db.users.find_one({"_id": oid})
    if not target_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    current_status = target_user.get("is_active", True)
    new_status = not current_status

    await settings.db.users.update_one(
        {"_id": oid},
        {"$set": {"is_active": new_status, "updated_at": datetime.utcnow()}},
    )

    updated_doc = await settings.db.users.find_one({"_id": oid})
    lec_count = await settings.db.lectures.count_documents({"user_id": user_id})

    return AdminUserRead(
        id=str(updated_doc["_id"]),
        name=updated_doc.get("name", "User"),
        email=updated_doc["email"],
        role=updated_doc.get("role", "student"),
        is_active=updated_doc.get("is_active", True),
        lecture_count=lec_count,
        created_at=updated_doc.get("created_at"),
    )

```

[Back to Table of Contents](#2-table-of-contents)

---

<a id="backendapiauthpy"></a>
#### 16. `backend/api/auth.py`

**Path**: `backend/api/auth.py` &nbsp;|&nbsp; **Size**: 4.40 KB (4507 bytes) &nbsp;|&nbsp; **Language**: `python` &nbsp;|&nbsp; **Lines**: 122 lines

```python
# backend/api/auth.py

from fastapi import APIRouter, HTTPException, status, Depends
from bson import ObjectId
from datetime import datetime, timedelta
from pymongo.errors import DuplicateKeyError
from ..config import settings
from ..dependencies import get_current_user
from ..utils.password import hash_password, verify_password
from ..utils.jwt import create_access_token
from ..schemas.user import UserCreate, UserRead, Token
from ..schemas.auth import LoginIn

router = APIRouter()

@router.post("/register", response_model=Token, status_code=status.HTTP_201_CREATED)
async def register_user(payload: UserCreate):
    """Create a new user and return a JWT token.
    Public registration can only create 'student' or 'educator' accounts.
    Admin accounts cannot be registered publicly.
    """
    if settings.db is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database service is unavailable",
        )

    # Extra defense: explicitly reject any attempt to register as admin
    if getattr(payload, "role", "") == "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin accounts cannot be registered publicly. Use the administrative setup script.",
        )

    user_collection = settings.db.users
    existing = await user_collection.find_one({"email": payload.email.lower().strip()})
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this email already exists.",
        )

    hashed = hash_password(payload.password)
    user_doc = {
        "name": payload.name.strip(),
        "email": payload.email.lower().strip(),
        "hashed_password": hashed,
        "role": payload.role,
        "is_active": True,
        "created_at": datetime.utcnow(),
    }
    result = await user_collection.insert_one(user_doc)
    user_id = str(result.inserted_id)
    access_token = create_access_token({"sub": user_id, "role": payload.role})
    return Token(access_token=access_token)

@router.post("/login", response_model=Token)
async def login_user(payload: LoginIn):
    """Authenticate a user and return a JWT token.
    Returns sanitized error message without leaking user existence.
    """
    if settings.db is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database service is unavailable",
        )

    user_collection = settings.db.users
    user = await user_collection.find_one({"email": payload.email.lower().strip()})
    
    # Generic, secure invalid credentials error (prevents user enumeration)
    if not user or not verify_password(payload.password, user.get("hashed_password", "")):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    # Check if account has been deactivated by an administrator
    if not user.get("is_active", True):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account has been deactivated. Please contact an administrator.",
        )

    user_id = str(user["_id"])
    role = user.get("role", "student")
    access_token = create_access_token({"sub": user_id, "role": role})
    return Token(access_token=access_token)

@router.get("/me", response_model=UserRead)
async def get_current_user_profile(user_info: dict = Depends(get_current_user)):
    """Retrieve profile of the currently authenticated user. Never exposes password hash."""
    if settings.db is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database service is unavailable",
        )

    user_id = user_info["user_id"]
    try:
        oid = ObjectId(user_id)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid user ID format",
        )
    
    user = await settings.db.users.find_one({"_id": oid})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    
    return UserRead(
        id=str(user["_id"]),
        name=user.get("name", "User"),
        email=user["email"],
        role=user.get("role", "student"),
        is_active=user.get("is_active", True),
        created_at=user.get("created_at"),
    )

```

[Back to Table of Contents](#2-table-of-contents)

---

<a id="backendapihealthpy"></a>
#### 17. `backend/api/health.py`

**Path**: `backend/api/health.py` &nbsp;|&nbsp; **Size**: 0.15 KB (155 bytes) &nbsp;|&nbsp; **Language**: `python` &nbsp;|&nbsp; **Lines**: 9 lines

```python
# backend/api/health.py

from fastapi import APIRouter

router = APIRouter()

@router.get("/health")
async def health_check():
    return {"status": "ok"}

```

[Back to Table of Contents](#2-table-of-contents)

---

<a id="backendapilecturespy"></a>
#### 18. `backend/api/lectures.py`

**Path**: `backend/api/lectures.py` &nbsp;|&nbsp; **Size**: 23.59 KB (24160 bytes) &nbsp;|&nbsp; **Language**: `python` &nbsp;|&nbsp; **Lines**: 622 lines

```python
# backend/api/lectures.py

import os
import uuid
from pathlib import Path
from datetime import datetime
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, BackgroundTasks, status, Query
from fastapi.responses import FileResponse
from bson import ObjectId

from ..dependencies import get_current_user
from ..config import settings
from ..schemas.lecture import (
    LectureCreate,
    LectureRead,
    LectureStatusResponse,
    TranscriptRead,
    SummaryRead,
    KeywordsRead,
    FlashcardsRead,
    FlashcardGenerateRequest,
    FlashcardDeckUpdate,
    FlashcardShareResponse,
    SharedFlashcardsRead,
)
from ..processing_service import (
    process_lecture_background,
    generate_flashcards_for_lecture,
)

router = APIRouter()

# Ensure upload directory exists
UPLOAD_DIR = Path(__file__).resolve().parents[2] / "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

ALLOWED_EXTENSIONS = {
    ".pdf",
    ".txt",
    ".md",
    ".docx",
    ".doc",
    ".mp3",
    ".wav",
    ".m4a",
    ".mp4",
    ".webm",
}

ALLOWED_MIME = {
    "application/pdf",
    "text/plain",
    "text/markdown",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/msword",
    "audio/mpeg",
    "audio/mp3",
    "audio/wav",
    "audio/x-wav",
    "audio/mp4",
    "audio/x-m4a",
    "video/mp4",
    "video/webm",
    "application/octet-stream",
}
MAX_SIZE = 25 * 1024 * 1024  # 25 MB


@router.post("/upload", response_model=LectureRead, status_code=status.HTTP_201_CREATED)
async def upload_lecture(
    background_tasks: BackgroundTasks,
    title: str = Form(""),
    file: UploadFile = File(...),
    user: dict = Depends(get_current_user),
):
    """Validate and store a lecture file, persist metadata in MongoDB,
    and trigger asynchronous processing (extraction / transcription -> summarization -> keywords -> flashcards).
    """
    if settings.db is None:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Database is unavailable")

    file_ext = Path(file.filename or "").suffix.lower()
    if not file_ext or file_ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type ({file_ext}). Supported formats: PDF, DOCX, TXT, MD, MP3, WAV, MP4, WEBM.",
        )

    contents = await file.read()
    if len(contents) > MAX_SIZE:
        raise HTTPException(status_code=400, detail="File too large (maximum allowed size is 25 MB)")

    # Build unique safe storage path
    timestamp = int(datetime.utcnow().timestamp())
    clean_name = Path(file.filename).stem.replace(" ", "_")
    safe_filename = f"{timestamp}_{clean_name}{file_ext}"
    storage_path = UPLOAD_DIR / safe_filename

    with open(storage_path, "wb") as f:
        f.write(contents)

    resolved_title = title.strip() if title and title.strip() else Path(file.filename).stem

    lecture_doc = {
        "user_id": user["user_id"],
        "title": resolved_title,
        "original_filename": file.filename,
        "file_type": file.content_type or "application/octet-stream",
        "file_size": len(contents),
        "storage_path": str(storage_path),
        "upload_date": datetime.utcnow(),
        "processing_status": "uploaded",
        "status_message": "Queued for processing...",
        "error_message": None,
        "updated_at": datetime.utcnow(),
    }

    result = await settings.db.lectures.insert_one(lecture_doc)
    lecture_id = str(result.inserted_id)
    lecture_doc["id"] = lecture_id

    # Launch asynchronous background processing pipeline
    background_tasks.add_task(process_lecture_background, lecture_id=lecture_id, user_id=user["user_id"])

    return lecture_doc


@router.get("/my", response_model=list[LectureRead])
async def list_my_lectures(user: dict = Depends(get_current_user)):
    """List all lectures uploaded by the authenticated user in reverse chronological order."""
    if settings.db is None:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Database is unavailable")

    cursor = settings.db.lectures.find({"user_id": user["user_id"]}).sort("upload_date", -1)
    lectures = []
    async for doc in cursor:
        doc["id"] = str(doc["_id"])
        lectures.append(doc)
    return lectures


@router.get("/{lecture_id}", response_model=LectureRead)
async def get_lecture(lecture_id: str, user: dict = Depends(get_current_user)):
    """Get metadata for a specific lecture belonging to the user."""
    if settings.db is None:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Database is unavailable")

    try:
        oid = ObjectId(lecture_id)
    except Exception:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid lecture ID format")

    query = {"_id": oid}
    if user.get("role") != "admin":
        query["user_id"] = user["user_id"]

    doc = await settings.db.lectures.find_one(query)
    if not doc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lecture not found")

    doc["id"] = str(doc["_id"])
    return doc


@router.get("/{lecture_id}/status", response_model=LectureStatusResponse)
async def get_lecture_status(lecture_id: str, user: dict = Depends(get_current_user)):
    """Get live processing status and artifact readiness of a lecture belonging to the authenticated user."""
    if settings.db is None:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Database is unavailable")

    try:
        oid = ObjectId(lecture_id)
    except Exception:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid lecture ID format")

    doc = await settings.db.lectures.find_one({"_id": oid, "user_id": user["user_id"]})
    if not doc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lecture not found")

    # Check existence of processed artifacts
    t_doc = await settings.db.transcripts.find_one({"lecture_id": lecture_id, "user_id": user["user_id"]}, {"_id": 1})
    s_doc = await settings.db.summaries.find_one({"lecture_id": lecture_id, "user_id": user["user_id"]}, {"_id": 1})
    k_doc = await settings.db.keywords.find_one({"lecture_id": lecture_id, "user_id": user["user_id"]}, {"_id": 1})
    f_doc = await settings.db.flashcards.find_one({"lecture_id": lecture_id, "user_id": user["user_id"]}, {"_id": 1})

    return {
        "lecture_id": lecture_id,
        "processing_status": doc.get("processing_status", "uploaded"),
        "status_message": doc.get("status_message"),
        "error_message": doc.get("error_message"),
        "has_transcript": t_doc is not None,
        "has_summary": s_doc is not None,
        "has_keywords": k_doc is not None,
        "has_flashcards": f_doc is not None,
        "updated_at": doc.get("updated_at") or doc.get("upload_date"),
    }


@router.get("/{lecture_id}/transcript", response_model=TranscriptRead)
async def get_lecture_transcript(lecture_id: str, user: dict = Depends(get_current_user)):
    """Retrieve the extracted text or audio transcript for a lecture belonging to the user."""
    if settings.db is None:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Database is unavailable")

    try:
        oid = ObjectId(lecture_id)
    except Exception:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid lecture ID format")

    lec = await settings.db.lectures.find_one({"_id": oid, "user_id": user["user_id"]})
    if not lec:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lecture not found")

    transcript = await settings.db.transcripts.find_one({"lecture_id": lecture_id, "user_id": user["user_id"]})
    if not transcript:
        if lec.get("processing_status") == "failed":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Processing failed: {lec.get('error_message', 'Unknown extraction error')}",
            )
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Transcript not ready yet (Current status: {lec.get('processing_status', 'uploaded')}).",
        )

    transcript["id"] = str(transcript["_id"])
    return transcript


@router.get("/{lecture_id}/summary", response_model=SummaryRead)
async def get_lecture_summary(lecture_id: str, user: dict = Depends(get_current_user)):
    """Retrieve the generated summary and key points for a lecture belonging to the user."""
    if settings.db is None:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Database is unavailable")

    try:
        oid = ObjectId(lecture_id)
    except Exception:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid lecture ID format")

    lec = await settings.db.lectures.find_one({"_id": oid, "user_id": user["user_id"]})
    if not lec:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lecture not found")

    summary_doc = await settings.db.summaries.find_one({"lecture_id": lecture_id, "user_id": user["user_id"]})
    if not summary_doc:
        if lec.get("processing_status") == "failed":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Processing failed: {lec.get('error_message', 'Summarization failed')}",
            )
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Summary not ready yet (Current status: {lec.get('processing_status', 'uploaded')}).",
        )

    summary_doc["id"] = str(summary_doc["_id"])
    return summary_doc


@router.get("/{lecture_id}/keywords", response_model=KeywordsRead)
async def get_lecture_keywords(lecture_id: str, user: dict = Depends(get_current_user)):
    """Retrieve the extracted keywords and concepts for a lecture belonging to the user."""
    if settings.db is None:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Database is unavailable")

    try:
        oid = ObjectId(lecture_id)
    except Exception:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid lecture ID format")

    lec = await settings.db.lectures.find_one({"_id": oid, "user_id": user["user_id"]})
    if not lec:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lecture not found")

    keywords_doc = await settings.db.keywords.find_one({"lecture_id": lecture_id, "user_id": user["user_id"]})
    if not keywords_doc:
        if lec.get("processing_status") == "failed":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Processing failed: {lec.get('error_message', 'Keyword extraction failed')}",
            )
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Keywords not ready yet (Current status: {lec.get('processing_status', 'uploaded')}).",
        )

    keywords_doc["id"] = str(keywords_doc["_id"])
    return keywords_doc


@router.get("/{lecture_id}/flashcards", response_model=FlashcardsRead)
async def get_lecture_flashcards(lecture_id: str, user: dict = Depends(get_current_user)):
    """Retrieve the generated flashcards for a lecture belonging to the user."""
    if settings.db is None:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Database is unavailable")

    try:
        oid = ObjectId(lecture_id)
    except Exception:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid lecture ID format")

    lec = await settings.db.lectures.find_one({"_id": oid, "user_id": user["user_id"]})
    if not lec:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lecture not found")

    flashcards_doc = await settings.db.flashcards.find_one({"lecture_id": lecture_id, "user_id": user["user_id"]})
    if not flashcards_doc:
        if lec.get("processing_status") == "failed":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Processing failed: {lec.get('error_message', 'Flashcard generation failed')}",
            )
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Flashcards not ready yet (Current status: {lec.get('processing_status', 'uploaded')}).",
        )

    flashcards_doc["id"] = str(flashcards_doc["_id"])
    return flashcards_doc


@router.post("/{lecture_id}/generate-flashcards", response_model=FlashcardsRead)
async def regenerate_flashcards(
    lecture_id: str,
    payload: Optional[FlashcardGenerateRequest] = None,
    count: Optional[int] = Query(default=None, ge=1, le=10),
    user: dict = Depends(get_current_user),
):
    """Regenerate flashcards on demand for a lecture scoped to the user."""
    if settings.db is None:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Database is unavailable")

    try:
        oid = ObjectId(lecture_id)
    except Exception:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid lecture ID format")

    lec = await settings.db.lectures.find_one({"_id": oid, "user_id": user["user_id"]})
    if not lec:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lecture not found")

    # Support count from either JSON body or query param
    req_count = None
    if payload and payload.count is not None:
        req_count = payload.count
    elif count is not None:
        req_count = count

    card_count = min(req_count if req_count else settings.default_flashcard_count or 10, 10)

    try:
        flashcards_doc = await generate_flashcards_for_lecture(
            lecture_id=lecture_id,
            user_id=user["user_id"],
            count=card_count,
        )
        return flashcards_doc
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to generate flashcards: {str(exc)}",
        )


@router.post("/{lecture_id}/retry", response_model=LectureStatusResponse)
async def retry_lecture_processing(
    lecture_id: str,
    background_tasks: BackgroundTasks,
    user: dict = Depends(get_current_user),
):
    """Re-trigger background extraction/transcription and analysis pipeline without re-uploading."""
    if settings.db is None:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Database is unavailable")

    try:
        oid = ObjectId(lecture_id)
    except Exception:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid lecture ID format")

    doc = await settings.db.lectures.find_one({"_id": oid, "user_id": user["user_id"]})
    if not doc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lecture not found")

    # Reset status and enqueue background pipeline
    await settings.db.lectures.update_one(
        {"_id": oid},
        {
            "$set": {
                "processing_status": "uploaded",
                "status_message": "Re-queued for processing...",
                "error_message": None,
                "updated_at": datetime.utcnow(),
            }
        },
    )

    background_tasks.add_task(process_lecture_background, lecture_id=lecture_id, user_id=user["user_id"])

    return {
        "lecture_id": lecture_id,
        "processing_status": "uploaded",
        "status_message": "Re-queued for processing...",
        "error_message": None,
        "has_transcript": False,
        "has_summary": False,
        "has_keywords": False,
        "has_flashcards": False,
        "updated_at": datetime.utcnow(),
    }


@router.delete("/{lecture_id}", status_code=status.HTTP_200_OK)
async def delete_lecture(lecture_id: str, user: dict = Depends(get_current_user)):
    """Delete a lecture record, stored file, and all associated transcripts, summaries, keywords, and flashcards."""
    if settings.db is None:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Database is unavailable")

    try:
        oid = ObjectId(lecture_id)
    except Exception:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid lecture ID format")

    doc = await settings.db.lectures.find_one({"_id": oid, "user_id": user["user_id"]})
    if not doc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lecture not found")

    # Remove the physical file if it exists
    file_path = Path(doc.get("storage_path", ""))
    if file_path.is_file():
        try:
            file_path.unlink()
        except Exception:
            pass

    # Delete lecture and all cascading child documents
    await settings.db.lectures.delete_one({"_id": oid})
    await settings.db.transcripts.delete_one({"lecture_id": lecture_id, "user_id": user["user_id"]})
    await settings.db.summaries.delete_one({"lecture_id": lecture_id, "user_id": user["user_id"]})
    await settings.db.keywords.delete_one({"lecture_id": lecture_id, "user_id": user["user_id"]})
    await settings.db.flashcards.delete_one({"lecture_id": lecture_id, "user_id": user["user_id"]})

    return {"message": "Lecture and all associated materials deleted successfully", "id": lecture_id}


@router.get("/{lecture_id}/file")
async def download_lecture_file(lecture_id: str, user: dict = Depends(get_current_user)):
    """Download the original uploaded file for a lecture."""
    if settings.db is None:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Database is unavailable")

    try:
        oid = ObjectId(lecture_id)
    except Exception:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid lecture ID format")

    doc = await settings.db.lectures.find_one({"_id": oid, "user_id": user["user_id"]})
    if not doc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lecture not found")

    file_path = Path(doc.get("storage_path", ""))
    if not file_path.is_file():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Uploaded file is missing on server")

    return FileResponse(
        path=str(file_path),
        filename=doc.get("original_filename", "lecture_file"),
        media_type=doc.get("file_type", "application/octet-stream"),
    )


@router.put("/{lecture_id}/flashcards", response_model=FlashcardsRead)
async def update_flashcard_deck(
    lecture_id: str,
    payload: FlashcardDeckUpdate,
    user: dict = Depends(get_current_user),
):
    """Educator / Owner can edit, add, or delete flashcards in the deck and save changes."""
    if settings.db is None:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Database is unavailable")

    try:
        oid = ObjectId(lecture_id)
    except Exception:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid lecture ID format")

    # Check ownership or admin
    query = {"_id": oid}
    if user.get("role") != "admin":
        query["user_id"] = user["user_id"]

    lec = await settings.db.lectures.find_one(query)
    if not lec:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lecture not found")

    # Serialize card items
    raw_cards = []
    for c in payload.cards:
        raw_cards.append({
            "id": c.id if c.id else str(uuid.uuid4())[:8],
            "question": c.question.strip(),
            "answer": c.answer.strip(),
            "category": c.category.strip() if c.category else "Key Concept",
        })

    update_fields = {
        "cards": raw_cards,
        "total_cards": len(raw_cards),
        "updated_at": datetime.utcnow(),
    }

    await settings.db.flashcards.update_one(
        {"lecture_id": lecture_id},
        {
            "$set": update_fields,
            "$setOnInsert": {
                "lecture_id": lecture_id,
                "user_id": lec.get("user_id", user["user_id"]),
                "model": "educator-curated",
                "created_at": datetime.utcnow(),
            },
        },
        upsert=True,
    )

    saved_doc = await settings.db.flashcards.find_one({"lecture_id": lecture_id})
    saved_doc["id"] = str(saved_doc["_id"])
    if "user_id" not in saved_doc:
        saved_doc["user_id"] = lec.get("user_id", user["user_id"])
    if "model" not in saved_doc:
        saved_doc["model"] = "educator-curated"
    if "created_at" not in saved_doc:
        saved_doc["created_at"] = saved_doc.get("updated_at", datetime.utcnow())
    return saved_doc


@router.post("/{lecture_id}/share", response_model=FlashcardShareResponse)
async def toggle_flashcard_sharing(
    lecture_id: str,
    user: dict = Depends(get_current_user),
):
    """Toggle public sharing for this lecture's flashcards and return a shareable URL."""
    if settings.db is None:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Database is unavailable")

    try:
        oid = ObjectId(lecture_id)
    except Exception:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid lecture ID format")

    query = {"_id": oid}
    if user.get("role") != "admin":
        query["user_id"] = user["user_id"]

    lec = await settings.db.lectures.find_one(query)
    if not lec:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lecture not found")

    current_shared = lec.get("is_shared", False)
    new_shared = not current_shared
    share_slug = lec.get("share_slug")

    if not share_slug:
        share_slug = str(uuid.uuid4()).replace("-", "")[:12]

    # Update lecture & flashcards document
    await settings.db.lectures.update_one(
        {"_id": oid},
        {"$set": {"is_shared": new_shared, "share_slug": share_slug, "updated_at": datetime.utcnow()}},
    )
    await settings.db.flashcards.update_one(
        {"lecture_id": lecture_id},
        {"$set": {"is_shared": new_shared, "share_slug": share_slug, "updated_at": datetime.utcnow()}},
    )

    return FlashcardShareResponse(
        share_id=share_slug,
        is_shared=new_shared,
        share_url=f"/shared/flashcards/{share_slug}",
    )


@router.get("/shared/{share_id}", response_model=SharedFlashcardsRead)
async def get_shared_flashcards(share_id: str):
    """Public read-only endpoint for shared flashcards. Accessible without authentication."""
    if settings.db is None:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Database is unavailable")

    # Find by share_slug in lectures
    lec = await settings.db.lectures.find_one({"share_slug": share_id, "is_shared": True})
    if not lec:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Shared study set not found or sharing has been disabled by the educator.",
        )

    lecture_id = str(lec["_id"])
    flashcards_doc = await settings.db.flashcards.find_one({"lecture_id": lecture_id})
    if not flashcards_doc or not flashcards_doc.get("cards"):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No flashcards found for this shared set.",
        )

    # Get educator name
    educator_name = "Educator"
    try:
        user_doc = await settings.db.users.find_one({"_id": ObjectId(lec["user_id"])})
        if user_doc:
            educator_name = user_doc.get("name", "Educator")
    except Exception:
        pass

    return SharedFlashcardsRead(
        lecture_title=lec.get("title", "Lecture Study Set"),
        educator_name=educator_name,
        total_cards=len(flashcards_doc.get("cards", [])),
        cards=flashcards_doc.get("cards", []),
        model=flashcards_doc.get("model"),
        created_at=flashcards_doc.get("created_at"),
    )

```

[Back to Table of Contents](#2-table-of-contents)

---

### Category: Backend - Database Models

<a id="backendmodelslecturepy"></a>
#### 19. `backend/models/lecture.py`

**Path**: `backend/models/lecture.py` &nbsp;|&nbsp; **Size**: 1.02 KB (1048 bytes) &nbsp;|&nbsp; **Language**: `python` &nbsp;|&nbsp; **Lines**: 34 lines

```python
# backend/models/lecture.py

from datetime import datetime
from typing import Optional

class Lecture:
    def __init__(
        self,
        *,
        id: str,
        user_id: str,
        title: str,
        original_filename: str,
        file_type: str,
        file_size: int,
        storage_path: str,
        upload_date: Optional[datetime] = None,
        processing_status: str = "uploaded",
        status_message: Optional[str] = None,
        error_message: Optional[str] = None,
        updated_at: Optional[datetime] = None,
    ):
        self.id = id
        self.user_id = user_id
        self.title = title
        self.original_filename = original_filename
        self.file_type = file_type
        self.file_size = file_size
        self.storage_path = storage_path
        self.upload_date = upload_date or datetime.utcnow()
        self.processing_status = processing_status
        self.status_message = status_message
        self.error_message = error_message
        self.updated_at = updated_at or datetime.utcnow()

```

[Back to Table of Contents](#2-table-of-contents)

---

<a id="backendmodelsuserpy"></a>
#### 20. `backend/models/user.py`

**Path**: `backend/models/user.py` &nbsp;|&nbsp; **Size**: 0.57 KB (579 bytes) &nbsp;|&nbsp; **Language**: `python` &nbsp;|&nbsp; **Lines**: 15 lines

```python
# backend/models/user.py

from typing import Optional
from datetime import datetime

# This is a plain Python class used to type hint MongoDB documents.
# Motor returns dicts; we keep the structure simple.
class User:
    def __init__(self, *, id: str, name: str, email: str, hashed_password: str, role: str, created_at: Optional[datetime] = None):
        self.id = id
        self.name = name
        self.email = email
        self.hashed_password = hashed_password
        self.role = role  # "student" or "educator"
        self.created_at = created_at or datetime.utcnow()

```

[Back to Table of Contents](#2-table-of-contents)

---

### Category: Backend - Schemas & Validation

<a id="backendschemasinitpy"></a>
#### 21. `backend/schemas/__init__.py`

**Path**: `backend/schemas/__init__.py` &nbsp;|&nbsp; **Size**: 0.03 KB (30 bytes) &nbsp;|&nbsp; **Language**: `python` &nbsp;|&nbsp; **Lines**: 1 lines

```python
# backend/schemas/__init__.py

```

[Back to Table of Contents](#2-table-of-contents)

---

<a id="backendschemasauthpy"></a>
#### 22. `backend/schemas/auth.py`

**Path**: `backend/schemas/auth.py` &nbsp;|&nbsp; **Size**: 0.16 KB (167 bytes) &nbsp;|&nbsp; **Language**: `python` &nbsp;|&nbsp; **Lines**: 7 lines

```python
# backend/schemas/auth.py

from pydantic import BaseModel, EmailStr, Field

class LoginIn(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6)

```

[Back to Table of Contents](#2-table-of-contents)

---

<a id="backendschemaslecturepy"></a>
#### 23. `backend/schemas/lecture.py`

**Path**: `backend/schemas/lecture.py` &nbsp;|&nbsp; **Size**: 2.85 KB (2923 bytes) &nbsp;|&nbsp; **Language**: `python` &nbsp;|&nbsp; **Lines**: 109 lines

```python
# backend/schemas/lecture.py

from pydantic import BaseModel, Field
from typing import Literal, Optional, Any
from datetime import datetime

class LectureCreate(BaseModel):
    title: str = Field(..., max_length=200)

class LectureStatusResponse(BaseModel):
    lecture_id: str
    processing_status: str  # "uploaded", "extracting", "transcribing", "summarizing", "extracting_keywords", "generating_flashcards", "completed", "failed"
    status_message: Optional[str] = None
    error_message: Optional[str] = None
    has_transcript: bool = False
    has_summary: bool = False
    has_keywords: bool = False
    has_flashcards: bool = False
    updated_at: Optional[datetime] = None

class TranscriptRead(BaseModel):
    id: str
    lecture_id: str
    user_id: str
    text: str
    source_type: str  # "document" or "audio"
    word_count: int
    character_count: int
    metadata: dict[str, Any] = Field(default_factory=dict)
    created_at: datetime

class SummaryRead(BaseModel):
    id: str
    lecture_id: str
    user_id: str
    summary_text: str
    key_points: list[str] = Field(default_factory=list)
    word_count: int
    character_count: int
    chunks_processed: int
    model: str
    created_at: datetime

class KeywordItem(BaseModel):
    term: str
    score: float
    frequency: int = 1

class KeywordsRead(BaseModel):
    id: str
    lecture_id: str
    user_id: str
    keywords: list[KeywordItem]
    method: str
    total_keywords: int
    created_at: datetime

class FlashcardItem(BaseModel):
    id: str
    question: str
    answer: str
    category: Optional[str] = None

class FlashcardsRead(BaseModel):
    id: str
    lecture_id: str
    user_id: str
    cards: list[FlashcardItem]
    total_cards: int
    model: str
    is_shared: Optional[bool] = False
    share_slug: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

class FlashcardDeckUpdate(BaseModel):
    cards: list[FlashcardItem]

class FlashcardShareResponse(BaseModel):
    share_id: str
    is_shared: bool
    share_url: str

class SharedFlashcardsRead(BaseModel):
    lecture_title: str
    educator_name: str
    total_cards: int
    cards: list[FlashcardItem]
    model: Optional[str] = None
    created_at: Optional[datetime] = None

class FlashcardGenerateRequest(BaseModel):
    count: Optional[int] = Field(default=None, ge=1, le=10)

class LectureRead(BaseModel):
    id: str
    user_id: str
    title: str
    original_filename: str
    file_type: str
    file_size: int
    storage_path: str
    upload_date: datetime
    processing_status: str  # "uploaded", "extracting", "transcribing", "summarizing", "extracting_keywords", "generating_flashcards", "completed", "failed"
    status_message: Optional[str] = None
    error_message: Optional[str] = None
    is_shared: Optional[bool] = False
    share_slug: Optional[str] = None
    updated_at: Optional[datetime] = None

```

[Back to Table of Contents](#2-table-of-contents)

---

<a id="backendschemasuserpy"></a>
#### 24. `backend/schemas/user.py`

**Path**: `backend/schemas/user.py` &nbsp;|&nbsp; **Size**: 2.02 KB (2069 bytes) &nbsp;|&nbsp; **Language**: `python` &nbsp;|&nbsp; **Lines**: 74 lines

```python
# backend/schemas/user.py

from pydantic import BaseModel, EmailStr, Field, validator
from typing import Literal, Optional, List
from datetime import datetime

class UserCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    password: str = Field(..., min_length=6)
    # Public registration can ONLY create student or educator; NEVER admin
    role: Literal["student", "educator"]

    @validator("password")
    def strip_spaces(cls, v: str) -> str:
        return v.strip()

class UserRead(BaseModel):
    id: str
    name: str
    email: EmailStr
    role: Literal["student", "educator", "admin"]
    is_active: bool = True
    created_at: Optional[datetime] = None

class AdminUserCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    password: str = Field(..., min_length=6)
    role: Literal["student", "educator", "admin"] = "student"
    is_active: bool = True

class AdminUserUpdate(BaseModel):
    name: Optional[str] = Field(default=None, min_length=1, max_length=100)
    role: Optional[Literal["student", "educator", "admin"]] = None
    is_active: Optional[bool] = None

class AdminUserRead(BaseModel):
    id: str
    name: str
    email: EmailStr
    role: str
    is_active: bool
    lecture_count: int = 0
    created_at: Optional[datetime] = None

class AdminStatsUsers(BaseModel):
    total: int = 0
    active: int = 0
    deactivated: int = 0
    students: int = 0
    educators: int = 0
    admins: int = 0

class AdminStatsLectures(BaseModel):
    total: int = 0
    with_transcripts: int = 0
    with_summaries: int = 0
    with_flashcards: int = 0

class AdminStatsResponse(BaseModel):
    total_users: int = 0
    active_users: int = 0
    deactivated_users: int = 0
    students_count: int = 0
    educators_count: int = 0
    admins_count: int = 0
    total_lectures: int = 0
    users: Optional[AdminStatsUsers] = None
    lectures: Optional[AdminStatsLectures] = None

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

```

[Back to Table of Contents](#2-table-of-contents)

---

### Category: Backend - Services & Background Tasks

<a id="backendservicesinitpy"></a>
#### 25. `backend/services/__init__.py`

**Path**: `backend/services/__init__.py` &nbsp;|&nbsp; **Size**: 0.03 KB (31 bytes) &nbsp;|&nbsp; **Language**: `python` &nbsp;|&nbsp; **Lines**: 1 lines

```python
# backend/services/__init__.py

```

[Back to Table of Contents](#2-table-of-contents)

---

<a id="backendservicesprocessingservicepy"></a>
#### 26. `backend/services/processing_service.py`

**Path**: `backend/services/processing_service.py` &nbsp;|&nbsp; **Size**: 0.56 KB (573 bytes) &nbsp;|&nbsp; **Language**: `python` &nbsp;|&nbsp; **Lines**: 22 lines

```python
# backend/services/processing_service.py
# Re-exporting from backend.processing_service for flexible import paths

from ..processing_service import (
    extract_text_from_pdf,
    extract_text_from_docx,
    extract_text_from_txt,
    extract_audio_from_video,
    transcribe_audio_hf,
    process_lecture_background,
    update_lecture_status,
)

__all__ = [
    "extract_text_from_pdf",
    "extract_text_from_docx",
    "extract_text_from_txt",
    "extract_audio_from_video",
    "transcribe_audio_hf",
    "process_lecture_background",
    "update_lecture_status",
]

```

[Back to Table of Contents](#2-table-of-contents)

---

### Category: Backend - Security & Token Utilities

<a id="backendutilsjwtpy"></a>
#### 27. `backend/utils/jwt.py`

**Path**: `backend/utils/jwt.py` &nbsp;|&nbsp; **Size**: 0.86 KB (877 bytes) &nbsp;|&nbsp; **Language**: `python` &nbsp;|&nbsp; **Lines**: 24 lines

```python
# backend/utils/jwt.py

from datetime import datetime, timedelta
from jose import jwt
from ..config import settings


def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    """Create a JWT token with given payload.
    `data` should contain at least a ``sub`` field (the user id).
    """
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=settings.access_token_expire_minutes))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.jwt_secret_key, algorithm=settings.jwt_algorithm)
    return encoded_jwt


def decode_access_token(token: str) -> dict:
    """Decode a JWT token and return its payload.
    Raises ``jose.JWTError`` on failure.
    """
    payload = jwt.decode(token, settings.jwt_secret_key, algorithms=[settings.jwt_algorithm])
    return payload

```

[Back to Table of Contents](#2-table-of-contents)

---

<a id="backendutilspasswordpy"></a>
#### 28. `backend/utils/password.py`

**Path**: `backend/utils/password.py` &nbsp;|&nbsp; **Size**: 0.83 KB (845 bytes) &nbsp;|&nbsp; **Language**: `python` &nbsp;|&nbsp; **Lines**: 26 lines

```python
# backend/utils/password.py

"""Utility functions for password hashing and verification using native bcrypt."""

import bcrypt


def hash_password(password: str) -> str:
    """Return a bcrypt hash for password."""
    if not password:
        raise ValueError("Password must not be empty")
    pwd_bytes = password.encode("utf-8")[:72]
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(pwd_bytes, salt).decode("utf-8")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Return True when plain_password matches hashed_password."""
    if not plain_password or not hashed_password:
        return False
    pwd_bytes = plain_password.encode("utf-8")[:72]
    hashed_bytes = hashed_password.encode("utf-8")
    try:
        return bcrypt.checkpw(pwd_bytes, hashed_bytes)
    except Exception:
        return False

```

[Back to Table of Contents](#2-table-of-contents)

---

### Category: Backend - Management Scripts

<a id="backendscriptsseedadminpy"></a>
#### 29. `backend/scripts/seed_admin.py`

**Path**: `backend/scripts/seed_admin.py` &nbsp;|&nbsp; **Size**: 4.80 KB (4918 bytes) &nbsp;|&nbsp; **Language**: `python` &nbsp;|&nbsp; **Lines**: 148 lines

```python
# backend/scripts/seed_admin.py
"""Secure setup and seeding script to provision administrator accounts.
Admin accounts can NEVER be created through public registration.
Usage:
    Interactive:
        python -m backend.scripts.seed_admin
    With arguments:
        python -m backend.scripts.seed_admin --email admin@summify.io --name "Admin User" --password "SecureAdminPass123!"
"""

import sys
import os
import argparse
import asyncio
import getpass
from datetime import datetime
from dotenv import load_dotenv

# Ensure backend root is on Python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

load_dotenv("backend/.env")
load_dotenv(".env")

from backend.config import settings
from backend.utils.password import hash_password
from motor.motor_asyncio import AsyncIOMotorClient

try:
    import certifi
    CA_FILE = certifi.where()
except ImportError:
    CA_FILE = None


async def seed_admin(email: str, name: str, password: str) -> None:
    if not email or "@" not in email:
        print("❌ Error: A valid email address is required.")
        sys.exit(1)
    if not password or len(password) < 6:
        print("❌ Error: Password must be at least 6 characters long.")
        sys.exit(1)
    if not name:
        name = "Administrator"

    print(f"\n🔐 Connecting to MongoDB Atlas to provision admin account...")
    kwargs = {}
    if CA_FILE:
        kwargs["tlsCAFile"] = CA_FILE

    client = AsyncIOMotorClient(
        settings.mongodb_uri,
        serverSelectionTimeoutMS=5000,
        **kwargs
    )
    
    uri_clean = settings.mongodb_uri.split("?")[0]
    db_name = uri_clean.rsplit("/", 1)[-1]
    if not db_name or db_name.startswith("mongodb"):
        db_name = "summify"

    db = client[db_name]

    try:
        await client.admin.command("ping")
    except Exception as e:
        print(f"❌ Failed to connect to MongoDB Atlas: {e}")
        print("💡 Ensure your IP is whitelisted in MongoDB Atlas Network Access.")
        sys.exit(1)

    clean_email = email.lower().strip()
    existing = await db.users.find_one({"email": clean_email})
    hashed = hash_password(password)

    if existing:
        print(f"ℹ️ User with email '{clean_email}' already exists (Current role: {existing.get('role')}).")
        confirm = input("Would you like to promote this account to 'admin' and update the password? [y/N]: ").strip().lower()
        if confirm == "y":
            await db.users.update_one(
                {"_id": existing["_id"]},
                {
                    "$set": {
                        "name": name.strip(),
                        "role": "admin",
                        "is_active": True,
                        "hashed_password": hashed,
                        "updated_at": datetime.utcnow(),
                    }
                }
            )
            print(f"✅ Successfully promoted '{clean_email}' to Administrator with new password!")
        else:
            print("Operation cancelled. No changes made.")
    else:
        doc = {
            "name": name.strip(),
            "email": clean_email,
            "hashed_password": hashed,
            "role": "admin",
            "is_active": True,
            "created_at": datetime.utcnow(),
        }
        res = await db.users.insert_one(doc)
        print(f"✅ Administrator account created successfully!")
        print(f"   • User ID: {res.inserted_id}")
        print(f"   • Name:    {name.strip()}")
        print(f"   • Email:   {clean_email}")
        print(f"   • Role:    admin")
        print(f"   • Active:  True\n")

    client.close()


def main():
    parser = argparse.ArgumentParser(description="Seed an Administrator account for Summify.")
    parser.add_argument("--email", help="Admin email address")
    parser.add_argument("--name", default="Administrator", help="Admin full name")
    parser.add_argument("--password", help="Admin password (leave blank for interactive prompt)")

    args = parser.parse_args()

    email = args.email
    name = args.name
    password = args.password

    if not email:
        print("==================================================")
        print("   Summify Administrator Account Provisioning     ")
        print("==================================================")
        email = input("Admin Email: ").strip()

    if not name or name == "Administrator":
        interactive_name = input(f"Admin Full Name [{name}]: ").strip()
        if interactive_name:
            name = interactive_name

    if not password:
        password = getpass.getpass("Admin Password: ").strip()
        confirm_pass = getpass.getpass("Confirm Password: ").strip()
        if password != confirm_pass:
            print("❌ Passwords do not match.")
            sys.exit(1)

    asyncio.run(seed_admin(email, name, password))


if __name__ == "__main__":
    main()

```

[Back to Table of Contents](#2-table-of-contents)

---

### Category: Backend - Test Suite

<a id="backendtestsinitpy"></a>
#### 30. `backend/tests/__init__.py`

**Path**: `backend/tests/__init__.py` &nbsp;|&nbsp; **Size**: 0.03 KB (28 bytes) &nbsp;|&nbsp; **Language**: `python` &nbsp;|&nbsp; **Lines**: 1 lines

```python
# backend/tests/__init__.py

```

[Back to Table of Contents](#2-table-of-contents)

---

<a id="backendtestsconftestpy"></a>
#### 31. `backend/tests/conftest.py`

**Path**: `backend/tests/conftest.py` &nbsp;|&nbsp; **Size**: 4.44 KB (4542 bytes) &nbsp;|&nbsp; **Language**: `python` &nbsp;|&nbsp; **Lines**: 145 lines

```python
# backend/tests/conftest.py

import os
import sys
import pytest
import asyncio
from datetime import datetime
from starlette.testclient import TestClient
from dotenv import load_dotenv

# Ensure root workspace is in sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

load_dotenv("backend/.env")
load_dotenv(".env")

from backend.main import app
from backend.config import settings, Settings
from backend.utils.password import hash_password
from backend.utils.jwt import create_access_token

try:
    from mongomock_motor import AsyncMongoMockClient
    USE_MOCK = True
except ImportError:
    from motor.motor_asyncio import AsyncIOMotorClient
    USE_MOCK = False



@pytest.fixture(scope="function")
async def test_db():
    """Fixture providing an isolated test database with fresh state per test."""
    if USE_MOCK:
        client = AsyncMongoMockClient()
        db = client["summify_test"]
    else:
        client = AsyncIOMotorClient(settings.mongodb_uri)
        db = client["summify_test"]
        # Clear collections before test
        for col in ["users", "lectures", "transcripts", "summaries", "keywords", "flashcards"]:
            await db[col].delete_many({})

    # Set as global active db for FastAPI app
    Settings.db = db

    yield db

    # Cleanup after test
    if not USE_MOCK:
        for col in ["users", "lectures", "transcripts", "summaries", "keywords", "flashcards"]:
            await db[col].delete_many({})
        client.close()


from unittest.mock import patch, AsyncMock

@pytest.fixture
def client(test_db):
    """FastAPI TestClient with isolated test database attached."""
    Settings.db = test_db
    with patch("backend.main.connect_to_mongo", new_callable=AsyncMock), \
         patch("backend.main.close_mongo_connection", new_callable=AsyncMock), \
         patch("backend.database.connect_to_mongo", new_callable=AsyncMock), \
         patch("backend.database.close_mongo_connection", new_callable=AsyncMock):
        with TestClient(app) as test_client:
            Settings.db = test_db
            yield test_client


@pytest.fixture
async def seeded_users(test_db):
    """Seed student, educator, admin, and inactive accounts into the test database."""
    users_col = test_db.users

    # 1. Student User
    student_doc = {
        "name": "Alice Student",
        "email": "student@summify.io",
        "hashed_password": hash_password("StudentPass123!"),
        "role": "student",
        "is_active": True,
        "created_at": datetime.utcnow(),
    }
    s_res = await users_col.insert_one(student_doc)
    student_id = str(s_res.inserted_id)

    # 2. Educator User
    educator_doc = {
        "name": "Dr. Bob Educator",
        "email": "educator@summify.io",
        "hashed_password": hash_password("EducatorPass123!"),
        "role": "educator",
        "is_active": True,
        "created_at": datetime.utcnow(),
    }
    e_res = await users_col.insert_one(educator_doc)
    educator_id = str(e_res.inserted_id)

    # 3. Admin User
    admin_doc = {
        "name": "Super Admin",
        "email": "admin@summify.io",
        "hashed_password": hash_password("AdminPass123!"),
        "role": "admin",
        "is_active": True,
        "created_at": datetime.utcnow(),
    }
    a_res = await users_col.insert_one(admin_doc)
    admin_id = str(a_res.inserted_id)

    # 4. Inactive / Deactivated User
    inactive_doc = {
        "name": "Inactive User",
        "email": "inactive@summify.io",
        "hashed_password": hash_password("InactivePass123!"),
        "role": "student",
        "is_active": False,
        "created_at": datetime.utcnow(),
    }
    i_res = await users_col.insert_one(inactive_doc)
    inactive_id = str(i_res.inserted_id)

    return {
        "student": {
            "id": student_id,
            "email": "student@summify.io",
            "token": create_access_token({"sub": student_id, "role": "student"}),
        },
        "educator": {
            "id": educator_id,
            "email": "educator@summify.io",
            "token": create_access_token({"sub": educator_id, "role": "educator"}),
        },
        "admin": {
            "id": admin_id,
            "email": "admin@summify.io",
            "token": create_access_token({"sub": admin_id, "role": "admin"}),
        },
        "inactive": {
            "id": inactive_id,
            "email": "inactive@summify.io",
            "token": create_access_token({"sub": inactive_id, "role": "student"}),
        },
    }

```

[Back to Table of Contents](#2-table-of-contents)

---

<a id="backendteststestaccesscontrolpy"></a>
#### 32. `backend/tests/test_access_control.py`

**Path**: `backend/tests/test_access_control.py` &nbsp;|&nbsp; **Size**: 3.92 KB (4012 bytes) &nbsp;|&nbsp; **Language**: `python` &nbsp;|&nbsp; **Lines**: 109 lines

```python
# backend/tests/test_access_control.py

import pytest


@pytest.mark.asyncio
async def test_unauthorized_request_without_token(client):
    response = client.get("/api/admin/users")
    assert response.status_code == 401 or response.status_code == 403


@pytest.mark.asyncio
async def test_unauthorized_request_with_garbage_token(client):
    headers = {"Authorization": "Bearer not-a-real-token"}
    response = client.get("/api/auth/me", headers=headers)
    assert response.status_code == 401


@pytest.mark.asyncio
async def test_student_cannot_access_admin_dashboard(client, seeded_users):
    student_token = seeded_users["student"]["token"]
    headers = {"Authorization": f"Bearer {student_token}"}
    response = client.get("/api/admin/users", headers=headers)
    assert response.status_code == 403
    assert "administrator access required" in response.json()["detail"].lower()


@pytest.mark.asyncio
async def test_educator_cannot_access_admin_dashboard(client, seeded_users):
    educator_token = seeded_users["educator"]["token"]
    headers = {"Authorization": f"Bearer {educator_token}"}
    response = client.get("/api/admin/users", headers=headers)
    assert response.status_code == 403


@pytest.mark.asyncio
async def test_admin_can_access_admin_users_and_stats(client, seeded_users):
    admin_token = seeded_users["admin"]["token"]
    headers = {"Authorization": f"Bearer {admin_token}"}

    # 1. Access user list
    users_res = client.get("/api/admin/users", headers=headers)
    assert users_res.status_code == 200
    user_list = users_res.json()
    assert len(user_list) >= 3

    # Check security: NO passwords exposed
    for u in user_list:
        assert "password" not in u
        assert "hashed_password" not in u

    # 2. Access dashboard stats
    stats_res = client.get("/api/admin/stats", headers=headers)
    assert stats_res.status_code == 200
    stats = stats_res.json()
    assert stats["total_users"] >= 3
    assert stats["admins_count"] >= 1


@pytest.mark.asyncio
async def test_admin_can_create_user(client, seeded_users):
    admin_token = seeded_users["admin"]["token"]
    headers = {"Authorization": f"Bearer {admin_token}"}
    new_user_payload = {
        "name": "Created By Admin",
        "email": "newuser@summify.io",
        "password": "TempPassword123!",
        "role": "educator",
        "is_active": True,
    }
    response = client.post("/api/admin/users", json=new_user_payload, headers=headers)
    assert response.status_code == 201
    data = response.json()
    assert data["email"] == "newuser@summify.io"
    assert data["role"] == "educator"
    assert "password" not in data
    assert "hashed_password" not in data


@pytest.mark.asyncio
async def test_admin_can_toggle_user_status(client, seeded_users):
    admin_token = seeded_users["admin"]["token"]
    headers = {"Authorization": f"Bearer {admin_token}"}
    student_id = seeded_users["student"]["id"]

    # Deactivate student
    toggle_res = client.post(f"/api/admin/users/{student_id}/toggle-status", headers=headers)
    assert toggle_res.status_code == 200
    assert toggle_res.json()["is_active"] is False

    # Try logging in as deactivated student -> should be 403
    login_res = client.post("/api/auth/login", json={"email": "student@summify.io", "password": "StudentPass123!"})
    assert login_res.status_code == 403

    # Re-activate student
    toggle_back = client.post(f"/api/admin/users/{student_id}/toggle-status", headers=headers)
    assert toggle_back.status_code == 200
    assert toggle_back.json()["is_active"] is True


@pytest.mark.asyncio
async def test_admin_cannot_deactivate_self(client, seeded_users):
    admin_token = seeded_users["admin"]["token"]
    admin_id = seeded_users["admin"]["id"]
    headers = {"Authorization": f"Bearer {admin_token}"}

    response = client.post(f"/api/admin/users/{admin_id}/toggle-status", headers=headers)
    assert response.status_code == 400
    assert "cannot" in response.json()["detail"].lower()

```

[Back to Table of Contents](#2-table-of-contents)

---

<a id="backendteststestaiendpointsmockedpy"></a>
#### 33. `backend/tests/test_ai_endpoints_mocked.py`

**Path**: `backend/tests/test_ai_endpoints_mocked.py` &nbsp;|&nbsp; **Size**: 6.04 KB (6182 bytes) &nbsp;|&nbsp; **Language**: `python` &nbsp;|&nbsp; **Lines**: 156 lines

```python
# backend/tests/test_ai_endpoints_mocked.py

import pytest
from unittest.mock import patch
from datetime import datetime


@pytest.mark.asyncio
async def test_summary_and_keywords_retrieval(client, seeded_users, test_db):
    educator_id = seeded_users["educator"]["id"]
    headers = {"Authorization": f"Bearer {seeded_users['educator']['token']}"}

    # Seed lecture
    lec_res = await test_db.lectures.insert_one({
        "user_id": educator_id,
        "title": "Machine Learning Foundations",
        "original_filename": "ml.pdf",
        "file_type": "application/pdf",
        "file_size": 2048,
        "storage_path": "uploads/fake_ml.pdf",
        "upload_date": datetime.utcnow(),
        "processing_status": "completed",
    })
    lecture_id = str(lec_res.inserted_id)

    # Seed summary
    await test_db.summaries.insert_one({
        "lecture_id": lecture_id,
        "user_id": educator_id,
        "summary_text": "Machine learning enables systems to learn from data patterns without explicit programming.",
        "key_points": ["Supervised learning uses labeled data", "Unsupervised learning finds hidden patterns"],
        "model": "facebook/bart-large-cnn",
        "word_count": 12,
        "character_count": 92,
        "chunks_processed": 1,
        "created_at": datetime.utcnow(),
    })

    # Seed keywords
    await test_db.keywords.insert_one({
        "lecture_id": lecture_id,
        "user_id": educator_id,
        "keywords": [
            {"term": "supervised learning", "score": 0.85},
            {"term": "neural networks", "score": 0.72},
        ],
        "total_keywords": 2,
        "method": "tfidf",
        "created_at": datetime.utcnow(),
    })

    # 1. Fetch Summary
    sum_res = client.get(f"/api/lectures/{lecture_id}/summary", headers=headers)
    assert sum_res.status_code == 200
    assert "Machine learning enables" in sum_res.json()["summary_text"]
    assert len(sum_res.json()["key_points"]) == 2

    # 2. Fetch Keywords
    kw_res = client.get(f"/api/lectures/{lecture_id}/keywords", headers=headers)
    assert kw_res.status_code == 200
    assert kw_res.json()["total_keywords"] == 2


@pytest.mark.asyncio
async def test_flashcard_generation_mocked(client, seeded_users, test_db):
    """Test flashcard regeneration with mocked AI response to ensure 0 paid/external calls."""
    educator_id = seeded_users["educator"]["id"]
    headers = {"Authorization": f"Bearer {seeded_users['educator']['token']}"}

    lec_res = await test_db.lectures.insert_one({
        "user_id": educator_id,
        "title": "Cell Biology",
        "original_filename": "cell.txt",
        "file_type": "text/plain",
        "file_size": 512,
        "storage_path": "uploads/fake_cell.txt",
        "upload_date": datetime.utcnow(),
        "processing_status": "completed",
    })
    lecture_id = str(lec_res.inserted_id)

    await test_db.summaries.insert_one({
        "lecture_id": lecture_id,
        "user_id": educator_id,
        "summary_text": "Mitochondria produce ATP through cellular respiration in eukaryotic cells.",
        "key_points": ["Mitochondria are the powerhouse", "ATP is the energy currency"],
        "model": "facebook/bart-large-cnn",
        "created_at": datetime.utcnow(),
    })

    # Mocked 5 flashcards
    mock_cards = [
        {"id": f"card-{i}", "question": f"Question {i} about ATP?", "answer": f"Answer {i} regarding cell respiration.", "category": "Cell Biology"}
        for i in range(1, 6)
    ]

    with patch("backend.api.lectures.generate_flashcards_for_lecture") as mock_gen:
        mock_gen.return_value = {
            "id": "mock-flashcards-id",
            "lecture_id": lecture_id,
            "user_id": educator_id,
            "cards": mock_cards,
            "total_cards": 5,
            "model": "meta-llama/Llama-3.1-8B-Instruct",
            "created_at": datetime.utcnow(),
        }

        # Request 5 cards
        res = client.post(f"/api/lectures/{lecture_id}/generate-flashcards", json={"count": 5}, headers=headers)
        assert res.status_code == 200
        data = res.json()
        assert data["total_cards"] == 5
        assert len(data["cards"]) == 5


@pytest.mark.asyncio
async def test_educator_flashcard_deck_update_and_sharing(client, seeded_users, test_db):
    """Educators can edit existing cards, add new cards, save, and publicly share the deck."""
    educator_id = seeded_users["educator"]["id"]
    headers = {"Authorization": f"Bearer {seeded_users['educator']['token']}"}

    lec_res = await test_db.lectures.insert_one({
        "user_id": educator_id,
        "title": "Quantum Physics 101",
        "original_filename": "quantum.txt",
        "file_type": "text/plain",
        "file_size": 512,
        "storage_path": "uploads/fake_quantum.txt",
        "upload_date": datetime.utcnow(),
        "processing_status": "completed",
    })
    lecture_id = str(lec_res.inserted_id)

    # 1. Educator edits deck
    updated_cards = [
        {"id": "q1", "question": "What is superposition?", "answer": "A principle where a quantum system exists in multiple states simultaneously.", "category": "Principles"},
        {"id": "q2", "question": "What is entanglement?", "answer": "When two particles remain connected so actions on one affect the other.", "category": "Phenomena"},
    ]
    put_res = client.put(f"/api/lectures/{lecture_id}/flashcards", json={"cards": updated_cards}, headers=headers)
    assert put_res.status_code == 200
    assert put_res.json()["total_cards"] == 2

    # 2. Educator shares the deck
    share_res = client.post(f"/api/lectures/{lecture_id}/share", headers=headers)
    assert share_res.status_code == 200
    share_data = share_res.json()
    assert share_data["is_shared"] is True
    share_id = share_data["share_id"]

    # 3. Public Student retrieval without auth token
    public_res = client.get(f"/api/lectures/shared/{share_id}")
    assert public_res.status_code == 200
    pub_data = public_res.json()
    assert pub_data["lecture_title"] == "Quantum Physics 101"
    assert pub_data["total_cards"] == 2
    assert pub_data["cards"][0]["question"] == "What is superposition?"

```

[Back to Table of Contents](#2-table-of-contents)

---

<a id="backendteststestauthpy"></a>
#### 34. `backend/tests/test_auth.py`

**Path**: `backend/tests/test_auth.py` &nbsp;|&nbsp; **Size**: 4.15 KB (4247 bytes) &nbsp;|&nbsp; **Language**: `python` &nbsp;|&nbsp; **Lines**: 128 lines

```python
# backend/tests/test_auth.py

import pytest


@pytest.mark.asyncio
async def test_register_student_success(client, test_db):
    payload = {
        "name": "Jane Doe",
        "email": "jane@example.com",
        "password": "Password123!",
        "role": "student",
    }
    response = client.post("/api/auth/register", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"

    # Verify user saved with is_active = True
    user = await test_db.users.find_one({"email": "jane@example.com"})
    assert user is not None
    assert user["role"] == "student"
    assert user["is_active"] is True
    assert "hashed_password" in user
    assert user["hashed_password"] != "Password123!"


@pytest.mark.asyncio
async def test_register_educator_success(client, test_db):
    payload = {
        "name": "Professor Smith",
        "email": "smith@university.edu",
        "password": "ProfessorPass123!",
        "role": "educator",
    }
    response = client.post("/api/auth/register", json=payload)
    assert response.status_code == 201
    assert "access_token" in response.json()


@pytest.mark.asyncio
async def test_register_admin_role_rejected(client, test_db):
    """Admin accounts can NEVER be created through public registration."""
    payload = {
        "name": "Hacker Admin",
        "email": "hacker@example.com",
        "password": "HackerPass123!",
        "role": "admin",
    }
    response = client.post("/api/auth/register", json=payload)
    # Pydantic Literal rejects "admin" with 422 Unprocessable Entity
    assert response.status_code in [400, 403, 422]


@pytest.mark.asyncio
async def test_register_duplicate_email_rejected(client, seeded_users):
    payload = {
        "name": "Duplicate User",
        "email": "student@summify.io",  # Already seeded
        "password": "AnotherPassword123!",
        "role": "student",
    }
    response = client.post("/api/auth/register", json=payload)
    assert response.status_code == 409
    assert "already exists" in response.json()["detail"].lower()


@pytest.mark.asyncio
async def test_login_valid_credentials(client, seeded_users):
    payload = {
        "email": "student@summify.io",
        "password": "StudentPass123!",
    }
    response = client.post("/api/auth/login", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data


@pytest.mark.asyncio
async def test_login_invalid_password_returns_generic_error(client, seeded_users):
    payload = {
        "email": "student@summify.io",
        "password": "WrongPassword!",
    }
    response = client.post("/api/auth/login", json=payload)
    assert response.status_code == 401
    # Generic message avoids user enumeration
    assert response.json()["detail"] == "Invalid email or password"


@pytest.mark.asyncio
async def test_login_nonexistent_email_returns_generic_error(client, seeded_users):
    payload = {
        "email": "nonexistent@example.com",
        "password": "AnyPassword123!",
    }
    response = client.post("/api/auth/login", json=payload)
    assert response.status_code == 401
    assert response.json()["detail"] == "Invalid email or password"


@pytest.mark.asyncio
async def test_login_deactivated_account_blocked(client, seeded_users):
    payload = {
        "email": "inactive@summify.io",
        "password": "InactivePass123!",
    }
    response = client.post("/api/auth/login", json=payload)
    assert response.status_code == 403
    assert "deactivated" in response.json()["detail"].lower()


@pytest.mark.asyncio
async def test_get_me_never_exposes_password_hash(client, seeded_users):
    token = seeded_users["educator"]["token"]
    headers = {"Authorization": f"Bearer {token}"}
    response = client.get("/api/auth/me", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "educator@summify.io"
    assert data["role"] == "educator"
    assert data["is_active"] is True
    # Security check: password hashes must NEVER be present
    assert "password" not in data
    assert "hashed_password" not in data
    assert "password_hash" not in data

```

[Back to Table of Contents](#2-table-of-contents)

---

<a id="backendteststestuploadandownershippy"></a>
#### 35. `backend/tests/test_upload_and_ownership.py`

**Path**: `backend/tests/test_upload_and_ownership.py` &nbsp;|&nbsp; **Size**: 3.08 KB (3156 bytes) &nbsp;|&nbsp; **Language**: `python` &nbsp;|&nbsp; **Lines**: 76 lines

```python
# backend/tests/test_upload_and_ownership.py

import io
import pytest
from datetime import datetime


@pytest.mark.asyncio
async def test_upload_disallowed_extension_rejected(client, seeded_users):
    token = seeded_users["educator"]["token"]
    headers = {"Authorization": f"Bearer {token}"}

    file_content = b"malicious binary content"
    files = {"file": ("malware.exe", io.BytesIO(file_content), "application/octet-stream")}
    data = {"title": "Malicious File"}

    response = client.post("/api/lectures/upload", data=data, files=files, headers=headers)
    assert response.status_code == 400
    assert "unsupported" in response.json()["detail"].lower()


from unittest.mock import patch

@pytest.mark.asyncio
async def test_upload_valid_text_file(client, seeded_users, test_db):
    token = seeded_users["educator"]["token"]
    headers = {"Authorization": f"Bearer {token}"}

    content = b"Photosynthesis is the process by which green plants create food from sunlight."
    files = {"file": ("biology_intro.txt", io.BytesIO(content), "text/plain")}
    data = {"title": "Introduction to Biology"}

    with patch("backend.api.lectures.process_lecture_background") as mock_pipeline:
        response = client.post("/api/lectures/upload", data=data, files=files, headers=headers)
        assert response.status_code == 201
        res_data = response.json()
        assert res_data["title"] == "Introduction to Biology"
        assert res_data["processing_status"] in ["uploaded", "extracting", "completed"]
        mock_pipeline.assert_called_once()


@pytest.mark.asyncio
async def test_ownership_isolation(client, seeded_users, test_db):
    """User B cannot access or delete User A's lecture."""
    # Seed a lecture belonging to the educator
    lec_doc = {
        "user_id": seeded_users["educator"]["id"],
        "title": "Private Educator Lecture",
        "original_filename": "lecture1.pdf",
        "file_type": "application/pdf",
        "file_size": 1024,
        "storage_path": "uploads/fake.pdf",
        "upload_date": datetime.utcnow(),
        "processing_status": "completed",
    }
    res = await test_db.lectures.insert_one(lec_doc)
    lecture_id = str(res.inserted_id)

    # 1. Student (User B) tries to GET the lecture -> 404
    student_headers = {"Authorization": f"Bearer {seeded_users['student']['token']}"}
    get_res = client.get(f"/api/lectures/{lecture_id}", headers=student_headers)
    assert get_res.status_code == 404

    # 2. Student tries to DELETE the lecture -> 404
    del_res = client.delete(f"/api/lectures/{lecture_id}", headers=student_headers)
    assert del_res.status_code == 404

    # 3. Owner (Educator) CAN access it -> 200
    educator_headers = {"Authorization": f"Bearer {seeded_users['educator']['token']}"}
    owner_res = client.get(f"/api/lectures/{lecture_id}", headers=educator_headers)
    assert owner_res.status_code == 200

    # 4. Admin CAN also access it -> 200
    admin_headers = {"Authorization": f"Bearer {seeded_users['admin']['token']}"}
    admin_res = client.get(f"/api/lectures/{lecture_id}", headers=admin_headers)
    assert admin_res.status_code == 200

```

[Back to Table of Contents](#2-table-of-contents)

---

### Category: Uploads & Storage

<a id="uploadsgitkeep"></a>
#### 36. `uploads/.gitkeep`

**Path**: `uploads/.gitkeep` &nbsp;|&nbsp; **Size**: 0.03 KB (32 bytes) &nbsp;|&nbsp; **Language**: `text` &nbsp;|&nbsp; **Lines**: 1 lines

```text
# Keep directory tracked by Git

```

[Back to Table of Contents](#2-table-of-contents)

---

### Category: Frontend - Configuration & Meta

<a id="frontendgitignore"></a>
#### 37. `frontend/.gitignore`

**Path**: `frontend/.gitignore` &nbsp;|&nbsp; **Size**: 0.25 KB (253 bytes) &nbsp;|&nbsp; **Language**: `gitignore` &nbsp;|&nbsp; **Lines**: 24 lines

```gitignore
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

```

[Back to Table of Contents](#2-table-of-contents)

---

<a id="frontendoxlintrcjson"></a>
#### 38. `frontend/.oxlintrc.json`

**Path**: `frontend/.oxlintrc.json` &nbsp;|&nbsp; **Size**: 0.23 KB (231 bytes) &nbsp;|&nbsp; **Language**: `json` &nbsp;|&nbsp; **Lines**: 8 lines

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "oxc"],
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}

```

[Back to Table of Contents](#2-table-of-contents)

---

<a id="frontendreadmemd"></a>
#### 39. `frontend/README.md`

**Path**: `frontend/README.md` &nbsp;|&nbsp; **Size**: 0.99 KB (1009 bytes) &nbsp;|&nbsp; **Language**: `markdown` &nbsp;|&nbsp; **Lines**: 16 lines

```markdown
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

```

[Back to Table of Contents](#2-table-of-contents)

---

<a id="frontendindexhtml"></a>
#### 40. `frontend/index.html`

**Path**: `frontend/index.html` &nbsp;|&nbsp; **Size**: 1.04 KB (1061 bytes) &nbsp;|&nbsp; **Language**: `html` &nbsp;|&nbsp; **Lines**: 17 lines

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%236366f1'><path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'/></svg>" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Summify - AI Lecture Summarizer & Study Workspace</title>
    <meta name="description" content="AI-powered lecture summarization, notes generation, and interactive learning platform for students and educators." />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

```

[Back to Table of Contents](#2-table-of-contents)

---

<a id="frontendpackagelockjson"></a>
#### 41. `frontend/package-lock.json`

**Path**: `frontend/package-lock.json` &nbsp;|&nbsp; **Size**: 51.86 KB (53104 bytes) &nbsp;|&nbsp; **Language**: `json` &nbsp;|&nbsp; **Lines**: 1658 lines

```json
{
  "name": "frontend",
  "version": "0.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "frontend",
      "version": "0.0.0",
      "dependencies": {
        "axios": "^1.20.0",
        "lucide-react": "^1.48.0",
        "react": "^19.2.8",
        "react-dom": "^19.2.8"
      },
      "devDependencies": {
        "@types/react": "^19.2.18",
        "@types/react-dom": "^19.2.7",
        "@vitejs/plugin-react": "^6.1.1",
        "oxlint": "^1.81.0",
        "vite": "^8.3.0"
      }
    },
    "node_modules/@oxc-project/types": {
      "version": "0.151.0",
      "resolved": "https://registry.npmjs.org/@oxc-project/types/-/types-0.151.0.tgz",
      "integrity": "sha512-J1yXrIlNDZVzE3ada310xeAw7nH8yCAyLPuUIsjKatFPmfn5bS1oW+cM+QsGOtVWd5nhSpbwZWx/rue+r5Z+PA==",
      "dev": true,
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/oxc-project"
      }
    },
    "node_modules/@oxlint/binding-android-arm-eabi": {
      "version": "1.85.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-android-arm-eabi/-/binding-android-arm-eabi-1.85.0.tgz",
      "integrity": "sha512-q2KO/Zso9UT+OMn0NF9ywn4E4t0MI3yxiDhNyhsQ7DyQJrC4FhFE4TXOi4bktFnOWXTMds8qZSbpv2XwRaNOBg==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-android-arm64": {
      "version": "1.85.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-android-arm64/-/binding-android-arm64-1.85.0.tgz",
      "integrity": "sha512-SxLN3ALjoT9NNdvpjEevGeHvfzTAFrF0NBYB5tzK7/GtCKMze3j1e/m/X2ozqGj2U9hfGG/dg/OG8vpVK4PiDA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-darwin-arm64": {
      "version": "1.85.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-darwin-arm64/-/binding-darwin-arm64-1.85.0.tgz",
      "integrity": "sha512-Y/Sup/J4f0f9UGsSd/xyCNTeWL+gepO63GBdEDAfue9nBsnk9zMmnIXx1O6b1V8C90vB5nucYNZ0pbMXAp8zJA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-darwin-x64": {
      "version": "1.85.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-darwin-x64/-/binding-darwin-x64-1.85.0.tgz",
      "integrity": "sha512-ApOSNC04ynpDTwvBD+//0wyfODRSbEzvRoKpX8teffmc27z8AockwSNeMXGJXn5KP85eahDgR/2llICWLkzcnw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-freebsd-x64": {
      "version": "1.85.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-freebsd-x64/-/binding-freebsd-x64-1.85.0.tgz",
      "integrity": "sha512-bNrVrCOA/kHky3Tu79IXWXe5bhIgLXfUuUEDHlAGOHUk96MkvDZ1ecaQF19rwstrnaqfP1o9nBTqzIr9+ZHkUg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-linux-arm-gnueabihf": {
      "version": "1.85.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-linux-arm-gnueabihf/-/binding-linux-arm-gnueabihf-1.85.0.tgz",
      "integrity": "sha512-NUrzOJ1s/EqsVvfn2L/1D8Wro2LPIZUbihL8kOJLh5fEdGEN3rdOGUYq3HwnUIL8sjpoP+4N6RaGrgmMJnaMPw==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-linux-arm-musleabihf": {
      "version": "1.85.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-linux-arm-musleabihf/-/binding-linux-arm-musleabihf-1.85.0.tgz",
      "integrity": "sha512-UJXrAT3E/RWkEqXLIs2ehETja1qfgkPb+5gwLIIS+o/6cf+grHvoOXTa5997a/YNQfcJS0DRBTOfZt95cvOI1g==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-linux-arm64-gnu": {
      "version": "1.85.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-linux-arm64-gnu/-/binding-linux-arm64-gnu-1.85.0.tgz",
      "integrity": "sha512-lK40QLjI0HxigO7CjDDshEtfYIeiYS0020v5BHFPqN4uuQBQxd2K9LNom2dW15o9F1937quSCRVp4ZsVhdbYdg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-linux-arm64-musl": {
      "version": "1.85.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-linux-arm64-musl/-/binding-linux-arm64-musl-1.85.0.tgz",
      "integrity": "sha512-c2zbdBwGKreHXwRx3gWBuFGJxLhxgsg6YlZ+3H+RgRusU/UEV9jNwJ3HGYK+nRo0LvBa7mt6Kj86xoVotUo8cw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "libc": [
        "musl"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-linux-ppc64-gnu": {
      "version": "1.85.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-linux-ppc64-gnu/-/binding-linux-ppc64-gnu-1.85.0.tgz",
      "integrity": "sha512-tlt/Hy8lZ97/lCPmCgw/B3k/mwh+BzaIPbPkldZEly7TwLmx0xe2CQcaW2g/rR0dOgS9JNGCZsMEqLhUNMGvaw==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-linux-riscv64-gnu": {
      "version": "1.85.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-linux-riscv64-gnu/-/binding-linux-riscv64-gnu-1.85.0.tgz",
      "integrity": "sha512-3tNR9Xey82X0zKuY1d8hJ6Rc9gwRDurmqGLnQZa5xqOXy8/YyiqFXjAtugkKLY82obOlpK1eSiDRlgcNPuxtIg==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-linux-riscv64-musl": {
      "version": "1.85.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-linux-riscv64-musl/-/binding-linux-riscv64-musl-1.85.0.tgz",
      "integrity": "sha512-wbGRd5PqCcjkJFHhZuZ2OBSUQY9czlQsoA/cQQB9JK/L9mC5MQgGoKAh+xd8QjA5V+0D3j+Qd1lAWn1I8zlelA==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "libc": [
        "musl"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-linux-s390x-gnu": {
      "version": "1.85.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-linux-s390x-gnu/-/binding-linux-s390x-gnu-1.85.0.tgz",
      "integrity": "sha512-3Sn0kSrE4DPZCWV/8o+n4x3aFZxI9ulMnkYlwCbJ8eUVkwRK2IerohE/A/z3SNbCwoPFOCJmGE5Avrq0rrvdvQ==",
      "cpu": [
        "s390x"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-linux-x64-gnu": {
      "version": "1.85.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-linux-x64-gnu/-/binding-linux-x64-gnu-1.85.0.tgz",
      "integrity": "sha512-JY2pxxYfB62bAGfejljVCqc44etItehPuAyaeSAdMuEMtwNA00ggMnS66lC1oIhos6oOXUkuU6mZ9bpFh3BqWg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-linux-x64-musl": {
      "version": "1.85.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-linux-x64-musl/-/binding-linux-x64-musl-1.85.0.tgz",
      "integrity": "sha512-5k74vZ6qJBjBHEOlBk9B/iv68Yu0F1Afw/vvT2ar6OGCqEeXLaSjXz2n/IPCbhLG22UoKoYEJTzpYraRdcp6PA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "libc": [
        "musl"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-openharmony-arm64": {
      "version": "1.85.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-openharmony-arm64/-/binding-openharmony-arm64-1.85.0.tgz",
      "integrity": "sha512-GbAl5qt5TCkPLXTaIISZJnugrcBhra6rodcXc9jYt620UtdsTt71NlNmJmm0frxzFpd54x/G+MkitEJA8I/BoA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openharmony"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-win32-arm64-msvc": {
      "version": "1.85.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-win32-arm64-msvc/-/binding-win32-arm64-msvc-1.85.0.tgz",
      "integrity": "sha512-kjmws5MK0et2swk4ND85D7NVQyDHw162i6whtZDLUA/lo6FQyBZDcmMRCMcVZcNrAhIaftVb00x9ChGDOjjNJA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-win32-ia32-msvc": {
      "version": "1.85.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-win32-ia32-msvc/-/binding-win32-ia32-msvc-1.85.0.tgz",
      "integrity": "sha512-eSsIJx9n4yxvOqYTZyPEMyEXRmE60XH7xGAU7i0Qbsn1lf6Za3CWJ9aRd82oSFKXaxhp+sA6/yMJVRIpLpna6A==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxlint/binding-win32-x64-msvc": {
      "version": "1.85.0",
      "resolved": "https://registry.npmjs.org/@oxlint/binding-win32-x64-msvc/-/binding-win32-x64-msvc-1.85.0.tgz",
      "integrity": "sha512-pBebIPUpKKhWrhSMWhy8TdAZBewiXnfxmaAGxhzxM1068GagqFaTwgKlU6e+UyJ2sPR+VoHouhXuGJkQjsrDvA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-android-arm-eabi": {
      "version": "1.2.10",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-android-arm-eabi/-/binding-android-arm-eabi-1.2.10.tgz",
      "integrity": "sha512-bp9svZb+QurZeh+8H4BhrZkifEB0YBNvTVzNSJnJQkj4NrRwmQoDUCGP0vSN7PbvLeM7l1tK6GXL8mrTiH2myg==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-android-arm64": {
      "version": "1.2.10",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-android-arm64/-/binding-android-arm64-1.2.10.tgz",
      "integrity": "sha512-wm6Dld3RXUAZ/gRWKyUy+4W1B5CB5UeFaOzsSWJWEdxZXHH8rCYiZ5dGe6oJmhsunAPWzL7FZV+VtvmN5Ye2eA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-darwin-arm64": {
      "version": "1.2.10",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-darwin-arm64/-/binding-darwin-arm64-1.2.10.tgz",
      "integrity": "sha512-UbEfXq/AqGNgRTV3ik+X/iR6mUxu2QdYAadwRxJWquUGnW6gDqdP1FtLtFXRow7RJx0ssRwi80XAPr4r+4DtsA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-darwin-x64": {
      "version": "1.2.10",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-darwin-x64/-/binding-darwin-x64-1.2.10.tgz",
      "integrity": "sha512-7f5h17q5KZVx/ji1vb8OTq31ch1O2I7K8NPIr44GkyWTApXMIsmhWqZfgpOH10xeauqghDAvGlZktasCkcF6Eg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-freebsd-x64": {
      "version": "1.2.10",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-freebsd-x64/-/binding-freebsd-x64-1.2.10.tgz",
      "integrity": "sha512-ynOk/eEYhC6ZB2xCGvKrEOwE58oBy9LnrAqtkrDF9Fz1VTaNdGZTsV0VarJdhPwb+sOJTGjCLwcuyRJZ1dnMcQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-arm-gnueabihf": {
      "version": "1.2.10",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-arm-gnueabihf/-/binding-linux-arm-gnueabihf-1.2.10.tgz",
      "integrity": "sha512-ERrAs185meZZhGan7a4l3RiiJK1ArSDlHdST++uvSxe+FDbR4TwUPahT/cbZJvaG6fIpDpF78surN+tX708Y4Q==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-arm64-gnu": {
      "version": "1.2.10",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-arm64-gnu/-/binding-linux-arm64-gnu-1.2.10.tgz",
      "integrity": "sha512-KN7OHKD0J3jy1UzBwZWPxpwhODf9IARUIJcrH+yLYKOcmegZ8luEUM38lDP1bDVj40yP6PsSzCqOJF76vljFnQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-arm64-musl": {
      "version": "1.2.10",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-arm64-musl/-/binding-linux-arm64-musl-1.2.10.tgz",
      "integrity": "sha512-8l9wP8O+wa8zD6iw6egSfzVtu7oZVfH3hlUsMM4MwbLMhxleqeoXbZzjddyK3YyNlwLhqznq3tF7PkNJ8T/V2w==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "libc": [
        "musl"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-ppc64-gnu": {
      "version": "1.2.10",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-ppc64-gnu/-/binding-linux-ppc64-gnu-1.2.10.tgz",
      "integrity": "sha512-SeXNKeQzA5kLhz/J0CH6ZP0/HJ3v1xm/0YbiYpE0kK7emfRC2OIGGIaE14xzkISEGv2aYuUSpiLiU5Gbq+OI0A==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-s390x-gnu": {
      "version": "1.2.10",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-s390x-gnu/-/binding-linux-s390x-gnu-1.2.10.tgz",
      "integrity": "sha512-mtht0nR+y8/hart4175Ll15w7lY8dg7CtQ+j2FDNTsDRspOWTK/2V3l0aj9sIj7XmvqxT8Yli/wq22e7feTTWg==",
      "cpu": [
        "s390x"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-x64-gnu": {
      "version": "1.2.10",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-x64-gnu/-/binding-linux-x64-gnu-1.2.10.tgz",
      "integrity": "sha512-FSM94nGd55NYo48usCyM/nHfUKRnqc9+b0vJNuKV0oCCpIp/OGims7rO1Nv/DkFkt0S/s2rxsJ2kkS8J3HcpeA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-x64-musl": {
      "version": "1.2.10",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-x64-musl/-/binding-linux-x64-musl-1.2.10.tgz",
      "integrity": "sha512-C3YxNB16myRLs7o+B+6PnQ6jBsdIS4+AE4Ah8glVGhDpEv9AOvxhZ/1duAb4B0UGczEK/lBbccksd8VI+p6zfw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "libc": [
        "musl"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-openharmony-arm64": {
      "version": "1.2.10",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-openharmony-arm64/-/binding-openharmony-arm64-1.2.10.tgz",
      "integrity": "sha512-571TlE/F1eeTjjdjYAMMMPs1Mfv3MtX6s3+ZKVU6HiUjZ5Njc6c/qzNy/8K3zALTZnaw3JQVYrHxvNfjm43KAg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openharmony"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-win32-arm64-msvc": {
      "version": "1.2.10",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-win32-arm64-msvc/-/binding-win32-arm64-msvc-1.2.10.tgz",
      "integrity": "sha512-QXW+ZWaiqs2c7Fi++D/SsW07LTPcUrncxcskJGfGNBoaLik1IU6fJymz4HsqwEO0u5Iq11yTO0B/mc4cPk7jrQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-win32-x64-msvc": {
      "version": "1.2.10",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-win32-x64-msvc/-/binding-win32-x64-msvc-1.2.10.tgz",
      "integrity": "sha512-5FQFGgah17YeMtG1Yd5a+rMxQpTksyNXxRtKz06FVTaQw3RKYUJQbUoKk0/5jrXBpDo+7makNP7UHA2LQyH64A==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/pluginutils": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/@rolldown/pluginutils/-/pluginutils-1.0.1.tgz",
      "integrity": "sha512-2j9bGt5Jh8hj+vPtgzPtl72j0yRxHAyumoo6TNfAjsLB04UtpSvPbPcDcBMxz7n+9CYB0c1GxQFxYRg2jimqGw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/react": {
      "version": "19.3.0",
      "resolved": "https://registry.npmjs.org/@types/react/-/react-19.3.0.tgz",
      "integrity": "sha512-N0rFCuH9YoxG9/m61l9MfpJKfmLOVU0em7ipIz6TRgSSkvReLB9vL85GB+yr8Bs5leqpvg96JSwF4ZS1s4viQg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "csstype": "^3.2.2"
      }
    },
    "node_modules/@types/react-dom": {
      "version": "19.3.0",
      "resolved": "https://registry.npmjs.org/@types/react-dom/-/react-dom-19.3.0.tgz",
      "integrity": "sha512-ZI7bU42mZXXKHn/qNLEw2IrbiINU7X5+vfgdixBHkCNpYWXjKgfQ/P+uyGb5CjOLB9UcnTeg3rylQtV2hym44Q==",
      "dev": true,
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "^19.3.0"
      }
    },
    "node_modules/@vitejs/plugin-react": {
      "version": "6.1.1",
      "resolved": "https://registry.npmjs.org/@vitejs/plugin-react/-/plugin-react-6.1.1.tgz",
      "integrity": "sha512-yxLaQV9gkhS8ezJqCM6+ndU7mDY6gqAg75NQ+0IjwEI8IYOmQCgkRwHKVSfWXW076DsqMo0Dk+0FK1U+M5RgFw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@rolldown/pluginutils": "^1.0.1"
      },
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      },
      "peerDependencies": {
        "@rolldown/plugin-babel": "^0.1.7 || ^0.2.0",
        "babel-plugin-react-compiler": "^1.0.0",
        "oxc-transform-react": "^0.145.0",
        "vite": "^8.0.0"
      },
      "peerDependenciesMeta": {
        "@rolldown/plugin-babel": {
          "optional": true
        },
        "babel-plugin-react-compiler": {
          "optional": true
        },
        "oxc-transform-react": {
          "optional": true
        }
      }
    },
    "node_modules/agent-base": {
      "version": "6.0.2",
      "resolved": "https://registry.npmjs.org/agent-base/-/agent-base-6.0.2.tgz",
      "integrity": "sha512-RZNwNclF7+MS/8bDg70amg32dyeZGZxiDuQmZxKLAlQjr3jGyLx+4Kkk58UO7D2QdgFIQCovuSuZESne6RG6XQ==",
      "license": "MIT",
      "dependencies": {
        "debug": "4"
      },
      "engines": {
        "node": ">= 6.0.0"
      }
    },
    "node_modules/asynckit": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/asynckit/-/asynckit-0.4.0.tgz",
      "integrity": "sha512-Oei9OH4tRh0YqU3GxhX79dM/mwVgvbZJaSNaRk+bshkj0S5cfHcgYakreBjrHwatXKbz+IoIdYLxrKim2MjW0Q==",
      "license": "MIT"
    },
    "node_modules/axios": {
      "version": "1.20.0",
      "resolved": "https://registry.npmjs.org/axios/-/axios-1.20.0.tgz",
      "integrity": "sha512-r8aOh8j9cGKpgQAqpzrUHnSIc6a59Y3Xf/cv8sy1DrHCkZHzQGEuoq1tARk6qSyDdtQGSDgpb9kFlruzPvrgwg==",
      "license": "MIT",
      "dependencies": {
        "follow-redirects": "^1.16.0",
        "form-data": "^4.0.6",
        "https-proxy-agent": "^5.0.1",
        "proxy-from-env": "^2.1.0"
      }
    },
    "node_modules/call-bind-apply-helpers": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/call-bind-apply-helpers/-/call-bind-apply-helpers-1.0.2.tgz",
      "integrity": "sha512-Sp1ablJ0ivDkSzjcaJdxEunN5/XvksFJ2sMBFfq6x0ryhQV/2b/KwFe21cMpmHtPOSij8K99/wSfoEuTObmuMQ==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "function-bind": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/combined-stream": {
      "version": "1.0.8",
      "resolved": "https://registry.npmjs.org/combined-stream/-/combined-stream-1.0.8.tgz",
      "integrity": "sha512-FQN4MRfuJeHf7cBbBMJFXhKSDq+2kAArBlmRBvcvFE5BB1HZKXtSFASDhdlz9zOYwxh8lDdnvmMOe/+5cdoEdg==",
      "license": "MIT",
      "dependencies": {
        "delayed-stream": "~1.0.0"
      },
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/csstype": {
      "version": "3.2.3",
      "resolved": "https://registry.npmjs.org/csstype/-/csstype-3.2.3.tgz",
      "integrity": "sha512-z1HGKcYy2xA8AGQfwrn0PAy+PB7X/GSj3UVJW9qKyn43xWa+gl5nXmU4qqLMRzWVLFC8KusUX8T/0kCiOYpAIQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/debug": {
      "version": "4.4.3",
      "resolved": "https://registry.npmjs.org/debug/-/debug-4.4.3.tgz",
      "integrity": "sha512-RGwwWnwQvkVfavKVt22FGLw+xYSdzARwm0ru6DhTVA3umU5hZc28V3kO4stgYryrTlLpuvgI9GiijltAjNbcqA==",
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.3"
      },
      "engines": {
        "node": ">=6.0"
      },
      "peerDependenciesMeta": {
        "supports-color": {
          "optional": true
        }
      }
    },
    "node_modules/delayed-stream": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/delayed-stream/-/delayed-stream-1.0.0.tgz",
      "integrity": "sha512-ZySD7Nf91aLB0RxL4KGrKHBXl7Eds1DAmEdcoVawXnLD7SDhpNgtuII2aAkg7a7QS41jxPSZ17p4VdGnMHk3MQ==",
      "license": "MIT",
      "engines": {
        "node": ">=0.4.0"
      }
    },
    "node_modules/detect-libc": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/detect-libc/-/detect-libc-2.1.2.tgz",
      "integrity": "sha512-Btj2BOOO83o3WyH59e8MgXsxEQVcarkUOpEYrubB0urwnN10yQ364rsiByU11nZlqWYZm05i/of7io4mzihBtQ==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/dunder-proto": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/dunder-proto/-/dunder-proto-1.0.1.tgz",
      "integrity": "sha512-KIN/nDJBQRcXw0MLVhZE9iQHmG68qAVIBg9CqmUYjmQIhgij9U5MFvrqkUL5FbtyyzZuOeOt0zdeRe4UY7ct+A==",
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.1",
        "es-errors": "^1.3.0",
        "gopd": "^1.2.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-define-property": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/es-define-property/-/es-define-property-1.0.1.tgz",
      "integrity": "sha512-e3nRfgfUZ4rNGL232gUgX06QNyyez04KdjFrF+LTRoOXmrOgFKDg4BCdsjW8EnT69eqdYGmRpJwiPVYNrCaW3g==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-errors": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/es-errors/-/es-errors-1.3.0.tgz",
      "integrity": "sha512-Zf5H2Kxt2xjTvbJvP2ZWLEICxA6j+hAmMzIlypy4xcBg1vKVnx89Wy0GbS+kf5cwCVFFzdCFh2XSCFNULS6csw==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-object-atoms": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/es-object-atoms/-/es-object-atoms-1.1.2.tgz",
      "integrity": "sha512-HWcBoN6NileqtSydK2FqHbS/LoDd2pqrnQHLyJzBj4kOp/ky2MWMN694xOfkK8/SnUsW2DH7EfyVlydKCsm1Zw==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-set-tostringtag": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/es-set-tostringtag/-/es-set-tostringtag-2.1.0.tgz",
      "integrity": "sha512-j6vWzfrGVfyXxge+O0x5sh6cvxAog0a/4Rdd2K36zCMV5eJ+/+tOAngRO8cODMNWbVRdVlmGZQL2YS3yR8bIUA==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "get-intrinsic": "^1.2.6",
        "has-tostringtag": "^1.0.2",
        "hasown": "^2.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/fdir": {
      "version": "6.5.0",
      "resolved": "https://registry.npmjs.org/fdir/-/fdir-6.5.0.tgz",
      "integrity": "sha512-tIbYtZbucOs0BRGqPJkshJUYdL+SDH7dVM8gjy+ERp3WAUjLEFJE+02kanyHtwjWOnwrKYBiwAmM0p4kLJAnXg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12.0.0"
      },
      "peerDependencies": {
        "picomatch": "^3 || ^4"
      },
      "peerDependenciesMeta": {
        "picomatch": {
          "optional": true
        }
      }
    },
    "node_modules/follow-redirects": {
      "version": "1.16.0",
      "resolved": "https://registry.npmjs.org/follow-redirects/-/follow-redirects-1.16.0.tgz",
      "integrity": "sha512-y5rN/uOsadFT/JfYwhxRS5R7Qce+g3zG97+JrtFZlC9klX/W5hD7iiLzScI4nZqUS7DNUdhPgw4xI8W2LuXlUw==",
      "funding": [
        {
          "type": "individual",
          "url": "https://github.com/sponsors/RubenVerborgh"
        }
      ],
      "license": "MIT",
      "engines": {
        "node": ">=4.0"
      },
      "peerDependenciesMeta": {
        "debug": {
          "optional": true
        }
      }
    },
    "node_modules/form-data": {
      "version": "4.0.6",
      "resolved": "https://registry.npmjs.org/form-data/-/form-data-4.0.6.tgz",
      "integrity": "sha512-vKatAh4SlVfgbv+YtmhiRjhEMJsYpsG1Y2rMQtR+SVSbytsSD1YGzDIcrAJmdFec88u/+VoGmxnl+80gL1tRCQ==",
      "license": "MIT",
      "dependencies": {
        "asynckit": "^0.4.0",
        "combined-stream": "^1.0.8",
        "es-set-tostringtag": "^2.1.0",
        "hasown": "^2.0.4",
        "mime-types": "^2.1.35"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/fsevents": {
      "version": "2.3.3",
      "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-2.3.3.tgz",
      "integrity": "sha512-5xoDfX+fL7faATnagmWPpbFtwh/R77WmMMqqHGS65C3vvB0YHrgF+B1YmZ3441tMj5n63k0212XNoJwzlhffQw==",
      "dev": true,
      "hasInstallScript": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^8.16.0 || ^10.6.0 || >=11.0.0"
      }
    },
    "node_modules/function-bind": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/function-bind/-/function-bind-1.1.2.tgz",
      "integrity": "sha512-7XHNxH7qX9xG5mIwxkhumTox/MIRNcOgDrxWsMt2pAr23WHp6MrRlN7FBSFpCpr+oVO0F744iUgR82nJMfG2SA==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/get-intrinsic": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/get-intrinsic/-/get-intrinsic-1.3.0.tgz",
      "integrity": "sha512-9fSjSaos/fRIVIp+xSJlE6lfwhES7LNtKaCBIamHsjr2na1BiABJPo0mOjjz8GJDURarmCPGqaiVg5mfjb98CQ==",
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.2",
        "es-define-property": "^1.0.1",
        "es-errors": "^1.3.0",
        "es-object-atoms": "^1.1.1",
        "function-bind": "^1.1.2",
        "get-proto": "^1.0.1",
        "gopd": "^1.2.0",
        "has-symbols": "^1.1.0",
        "hasown": "^2.0.2",
        "math-intrinsics": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/get-proto": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/get-proto/-/get-proto-1.0.1.tgz",
      "integrity": "sha512-sTSfBjoXBp89JvIKIefqw7U2CCebsc74kiY6awiGogKtoSGbgjYE/G/+l9sF3MWFPNc9IcoOC4ODfKHfxFmp0g==",
      "license": "MIT",
      "dependencies": {
        "dunder-proto": "^1.0.1",
        "es-object-atoms": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/gopd": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/gopd/-/gopd-1.2.0.tgz",
      "integrity": "sha512-ZUKRh6/kUFoAiTAtTYPZJ3hw9wNxx+BIBOijnlG9PnrJsCcSjs1wyyD6vJpaYtgnzDrKYRSqf3OO6Rfa93xsRg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/has-symbols": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/has-symbols/-/has-symbols-1.1.0.tgz",
      "integrity": "sha512-1cDNdwJ2Jaohmb3sg4OmKaMBwuC48sYni5HUw2DvsC8LjGTLK9h+eb1X6RyuOHe4hT0ULCW68iomhjUoKUqlPQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/has-tostringtag": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/has-tostringtag/-/has-tostringtag-1.0.2.tgz",
      "integrity": "sha512-NqADB8VjPFLM2V0VvHUewwwsw0ZWBaIdgo+ieHtK3hasLz4qeCRjYcqfB6AQrBggRKppKF8L52/VqdVsO47Dlw==",
      "license": "MIT",
      "dependencies": {
        "has-symbols": "^1.0.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/hasown": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/hasown/-/hasown-2.0.4.tgz",
      "integrity": "sha512-T2UbfbBEF32wiepXIsMlTW9+dDYC6wMh/t/vYA4tuOMKqWz/n3vr1NFSxQiyP+zk2mXsoMA/i/7qV6LKut1t1A==",
      "license": "MIT",
      "dependencies": {
        "function-bind": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/https-proxy-agent": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/https-proxy-agent/-/https-proxy-agent-5.0.1.tgz",
      "integrity": "sha512-dFcAjpTQFgoLMzC2VwU+C/CbS7uRL0lWmxDITmqm7C+7F0Odmj6s9l6alZc6AELXhrnggM2CeWSXHGOdX2YtwA==",
      "license": "MIT",
      "dependencies": {
        "agent-base": "6",
        "debug": "4"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/lightningcss": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss/-/lightningcss-1.33.0.tgz",
      "integrity": "sha512-WkUDrojuJs0xkgGf2udWxa3yGBRxPtxUkB79i6aCZLRgc7PM8fZe9TosfPDcvEpQZbuFASnHYmRLBLUbmLOIIA==",
      "dev": true,
      "license": "MPL-2.0",
      "dependencies": {
        "detect-libc": "^2.0.3"
      },
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      },
      "optionalDependencies": {
        "lightningcss-android-arm64": "1.33.0",
        "lightningcss-darwin-arm64": "1.33.0",
        "lightningcss-darwin-x64": "1.33.0",
        "lightningcss-freebsd-x64": "1.33.0",
        "lightningcss-linux-arm-gnueabihf": "1.33.0",
        "lightningcss-linux-arm64-gnu": "1.33.0",
        "lightningcss-linux-arm64-musl": "1.33.0",
        "lightningcss-linux-x64-gnu": "1.33.0",
        "lightningcss-linux-x64-musl": "1.33.0",
        "lightningcss-win32-arm64-msvc": "1.33.0",
        "lightningcss-win32-x64-msvc": "1.33.0"
      }
    },
    "node_modules/lightningcss-android-arm64": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-android-arm64/-/lightningcss-android-arm64-1.33.0.tgz",
      "integrity": "sha512-gEpRTalKdosp4Bb8qWtc2iOgE5SeIHlpS1up9bFq2wAyYhl1UdTObYiHe98zEM9SQvSoqQZ1IQD0JNpg3Ml5pg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-darwin-arm64": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-darwin-arm64/-/lightningcss-darwin-arm64-1.33.0.tgz",
      "integrity": "sha512-Sciaz8eenNTKn9b3t7+xr0ipTp9YxKQY4npwQ3mrRuL0BAVHBLyZxofhaKBAVtzmtRZ/zTyo0/to4B1uWG/Djg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-darwin-x64": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-darwin-x64/-/lightningcss-darwin-x64-1.33.0.tgz",
      "integrity": "sha512-Z5UPAxzrjlWNNyGy6i65cJzzvgJ5D3T6wMvs+gWpY9d7qRhANrxqAp6LhxIgZhWEw18RfJTGcRxjuLIBr+m8XQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-freebsd-x64": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-freebsd-x64/-/lightningcss-freebsd-x64-1.33.0.tgz",
      "integrity": "sha512-QQM/Ti/hQajJwCY+RiWuCZ9sdtI/XQk7nDK5vC8kkdwixezOlDgvDx7+RT+QjK6FcFT4MpsuoBnHIo/O3StRRg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm-gnueabihf": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm-gnueabihf/-/lightningcss-linux-arm-gnueabihf-1.33.0.tgz",
      "integrity": "sha512-N7FVBe6iS24MlM6R/4RBTxGhQheZGs7tiQ9U32UtF75NzP5Q7xWPRqLBCKxlRQRk3rY1jCIPLzx7WzOhuUIRLQ==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm64-gnu": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm64-gnu/-/lightningcss-linux-arm64-gnu-1.33.0.tgz",
      "integrity": "sha512-j2v/itmy4HlNxlc6voKXYgBqNi0Ng2LShg4z7GufpEgs05P+2suBVyi9I6YHq5uoVFx9ETin3eCEhLVyXGQnKg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm64-musl": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm64-musl/-/lightningcss-linux-arm64-musl-1.33.0.tgz",
      "integrity": "sha512-yiO5ROMuYQgXbC60yjZU5CYSFZGKXL0HFATXt9mHJn1+zW55oCtMI9NfcVhYLMFDL7gV7oBPon/EmMMGg2OvtQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "libc": [
        "musl"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-x64-gnu": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-x64-gnu/-/lightningcss-linux-x64-gnu-1.33.0.tgz",
      "integrity": "sha512-ar+Ju7LmcN0Jo4FpL4hpFybwNG9/3A/Br5KW2n2jyODg3MEZXaDYADdemoNS+BDNfMgKvylJLj4S5tyRActuAg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-x64-musl": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-x64-musl/-/lightningcss-linux-x64-musl-1.33.0.tgz",
      "integrity": "sha512-RYiYbkokw0trfKqqzfF55lginwEPrD3OJDfTuJzFs1MK6iFnDenaz1fqLLtX4ITG3OktJQXOeTaw1awrBAlZPw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "libc": [
        "musl"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-win32-arm64-msvc": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-win32-arm64-msvc/-/lightningcss-win32-arm64-msvc-1.33.0.tgz",
      "integrity": "sha512-1K+MPfLSFVpphzpdbfkhlWk6wBrTObBzS2T6db10PNOZgR9GoVsAWzwNyuhUYYbTp23j+4RrncfujZ4uAzXvwA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-win32-x64-msvc": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-win32-x64-msvc/-/lightningcss-win32-x64-msvc-1.33.0.tgz",
      "integrity": "sha512-OlEICDx/Xl0FqSp4bry8zFnCvGpig3Gl4gCquvYwHuqJKEC1+n9NgDniFvqHGmMv1ZkqDJrDqKKSykTDX+ehuA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lucide-react": {
      "version": "1.48.0",
      "resolved": "https://registry.npmjs.org/lucide-react/-/lucide-react-1.48.0.tgz",
      "integrity": "sha512-R0CIKY/fXiC6y9xRBADgsK+VW2p/pcTJOMhLZf1T+uG+vJUvyUR02nGOgmIIC7MPkiNK4Ox8QDnbqF8rJYWPZQ==",
      "license": "ISC",
      "peerDependencies": {
        "react": "^16.5.1 || ^17.0.0 || ^18.0.0 || ^19.0.0"
      }
    },
    "node_modules/math-intrinsics": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/math-intrinsics/-/math-intrinsics-1.1.0.tgz",
      "integrity": "sha512-/IXtbwEk5HTPyEwyKX6hGkYXxM9nbj64B+ilVJnC/R6B0pH5G4V3b0pVbL7DBj4tkhBAppbQUlf6F6Xl9LHu1g==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/mime-db": {
      "version": "1.52.0",
      "resolved": "https://registry.npmjs.org/mime-db/-/mime-db-1.52.0.tgz",
      "integrity": "sha512-sPU4uV7dYlvtWJxwwxHD0PuihVNiE7TyAbQ5SWxDCB9mUYvOgroQOwYQQOKPJ8CIbE+1ETVlOoK1UC2nU3gYvg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/mime-types": {
      "version": "2.1.35",
      "resolved": "https://registry.npmjs.org/mime-types/-/mime-types-2.1.35.tgz",
      "integrity": "sha512-ZDY+bPm5zTTF+YpCrAU9nK0UgICYPT0QtT1NZWFv4s++TNkcgVaT0g6+4R2uI4MjQjzysHB1zxuWL50hzaeXiw==",
      "license": "MIT",
      "dependencies": {
        "mime-db": "1.52.0"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/ms": {
      "version": "2.1.3",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.3.tgz",
      "integrity": "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA==",
      "license": "MIT"
    },
    "node_modules/nanoid": {
      "version": "3.3.19",
      "resolved": "https://registry.npmjs.org/nanoid/-/nanoid-3.3.19.tgz",
      "integrity": "sha512-Y2tUNy4ouw6tq5oDSKeQYGOyhkUBhNOcGV/02KC+6kd9eDGqdZd++mjMiIDilrBYvjEnCYvVtsuHCuP+okSfug==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "bin": {
        "nanoid": "bin/nanoid.cjs"
      },
      "engines": {
        "node": "^10 || ^12 || ^13.7 || ^14 || >=15.0.1"
      }
    },
    "node_modules/oxlint": {
      "version": "1.85.0",
      "resolved": "https://registry.npmjs.org/oxlint/-/oxlint-1.85.0.tgz",
      "integrity": "sha512-bc26s97nuvPj1ViyPsqmKecVkUWFMEdtayO8MaQ6oiLfs1pj94cQlZZhrh4BPNlr9HQosjhIlwgZKsfcwmcNgg==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "oxlint": "bin/oxlint"
      },
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/oxc-project"
      },
      "optionalDependencies": {
        "@oxlint/binding-android-arm-eabi": "1.85.0",
        "@oxlint/binding-android-arm64": "1.85.0",
        "@oxlint/binding-darwin-arm64": "1.85.0",
        "@oxlint/binding-darwin-x64": "1.85.0",
        "@oxlint/binding-freebsd-x64": "1.85.0",
        "@oxlint/binding-linux-arm-gnueabihf": "1.85.0",
        "@oxlint/binding-linux-arm-musleabihf": "1.85.0",
        "@oxlint/binding-linux-arm64-gnu": "1.85.0",
        "@oxlint/binding-linux-arm64-musl": "1.85.0",
        "@oxlint/binding-linux-ppc64-gnu": "1.85.0",
        "@oxlint/binding-linux-riscv64-gnu": "1.85.0",
        "@oxlint/binding-linux-riscv64-musl": "1.85.0",
        "@oxlint/binding-linux-s390x-gnu": "1.85.0",
        "@oxlint/binding-linux-x64-gnu": "1.85.0",
        "@oxlint/binding-linux-x64-musl": "1.85.0",
        "@oxlint/binding-openharmony-arm64": "1.85.0",
        "@oxlint/binding-win32-arm64-msvc": "1.85.0",
        "@oxlint/binding-win32-ia32-msvc": "1.85.0",
        "@oxlint/binding-win32-x64-msvc": "1.85.0"
      },
      "peerDependencies": {
        "oxlint-tsgolint": ">=7.0.2001",
        "vite-plus": "*"
      },
      "peerDependenciesMeta": {
        "oxlint-tsgolint": {
          "optional": true
        },
        "vite-plus": {
          "optional": true
        }
      }
    },
    "node_modules/picocolors": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/picocolors/-/picocolors-1.1.1.tgz",
      "integrity": "sha512-xceH2snhtb5M9liqDsmEw56le376mTZkEX/jEb/RxNFyegNul7eNslCXP9FDj/Lcu0X8KEyMceP2ntpaHrDEVA==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/picomatch": {
      "version": "4.0.7",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-4.0.7.tgz",
      "integrity": "sha512-qcJu88Q2IWqJsDD529JKMdwGm/dvInW4HvQnRwiH9JtihJvzGOscDtHE3x1pBKeUOTysQ8kVmLnJ2kJu7yhcGA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/postcss": {
      "version": "8.5.28",
      "resolved": "https://registry.npmjs.org/postcss/-/postcss-8.5.28.tgz",
      "integrity": "sha512-RRuzqDtt5Y9h3quz5hWhK+TPnsmVs6WwSU6LkJMeY4HstUEDuYTG8UJSdawMRzmzAtV+KEoG8N3Qg2qLy5vM/A==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/postcss"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "nanoid": "^3.3.18",
        "picocolors": "^1.1.1",
        "source-map-js": "^1.2.1"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      }
    },
    "node_modules/proxy-from-env": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/proxy-from-env/-/proxy-from-env-2.1.0.tgz",
      "integrity": "sha512-cJ+oHTW1VAEa8cJslgmUZrc+sjRKgAKl3Zyse6+PV38hZe/V6Z14TbCuXcan9F9ghlz4QrFr2c92TNF82UkYHA==",
      "license": "MIT",
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/react": {
      "version": "19.3.0",
      "resolved": "https://registry.npmjs.org/react/-/react-19.3.0.tgz",
      "integrity": "sha512-E8LUcbtBWt20bbl2YoHfx4ZDBdxVTfOKtCZn9cDSJ4l6/nuoApcpIBcj47t2wZoVX8g2ZHuMHbiShgCR1T5Sog==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/react-dom": {
      "version": "19.3.0",
      "resolved": "https://registry.npmjs.org/react-dom/-/react-dom-19.3.0.tgz",
      "integrity": "sha512-JDk8dgif51OjFoDE70+OT9ICyYr+69HlmihNwp1+Nsfbna3t5sIiCa9ZJktDmQ4/1b/rn26hIAR2uYXDMr5r0Q==",
      "license": "MIT",
      "dependencies": {
        "scheduler": "^0.28.0"
      },
      "peerDependencies": {
        "react": "^19.3.0"
      }
    },
    "node_modules/rolldown": {
      "version": "1.2.10",
      "resolved": "https://registry.npmjs.org/rolldown/-/rolldown-1.2.10.tgz",
      "integrity": "sha512-OxkA08pSryMK7B3XiFA09B4OJ1xJMPgIYCBMY2xchzpqgBGsV1o0DetPAE+Sl3N3L4oCPiEzmHVSOj7iR04Zog==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@oxc-project/types": "=0.151.0",
        "@rolldown/pluginutils": "^1.0.0"
      },
      "bin": {
        "rolldown": "bin/cli.mjs"
      },
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      },
      "optionalDependencies": {
        "@rolldown/binding-android-arm-eabi": "1.2.10",
        "@rolldown/binding-android-arm64": "1.2.10",
        "@rolldown/binding-darwin-arm64": "1.2.10",
        "@rolldown/binding-darwin-x64": "1.2.10",
        "@rolldown/binding-freebsd-x64": "1.2.10",
        "@rolldown/binding-linux-arm-gnueabihf": "1.2.10",
        "@rolldown/binding-linux-arm64-gnu": "1.2.10",
        "@rolldown/binding-linux-arm64-musl": "1.2.10",
        "@rolldown/binding-linux-ppc64-gnu": "1.2.10",
        "@rolldown/binding-linux-s390x-gnu": "1.2.10",
        "@rolldown/binding-linux-x64-gnu": "1.2.10",
        "@rolldown/binding-linux-x64-musl": "1.2.10",
        "@rolldown/binding-openharmony-arm64": "1.2.10",
        "@rolldown/binding-win32-arm64-msvc": "1.2.10",
        "@rolldown/binding-win32-x64-msvc": "1.2.10"
      }
    },
    "node_modules/scheduler": {
      "version": "0.28.0",
      "resolved": "https://registry.npmjs.org/scheduler/-/scheduler-0.28.0.tgz",
      "integrity": "sha512-juorfCmIkIw8tT+p5BXSm6PJjQF/ycEYmKyzURCIt/RaZIhL+PulbQ9Yu2z1HdOJDdqDTlxA1+xKBmHXJsczAw==",
      "license": "MIT"
    },
    "node_modules/source-map-js": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/source-map-js/-/source-map-js-1.2.1.tgz",
      "integrity": "sha512-UXWMKhLOwVKb728IUtQPXxfYU+usdybtUrK/8uGE8CQMvrhOpwvzDBwj0QhSL7MQc7vIsISBG8VQ8+IDQxpfQA==",
      "dev": true,
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/tinyglobby": {
      "version": "0.2.17",
      "resolved": "https://registry.npmjs.org/tinyglobby/-/tinyglobby-0.2.17.tgz",
      "integrity": "sha512-wXR/dYpcqKmfWpEdZjiKJOwCNFndD0DMnrW/cYjVGttEkBfVgcLFHoNrlj47mjOVic9yyNu65alsgF4NQyTa2g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fdir": "^6.5.0",
        "picomatch": "^4.0.4"
      },
      "engines": {
        "node": ">=12.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/SuperchupuDev"
      }
    },
    "node_modules/vite": {
      "version": "8.3.0",
      "resolved": "https://registry.npmjs.org/vite/-/vite-8.3.0.tgz",
      "integrity": "sha512-lhZBVvEHefgE+HQZC9O7EBJgCU/nVzFNl7vkS4RE0APtWLP02/8QVIkQtzBxPquh7lq5/78NHipTj7ODQ6XuyQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "lightningcss": "^1.33.0",
        "picomatch": "^4.0.7",
        "postcss": "^8.5.28",
        "rolldown": "~1.2.6",
        "tinyglobby": "^0.2.17"
      },
      "bin": {
        "vite": "bin/vite.js"
      },
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      },
      "funding": {
        "url": "https://github.com/vitejs/vite?sponsor=1"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.3"
      },
      "peerDependencies": {
        "@types/node": "^20.19.0 || >=22.12.0",
        "@vitejs/devtools": "^0.7.1",
        "esbuild": "^0.27.0 || ^0.28.0",
        "jiti": ">=1.21.0",
        "less": "^4.0.0",
        "sass": "^1.70.0",
        "sass-embedded": "^1.70.0",
        "stylus": ">=0.54.8",
        "sugarss": "^5.0.0",
        "terser": "^5.16.0",
        "tsx": "^4.8.1",
        "yaml": "^2.4.2"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        },
        "@vitejs/devtools": {
          "optional": true
        },
        "esbuild": {
          "optional": true
        },
        "jiti": {
          "optional": true
        },
        "less": {
          "optional": true
        },
        "sass": {
          "optional": true
        },
        "sass-embedded": {
          "optional": true
        },
        "stylus": {
          "optional": true
        },
        "sugarss": {
          "optional": true
        },
        "terser": {
          "optional": true
        },
        "tsx": {
          "optional": true
        },
        "yaml": {
          "optional": true
        }
      }
    }
  }
}

```

[Back to Table of Contents](#2-table-of-contents)

---

<a id="frontendpackagejson"></a>
#### 42. `frontend/package.json`

**Path**: `frontend/package.json` &nbsp;|&nbsp; **Size**: 0.50 KB (514 bytes) &nbsp;|&nbsp; **Language**: `json` &nbsp;|&nbsp; **Lines**: 25 lines

```json
{
  "name": "frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "oxlint",
    "preview": "vite preview"
  },
  "dependencies": {
    "axios": "^1.20.0",
    "lucide-react": "^1.48.0",
    "react": "^19.2.8",
    "react-dom": "^19.2.8"
  },
  "devDependencies": {
    "@types/react": "^19.2.18",
    "@types/react-dom": "^19.2.7",
    "@vitejs/plugin-react": "^6.1.1",
    "oxlint": "^1.81.0",
    "vite": "^8.3.0"
  }
}

```

[Back to Table of Contents](#2-table-of-contents)

---

<a id="frontendviteconfigjs"></a>
#### 43. `frontend/vite.config.js`

**Path**: `frontend/vite.config.js` &nbsp;|&nbsp; **Size**: 0.16 KB (161 bytes) &nbsp;|&nbsp; **Language**: `javascript` &nbsp;|&nbsp; **Lines**: 7 lines

```javascript
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})

```

[Back to Table of Contents](#2-table-of-contents)

---

### Category: Frontend - React Source Code & Styles

<a id="frontendsrcappcss"></a>
#### 44. `frontend/src/App.css`

**Path**: `frontend/src/App.css` &nbsp;|&nbsp; **Size**: 41.96 KB (42965 bytes) &nbsp;|&nbsp; **Language**: `css` &nbsp;|&nbsp; **Lines**: 2193 lines

```css
/* frontend/src/App.css */

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}

/* NAVBAR */
.navbar {
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.9rem 2rem;
  background: var(--bg-glass);
  backdrop-filter: var(--blur-glass);
  -webkit-backdrop-filter: var(--blur-glass);
  border-bottom: 1px solid var(--border-glass);
}

.brand-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.45rem;
  color: var(--accent-cream);
  cursor: pointer;
}

.brand-icon-wrapper {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  background: var(--accent-primary);
  color: var(--accent-cream);
  border: 1px solid rgba(239, 235, 216, 0.2);
  box-shadow: var(--shadow-sm);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.user-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.85rem;
  background: var(--bg-surface-elevated);
  border: 1px solid var(--border-glass);
  border-radius: var(--radius-full);
  font-size: 0.85rem;
  color: var(--text-primary);
}

.role-pill {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.15rem 0.55rem;
  border-radius: var(--radius-full);
}

.role-pill.student {
  background: rgba(118, 126, 112, 0.25);
  color: var(--accent-cream);
  border: 1px solid var(--border-sage);
}

.role-pill.educator {
  background: rgba(109, 2, 2, 0.4);
  color: var(--accent-cream);
  border: 1px solid rgba(109, 2, 2, 0.7);
}

/* BUTTONS */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.55rem 1.15rem;
  border-radius: var(--radius-md);
  font-size: 0.92rem;
  font-weight: 600;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-primary {
  background: var(--accent-primary);
  color: var(--accent-cream);
  border: 1px solid rgba(239, 235, 216, 0.18);
  box-shadow: var(--shadow-sm);
}

.btn-primary:hover:not(:disabled) {
  background: var(--accent-primary-hover);
  color: #ffffff;
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

.btn-secondary {
  background: var(--bg-surface-elevated);
  color: var(--text-primary);
  border: 1px solid var(--border-glass);
}

.btn-secondary:hover:not(:disabled) {
  background: var(--bg-card-hover);
  border-color: var(--border-sage);
}

.btn-danger {
  background: var(--danger-bg);
  color: var(--accent-cream);
  border: 1px solid rgba(158, 26, 26, 0.45);
}

.btn-danger:hover:not(:disabled) {
  background: var(--danger);
  color: #fff;
}

.btn-icon {
  padding: 0.45rem;
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  transition: all 0.2s ease;
}

.btn-icon:hover {
  background: var(--bg-surface-elevated);
  color: var(--text-primary);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* MAIN CONTENT */
.main-content {
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* HERO / WELCOME SECTION */
.hero-banner {
  background: linear-gradient(135deg, rgba(109, 2, 2, 0.35) 0%, rgba(41, 0, 0, 0.85) 60%, rgba(118, 126, 112, 0.18) 100%);
  border: 1px solid var(--border-glass);
  border-radius: var(--radius-xl);
  padding: 2.25rem 2.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

.hero-text h1 {
  font-size: 2.15rem;
  margin-bottom: 0.45rem;
  color: var(--accent-cream);
}

.hero-text p {
  color: var(--text-secondary);
  font-size: 1rem;
  max-width: 600px;
}

.stats-grid {
  display: flex;
  gap: 1.25rem;
}

.stat-card {
  background: var(--bg-glass);
  backdrop-filter: var(--blur-glass);
  border: 1px solid var(--border-glass);
  border-radius: var(--radius-lg);
  padding: 0.9rem 1.35rem;
  min-width: 110px;
  text-align: center;
  box-shadow: var(--shadow-sm);
}

.stat-val {
  font-family: var(--font-display);
  font-size: 1.65rem;
  font-weight: 700;
  color: var(--accent-cream);
}

.stat-label {
  font-size: 0.72rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* SECTION HEADERS */
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.45rem;
  color: var(--accent-cream);
}

/* UPLOAD CARD / DROPZONE */
.upload-card {
  background: var(--bg-card);
  backdrop-filter: var(--blur-glass);
  border: 1px solid var(--border-glass);
  border-radius: var(--radius-xl);
  padding: 1.75rem;
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
}

.dropzone {
  border: 2px dashed var(--border-glass);
  border-radius: var(--radius-lg);
  padding: 2.25rem 1.5rem;
  text-align: center;
  cursor: pointer;
  background: rgba(28, 0, 0, 0.5);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.dropzone.active {
  border-color: var(--accent-secondary);
  background: rgba(109, 2, 2, 0.16);
  transform: scale(1.005);
}

.dropzone-icon-circle {
  width: 58px;
  height: 58px;
  margin: 0 auto 1rem;
  border-radius: 50%;
  background: var(--bg-surface-elevated);
  border: 1px solid var(--border-glass);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-cream);
  transition: all 0.25s ease;
}

.dropzone:hover .dropzone-icon-circle {
  transform: translateY(-2px);
  background: var(--accent-primary);
  color: #fff;
  border-color: rgba(239, 235, 216, 0.25);
}

.dropzone-text {
  font-size: 1.05rem;
  font-weight: 600;
  margin-bottom: 0.3rem;
  color: var(--text-primary);
}

.dropzone-subtext {
  font-size: 0.82rem;
  color: var(--text-muted);
}

.supported-chips {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.chip {
  font-size: 0.72rem;
  padding: 0.2rem 0.6rem;
  background: var(--bg-surface-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-full);
  color: var(--text-secondary);
}

/* UPLOAD FORM CONTROLS */
.upload-form {
  margin-top: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
}

.selected-file-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.15rem;
  background: var(--bg-surface-elevated);
  border: 1px solid var(--border-glass);
  border-radius: var(--radius-md);
}

.file-meta-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  text-align: left;
}

.input-group label {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.input-control {
  background: var(--bg-surface-elevated);
  border: 1px solid var(--border-glass);
  border-radius: var(--radius-md);
  padding: 0.65rem 0.9rem;
  color: var(--text-primary);
  font-size: 0.92rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.input-control:focus {
  border-color: var(--border-sage);
  box-shadow: 0 0 0 2px rgba(118, 126, 112, 0.3);
}

/* PROGRESS BAR */
.progress-container {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.progress-track {
  width: 100%;
  height: 7px;
  background: var(--bg-surface-elevated);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: var(--accent-gradient);
  transition: width 0.3s ease;
}

/* LECTURE FILTERS & SEARCH */
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.search-input-wrapper {
  position: relative;
  flex: 1;
  min-width: 240px;
}

.search-input-wrapper svg {
  position: absolute;
  left: 0.9rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
}

.search-input-wrapper input {
  width: 100%;
  padding-left: 2.6rem;
}

.filter-pills {
  display: flex;
  gap: 0.45rem;
}

.filter-btn {
  padding: 0.4rem 0.85rem;
  font-size: 0.82rem;
  font-weight: 600;
  border-radius: var(--radius-full);
  background: var(--bg-surface-elevated);
  color: var(--text-secondary);
  border: 1px solid var(--border-subtle);
  transition: all 0.2s;
}

.filter-btn:hover {
  border-color: var(--border-sage);
  color: var(--text-primary);
}

.filter-btn.active {
  background: var(--accent-primary);
  color: var(--accent-cream);
  border-color: rgba(239, 235, 216, 0.2);
  box-shadow: var(--shadow-sm);
}

/* LECTURE CARDS GRID */
.lectures-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.35rem;
}

.lecture-card {
  background: var(--bg-card);
  backdrop-filter: var(--blur-glass);
  border: 1px solid var(--border-glass);
  border-radius: var(--radius-lg);
  padding: 1.35rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.15rem;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.lecture-card:hover {
  background: var(--bg-card-hover);
  border-color: var(--border-sage);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.85rem;
}

.file-type-icon {
  width: 42px;
  height: 42px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.15rem;
  flex-shrink: 0;
}

.file-type-icon.pdf {
  background: rgba(109, 2, 2, 0.35);
  color: var(--accent-cream);
  border: 1px solid rgba(109, 2, 2, 0.7);
}

.file-type-icon.doc {
  background: rgba(118, 126, 112, 0.25);
  color: var(--accent-cream);
  border: 1px solid var(--border-sage);
}

.file-type-icon.audio {
  background: rgba(217, 119, 6, 0.2);
  color: var(--accent-cream);
  border: 1px solid rgba(217, 119, 6, 0.4);
}

.file-type-icon.video {
  background: rgba(109, 2, 2, 0.25);
  color: var(--accent-cream);
  border: 1px solid rgba(109, 2, 2, 0.5);
}

.file-type-icon.text {
  background: rgba(56, 142, 60, 0.2);
  color: var(--accent-cream);
  border: 1px solid rgba(56, 142, 60, 0.4);
}

.card-header-text {
  flex: 1;
  text-align: left;
}

.card-title {
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  color: var(--text-primary);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-filename {
  font-size: 0.78rem;
  color: var(--text-muted);
  word-break: break-all;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.2rem 0.55rem;
  border-radius: var(--radius-full);
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: capitalize;
}

.status-badge.uploaded {
  background: rgba(118, 126, 112, 0.22);
  color: var(--text-secondary);
  border: 1px solid var(--border-sage);
}

.status-badge.extracting {
  background: rgba(217, 119, 6, 0.22);
  color: #fde68a;
  border: 1px solid rgba(217, 119, 6, 0.4);
}

.status-badge.transcribing {
  background: rgba(109, 2, 2, 0.35);
  color: #fed7aa;
  border: 1px solid rgba(180, 83, 9, 0.45);
}

.status-badge.processing {
  background: var(--warning-bg);
  color: #fde68a;
  border: 1px solid rgba(217, 119, 6, 0.35);
}

.status-badge.completed {
  background: var(--success-bg);
  color: #a7f3d0;
  border: 1px solid rgba(56, 142, 60, 0.35);
}

.status-badge.failed {
  background: var(--danger-bg);
  color: #fca5a5;
  border: 1px solid rgba(158, 26, 26, 0.45);
}

.card-meta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.78rem;
  color: var(--text-muted);
  border-top: 1px solid var(--border-subtle);
  padding-top: 0.75rem;
}

.card-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.45rem;
}

/* EMPTY STATE */
.empty-state {
  padding: 3.5rem 2rem;
  text-align: center;
  background: var(--bg-card);
  border: 1px solid var(--border-glass);
  border-radius: var(--radius-xl);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.85rem;
}

.empty-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--bg-surface-elevated);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
}

/* ====================================================
   MODALS & OVERLAYS - ROBUST SCROLL & NO CLIPPING
   ==================================================== */
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(15, 0, 0, 0.82);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  overflow-y: auto;
  box-sizing: border-box;
  animation: fadeIn 0.2s ease-out;
}

.modal-content {
  background: var(--bg-surface);
  border: 1px solid var(--border-glass);
  border-radius: var(--radius-xl);
  padding: 1.5rem 1.75rem;
  max-width: 440px;
  width: 100%;
  max-height: calc(100vh - 2rem);
  max-height: calc(100dvh - 2rem);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  box-shadow: var(--shadow-lg);
  position: relative;
  box-sizing: border-box;
  margin: auto;
  animation: slideUp 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.lecture-detail-modal {
  max-width: 560px;
  padding: 1.75rem;
}

/* AUTH MODAL STYLING */
.auth-modal {
  max-width: 420px;
  padding: 1.4rem 1.6rem;
}

.auth-header {
  text-align: center;
  margin-bottom: 0.9rem;
}

.auth-icon-badge {
  width: 38px;
  height: 38px;
  margin: 0 auto 0.45rem;
  border-radius: var(--radius-md);
  background: var(--accent-primary);
  border: 1px solid rgba(239, 235, 216, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-cream);
  box-shadow: var(--shadow-sm);
}

.auth-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--accent-cream);
  margin-bottom: 0.15rem;
}

.auth-subtitle {
  color: var(--text-muted);
  font-size: 0.8rem;
  line-height: 1.35;
}

.auth-tabs {
  display: flex;
  background: var(--bg-base);
  border-radius: var(--radius-md);
  padding: 0.25rem;
  margin-bottom: 0.85rem;
  border: 1px solid var(--border-subtle);
}

.auth-tab {
  flex: 1;
  padding: 0.45rem 0.75rem;
  font-weight: 600;
  font-size: 0.85rem;
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  transition: all 0.2s ease;
  text-align: center;
}

.auth-tab.active {
  background: var(--accent-primary);
  color: var(--accent-cream);
  border: 1px solid rgba(239, 235, 216, 0.2);
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.auth-form .input-group {
  gap: 0.25rem;
}

.auth-form .input-group label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.auth-form .input-control {
  padding: 0.55rem 0.85rem;
  font-size: 0.9rem;
  border-radius: var(--radius-sm);
  background: var(--bg-surface-elevated);
  border: 1px solid var(--border-glass);
}

.auth-form .input-control:focus {
  border-color: var(--border-sage);
  box-shadow: 0 0 0 2px rgba(118, 126, 112, 0.35);
}

.role-selector-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.role-btn {
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border-glass);
  border-radius: var(--radius-sm);
  background: var(--bg-base);
  color: var(--text-secondary);
  font-weight: 600;
  font-size: 0.82rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  transition: all 0.2s ease;
}

.role-btn:hover {
  background: var(--bg-surface-elevated);
  color: var(--text-primary);
}

.role-btn.active {
  border-color: rgba(239, 235, 216, 0.3);
  background: var(--accent-primary);
  color: var(--accent-cream);
}

.submit-btn-wrapper {
  margin-top: 0.45rem;
  padding-bottom: 0;
}

.auth-submit-btn {
  width: 100%;
  padding: 0.65rem 1rem;
  font-size: 0.92rem;
  font-weight: 600;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: var(--text-muted);
  font-size: 1.15rem;
  cursor: pointer;
  transition: color 0.2s;
  z-index: 10;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close:hover {
  color: var(--accent-cream);
}

/* ALERTS & TOASTS */
.alert-banner {
  padding: 0.65rem 1rem;
  border-radius: var(--radius-md);
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 0.75rem;
}

.alert-danger {
  background: var(--danger-bg);
  border: 1px solid rgba(158, 26, 26, 0.4);
  color: #fca5a5;
}

.alert-success {
  background: var(--success-bg);
  border: 1px solid rgba(56, 142, 60, 0.4);
  color: #a7f3d0;
}

/* ANIMATIONS */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spin-animation {
  animation: spin 1s linear infinite;
}

@keyframes pulseDot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.35; transform: scale(0.9); }
}

.pulse-animation {
  animation: pulseDot 1.4s ease-in-out infinite;
}

/* ====================================================
   MODULE 2: PROCESSING STATUS & TRANSCRIPT MODAL
   ==================================================== */
.modal-content.transcript-modal {
  max-width: 900px;
  width: 95%;
  height: 88vh;
  max-height: 88vh;
  padding: 1.75rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.modal-header-section {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  border-bottom: 1px solid var(--border-subtle);
  padding-bottom: 1rem;
}

.modal-header-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.modal-title-wrap h3 {
  font-size: 1.35rem;
  line-height: 1.25;
  color: var(--text-primary);
}

.modal-title-wrap .subtitle {
  font-size: 0.82rem;
  color: var(--text-muted);
  margin-top: 0.2rem;
}

/* STEPPER */
.stepper-card {
  background: var(--bg-surface-elevated);
  border: 1px solid var(--border-glass);
  border-radius: var(--radius-lg);
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.stepper-flow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 100%;
}

.step-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.45rem;
  position: relative;
  z-index: 2;
  flex: 1;
}

.step-circle {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: var(--bg-surface);
  border: 2px solid var(--border-subtle);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  font-size: 0.85rem;
  font-weight: 700;
  transition: all 0.3s ease;
}

.step-node.completed .step-circle {
  background: var(--success);
  border-color: var(--success);
  color: #ffffff;
}

.step-node.active .step-circle {
  background: var(--accent-primary);
  border-color: var(--accent-sage-light);
  color: var(--accent-cream);
  box-shadow: 0 0 0 4px rgba(109, 2, 2, 0.35);
}

.step-node.failed .step-circle {
  background: var(--danger);
  border-color: var(--danger);
  color: #ffffff;
}

.step-label {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: capitalize;
  letter-spacing: 0.02em;
}

.step-node.active .step-label {
  color: var(--accent-cream);
  font-weight: 700;
}

.step-node.completed .step-label {
  color: #a7f3d0;
}

.step-node.failed .step-label {
  color: #fca5a5;
}

.step-line {
  position: absolute;
  top: 19px;
  left: 10%;
  right: 10%;
  height: 2px;
  background: var(--border-subtle);
  z-index: 1;
}

.step-line-progress {
  height: 100%;
  background: var(--success);
  transition: width 0.4s ease;
}

/* LIVE STATUS TEXT */
.live-status-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: rgba(35, 1, 1, 0.6);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  font-size: 0.86rem;
}

.live-status-left {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  color: var(--text-secondary);
}

.live-status-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--warning);
}

.live-status-dot.active {
  animation: pulseDot 1.2s ease-in-out infinite;
}

/* FAILURE DISPLAY */
.failure-box {
  background: var(--danger-bg);
  border: 1px solid rgba(158, 26, 26, 0.45);
  border-radius: var(--radius-md);
  padding: 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  text-align: left;
}

.failure-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #fca5a5;
  font-weight: 700;
  font-size: 0.95rem;
}

.failure-message {
  font-size: 0.85rem;
  color: var(--text-primary);
  line-height: 1.45;
  background: rgba(0, 0, 0, 0.25);
  padding: 0.5rem 0.75rem;
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  word-break: break-word;
}

/* TRANSCRIPT VIEWER */
.transcript-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  min-height: 0; /* important for flex overflow */
}

.transcript-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.transcript-stats-pills {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.stat-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.65rem;
  background: var(--bg-surface-elevated);
  border: 1px solid var(--border-glass);
  border-radius: var(--radius-full);
  font-size: 0.76rem;
  color: var(--text-secondary);
}

.stat-pill strong {
  color: var(--text-primary);
}

.transcript-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.transcript-search-wrap {
  position: relative;
  display: flex;
  align-items: center;
  width: 220px;
}

.transcript-search-wrap svg {
  position: absolute;
  left: 0.65rem;
  color: var(--text-muted);
  pointer-events: none;
}

.transcript-search-wrap input {
  padding-left: 2rem;
  font-size: 0.82rem;
  height: 34px;
}

.transcript-scroll-canvas {
  flex: 1;
  background: var(--bg-base);
  border: 1px solid var(--border-glass);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  overflow-y: auto;
  font-size: 0.95rem;
  line-height: 1.75;
  color: var(--text-primary);
  text-align: left;
  user-select: text;
}

.transcript-scroll-canvas p {
  margin-bottom: 1.25rem;
}

.transcript-scroll-canvas mark.search-highlight {
  background: rgba(217, 119, 6, 0.4);
  color: #fff;
  border-radius: 2px;
  padding: 0.05rem 0.2rem;
}

.tab-nav {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid var(--border-subtle);
  padding-bottom: 0.5rem;
}

.tab-nav-btn {
  padding: 0.35rem 0.85rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-muted);
  border-radius: var(--radius-sm);
  transition: all 0.2s ease;
}

.tab-nav-btn.active {
  color: var(--accent-cream);
  background: var(--bg-surface-elevated);
  border: 1px solid var(--border-glass);
}

/* ====================================================
   MODULE 3: SUMMARY, KEYWORDS & FLASHCARDS STYLES
   ==================================================== */

/* TAB BAR ENHANCEMENT */
.tab-nav {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid var(--border-subtle);
  padding-bottom: 0.65rem;
  overflow-x: auto;
}

.tab-nav-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.45rem 0.95rem;
  font-size: 0.86rem;
  font-weight: 600;
  color: var(--text-muted);
  border-radius: var(--radius-md);
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.tab-nav-btn:hover {
  color: var(--accent-cream);
  background: rgba(118, 126, 112, 0.15);
}

.tab-nav-btn.active {
  color: var(--accent-cream);
  background: var(--bg-surface-elevated);
  border: 1px solid var(--border-glass);
  box-shadow: var(--shadow-sm);
}

.tab-count-badge {
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.1rem 0.45rem;
  border-radius: var(--radius-full);
  background: rgba(109, 2, 2, 0.5);
  border: 1px solid var(--border-subtle);
  color: var(--accent-cream);
}

/* 1. SUMMARY TAB */
.summary-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
  min-height: 0;
  overflow-y: auto;
  padding-right: 0.25rem;
}

.summary-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.summary-stats-pills {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.summary-content-grid {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.summary-text-box {
  background: var(--bg-base);
  border: 1px solid var(--border-glass);
  border-radius: var(--radius-lg);
  padding: 1.5rem 1.75rem;
  font-size: 0.96rem;
  line-height: 1.8;
  color: var(--text-primary);
  text-align: left;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
}

.summary-text-box p {
  margin-bottom: 1rem;
}

.summary-text-box p:last-child {
  margin-bottom: 0;
}

.key-points-card {
  background: var(--bg-surface-elevated);
  border: 1px solid var(--border-glass);
  border-radius: var(--radius-lg);
  padding: 1.35rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  text-align: left;
}

.key-points-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--accent-cream);
  font-family: var(--font-display);
}

.key-points-list {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.key-point-item {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  font-size: 0.88rem;
  line-height: 1.55;
  color: var(--text-secondary);
}

.key-point-icon {
  margin-top: 0.2rem;
  flex-shrink: 0;
  color: var(--accent-sage-light);
}

/* 2. KEYWORDS & CONCEPTS TAB */
.keywords-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
  min-height: 0;
  overflow-y: auto;
  padding-right: 0.25rem;
}

.keywords-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.keywords-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  gap: 0.85rem;
}

.keyword-card {
  background: var(--bg-surface-elevated);
  border: 1px solid var(--border-glass);
  border-radius: var(--radius-md);
  padding: 0.9rem 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  text-align: left;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.keyword-card:hover {
  transform: translateY(-2px);
  border-color: var(--border-sage);
  background: var(--bg-surface);
}

.keyword-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.keyword-term {
  font-size: 0.96rem;
  font-weight: 700;
  color: var(--accent-cream);
  word-break: break-word;
}

.keyword-freq-pill {
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.15rem 0.5rem;
  border-radius: var(--radius-full);
  background: rgba(118, 126, 112, 0.25);
  border: 1px solid var(--border-sage);
  color: var(--text-secondary);
  white-space: nowrap;
}

.keyword-bar-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.keyword-bar-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.74rem;
  color: var(--text-muted);
}

.keyword-bar-track {
  width: 100%;
  height: 4px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.keyword-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-primary) 0%, var(--accent-sage-light) 100%);
  border-radius: var(--radius-full);
}

/* 3. FLASHCARDS TAB */
.flashcards-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
  min-height: 0;
  overflow-y: auto;
  padding-right: 0.25rem;
}

.flashcards-header-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  flex-wrap: wrap;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border-subtle);
}

.view-mode-toggles {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  background: var(--bg-surface-elevated);
  border: 1px solid var(--border-glass);
  padding: 0.2rem;
  border-radius: var(--radius-md);
}

.view-mode-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0.65rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-muted);
  border-radius: var(--radius-sm);
  background: transparent;
  cursor: pointer;
  transition: all 0.2s ease;
}

.view-mode-btn.active {
  color: var(--accent-cream);
  background: var(--accent-primary);
}

.flashcard-regen-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.card-count-select {
  background: var(--bg-surface-elevated);
  border: 1px solid var(--border-glass);
  border-radius: var(--radius-sm);
  color: var(--accent-cream);
  padding: 0.35rem 0.65rem;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
}

.card-count-select:focus {
  outline: none;
  border-color: var(--accent-sage);
}

.flashcard-generating-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  padding: 0.75rem 1.25rem;
  margin-bottom: 0.75rem;
  background: rgba(109, 2, 2, 0.3);
  border: 1px solid var(--border-sage);
  border-radius: var(--radius-md);
  color: var(--accent-cream);
  font-size: 0.88rem;
  font-weight: 600;
  animation: fadeIn 0.2s ease-in-out;
}

/* FLASHCARD 3D CAROUSEL */
.flashcard-carousel-stage {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  width: 100%;
  max-width: 680px;
  margin: 0 auto;
  padding: 0.5rem 0;
}

.flashcard-progress-bar-wrap {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  font-size: 0.84rem;
  color: var(--text-muted);
}

.flashcard-progress-track {
  flex: 1;
  height: 6px;
  background: var(--bg-surface-elevated);
  border: 1px solid var(--border-glass);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.flashcard-progress-fill {
  height: 100%;
  background: var(--accent-primary);
  border-radius: var(--radius-full);
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.flashcard-perspective-box {
  perspective: 1200px;
  width: 100%;
  min-height: 290px;
  cursor: pointer;
}

.flashcard-3d-card {
  position: relative;
  width: 100%;
  min-height: 290px;
  transform-style: preserve-3d;
  transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

.flashcard-3d-card.flipped {
  transform: rotateY(180deg);
}

.flashcard-face {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: 290px;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: var(--radius-lg);
  padding: 1.75rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  box-sizing: border-box;
}

.flashcard-face.front {
  background: var(--bg-surface-elevated);
  border: 1px solid var(--border-glass);
}

.flashcard-face.back {
  background: var(--bg-surface);
  border: 1px solid var(--border-sage);
  transform: rotateY(180deg);
}

.flashcard-top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.flashcard-category-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.2rem 0.65rem;
  border-radius: var(--radius-full);
  background: rgba(109, 2, 2, 0.4);
  border: 1px solid var(--border-subtle);
  color: var(--accent-cream);
}

.flashcard-side-indicator {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-muted);
}

.flashcard-body-text {
  font-size: 1.15rem;
  line-height: 1.6;
  font-weight: 600;
  color: var(--text-primary);
  margin: 1.25rem 0;
  user-select: text;
}

.flashcard-body-text.answer-text {
  color: #efebd8;
  font-weight: 500;
  font-size: 1.05rem;
  line-height: 1.7;
}

.flashcard-footer-prompt {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.78rem;
  color: var(--text-muted);
  border-top: 1px solid var(--border-subtle);
  padding-top: 0.75rem;
}

.flashcard-flip-cue {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: var(--accent-sage-light);
  font-weight: 600;
}

.flashcard-nav-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  width: 100%;
  margin-top: 0.25rem;
}

.flashcard-nav-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--bg-surface-elevated);
  border: 1px solid var(--border-glass);
  color: var(--accent-cream);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.flashcard-nav-btn:hover:not(:disabled) {
  background: var(--accent-primary);
  border-color: var(--border-sage);
  transform: translateY(-2px);
}

.flashcard-nav-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.flashcard-flip-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.55rem 1.1rem;
  border-radius: var(--radius-full);
  background: var(--bg-surface);
  border: 1px solid var(--border-glass);
  color: var(--accent-cream);
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.flashcard-flip-btn:hover {
  background: var(--accent-primary);
  border-color: var(--border-sage);
}

/* FLASHCARD LIST VIEW */
.flashcards-list-view {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.flashcard-list-item {
  background: var(--bg-surface-elevated);
  border: 1px solid var(--border-glass);
  border-radius: var(--radius-lg);
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  text-align: left;
  transition: all 0.2s ease;
}

.flashcard-list-item:hover {
  border-color: var(--border-sage);
}

.flashcard-list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.flashcard-number-tag {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--accent-sage-light);
}

.flashcard-list-qa {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.flashcard-list-q {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.45;
}

.flashcard-list-a {
  font-size: 0.92rem;
  line-height: 1.65;
  color: var(--text-secondary);
  background: var(--bg-base);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 0.85rem 1rem;
}

/* RESPONSIVENESS */
@media (max-width: 768px) {
  .hero-banner {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.25rem;
    padding: 1.5rem;
  }
  .stats-grid {
    width: 100%;
    justify-content: space-between;
  }
  .navbar {
    padding: 0.85rem 1rem;
  }
  .main-content {
    padding: 1rem;
  }
  .lectures-grid {
    grid-template-columns: 1fr;
  }
  .modal-content {
    padding: 1.25rem;
  }
  .auth-modal {
    padding: 1.25rem;
  }
}

/* ==========================================================================
   MODULE 4: ROLE-BASED ACCESS & EDUCATOR/ADMIN DASHBOARD STYLES
   ========================================================================== */

.role-pill.admin {
  background: rgba(109, 2, 2, 0.65);
  color: var(--accent-cream);
  border: 1px solid var(--accent-cream);
}

/* ADMIN CONSOLE */
.admin-modal-content {
  max-width: 950px;
  width: 95%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

.admin-header-subtitle {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-top: 0.2rem;
}

.admin-stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 0.85rem;
  margin-bottom: 1.25rem;
}

.admin-stat-card {
  background: var(--bg-surface-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.admin-stat-num {
  font-family: var(--font-display);
  font-size: 1.55rem;
  font-weight: 800;
  color: var(--accent-cream);
}

.admin-stat-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.admin-stat-sub {
  font-size: 0.72rem;
  color: var(--accent-sage-light);
}

.admin-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.admin-filter-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.admin-select {
  background: var(--bg-surface-elevated);
  border: 1px solid var(--border-subtle);
  color: var(--text-primary);
  padding: 0.45rem 0.75rem;
  border-radius: var(--radius-sm);
  font-size: 0.85rem;
}

.admin-table-container {
  overflow-x: auto;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  background: var(--bg-surface);
  max-height: 420px;
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.88rem;
  text-align: left;
}

.admin-table th {
  padding: 0.75rem 1rem;
  background: var(--bg-surface-elevated);
  color: var(--text-secondary);
  font-weight: 600;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid var(--border-subtle);
  position: sticky;
  top: 0;
  z-index: 2;
}

.admin-table td {
  padding: 0.85rem 1rem;
  border-bottom: 1px solid var(--border-subtle);
  color: var(--text-primary);
}

.admin-table tr:hover td {
  background: rgba(239, 235, 216, 0.02);
}

.admin-user-cell {
  display: flex;
  flex-direction: column;
}

.admin-user-name {
  font-weight: 600;
  color: var(--text-primary);
}

.admin-user-email {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.2rem 0.55rem;
  border-radius: var(--radius-full);
  font-size: 0.72rem;
  font-weight: 600;
}

.status-badge.active {
  background: rgba(64, 145, 108, 0.2);
  color: #a7c957;
  border: 1px solid rgba(167, 201, 87, 0.4);
}

.status-badge.deactivated {
  background: rgba(109, 2, 2, 0.3);
  color: var(--danger);
  border: 1px solid rgba(224, 78, 78, 0.3);
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.status-dot.active {
  background: #a7c957;
}

.status-dot.deactivated {
  background: var(--danger);
}

/* EDUCATOR FLASHCARD EDITING */
.flashcard-edit-stage {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 0.5rem 0;
}

.flashcard-edit-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.85rem;
  border-bottom: 1px solid var(--border-subtle);
}

.flashcard-edit-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 480px;
  overflow-y: auto;
  padding-right: 0.5rem;
}

.card-edit-item {
  background: var(--bg-surface-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.card-edit-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-index-badge {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--accent-sage-light);
}

.card-category-input {
  background: var(--bg-base);
  border: 1px solid var(--border-subtle);
  color: var(--text-primary);
  border-radius: var(--radius-sm);
  padding: 0.35rem 0.65rem;
  font-size: 0.82rem;
  width: 140px;
}

.btn-delete-card {
  background: transparent;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 0.35rem;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s, background 0.2s;
}

.btn-delete-card:hover {
  color: var(--danger);
  background: rgba(224, 78, 78, 0.15);
}

.card-edit-body {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.card-edit-field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.card-edit-field label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.card-textarea {
  background: var(--bg-base);
  border: 1px solid var(--border-subtle);
  color: var(--text-primary);
  border-radius: var(--radius-sm);
  padding: 0.6rem 0.8rem;
  font-size: 0.9rem;
  line-height: 1.5;
  resize: vertical;
  font-family: inherit;
}

.card-textarea:focus {
  outline: none;
  border-color: var(--accent-cream);
}

.flashcard-edit-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.75rem;
  border-top: 1px solid var(--border-subtle);
}

/* FLASHCARD SHARE MODAL */
.share-modal-content {
  max-width: 520px;
  width: 90%;
}

.share-modal-body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.5rem 0;
}

.share-link-box {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--bg-surface-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 0.4rem;
}

.share-link-input {
  flex: 1;
  background: transparent;
  border: none;
  color: var(--accent-cream);
  font-size: 0.88rem;
  padding: 0.4rem 0.6rem;
  font-family: monospace;
}

.share-link-input:focus {
  outline: none;
}

.share-meta-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.82rem;
  color: var(--text-muted);
  padding: 0.5rem 0.25rem;
}

.flashcard-actions-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.share-btn {
  padding: 0.35rem 0.75rem;
  font-size: 0.82rem;
}

/* SHARED STUDY PAGE */
.shared-deck-card {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  box-shadow: var(--shadow-md);
}

.shared-deck-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-subtle);
}

```

[Back to Table of Contents](#2-table-of-contents)

---

<a id="frontendsrcappjsx"></a>
#### 45. `frontend/src/App.jsx`

**Path**: `frontend/src/App.jsx` &nbsp;|&nbsp; **Size**: 119.71 KB (122583 bytes) &nbsp;|&nbsp; **Language**: `jsx` &nbsp;|&nbsp; **Lines**: 2898 lines

```jsx
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

```

[Back to Table of Contents](#2-table-of-contents)

---

<a id="frontendsrcerrorboundaryjsx"></a>
#### 46. `frontend/src/ErrorBoundary.jsx`

**Path**: `frontend/src/ErrorBoundary.jsx` &nbsp;|&nbsp; **Size**: 2.89 KB (2964 bytes) &nbsp;|&nbsp; **Language**: `jsx` &nbsp;|&nbsp; **Lines**: 89 lines

```jsx
// frontend/src/ErrorBoundary.jsx
import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an unhandled rendering error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            background: "var(--bg-main, #290000)",
            color: "var(--accent-cream, #FDFBF7)",
            fontFamily: "var(--font-main, sans-serif)",
          }}
        >
          <div
            style={{
              maxWidth: 480,
              width: "100%",
              padding: "2rem",
              background: "var(--bg-card, #4A0E17)",
              border: "1px solid var(--border-subtle, rgba(253, 251, 247, 0.15))",
              borderRadius: "var(--radius-lg, 12px)",
              textAlign: "center",
              boxShadow: "0 12px 30px rgba(0, 0, 0, 0.4)",
            }}
          >
            <div style={{ display: "inline-flex", padding: "0.75rem", borderRadius: "50%", background: "rgba(109, 2, 2, 0.6)", marginBottom: "1rem" }}>
              <AlertCircle size={32} color="var(--accent-cream, #FDFBF7)" />
            </div>
            <h2 style={{ margin: "0 0 0.5rem", fontSize: "1.25rem", color: "var(--accent-cream, #FDFBF7)" }}>
              Something went wrong
            </h2>
            <p style={{ margin: "0 0 1.5rem", fontSize: "0.88rem", color: "var(--text-secondary, #E0D6C3)", lineHeight: 1.5 }}>
              A temporary display error occurred while rendering the console. You can refresh the view to restore normal operation.
            </p>
            <button
              type="button"
              onClick={this.handleReset}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.6rem 1.25rem",
                background: "var(--accent-cream, #FDFBF7)",
                color: "#290000",
                fontWeight: 600,
                fontSize: "0.88rem",
                borderRadius: "var(--radius-sm, 6px)",
                border: "none",
                cursor: "pointer",
              }}
            >
              <RefreshCw size={16} />
              <span>Reload Application</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

```

[Back to Table of Contents](#2-table-of-contents)

---

<a id="frontendsrcapijs"></a>
#### 47. `frontend/src/api.js`

**Path**: `frontend/src/api.js` &nbsp;|&nbsp; **Size**: 2.86 KB (2924 bytes) &nbsp;|&nbsp; **Language**: `javascript` &nbsp;|&nbsp; **Lines**: 85 lines

```javascript
// frontend/src/api.js

import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

// Request Interceptor: Attach JWT Token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("summify_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Global 401s or Errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If token expired or invalid, clear local storage
      const hadToken = localStorage.getItem("summify_token");
      if (hadToken && !error.config.url.includes("/auth/login") && !error.config.url.includes("/auth/register")) {
        localStorage.removeItem("summify_token");
        localStorage.removeItem("summify_user");
        window.dispatchEvent(new Event("auth-changed"));
      }
    }
    return Promise.reject(error);
  }
);

// Auth Endpoints
export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  getMe: () => api.get("/auth/me"),
};

// Lectures Endpoints
export const lecturesAPI = {
  upload: (formData, onUploadProgress) =>
    api.post("/lectures/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress,
    }),
  getMyLectures: () => api.get("/lectures/my"),
  getLecture: (id) => api.get(`/lectures/${id}`),
  getStatus: (id) => api.get(`/lectures/${id}/status`),
  getTranscript: (id) => api.get(`/lectures/${id}/transcript`),
  getSummary: (id) => api.get(`/lectures/${id}/summary`),
  getKeywords: (id) => api.get(`/lectures/${id}/keywords`),
  getFlashcards: (id) => api.get(`/lectures/${id}/flashcards`),
  generateFlashcards: (id, count) =>
    api.post(`/lectures/${id}/generate-flashcards`, { count }, { timeout: 90000 }),
  retryProcessing: (id) => api.post(`/lectures/${id}/retry`),
  updateFlashcards: (id, cards) => api.put(`/lectures/${id}/flashcards`, { cards }),
  shareFlashcards: (id) => api.post(`/lectures/${id}/share`),
  getSharedFlashcards: (shareId) => api.get(`/lectures/shared/${shareId}`),
  deleteLecture: (id) => api.delete(`/lectures/${id}`),
  downloadFileUrl: (id) => `${API_BASE_URL}/lectures/${id}/file`,
};

// Admin Endpoints (Module 4)
export const adminAPI = {
  getStats: () => api.get("/admin/stats"),
  getUsers: (params) => api.get("/admin/users", { params }),
  createUser: (data) => api.post("/admin/users", data),
  updateUser: (id, data) => api.patch(`/admin/users/${id}`, data),
  toggleUserStatus: (id) => api.post(`/admin/users/${id}/toggle-status`),
};

export const healthAPI = {
  check: () => api.get("/health"),
};

export default api;

```

[Back to Table of Contents](#2-table-of-contents)

---

<a id="frontendsrcindexcss"></a>
#### 48. `frontend/src/index.css`

**Path**: `frontend/src/index.css` &nbsp;|&nbsp; **Size**: 3.27 KB (3346 bytes) &nbsp;|&nbsp; **Language**: `css` &nbsp;|&nbsp; **Lines**: 138 lines

```css
/* frontend/src/index.css */

:root {
  --font-primary: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-display: 'Outfit', 'Plus Jakarta Sans', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /*
   * Exact 4-Color Palette from reference:
   * Band 1 (Deep Crimson / Garnet Wine): #6d0202
   * Band 2 (Dark Maroon / Black-Cherry): #290000
   * Band 3 (Muted Slate Sage):           #767e70
   * Band 4 (Warm Soft Cream / Ivory):    #efebd8
   */

  --bg-base: #1c0000;
  --bg-surface: #290000;
  --bg-surface-elevated: #3b0505;
  --bg-card: rgba(41, 0, 0, 0.88);
  --bg-card-hover: rgba(59, 5, 5, 0.95);
  --bg-glass: rgba(35, 1, 1, 0.85);
  
  --border-subtle: rgba(239, 235, 216, 0.08);
  --border-glass: rgba(239, 235, 216, 0.15);
  --border-accent: rgba(109, 2, 2, 0.7);
  --border-sage: rgba(118, 126, 112, 0.35);

  --text-primary: #efebd8;
  --text-secondary: #c2c9bf;
  --text-muted: #767e70;

  --accent-primary: #6d0202;
  --accent-primary-hover: #840707;
  --accent-secondary: #767e70;
  --accent-sage-light: #949e8e;
  --accent-cream: #efebd8;
  --accent-gradient: linear-gradient(135deg, #6d0202 0%, #460202 60%, #767e70 100%);

  /* Functional alert colors - muted and harmonious */
  --success: #388e3c;
  --success-bg: rgba(56, 142, 60, 0.18);
  --warning: #d97706;
  --warning-bg: rgba(217, 119, 6, 0.18);
  --danger: #9e1a1a;
  --danger-bg: rgba(158, 26, 26, 0.22);

  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --radius-xl: 18px;
  --radius-full: 9999px;

  /* Natural depth shadows - ZERO NEON GLOW */
  --shadow-sm: 0 2px 6px rgba(0, 0, 0, 0.35);
  --shadow-md: 0 6px 18px rgba(0, 0, 0, 0.5);
  --shadow-lg: 0 16px 36px rgba(0, 0, 0, 0.7);

  --blur-glass: blur(14px);
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-primary);
  background-color: var(--bg-base);
  color: var(--text-primary);
  min-height: 100vh;
  line-height: 1.5;
  overflow-x: hidden;
  background-image: 
    radial-gradient(circle at 15% 15%, rgba(109, 2, 2, 0.22) 0%, transparent 48%),
    radial-gradient(circle at 85% 85%, rgba(118, 126, 112, 0.12) 0%, transparent 52%),
    radial-gradient(circle at 50% 50%, rgba(41, 0, 0, 0.65) 0%, transparent 70%);
  background-attachment: fixed;
  -webkit-font-smoothing: antialiased;
}

#root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: var(--bg-base);
}

::-webkit-scrollbar-thumb {
  background: var(--bg-surface-elevated);
  border-radius: var(--radius-full);
  border: 1px solid var(--border-subtle);
}

::-webkit-scrollbar-thumb:hover {
  background: var(--accent-primary);
}

/* Typography Defaults */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

a {
  color: var(--accent-cream);
  text-decoration: none;
  transition: all 0.2s ease;
}

a:hover {
  color: var(--accent-sage-light);
}

button {
  font-family: var(--font-primary);
  cursor: pointer;
  border: none;
  outline: none;
  background: none;
}

input, select, textarea {
  font-family: var(--font-primary);
  color: var(--text-primary);
  outline: none;
}

```

[Back to Table of Contents](#2-table-of-contents)

---

<a id="frontendsrcmainjsx"></a>
#### 49. `frontend/src/main.jsx`

**Path**: `frontend/src/main.jsx` &nbsp;|&nbsp; **Size**: 0.31 KB (321 bytes) &nbsp;|&nbsp; **Language**: `jsx` &nbsp;|&nbsp; **Lines**: 14 lines

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './ErrorBoundary.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)


```

[Back to Table of Contents](#2-table-of-contents)

---

### Category: Frontend - Vector Assets

<a id="frontendsrcassetsreactsvg"></a>
#### 50. `frontend/src/assets/react.svg`

**Path**: `frontend/src/assets/react.svg` &nbsp;|&nbsp; **Size**: 4.03 KB (4126 bytes) &nbsp;|&nbsp; **Language**: `xml` &nbsp;|&nbsp; **Lines**: 1 lines

```xml
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="35.93" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 228"><path fill="#00D8FF" d="M210.483 73.824a171.49 171.49 0 0 0-8.24-2.597c.465-1.9.893-3.777 1.273-5.621c6.238-30.281 2.16-54.676-11.769-62.708c-13.355-7.7-35.196.329-57.254 19.526a171.23 171.23 0 0 0-6.375 5.848a155.866 155.866 0 0 0-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233C50.33 10.957 46.379 33.89 51.995 62.588a170.974 170.974 0 0 0 1.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a145.52 145.52 0 0 0 6.921 2.165a167.467 167.467 0 0 0-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266c13.744 7.926 36.812-.22 59.273-19.855a145.567 145.567 0 0 0 5.342-4.923a168.064 168.064 0 0 0 6.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586c13.731-7.949 18.194-32.003 12.4-61.268a145.016 145.016 0 0 0-1.535-6.842c1.62-.48 3.21-.974 4.76-1.488c29.348-9.723 48.443-25.443 48.443-41.52c0-15.417-17.868-30.326-45.517-39.844Zm-6.365 70.984c-1.4.463-2.836.91-4.3 1.345c-3.24-10.257-7.612-21.163-12.963-32.432c5.106-11 9.31-21.767 12.459-31.957c2.619.758 5.16 1.557 7.61 2.4c23.69 8.156 38.14 20.213 38.14 29.504c0 9.896-15.606 22.743-40.946 31.14Zm-10.514 20.834c2.562 12.94 2.927 24.64 1.23 33.787c-1.524 8.219-4.59 13.698-8.382 15.893c-8.067 4.67-25.32-1.4-43.927-17.412a156.726 156.726 0 0 1-6.437-5.87c7.214-7.889 14.423-17.06 21.459-27.246c12.376-1.098 24.068-2.894 34.671-5.345a134.17 134.17 0 0 1 1.386 6.193ZM87.276 214.515c-7.882 2.783-14.16 2.863-17.955.675c-8.075-4.657-11.432-22.636-6.853-46.752a156.923 156.923 0 0 1 1.869-8.499c10.486 2.32 22.093 3.988 34.498 4.994c7.084 9.967 14.501 19.128 21.976 27.15a134.668 134.668 0 0 1-4.877 4.492c-9.933 8.682-19.886 14.842-28.658 17.94ZM50.35 144.747c-12.483-4.267-22.792-9.812-29.858-15.863c-6.35-5.437-9.555-10.836-9.555-15.216c0-9.322 13.897-21.212 37.076-29.293c2.813-.98 5.757-1.905 8.812-2.773c3.204 10.42 7.406 21.315 12.477 32.332c-5.137 11.18-9.399 22.249-12.634 32.792a134.718 134.718 0 0 1-6.318-1.979Zm12.378-84.26c-4.811-24.587-1.616-43.134 6.425-47.789c8.564-4.958 27.502 2.111 47.463 19.835a144.318 144.318 0 0 1 3.841 3.545c-7.438 7.987-14.787 17.08-21.808 26.988c-12.04 1.116-23.565 2.908-34.161 5.309a160.342 160.342 0 0 1-1.76-7.887Zm110.427 27.268a347.8 347.8 0 0 0-7.785-12.803c8.168 1.033 15.994 2.404 23.343 4.08c-2.206 7.072-4.956 14.465-8.193 22.045a381.151 381.151 0 0 0-7.365-13.322Zm-45.032-43.861c5.044 5.465 10.096 11.566 15.065 18.186a322.04 322.04 0 0 0-30.257-.006c4.974-6.559 10.069-12.652 15.192-18.18ZM82.802 87.83a323.167 323.167 0 0 0-7.227 13.238c-3.184-7.553-5.909-14.98-8.134-22.152c7.304-1.634 15.093-2.97 23.209-3.984a321.524 321.524 0 0 0-7.848 12.897Zm8.081 65.352c-8.385-.936-16.291-2.203-23.593-3.793c2.26-7.3 5.045-14.885 8.298-22.6a321.187 321.187 0 0 0 7.257 13.246c2.594 4.48 5.28 8.868 8.038 13.147Zm37.542 31.03c-5.184-5.592-10.354-11.779-15.403-18.433c4.902.192 9.899.29 14.978.29c5.218 0 10.376-.117 15.453-.343c-4.985 6.774-10.018 12.97-15.028 18.486Zm52.198-57.817c3.422 7.8 6.306 15.345 8.596 22.52c-7.422 1.694-15.436 3.058-23.88 4.071a382.417 382.417 0 0 0 7.859-13.026a347.403 347.403 0 0 0 7.425-13.565Zm-16.898 8.101a358.557 358.557 0 0 1-12.281 19.815a329.4 329.4 0 0 1-23.444.823c-7.967 0-15.716-.248-23.178-.732a310.202 310.202 0 0 1-12.513-19.846h.001a307.41 307.41 0 0 1-10.923-20.627a310.278 310.278 0 0 1 10.89-20.637l-.001.001a307.318 307.318 0 0 1 12.413-19.761c7.613-.576 15.42-.876 23.31-.876H128c7.926 0 15.743.303 23.354.883a329.357 329.357 0 0 1 12.335 19.695a358.489 358.489 0 0 1 11.036 20.54a329.472 329.472 0 0 1-11 20.722Zm22.56-122.124c8.572 4.944 11.906 24.881 6.52 51.026c-.344 1.668-.73 3.367-1.15 5.09c-10.622-2.452-22.155-4.275-34.23-5.408c-7.034-10.017-14.323-19.124-21.64-27.008a160.789 160.789 0 0 1 5.888-5.4c18.9-16.447 36.564-22.941 44.612-18.3ZM128 90.808c12.625 0 22.86 10.235 22.86 22.86s-10.235 22.86-22.86 22.86s-22.86-10.235-22.86-22.86s10.235-22.86 22.86-22.86Z"></path></svg>
```

[Back to Table of Contents](#2-table-of-contents)

---

<a id="frontendsrcassetsvitesvg"></a>
#### 51. `frontend/src/assets/vite.svg`

**Path**: `frontend/src/assets/vite.svg` &nbsp;|&nbsp; **Size**: 8.50 KB (8709 bytes) &nbsp;|&nbsp; **Language**: `xml` &nbsp;|&nbsp; **Lines**: 1 lines

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="77" height="47" fill="none" aria-labelledby="vite-logo-title" viewBox="0 0 77 47"><title id="vite-logo-title">Vite</title><style>.parenthesis{fill:#000}@media (prefers-color-scheme:dark){.parenthesis{fill:#fff}}</style><path fill="#9135ff" d="M40.151 45.71c-.663.844-2.02.374-2.02-.699V34.708a2.26 2.26 0 0 0-2.262-2.262H24.493c-.92 0-1.457-1.04-.92-1.788l7.479-10.471c1.07-1.498 0-3.578-1.842-3.578H15.443c-.92 0-1.456-1.04-.92-1.788l9.696-13.576c.213-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.472c-1.07 1.497 0 3.578 1.842 3.578h11.376c.944 0 1.474 1.087.89 1.83L40.153 45.712z"/><mask id="a" width="48" height="47" x="14" y="0" maskUnits="userSpaceOnUse" style="mask-type:alpha"><path fill="#000" d="M40.047 45.71c-.663.843-2.02.374-2.02-.699V34.708a2.26 2.26 0 0 0-2.262-2.262H24.389c-.92 0-1.457-1.04-.92-1.788l7.479-10.472c1.07-1.497 0-3.578-1.842-3.578H15.34c-.92 0-1.456-1.04-.92-1.788l9.696-13.575c.213-.297.556-.474.92-.474H53.93c.92 0 1.456 1.04.92 1.788L47.37 13.03c-1.07 1.498 0 3.578 1.842 3.578h11.376c.944 0 1.474 1.088.89 1.831L40.049 45.712z"/></mask><g mask="url(#a)"><g filter="url(#b)"><ellipse cx="5.508" cy="14.704" fill="#eee6ff" rx="5.508" ry="14.704" transform="rotate(269.814 20.96 11.29)scale(-1 1)"/></g><g filter="url(#c)"><ellipse cx="10.399" cy="29.851" fill="#eee6ff" rx="10.399" ry="29.851" transform="rotate(89.814 -16.902 -8.275)scale(1 -1)"/></g><g filter="url(#d)"><ellipse cx="5.508" cy="30.487" fill="#8900ff" rx="5.508" ry="30.487" transform="rotate(89.814 -19.197 -7.127)scale(1 -1)"/></g><g filter="url(#e)"><ellipse cx="5.508" cy="30.599" fill="#8900ff" rx="5.508" ry="30.599" transform="rotate(89.814 -25.928 4.177)scale(1 -1)"/></g><g filter="url(#f)"><ellipse cx="5.508" cy="30.599" fill="#8900ff" rx="5.508" ry="30.599" transform="rotate(89.814 -25.738 5.52)scale(1 -1)"/></g><g filter="url(#g)"><ellipse cx="14.072" cy="22.078" fill="#eee6ff" rx="14.072" ry="22.078" transform="rotate(93.35 31.245 55.578)scale(-1 1)"/></g><g filter="url(#h)"><ellipse cx="3.47" cy="21.501" fill="#8900ff" rx="3.47" ry="21.501" transform="rotate(89.009 35.419 55.202)scale(-1 1)"/></g><g filter="url(#i)"><ellipse cx="3.47" cy="21.501" fill="#8900ff" rx="3.47" ry="21.501" transform="rotate(89.009 35.419 55.202)scale(-1 1)"/></g><g filter="url(#j)"><ellipse cx="14.592" cy="9.743" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(39.51 14.592 9.743)"/></g><g filter="url(#k)"><ellipse cx="61.728" cy="-5.321" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 61.728 -5.32)"/></g><g filter="url(#l)"><ellipse cx="55.618" cy="7.104" fill="#00c2ff" rx="5.971" ry="9.665" transform="rotate(37.892 55.618 7.104)"/></g><g filter="url(#m)"><ellipse cx="12.326" cy="39.103" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 12.326 39.103)"/></g><g filter="url(#n)"><ellipse cx="12.326" cy="39.103" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 12.326 39.103)"/></g><g filter="url(#o)"><ellipse cx="49.857" cy="30.678" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 49.857 30.678)"/></g><g filter="url(#p)"><ellipse cx="52.623" cy="33.171" fill="#00c2ff" rx="5.971" ry="15.297" transform="rotate(37.892 52.623 33.17)"/></g></g><path d="M6.919 0c-9.198 13.166-9.252 33.575 0 46.789h6.215c-9.25-13.214-9.196-33.623 0-46.789zm62.424 0h-6.215c9.198 13.166 9.252 33.575 0 46.789h6.215c9.25-13.214 9.196-33.623 0-46.789" class="parenthesis"/><defs><filter id="b" width="60.045" height="41.654" x="-5.564" y="16.92" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="7.659"/></filter><filter id="c" width="90.34" height="51.437" x="-40.407" y="-6.762" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="7.659"/></filter><filter id="d" width="79.355" height="29.4" x="-35.435" y="2.801" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="e" width="79.579" height="29.4" x="-30.84" y="20.8" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="f" width="79.579" height="29.4" x="-29.307" y="21.949" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="g" width="74.749" height="58.852" x="29.961" y="-17.13" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="7.659"/></filter><filter id="h" width="61.377" height="25.362" x="37.754" y="3.055" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="i" width="61.377" height="25.362" x="37.754" y="3.055" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="j" width="56.045" height="63.649" x="-13.43" y="-22.082" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="k" width="54.814" height="64.646" x="34.321" y="-37.644" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="l" width="33.541" height="35.313" x="38.847" y="-10.552" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="m" width="54.814" height="64.646" x="-15.081" y="6.78" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="n" width="54.814" height="64.646" x="-15.081" y="6.78" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="o" width="54.814" height="64.646" x="22.45" y="-1.645" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="p" width="39.409" height="43.623" x="32.919" y="11.36" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter></defs></svg>

```

[Back to Table of Contents](#2-table-of-contents)

---

### Category: Frontend - Public Resources

<a id="frontendpublicfaviconsvg"></a>
#### 52. `frontend/public/favicon.svg`

**Path**: `frontend/public/favicon.svg` &nbsp;|&nbsp; **Size**: 9.30 KB (9522 bytes) &nbsp;|&nbsp; **Language**: `xml` &nbsp;|&nbsp; **Lines**: 1 lines

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="48" height="46" fill="none" viewBox="0 0 48 46"><path fill="#863bff" d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z" style="fill:#863bff;fill:color(display-p3 .5252 .23 1);fill-opacity:1"/><mask id="a" width="48" height="46" x="0" y="0" maskUnits="userSpaceOnUse" style="mask-type:alpha"><path fill="#000" d="M25.842 44.938c-.664.844-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.183c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.498 0-3.579-1.842-3.579H1.133c-.92 0-1.456-1.04-.92-1.787L9.91.473c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.578 1.842 3.578h11.377c.943 0 1.473 1.088.89 1.832L25.843 44.94z" style="fill:#000;fill-opacity:1"/></mask><g mask="url(#a)"><g filter="url(#b)"><ellipse cx="5.508" cy="14.704" fill="#ede6ff" rx="5.508" ry="14.704" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -4.47 31.516)"/></g><g filter="url(#c)"><ellipse cx="10.399" cy="29.851" fill="#ede6ff" rx="10.399" ry="29.851" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -39.328 7.883)"/></g><g filter="url(#d)"><ellipse cx="5.508" cy="30.487" fill="#7e14ff" rx="5.508" ry="30.487" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.814 -25.913 -14.639)scale(1 -1)"/></g><g filter="url(#e)"><ellipse cx="5.508" cy="30.599" fill="#7e14ff" rx="5.508" ry="30.599" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.814 -32.644 -3.334)scale(1 -1)"/></g><g filter="url(#f)"><ellipse cx="5.508" cy="30.599" fill="#7e14ff" rx="5.508" ry="30.599" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -34.34 30.47)"/></g><g filter="url(#g)"><ellipse cx="14.072" cy="22.078" fill="#ede6ff" rx="14.072" ry="22.078" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="rotate(93.35 24.506 48.493)scale(-1 1)"/></g><g filter="url(#h)"><ellipse cx="3.47" cy="21.501" fill="#7e14ff" rx="3.47" ry="21.501" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.009 28.708 47.59)scale(-1 1)"/></g><g filter="url(#i)"><ellipse cx="3.47" cy="21.501" fill="#7e14ff" rx="3.47" ry="21.501" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.009 28.708 47.59)scale(-1 1)"/></g><g filter="url(#j)"><ellipse cx=".387" cy="8.972" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(39.51 .387 8.972)"/></g><g filter="url(#k)"><ellipse cx="47.523" cy="-6.092" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 47.523 -6.092)"/></g><g filter="url(#l)"><ellipse cx="41.412" cy="6.333" fill="#47bfff" rx="5.971" ry="9.665" style="fill:#47bfff;fill:color(display-p3 .2799 .748 1);fill-opacity:1" transform="rotate(37.892 41.412 6.333)"/></g><g filter="url(#m)"><ellipse cx="-1.879" cy="38.332" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 -1.88 38.332)"/></g><g filter="url(#n)"><ellipse cx="-1.879" cy="38.332" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 -1.88 38.332)"/></g><g filter="url(#o)"><ellipse cx="35.651" cy="29.907" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 35.651 29.907)"/></g><g filter="url(#p)"><ellipse cx="38.418" cy="32.4" fill="#47bfff" rx="5.971" ry="15.297" style="fill:#47bfff;fill:color(display-p3 .2799 .748 1);fill-opacity:1" transform="rotate(37.892 38.418 32.4)"/></g></g><defs><filter id="b" width="60.045" height="41.654" x="-19.77" y="16.149" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="c" width="90.34" height="51.437" x="-54.613" y="-7.533" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="d" width="79.355" height="29.4" x="-49.64" y="2.03" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="e" width="79.579" height="29.4" x="-45.045" y="20.029" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="f" width="79.579" height="29.4" x="-43.513" y="21.178" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="g" width="74.749" height="58.852" x="15.756" y="-17.901" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="h" width="61.377" height="25.362" x="23.548" y="2.284" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="i" width="61.377" height="25.362" x="23.548" y="2.284" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="j" width="56.045" height="63.649" x="-27.636" y="-22.853" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="k" width="54.814" height="64.646" x="20.116" y="-38.415" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="l" width="33.541" height="35.313" x="24.641" y="-11.323" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="m" width="54.814" height="64.646" x="-29.286" y="6.009" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="n" width="54.814" height="64.646" x="-29.286" y="6.009" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="o" width="54.814" height="64.646" x="8.244" y="-2.416" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="p" width="39.409" height="43.623" x="18.713" y="10.588" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter></defs></svg>
```

[Back to Table of Contents](#2-table-of-contents)

---

<a id="frontendpubliciconssvg"></a>
#### 53. `frontend/public/icons.svg`

**Path**: `frontend/public/icons.svg` &nbsp;|&nbsp; **Size**: 4.91 KB (5031 bytes) &nbsp;|&nbsp; **Language**: `xml` &nbsp;|&nbsp; **Lines**: 24 lines

```xml
<svg xmlns="http://www.w3.org/2000/svg">
  <symbol id="bluesky-icon" viewBox="0 0 16 17">
    <g clip-path="url(#bluesky-clip)"><path fill="#08060d" d="M7.75 7.735c-.693-1.348-2.58-3.86-4.334-5.097-1.68-1.187-2.32-.981-2.74-.79C.188 2.065.1 2.812.1 3.251s.241 3.602.398 4.13c.52 1.744 2.367 2.333 4.07 2.145-2.495.37-4.71 1.278-1.805 4.512 3.196 3.309 4.38-.71 4.987-2.746.608 2.036 1.307 5.91 4.93 2.746 2.72-2.746.747-4.143-1.747-4.512 1.702.189 3.55-.4 4.07-2.145.156-.528.397-3.691.397-4.13s-.088-1.186-.575-1.406c-.42-.19-1.06-.395-2.741.79-1.755 1.24-3.64 3.752-4.334 5.099"/></g>
    <defs><clipPath id="bluesky-clip"><path fill="#fff" d="M.1.85h15.3v15.3H.1z"/></clipPath></defs>
  </symbol>
  <symbol id="discord-icon" viewBox="0 0 20 19">
    <path fill="#08060d" d="M16.224 3.768a14.5 14.5 0 0 0-3.67-1.153c-.158.286-.343.67-.47.976a13.5 13.5 0 0 0-4.067 0c-.128-.306-.317-.69-.476-.976A14.4 14.4 0 0 0 3.868 3.77C1.546 7.28.916 10.703 1.231 14.077a14.7 14.7 0 0 0 4.5 2.306q.545-.748.965-1.587a9.5 9.5 0 0 1-1.518-.74q.191-.14.372-.293c2.927 1.369 6.107 1.369 8.999 0q.183.152.372.294-.723.437-1.52.74.418.838.963 1.588a14.6 14.6 0 0 0 4.504-2.308c.37-3.911-.63-7.302-2.644-10.309m-9.13 8.234c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.894 0 1.614.82 1.599 1.82.001 1-.705 1.82-1.6 1.82m5.91 0c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.893 0 1.614.82 1.599 1.82 0 1-.706 1.82-1.6 1.82"/>
  </symbol>
  <symbol id="documentation-icon" viewBox="0 0 21 20">
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="m15.5 13.333 1.533 1.322c.645.555.967.833.967 1.178s-.322.623-.967 1.179L15.5 18.333m-3.333-5-1.534 1.322c-.644.555-.966.833-.966 1.178s.322.623.966 1.179l1.534 1.321"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M17.167 10.836v-4.32c0-1.41 0-2.117-.224-2.68-.359-.906-1.118-1.621-2.08-1.96-.599-.21-1.349-.21-2.848-.21-2.623 0-3.935 0-4.983.369-1.684.591-3.013 1.842-3.641 3.428C3 6.449 3 7.684 3 10.154v2.122c0 2.558 0 3.838.706 4.726q.306.383.713.671c.76.536 1.79.64 3.581.66"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M3 10a2.78 2.78 0 0 1 2.778-2.778c.555 0 1.209.097 1.748-.047.48-.129.854-.503.982-.982.145-.54.048-1.194.048-1.749a2.78 2.78 0 0 1 2.777-2.777"/>
  </symbol>
  <symbol id="github-icon" viewBox="0 0 19 19">
    <path fill="#08060d" fill-rule="evenodd" d="M9.356 1.85C5.05 1.85 1.57 5.356 1.57 9.694a7.84 7.84 0 0 0 5.324 7.44c.387.079.528-.168.528-.376 0-.182-.013-.805-.013-1.454-2.165.467-2.616-.935-2.616-.935-.349-.91-.864-1.143-.864-1.143-.71-.48.051-.48.051-.48.787.051 1.2.805 1.2.805.695 1.194 1.817.857 2.268.649.064-.507.27-.857.49-1.052-1.728-.182-3.545-.857-3.545-3.87 0-.857.31-1.558.8-2.104-.078-.195-.349-1 .077-2.078 0 0 .657-.208 2.14.805a7.5 7.5 0 0 1 1.946-.26c.657 0 1.328.092 1.946.26 1.483-1.013 2.14-.805 2.14-.805.426 1.078.155 1.883.078 2.078.502.546.799 1.247.799 2.104 0 3.013-1.818 3.675-3.558 3.87.284.247.528.714.528 1.454 0 1.052-.012 1.896-.012 2.156 0 .208.142.455.528.377a7.84 7.84 0 0 0 5.324-7.441c.013-4.338-3.48-7.844-7.773-7.844" clip-rule="evenodd"/>
  </symbol>
  <symbol id="social-icon" viewBox="0 0 20 20">
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M12.5 6.667a4.167 4.167 0 1 0-8.334 0 4.167 4.167 0 0 0 8.334 0"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M2.5 16.667a5.833 5.833 0 0 1 8.75-5.053m3.837.474.513 1.035c.07.144.257.282.414.309l.93.155c.596.1.736.536.307.965l-.723.73a.64.64 0 0 0-.152.531l.207.903c.164.715-.213.991-.84.618l-.872-.52a.63.63 0 0 0-.577 0l-.872.52c-.624.373-1.003.094-.84-.618l.207-.903a.64.64 0 0 0-.152-.532l-.723-.729c-.426-.43-.289-.864.306-.964l.93-.156a.64.64 0 0 0 .412-.31l.513-1.034c.28-.562.735-.562 1.012 0"/>
  </symbol>
  <symbol id="x-icon" viewBox="0 0 19 19">
    <path fill="#08060d" fill-rule="evenodd" d="M1.893 1.98c.052.072 1.245 1.769 2.653 3.77l2.892 4.114c.183.261.333.48.333.486s-.068.089-.152.183l-.522.593-.765.867-3.597 4.087c-.375.426-.734.834-.798.905a1 1 0 0 0-.118.148c0 .01.236.017.664.017h.663l.729-.83c.4-.457.796-.906.879-.999a692 692 0 0 0 1.794-2.038c.034-.037.301-.34.594-.675l.551-.624.345-.392a7 7 0 0 1 .34-.374c.006 0 .93 1.306 2.052 2.903l2.084 2.965.045.063h2.275c1.87 0 2.273-.003 2.266-.021-.008-.02-1.098-1.572-3.894-5.547-2.013-2.862-2.28-3.246-2.273-3.266.008-.019.282-.332 2.085-2.38l2-2.274 1.567-1.782c.022-.028-.016-.03-.65-.03h-.674l-.3.342a871 871 0 0 1-1.782 2.025c-.067.075-.405.458-.75.852a100 100 0 0 1-.803.91c-.148.172-.299.344-.99 1.127-.304.343-.32.358-.345.327-.015-.019-.904-1.282-1.976-2.808L6.365 1.85H1.8zm1.782.91 8.078 11.294c.772 1.08 1.413 1.973 1.425 1.984.016.017.241.02 1.05.017l1.03-.004-2.694-3.766L7.796 5.75 5.722 2.852l-1.039-.004-1.039-.004z" clip-rule="evenodd"/>
  </symbol>
</svg>

```

[Back to Table of Contents](#2-table-of-contents)

---
