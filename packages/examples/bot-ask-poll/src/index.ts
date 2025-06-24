import { Bot } from '@towns-protocol/sdk'
import { PollBot } from './pollBot'

async function main() {
    console.log('Starting Poll Bot...')
    
    const bot = new Bot()
    await bot.fundWallet()
    
    const syncAgent = await bot.makeSyncAgent()
    await syncAgent.start()
    
    const pollBot = new PollBot(bot, syncAgent)
    await pollBot.start()
    
    console.log(`Poll Bot started with ID: ${bot.userId}`)
}

main().catch(console.error)