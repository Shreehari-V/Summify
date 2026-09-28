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
