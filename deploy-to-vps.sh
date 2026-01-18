#!/bin/bash

echo "🚀 Starting Docker deployment on VPS..."

# Update system packages
echo "📦 Updating system..."
apt update && apt upgrade -y

# Install Docker if not installed
if ! command -v docker &> /dev/null; then
    echo "🐳 Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    usermod -aG docker $USER
    systemctl enable docker
    systemctl start docker
fi

# Install Docker Compose if not installed
if ! command -v docker-compose &> /dev/null; then
    echo "🔧 Installing Docker Compose..."
    curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
fi

# Navigate to the project directory
cd /root/tardingUi || cd /opt/trading-platform || cd ~/tardingUi || {
    echo "❌ Cannot find project directory. Please navigate to your cloned repository."
    echo "Available directories:"
    ls -la ~/
    exit 1
}

echo "📁 Current directory: $(pwd)"
echo "📋 Files in directory:"
ls -la

# Create production environment file
cat > .env.production << EOF
NODE_ENV=production
PORT=3000
NEXT_TELEMETRY_DISABLED=1
EOF

# Update docker-compose for production
cat > docker-compose.override.yml << EOF
version: '3.8'

services:
  trading-ui:
    build:
      context: .
      dockerfile: Dockerfile
    environment:
      - NODE_ENV=production
      - PORT=3000
      - NEXT_TELEMETRY_DISABLED=1
    restart: unless-stopped
    logging:
      driver: json-file
      options:
        max-size: "10m"
        max-file: "3"

  nginx:
    restart: unless-stopped
    logging:
      driver: json-file
      options:
        max-size: "10m"
        max-file: "3"
EOF

# Build and start the application
echo "🏗️ Building Docker images..."
docker-compose build --no-cache

echo "🚀 Starting application..."
docker-compose up -d

# Wait for containers to start
sleep 10

# Check container status
echo "📊 Container status:"
docker-compose ps

# Check if application is running
echo "🔍 Testing application..."
if curl -f http://localhost:3000/health 2>/dev/null || curl -f http://localhost:3000 2>/dev/null; then
    echo "✅ Application is running successfully!"
    echo "🌐 Access your app at: http://72.60.202.180:3000"
else
    echo "❌ Application might not be responding. Checking logs..."
    docker-compose logs trading-ui
fi

# Show logs
echo "📋 Recent logs:"
docker-compose logs --tail=20 trading-ui

echo ""
echo "🎉 Deployment completed!"
echo "📝 Next steps:"
echo "1. Test your app at: http://72.60.202.180:3000"
echo "2. Configure domain name pointing to 72.60.202.180"
echo "3. Set up SSL with: certbot --nginx -d cbamoon.com"
echo ""
echo "🔧 Management commands:"
echo "- View logs: docker-compose logs -f"
echo "- Restart: docker-compose restart"
echo "- Stop: docker-compose down"
echo "- Update: docker-compose pull && docker-compose up -d"