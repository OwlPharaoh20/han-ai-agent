# 🤖 HAN AI Agent

A powerful AI-powered shopping assistant built with LangChain, OpenAI, and Node.js. HAN can help users search for products, manage shopping carts, and process checkouts.

## ✨ Features

- 🔍 **Product Search**: Search for products using RapidAPI
- 🛒 **Cart Management**: Add, remove, and view cart items
- 💳 **Checkout**: Process payments with Stripe integration
- 🤖 **AI Assistant**: Natural language interaction with OpenAI GPT
- 🌐 **Web Interface**: Beautiful web UI for easy interaction
- 🐳 **Docker Ready**: Fully containerized for easy deployment

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ 
- Docker and Docker Compose
- OpenAI API Key
- RapidAPI Key (optional)
- Stripe Secret Key (optional)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd han-agent
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your API keys
   ```

4. **Build the project**
   ```bash
   npm run build
   ```

5. **Run the CLI version**
   ```bash
   npm start
   ```

6. **Or run the web interface**
   ```bash
   npm run dev:web
   # Open http://localhost:3000
   ```

## 🐳 Docker Deployment

### Option 1: Quick Deploy with Docker Compose

1. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your API keys
   ```

2. **Deploy with the provided script**
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

3. **Or deploy manually**
   ```bash
   docker-compose up -d
   ```

4. **Access the application**
   - Web Interface: http://localhost:3000
   - MongoDB: localhost:27017
   - MongoDB Express: http://localhost:8081 (admin/password123)

### Option 2: Production Deployment

1. **Build the production image**
   ```bash
   docker build -f Dockerfile.prod -t han-agent:latest .
   ```

2. **Run with Docker Compose**
   ```bash
   docker-compose -f docker-compose.yml up -d
   ```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | Your OpenAI API key | ✅ |
| `RAPID_API_KEY` | RapidAPI key for product search | ❌ |
| `STRIPE_SECRET_KEY` | Stripe secret key for payments | ❌ |
| `MONGODB_URI` | MongoDB connection string | ❌ |
| `NODE_ENV` | Environment (production/development) | ❌ |
| `PORT` | Port for web server (default: 3000) | ❌ |

### API Keys Setup

1. **OpenAI API Key**
   - Visit [OpenAI Platform](https://platform.openai.com/api-keys)
   - Create a new API key
   - Add to your `.env` file

2. **RapidAPI Key** (Optional)
   - Visit [RapidAPI](https://rapidapi.com)
   - Subscribe to a product search API
   - Add the key to your `.env` file

3. **Stripe Secret Key** (Optional)
   - Visit [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
   - Get your secret key
   - Add to your `.env` file

## 📁 Project Structure

```
han-agent/
├── agent.ts              # Main agent logic
├── main.ts              # CLI interface
├── server.ts            # Web server
├── tools/               # Agent tools
│   ├── cart.ts         # Cart management
│   ├── checkout.ts     # Payment processing
│   └── product_search.ts # Product search
├── models/              # Data models
│   └── Cart.ts         # Cart model
├── utils/               # Utility functions
├── Dockerfile           # Development Dockerfile
├── Dockerfile.prod      # Production Dockerfile
├── docker-compose.yml   # Docker Compose config
└── deploy.sh           # Deployment script
```

## 🛠️ Development

### Available Scripts

- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Run CLI version
- `npm run start:web` - Run web server
- `npm run dev` - Run CLI in development mode
- `npm run dev:web` - Run web server in development mode
- `npm test` - Run tests
- `npm run type-check` - TypeScript type checking

### Testing Tools

```bash
# Test individual tools
npx tsx test_cart_product_search.ts

# Test the agent
npm run dev
```

## 🚀 Deployment Options

### 1. Local Docker
```bash
docker-compose up -d
```

### 2. Cloud Deployment

#### AWS ECS
```bash
# Build and push to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com
docker build -t han-agent .
docker tag han-agent:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/han-agent:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/han-agent:latest
```

#### Google Cloud Run
```bash
# Build and deploy
gcloud builds submit --tag gcr.io/<project-id>/han-agent
gcloud run deploy han-agent --image gcr.io/<project-id>/han-agent --platform managed
```

#### Heroku
```bash
# Deploy to Heroku
heroku create han-agent-app
heroku container:push web
heroku container:release web
```

## 🔍 Troubleshooting

### Common Issues

1. **Agent not responding**
   - Check OpenAI API key in `.env`
   - Verify API key has sufficient credits

2. **Docker build fails**
   - Ensure Docker is running
   - Check for syntax errors in TypeScript files

3. **MongoDB connection issues**
   - Verify MongoDB is running in Docker
   - Check connection string in `.env`

4. **Web interface not loading**
   - Check if port 3000 is available
   - Verify the container is running: `docker-compose ps`

### Logs and Debugging

```bash
# View application logs
docker-compose logs -f han-agent

# View MongoDB logs
docker-compose logs -f mongo

# Access container shell
docker-compose exec han-agent sh

# Check container health
docker-compose ps
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

If you encounter any issues:

1. Check the troubleshooting section
2. Review the logs: `docker-compose logs han-agent`
3. Open an issue on GitHub
4. Contact the development team

---

**Happy Shopping with HAN! 🛍️**