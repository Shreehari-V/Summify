# api/index.py
import sys
import os
from pathlib import Path

# Add project root to sys.path so 'backend' is importable
ROOT_DIR = Path(__file__).resolve().parents[1]
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

# Import FastAPI application
from backend.main import app
