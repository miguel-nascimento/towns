# Bot Quickstart

A very simple, barebones bot example to get you started with Towns Protocol bots.

## Features

- Basic bot setup and initialization
- Simple message listening and responding
- Responds to "hello bot" messages
- Single file implementation for easy understanding

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

## How it works

The bot:
1. Creates a new Bot instance
2. Funds the wallet
3. Creates and starts a SyncAgent
4. Listens for spaces and channels
5. Responds to messages containing "hello bot"

## Code Structure

- `src/bot.ts` - Single file containing the entire bot implementation

This is the simplest possible bot implementation to help you understand the basics of building bots with Towns Protocol.