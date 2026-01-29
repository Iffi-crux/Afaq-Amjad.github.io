@echo off
echo 🚀 Deploying Afaq's Cyberpunk Security Portfolio
echo ================================================

:: Check if Git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Git is not installed. Please install Git first.
    echo    Download from: https://git-scm.com/download/win
    pause
    exit /b 1
)

:: Initialize Git if not already done
if not exist ".git" (
    echo 📁 Initializing Git repository...
    git init
    git add .
    git commit -m "Initial commit - Cyberpunk Security Portfolio"
) else (
    echo 📁 Git repository already exists
)

:: Get GitHub username
set /p username="Enter your GitHub username: "

:: Add remote
echo 🔗 Adding remote repository...
git remote add origin https://github.com/%username%/portfolio.git 2>nul

:: Push to GitHub
echo ⬆️  Pushing to GitHub...
git branch -M main
git push -u origin main

echo ✅ Portfolio deployed successfully!
echo 🌐 Next steps:
echo    1. Go to GitHub repository settings
echo    2. Enable GitHub Pages
echo    3. Configure your .tech domain
echo    4. Add profile.jpg to complete the portfolio
echo.
echo 🔥 Your cyberpunk portfolio is ready to hack the world!
pause