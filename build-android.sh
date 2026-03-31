#!/bin/bash

# SGAC College - Build Android APK
# This script builds the Android APK using Capacitor

echo "========================================="
echo "  SGAC College - Android APK Builder"
echo "========================================="

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "Error: npm is not installed"
    exit 1
fi

# Install dependencies
echo "[1/4] Installing dependencies..."
cd android
npm install

# Sync Capacitor
echo "[2/4] Syncing Capacitor..."
npx cap sync android

# Build debug APK
echo "[3/4] Building debug APK..."
cd app
./gradlew assembleDebug

# Check if build succeeded
if [ -f "build/outputs/apk/debug/app-debug.apk" ]; then
    echo "[4/4] Build successful!"
    echo "APK location: android/app/build/outputs/apk/debug/app-debug.apk"
else
    echo "Error: Build failed"
    exit 1
fi

echo ""
echo "========================================="
echo "  Build Complete!"
echo "========================================="
