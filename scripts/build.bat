@echo off
REM Build script for Mitchell Riley Portfolio

echo 🚀 Building Mitchell Riley Portfolio...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    exit /b 1
)

REM Install dependencies
echo 📦 Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies.
    exit /b 1
)

REM Run type checking
echo 🔍 Running type checking...
call npm run type-check
if %errorlevel% neq 0 (
    echo ❌ Type checking failed.
    exit /b 1
)

REM Run linting
echo 🧹 Running linter...
call npm run lint
if %errorlevel% neq 0 (
    echo ❌ Linting failed.
    exit /b 1
)

REM Run tests
echo 🧪 Running tests...
call npm test -- --run
if %errorlevel% neq 0 (
    echo ❌ Tests failed.
    exit /b 1
)

REM Build the project
echo 🏗️ Building project...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Build failed.
    exit /b 1
)

echo ✅ Build completed successfully!
echo 📁 Build files are in the 'dist' directory
echo 🌐 You can preview the build with: npm run preview
