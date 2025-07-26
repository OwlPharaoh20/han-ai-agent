import express from 'express';
import { handlePrompt } from './agent.js';
import { config } from 'dotenv';

config(); // Load .env variables

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Serve the main HTML page
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>HAN AI Agent</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                color: white;
            }
            .container {
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
                border-radius: 20px;
                padding: 30px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            }
            h1 {
                text-align: center;
                margin-bottom: 30px;
                font-size: 2.5em;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
            }
            .chat-container {
                height: 400px;
                overflow-y: auto;
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 10px;
                padding: 20px;
                margin-bottom: 20px;
                background: rgba(255, 255, 255, 0.05);
            }
            .message {
                margin-bottom: 15px;
                padding: 10px 15px;
                border-radius: 10px;
                max-width: 80%;
            }
            .user-message {
                background: rgba(255, 255, 255, 0.2);
                margin-left: auto;
                text-align: right;
            }
            .agent-message {
                background: rgba(0, 255, 255, 0.2);
                margin-right: auto;
            }
            .input-container {
                display: flex;
                gap: 10px;
            }
            input[type="text"] {
                flex: 1;
                padding: 15px;
                border: none;
                border-radius: 25px;
                background: rgba(255, 255, 255, 0.2);
                color: white;
                font-size: 16px;
            }
            input[type="text"]::placeholder {
                color: rgba(255, 255, 255, 0.7);
            }
            button {
                padding: 15px 30px;
                border: none;
                border-radius: 25px;
                background: linear-gradient(45deg, #ff6b6b, #ee5a24);
                color: white;
                font-size: 16px;
                cursor: pointer;
                transition: transform 0.2s;
            }
            button:hover {
                transform: translateY(-2px);
            }
            button:disabled {
                opacity: 0.6;
                cursor: not-allowed;
            }
            .loading {
                text-align: center;
                font-style: italic;
                opacity: 0.7;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🤖 HAN AI Agent</h1>
            <div class="chat-container" id="chatContainer">
                <div class="message agent-message">
                    Hello! I'm HAN, your AI shopping assistant. How can I help you today?
                </div>
            </div>
            <div class="input-container">
                <input type="text" id="userInput" placeholder="Ask me anything about shopping..." />
                <button onclick="sendMessage()" id="sendButton">Send</button>
            </div>
        </div>

        <script>
            const chatContainer = document.getElementById('chatContainer');
            const userInput = document.getElementById('userInput');
            const sendButton = document.getElementById('sendButton');

            function addMessage(message, isUser = false) {
                const messageDiv = document.createElement('div');
                messageDiv.className = \`message \${isUser ? 'user-message' : 'agent-message'}\`;
                messageDiv.textContent = message;
                chatContainer.appendChild(messageDiv);
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }

            async function sendMessage() {
                const message = userInput.value.trim();
                if (!message) return;

                // Add user message
                addMessage(message, true);
                userInput.value = '';
                sendButton.disabled = true;

                // Add loading message
                const loadingDiv = document.createElement('div');
                loadingDiv.className = 'message agent-message loading';
                loadingDiv.textContent = '🤔 Thinking...';
                chatContainer.appendChild(loadingDiv);
                chatContainer.scrollTop = chatContainer.scrollHeight;

                try {
                    const response = await fetch('/chat', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ message })
                    });

                    const data = await response.json();
                    
                    // Remove loading message
                    chatContainer.removeChild(loadingDiv);
                    
                    // Add agent response
                    addMessage(data.response);
                } catch (error) {
                    // Remove loading message
                    chatContainer.removeChild(loadingDiv);
                    addMessage('Sorry, I encountered an error. Please try again.');
                } finally {
                    sendButton.disabled = false;
                    userInput.focus();
                }
            }

            // Allow Enter key to send message
            userInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
        </script>
    </body>
    </html>
  `);
});

// Chat endpoint
app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const response = await handlePrompt(message);
    res.json({ response });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 HAN AI Agent server running on port ${PORT}`);
  console.log(`🌐 Open http://localhost:${PORT} in your browser`);
}); 