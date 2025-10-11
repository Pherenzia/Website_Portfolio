@echo off
REM Deployment script for GitHub Pages (Windows)

echo 🚀 Deploying Mitchell Riley Portfolio to GitHub Pages...

REM Check if we're in a git repository
if not exist ".git" (
    echo ❌ Not in a git repository. Please initialize git first.
    exit /b 1
)

REM Install dependencies
echo 📦 Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies.
    exit /b 1
)

REM Build the project
echo 🏗️ Building project...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Build failed. Please fix the errors and try again.
    exit /b 1
)

REM Add gh-pages package if not installed
npm list gh-pages >nul 2>&1
if %errorlevel% neq 0 (
    echo 📦 Installing gh-pages...
    call npm install --save-dev gh-pages
)

REM Deploy to GitHub Pages
echo 🌐 Deploying to GitHub Pages...
call npm run deploy
if %errorlevel% neq 0 (
    echo ❌ Deployment failed.
    exit /b 1
)

echo ✅ Deployment complete!
echo 🌐 Your portfolio should be available at: https://Pherenzia.github.io/Website_Portfolio
