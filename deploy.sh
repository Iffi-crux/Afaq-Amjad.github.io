#!/bin/bash
# Deployment Script for Cyberpunk Portfolio

echo "🚀 Deploying Afaq's Cyberpunk Security Portfolio"
echo "================================================"

# Check if Git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    echo "   Download from: https://git-scm.com/download/win"
    exit 1
fi

# Initialize Git if not already done
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit - Cyberpunk Security Portfolio"
else
    echo "📁 Git repository already exists"
fi

# Add remote (replace YOUR_USERNAME with actual GitHub username)
echo "🔗 Adding remote repository..."
read -p "Enter your GitHub username: " username
git remote add origin "https://github.com/$username/portfolio.git" 2>/dev/null || echo "Remote already exists"

# Push to GitHub
echo "⬆️  Pushing to GitHub..."
git branch -M main
git push -u origin main

echo "✅ Portfolio deployed successfully!"
echo "🌐 Next steps:"
echo "   1. Go to GitHub repository settings"
echo "   2. Enable GitHub Pages"
echo "   3. Configure your .tech domain"
echo "   4. Add profile.jpg to complete the portfolio"

echo ""
echo "🔥 Your cyberpunk portfolio is ready to hack the world!"