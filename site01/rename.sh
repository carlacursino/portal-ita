#!/bin/bash

# Simple Docker Volume Rename Script: mongodata -> dronedbdata
# This script only handles the volume data migration

set -e  # Exit on any error

# Configuration
OLD_VOLUME="mongodata"
NEW_VOLUME="dronedbdata"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Function to check if volume exists
volume_exists() {
    docker volume ls -q | grep -q "^$1$"
}

echo "=============================================="
echo "Renaming volume: $OLD_VOLUME -> $NEW_VOLUME"
echo "=============================================="

# Check if old volume exists
if ! volume_exists "$OLD_VOLUME"; then
    print_error "Source volume '$OLD_VOLUME' does not exist"
    exit 1
fi

# Warn if new volume already exists
if volume_exists "$NEW_VOLUME"; then
    print_warning "Destination volume '$NEW_VOLUME' already exists and will be overwritten"
    read -p "Continue? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_status "Aborted"
        exit 0
    fi
    docker volume rm "$NEW_VOLUME"
fi

# Create new volume
print_status "Creating new volume '$NEW_VOLUME'..."
docker volume create "$NEW_VOLUME"
print_success "Volume created"

# Copy data
print_status "Copying data from '$OLD_VOLUME' to '$NEW_VOLUME'..."
docker run --rm \
    -v "$OLD_VOLUME":/source:ro \
    -v "$NEW_VOLUME":/destination \
    alpine:latest \
    sh -c "cp -a /source/. /destination/"

print_success "Data copied successfully"

# Verify data integrity
print_status "Verifying data integrity..."
OLD_SIZE=$(docker run --rm -v "$OLD_VOLUME":/data alpine:latest du -sb /data | cut -f1)
NEW_SIZE=$(docker run --rm -v "$NEW_VOLUME":/data alpine:latest du -sb /data | cut -f1)

if [ "$OLD_SIZE" -eq "$NEW_SIZE" ]; then
    print_success "Data integrity verified ($OLD_SIZE bytes)"
else
    print_error "Data size mismatch! Old: $OLD_SIZE bytes, New: $NEW_SIZE bytes"
    exit 1
fi

echo "=============================================="
print_success "Volume rename completed!"
echo "=============================================="
echo "Next steps:"
echo "1. Update your docker-compose.yml file to use '$NEW_VOLUME'"
echo "2. Test your application"  
echo "3. Remove old volume: docker volume rm $OLD_VOLUME"