# Bot Ask Poll

A bot that enables users to create and participate in polls within Towns Protocol channels.

## Features

- Create polls with multiple options
- Vote on active polls
- View poll results with visual progress bars
- List all active polls
- Prevent duplicate voting
- Poll statistics and analytics

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

## Commands

### Creating a Poll
```
/poll "What's your favorite programming language?" "JavaScript" "TypeScript" "Python" "Rust"
```

### Voting
```
/vote poll_123_abc 2
```

### Viewing Active Polls
```
/polls
```

## How it works

The bot:
1. Listens for messages containing poll commands
2. Parses quoted arguments for poll creation
3. Manages poll state and voting
4. Provides visual feedback with progress bars
5. Prevents duplicate voting per user

## Code Structure

- `src/index.ts` - Main entry point
- `src/pollBot.ts` - Poll bot implementation with all poll logic