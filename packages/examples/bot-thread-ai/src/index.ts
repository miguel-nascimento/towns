import { Bot } from '@towns-protocol/sdk'
import { ThreadAIBot } from './threadAIBot'

async function main() {
    console.log('Starting Thread AI Bot...')
    
    const bot = new Bot()
    await bot.fundWallet()
    
    const syncAgent = await bot.makeSyncAgent()
    await syncAgent.start()
    
    const threadAIBot = new ThreadAIBot(bot, syncAgent)
    await threadAIBot.start()
    
    console.log(`Thread AI Bot started with ID: ${bot.userId}`)
}

main().catch(console.error)