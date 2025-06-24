# Bot Thread AI

An AI-powered bot that demonstrates advanced threading functionality and contextual conversations.

## Features

- Smart thread creation and management
- Context-aware responses based on thread topics
- Thread summarization
- Automatic insights and observations
- Topic detection and categorization
- Participant tracking and statistics

## Getting Started

```bash
# Install dependencies
yarn install

# Run in development mode
yarn dev

# Build for production
yarn build

# Start production build
yarn start
```

## Usage

### Starting a Thread
- Mention `@ai` or `ai bot` in a message
- Use "start thread" or "create thread" in your message

### Thread Features
- **Contextual Responses**: The bot understands thread context
- **Summarization**: Ask for "summarize" or "summary" in a thread  
- **Automatic Insights**: Bot provides periodic insights in active threads
- **Topic Detection**: Recognizes topics like coding, JavaScript, React, blockchain

### Example Interactions
```
User: @ai Can you help me with JavaScript threading?
Bot: Great question about JavaScript! 💻 Let me help you with that...
      [Creates thread and provides contextual response]

User: summarize
Bot: 📋 Thread Summary
     Topic: javascript
     Messages: 5
     Participants: 2
     [Detailed summary]
```

## How it works

The bot:
1. Monitors messages for AI mentions and thread keywords
2. Creates threaded responses with contextual information
3. Tracks thread statistics and participant engagement
4. Provides intelligent insights based on conversation flow
5. Generates summaries on request

## Code Structure

- `src/index.ts` - Main entry point
- `src/threadAIBot.ts` - Thread AI bot implementation with all AI and threading logic