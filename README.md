# 🌾 Anachak Agriculture Chatbot

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)
![Telegram Bot API](https://img.shields.io/badge/Telegram%20Bot%20API-Latest-blue.svg)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-2.0%20Flash-orange.svg)
![License](https://img.shields.io/badge/License-Anachak%20Cyb3r-green.svg)
![Status](https://img.shields.io/badge/Status-Active-success.svg)

**An AI-powered agricultural advisor providing professional consultation for Cambodian farmers**

[Features](#-key-features) • [Installation](#-installation) • [Usage](#-usage) • [Contributing](#-contributing) • [Team](#-contributors)

</div>

---

## 🌾 Overview

**Anachak Agriculture Chatbot** is an intelligent Telegram bot developed by **Anachak Cyb3r** to empower Cambodian farmers with professional agricultural knowledge. This bot provides 24/7 AI-powered consultation services, helping farmers make informed decisions about crop cultivation, pest management, soil health, and sustainable farming practices.

This bot is a **sub-service** of the main [**Anachak Kasekor Chatbot**](https://github.com/Anachak-Cyb3r/Anachak-Kasekor-Chatbot) ecosystem, specifically focused on providing expert agricultural advice through conversational AI.

---

## 🌟 Key Features

| Feature | Description |
|---------|-------------|
| 🤖 **AI-Powered Consultation** | Professional agricultural advice powered by Google Gemini 2.0 Flash |
| 🌐 **Bilingual Support** | Automatic language detection for Khmer (ភាសាខ្មែរ) and English |
| 💬 **Conversation Memory** | Maintains context across multiple questions for natural dialogue |
| 🌱 **Comprehensive Topics** | Covers crop cultivation, pest control, soil health, irrigation, and more |
| 📱 **User-Friendly Interface** | Clean, professional formatting with emojis and structured responses |
| ⚡ **24/7 Availability** | Always ready to help farmers with instant responses |
| 🔒 **Secure & Private** | No data collection, conversations are temporary |
| 🆓 **Free to Use** | Powered by free Google Gemini API |

---

## 🚀 Installation

### Prerequisites

- Node.js 18 or higher
- npm (Node package manager)
- Telegram Bot Token (from [@BotFather](https://t.me/BotFather))
- Google Gemini API Key (free from [Google AI Studio](https://makersuite.google.com/app/apikey))

### Step-by-Step Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Anachak-Cyb3r/Anachak-Chat-Bot.git
   cd Anachak-Chat-Bot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your credentials:
   ```env
   TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
   GOOGLE_API_KEY=your_google_gemini_api_key_here
   ```

4. **Build the project**
   ```bash
   npm run build
   ```

5. **Run the bot**
   ```bash
   npm start
   ```

---

## 📖 Usage

### Starting the Bot

1. Open Telegram and search for **@cambochatAI_bot**
2. Send `/start` command to see the welcome message
3. Ask any agriculture-related question in Khmer or English
4. The bot automatically detects your language and responds accordingly

### Available Commands

- `/start` - Display welcome message and bot capabilities
- `/help` - Show usage instructions and tips

### Example Questions

**In Khmer:**
- "តើពេលណាដាំស្រូវ?"
- "តើធ្វើដូចម្តេចដើម្បីព្យាបាលសត្វល្អិត?"
- "តើជីធម្មជាតិអ្វីល្អបំផុត?"

**In English:**
- "When should I plant rice?"
- "How do I treat pests on vegetables?"
- "What is the best organic fertilizer?"

---

## 🛠️ Technology Stack

- **Language:** TypeScript 5.0+
- **Runtime:** Node.js 18+
- **Framework:** Telegraf (Telegram Bot Framework)
- **AI Engine:** Google Gemini 2.0 Flash
- **Testing:** Jest
- **Build Tool:** TypeScript Compiler
- **Deployment:** Docker support included

---

## 📁 Project Structure

```
Anachak-Chat-Bot/
├── src/
│   ├── bot.ts                      # Main bot initialization
│   ├── server.ts                   # Server entry point
│   ├── config.ts                   # Configuration management
│   ├── handlers/
│   │   ├── commands.ts             # Command handlers (/start, /help)
│   │   └── message-processor.ts   # Message processing logic
│   ├── services/
│   │   ├── ai-service.ts           # Google Gemini AI integration
│   │   └── conversation-manager.ts # Conversation context management
│   ├── utils/
│   │   ├── language-detector.ts    # Automatic language detection
│   │   ├── response-formatter.ts   # Response formatting utilities
│   │   ├── error-handler.ts        # Error handling and logging
│   │   └── retry-helper.ts         # Retry logic for API calls
│   └── types/
│       ├── config.types.ts         # Configuration type definitions
│       └── telegram.types.ts       # Telegram type definitions
├── tests/
│   └── bot.test.ts                 # Unit tests
├── .kiro/specs/                    # Project specifications
├── package.json                    # Dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
├── jest.config.js                  # Jest testing configuration
├── Dockerfile                      # Docker containerization
├── .env.example                    # Environment variables template
├── .gitignore                      # Git ignore rules
└── README.md                       # Project documentation
```

---

## 🐳 Docker Deployment

Build and run with Docker:

```bash
# Build the image
docker build -t anachak-agriculture-bot .

# Run the container
docker run -d --env-file .env anachak-agriculture-bot
```

---

## 🧪 Testing

Run the test suite:

```bash
npm test
```

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m "Add some AmazingFeature"
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Write clear, descriptive commit messages
- Add tests for new features
- Update documentation as needed
- Ensure code passes linting and type checks

---

## 🧠 Our Mission

To make farming **smarter, easier, and more sustainable** by providing **accessible AI-powered agricultural consultation** — building a better future for Cambodian farmers through technology and innovation.

---

## 🔗 Related Projects

This bot is part of the **Anachak Kasekor** ecosystem:

- 🏠 [**Main Hub Bot**](https://github.com/Anachak-Cyb3r/Anachak-Kasekor-Chatbot) - Central hub connecting all agricultural services
- 🌾 **Agriculture Chatbot** (This Repository) - AI agricultural advisor
- 🧪 Soil Detection Bot - Soil analysis and crop recommendations
- 🌾 Rice Seed Analysis Bot - Rice variety identification
- 🦠 Disease Detection Bot - Plant disease diagnosis
- 🌤️ Weather Forecasting Bot - Agricultural weather updates
- 🛒 Marketplace Bot - Agricultural product marketplace

---

## 👨‍💻 Contributors

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/identicons/1.png" width="100px;" alt=""/>
      <br />
      <sub><b>Pring Rady</b></sub>
    </td>
    <td align="center">
      <img src="https://github.com/identicons/2.png" width="100px;" alt=""/>
      <br />
      <sub><b>Morn Chanthoung</b></sub>
    </td>
    <td align="center">
      <img src="https://github.com/identicons/3.png" width="100px;" alt=""/>
      <br />
      <sub><b>Mi Lyheng</b></sub>
    </td>
  </tr>
</table>

---

## 📞 Support

For support, questions, or feedback:
- Open an issue on GitHub
- Contact the Anachak Cyb3r Team
- Visit the main project: [Anachak Kasekor Chatbot](https://github.com/Anachak-Cyb3r/Anachak-Kasekor-Chatbot)

---

## 📜 License

This project is licensed under **Anachak Cyb3r**.  
All rights reserved © 2025.

---

## 🙏 Acknowledgments

- Thanks to all Cambodian farmers who inspired this project
- Google for providing free Gemini API access
- Telegram Bot API for the excellent platform
- The open-source community for their invaluable tools

---

<div align="center">

**Made with ❤️ by Anachak Cyb3r**

⭐ Star this repository if you find it helpful!

[Main Project](https://github.com/Anachak-Cyb3r/Anachak-Kasekor-Chatbot) • [Report Bug](https://github.com/Anachak-Cyb3r/Anachak-Chat-Bot/issues) • [Request Feature](https://github.com/Anachak-Cyb3r/Anachak-Chat-Bot/issues)

</div>
