import { Bot } from '@towns-protocol/sdk'

async function main() {
    const bot = new Bot()
    
    await bot.fundWallet()
    
    const syncAgent = await bot.makeSyncAgent()
    
    await syncAgent.start()
    
    const spaces = syncAgent.spaces
    
    spaces.on('spaceAdded', async (space) => {
        console.log(`Bot joined space: ${space.data.name}`)
        
        space.on('channelAdded', async (channel) => {
            console.log(`Bot joined channel: ${channel.data.name}`)
            
            channel.timeline.events.subscribe((events) => {
                const latestEvent = events[events.length - 1]
                if (latestEvent?.content?.kind === 'channelMessage' && 
                    latestEvent.sender.id !== bot.userId) {
                    
                    const message = latestEvent.content.body
                    console.log(`Received message: ${message}`)
                    
                    if (message.toLowerCase().includes('hello bot')) {
                        channel.sendMessage('Hello! I am a quickstart bot 🤖')
                    }
                }
            })
        })
    })
    
    console.log(`Bot started with ID: ${bot.userId}`)
    console.log('Bot is ready to receive messages!')
}

main().catch(console.error)