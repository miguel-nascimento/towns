# Towns Protocol Bot Examples

This directory contains example bot implementations using the Towns Protocol SDK.

## Available Examples

### 🚀 [Bot Quickstart](./bot-quickstart)
A very simple, barebones bot implementation in a single file. Perfect for getting started with Towns Protocol bots.

**Features:**
- Basic bot setup and initialization
- Simple message listening and responding
- Single file implementation

### 🗳️ [Bot Ask Poll](./bot-ask-poll)
A polling bot that allows users to create and participate in polls within channels.

**Features:**
- Create polls with multiple options
- Vote on active polls
- Visual progress bars for results
- Poll management and statistics

### 🧵 [Bot Thread AI](./bot-thread-ai)
An AI-powered bot demonstrating advanced threading functionality and contextual conversations.

**Features:**
- Smart thread creation and management
- Context-aware responses
- Thread summarization
- Automatic insights and participant tracking

## Getting Started

Each example is a self-contained package with its own dependencies and documentation.

1. Navigate to the example you want to try:
   ```bash
   cd packages/examples/bot-quickstart
   # or
   cd packages/examples/bot-ask-poll
   # or
   cd packages/examples/bot-thread-ai
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Run in development mode:
   ```bash
   yarn dev
   ```

## Development

Each bot example includes:
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `src/` - Source code
- `README.md` - Detailed documentation

## Architecture

All bots are built using the Towns Protocol SDK and follow these patterns:

1. **Bot Instance**: Create a Bot instance from the SDK
2. **Wallet**: Fund the bot's wallet for transactions
3. **SyncAgent**: Create and start a sync agent for real-time communication
4. **Event Handling**: Listen for spaces, channels, and messages
5. **Response Logic**: Implement bot-specific behavior

## Contributing

When adding new bot examples:

1. Create a new directory under `packages/examples/`
2. Follow the same structure as existing examples
3. Include comprehensive documentation
4. Add the example to this README