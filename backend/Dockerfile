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
