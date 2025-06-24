import { Bot, SyncAgent, Channel } from '@towns-protocol/sdk'

interface Poll {
    id: string
    question: string
    options: string[]
    votes: Map<string, number>
    voters: Set<string>
    createdBy: string
    createdAt: number
    isActive: boolean
}

export class PollBot {
    private polls = new Map<string, Poll>()
    
    constructor(
        private bot: Bot,
        private syncAgent: SyncAgent
    ) {}
    
    async start() {
        this.syncAgent.spaces.on('spaceAdded', async (space) => {
            console.log(`Poll Bot joined space: ${space.data.name}`)
            
            space.on('channelAdded', async (channel) => {
                console.log(`Poll Bot joined channel: ${channel.data.name}`)
                
                channel.timeline.events.subscribe((events) => {
                    const latestEvent = events[events.length - 1]
                    if (latestEvent?.content?.kind === 'channelMessage' && 
                        latestEvent.sender.id !== this.bot.userId) {
                        
                        const message = latestEvent.content.body
                        this.handleMessage(channel, message, latestEvent.sender.id)
                    }
                })
            })
        })
    }
    
    private async handleMessage(channel: Channel, message: string, senderId: string) {
        const trimmedMessage = message.trim()
        
        if (trimmedMessage.startsWith('/poll')) {
            await this.handlePollCommand(channel, trimmedMessage, senderId)
        } else if (trimmedMessage.startsWith('/vote')) {
            await this.handleVoteCommand(channel, trimmedMessage, senderId)
        } else if (trimmedMessage === '/polls') {
            await this.showActivePolls(channel)
        } else if (message.toLowerCase().includes('poll bot')) {
            await channel.sendMessage('Hi! I can help you create polls. Use `/poll "Question?" "Option 1" "Option 2" ...` to create a poll!')
        }
    }
    
    private async handlePollCommand(channel: Channel, message: string, senderId: string) {
        try {
            const parts = this.parseQuotedParts(message.slice(5).trim())
            
            if (parts.length < 3) {
                await channel.sendMessage('Usage: /poll "Question?" "Option 1" "Option 2" ... (minimum 2 options)')
                return
            }
            
            const question = parts[0]
            const options = parts.slice(1)
            
            const pollId = `poll_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
            
            const poll: Poll = {
                id: pollId,
                question,
                options,
                votes: new Map(options.map((_, i) => [i.toString(), 0])),
                voters: new Set(),
                createdBy: senderId,
                createdAt: Date.now(),
                isActive: true
            }
            
            this.polls.set(pollId, poll)
            
            const pollMessage = this.formatPoll(poll)
            await channel.sendMessage(pollMessage)
            
        } catch (error) {
            await channel.sendMessage('Error creating poll. Please check your format: /poll "Question?" "Option 1" "Option 2" ...')
        }
    }
    
    private async handleVoteCommand(channel: Channel, message: string, senderId: string) {
        const parts = message.split(' ')
        if (parts.length !== 3) {
            await channel.sendMessage('Usage: /vote <poll_id> <option_number>')
            return
        }
        
        const pollId = parts[1]
        const optionIndex = parseInt(parts[2]) - 1
        
        const poll = this.polls.get(pollId)
        if (!poll) {
            await channel.sendMessage('Poll not found. Use /polls to see active polls.')
            return
        }
        
        if (!poll.isActive) {
            await channel.sendMessage('This poll is no longer active.')
            return
        }
        
        if (optionIndex < 0 || optionIndex >= poll.options.length) {
            await channel.sendMessage(`Invalid option. Choose between 1 and ${poll.options.length}`)
            return
        }
        
        if (poll.voters.has(senderId)) {
            await channel.sendMessage('You have already voted in this poll.')
            return
        }
        
        poll.votes.set(optionIndex.toString(), poll.votes.get(optionIndex.toString())! + 1)
        poll.voters.add(senderId)
        
        const pollMessage = this.formatPoll(poll)
        await channel.sendMessage(`Vote recorded! 🗳️\n\n${pollMessage}`)
    }
    
    private async showActivePolls(channel: Channel) {
        const activePolls = Array.from(this.polls.values()).filter(p => p.isActive)
        
        if (activePolls.length === 0) {
            await channel.sendMessage('No active polls.')
            return
        }
        
        let message = '📊 **Active Polls:**\n\n'
        for (const poll of activePolls) {
            message += `**${poll.id}**: ${poll.question}\n`
            message += `Created: ${new Date(poll.createdAt).toLocaleString()}\n`
            message += `Votes: ${poll.voters.size}\n\n`
        }
        
        await channel.sendMessage(message)
    }
    
    private formatPoll(poll: Poll): string {
        let message = `📊 **Poll: ${poll.question}**\n`
        message += `ID: ${poll.id}\n\n`
        
        poll.options.forEach((option, index) => {
            const votes = poll.votes.get(index.toString()) || 0
            const percentage = poll.voters.size > 0 ? ((votes / poll.voters.size) * 100).toFixed(1) : '0.0'
            const bar = '█'.repeat(Math.floor(Number(percentage) / 10)) + '░'.repeat(10 - Math.floor(Number(percentage) / 10))
            message += `${index + 1}. ${option}\n`
            message += `   ${bar} ${votes} votes (${percentage}%)\n\n`
        })
        
        message += `Total votes: ${poll.voters.size}\n`
        message += `To vote: /vote ${poll.id} <option_number>`
        
        return message
    }
    
    private parseQuotedParts(input: string): string[] {
        const parts: string[] = []
        let current = ''
        let inQuotes = false
        let i = 0
        
        while (i < input.length) {
            const char = input[i]
            
            if (char === '"' && (i === 0 || input[i - 1] !== '\\')) {
                if (inQuotes) {
                    parts.push(current)
                    current = ''
                    inQuotes = false
                } else {
                    inQuotes = true
                }
            } else if (inQuotes) {
                current += char
            } else if (char === ' ') {
            } else {
                return []
            }
            
            i++
        }
        
        return parts
    }
}