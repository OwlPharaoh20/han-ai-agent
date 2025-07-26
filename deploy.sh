#!/bin/bash

# HAN AI Agent Deployment Script

echo "🚀 Starting HAN AI Agent deployment..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ .env file not found!"
    echo "📝 Please create a .env file based on env.example"
    echo "💡 Copy env.example to .env and fill in your API keys"
    exit 1
fi

# Build and start the containers
echo "🔨 Building Docker containers..."
docker-compose build

echo "🚀 Starting services..."
docker-compose up -d

echo "⏳ Waiting for services to start..."
sleep 10

# Check if containers are running
echo "🔍 Checking container status..."
docker-compose ps

echo "✅ Deployment complete!"
echo ""
echo "📊 Service URLs:"
echo "   - HAN AI Agent: Running in container (use 'docker-compose logs han-agent' to view logs)"
echo "   - MongoDB: localhost:27017"
echo "   - MongoDB Express: http://localhost:8081 (admin/password123)"
echo ""
echo "📝 Useful commands:"
echo "   - View logs: docker-compose logs -f han-agent"
echo "   - Stop services: docker-compose down"
echo "   - Restart services: docker-compose restart"
echo "   - Access container: docker-compose exec han-agent sh" 