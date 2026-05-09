#!/bin/bash

# PhysioConnect Automated Deployment Script
# This script helps you deploy PhysioConnect to Vercel

set -e

echo "🚀 PhysioConnect - Vercel Deployment Setup"
echo "==========================================="
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

echo "✅ Vercel CLI found"
echo ""

# Get backend URL
read -p "Enter your backend API URL (e.g., https://physioconnect-api.onrender.com): " BACKEND_URL

if [ -z "$BACKEND_URL" ]; then
    echo "❌ Backend URL is required"
    exit 1
fi

echo ""
echo "🔧 Configuring environment..."

# Create frontend .env.production
cd frontend
cat > .env.production << EOF
VITE_API_URL=$BACKEND_URL/api
EOF

echo "✅ Created frontend/.env.production"
echo ""

# Install dependencies
echo "📥 Installing dependencies..."
npm install

echo ""
echo "🏗️  Building application..."
npm run build

echo ""
echo "🚀 Deploying to Vercel..."
cd ..
vercel --prod

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Your app is live! Check the URL provided above."
echo ""
echo "💡 Pro tip: Add this backend URL to your environment variables:"
echo "VITE_API_URL=$BACKEND_URL/api"
