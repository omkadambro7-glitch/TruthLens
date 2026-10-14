FROM python:3.12-slim

WORKDIR /app

# Install system libraries for Pillow, OpenCV and compilation
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libjpeg-dev \
    zlib1g-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy backend requirements and install
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend application source
COPY backend/ ./

# Ensure storage directories exist
RUN mkdir -p storage/uploads storage/artifacts

EXPOSE 8000
ENV PORT=8000

# Start server using Render dynamic PORT
CMD sh -c "uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}"
