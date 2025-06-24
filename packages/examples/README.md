# Towns Bot Examples

This directory contains example bot implementations to help you get started with building Towns bots.

## Available Examples

### 🚀 [bot-quickstart](./bot-quickstart/)
A simple, barebones bot perfect for beginners. Features basic message handling, reactions, and well-commented code to help you understand the fundamentals.

**Best for**: First-time bot builders, learning the basics

### 🧵 [bot-thread-ai](./bot-thread-ai/)
An AI-powered bot that creates threaded conversations using OpenAI's API. Demonstrates advanced conversation handling and AI integration.

**Best for**: AI integration, threaded conversations, contextual responses

### 📊 [bot-ask-poll](./bot-ask-poll/)
An interactive polling bot that creates polls with emoji reactions. Shows state management, reaction handling, and real-time updates.

**Best for**: Interactive features, state management, reaction handling

## Getting Started

1. Choose an example that matches your needs
2. Navigate to the specific bot directory
3. Copy `.env.sample` to `.env` and fill in your credentials
4. Install dependencies: `yarn install`
5. Run the bot: `yarn dev`

## Common Environment Variables

All examples require these basic environment variables:

- `APP_PRIVATE_DATA_BASE64`: Your Towns app private data
- `JWT_SECRET`: JWT secret for authentication  
- `RIVER_ENV`: Environment (development/production)
- `PORT`: Port to run the bot on

Some examples may require additional variables (like OpenAI API keys).

## Bot Development Tips

- Start with `bot-quickstart` to understand the basics
- Each bot runs on its own port - make sure to use different ports for multiple bots
- Check the individual README files for specific usage instructions
- All bots use the same core `@towns-protocol/bot` package

## Project Structure

Each bot example follows the same structure:
```
bot-example/
├── src/
│   └── index.ts          # Main bot implementation
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── .env.sample          # Environment variables template
└── README.md            # Bot-specific documentation
```