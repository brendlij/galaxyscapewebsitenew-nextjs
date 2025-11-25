#!/bin/bash

# PocketBase setup script for Linux

POCKETBASE_VERSION="0.22.12"
POCKETBASE_DIR="./pocketbase"

echo "📦 Setting up PocketBase..."

# Create directory if it doesn't exist
mkdir -p "$POCKETBASE_DIR"
cd "$POCKETBASE_DIR"

# Detect architecture
ARCH=$(uname -m)
if [ "$ARCH" = "x86_64" ]; then
    ARCH="amd64"
elif [ "$ARCH" = "aarch64" ]; then
    ARCH="arm64"
fi

# Download PocketBase
echo "⬇️  Downloading PocketBase v${POCKETBASE_VERSION} for ${ARCH}..."
wget -q "https://github.com/pocketbase/pocketbase/releases/download/v${POCKETBASE_VERSION}/pocketbase_${POCKETBASE_VERSION}_linux_${ARCH}.zip"

if [ $? -ne 0 ]; then
    echo "❌ Download failed!"
    exit 1
fi

# Extract
echo "📂 Extracting..."
unzip -q "pocketbase_${POCKETBASE_VERSION}_linux_${ARCH}.zip"
rm "pocketbase_${POCKETBASE_VERSION}_linux_${ARCH}.zip"

# Make executable
chmod +x pocketbase

echo "✅ PocketBase installed!"
echo ""
echo "🚀 To start PocketBase, run:"
echo "   ./pocketbase/pocketbase serve"
echo ""
echo "📊 Admin UI will be at: http://localhost:8090/_/admin"
