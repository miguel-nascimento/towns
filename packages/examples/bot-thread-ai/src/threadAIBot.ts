import { Bot, SyncAgent, Channel } from '@towns-protocol/sdk'

interface ThreadContext {
    parentEventId: string
    topic: string
    participants: Set<string>
    messageCount: number
    lastActivity: number
}

export class ThreadAIBot {
    private threadContexts = new Map<string, ThreadContext>()
    private responses = new Map<string, string>()
    
    constructor(
        private bot: Bot,
        private syncAgent: SyncAgent
    ) {
        this.initializeResponses()
    }
    
    private initializeResponses() {
        this.responses.set('coding', 'Great question about coding! 💻 Let me help you with that...')
        this.responses.set('javascript', 'JavaScript is awesome! Here are some tips...')
        this.responses.set('react', 'React is a powerful framework. Let me share some insights...')
        this.responses.set('blockchain', 'Blockchain technology is fascinating! Here\'s what I know...')
        this.responses.set('towns', 'Towns Protocol is amazing for building decentralized communities!')
        this.responses.set('help', 'I\'m here to help! You can ask me about coding, technology, or general topics.')
        this.responses.set('thread', 'Threading helps organize conversations! Let me explain...')
    }
    
    async start() {
        this.syncAgent.spaces.on('spaceAdded', async (space) => {
            console.log(`Thread AI Bot joined space: ${space.data.name}`)
            
            space.on('channelAdded', async (channel) => {
                console.log(`Thread AI Bot joined channel: ${channel.data.name}`)
                
                channel.timeline.events.subscribe((events) => {
                    const latestEvent = events[events.length - 1]
                    if (latestEvent?.content?.kind === 'channelMessage' && 
                        latestEvent.sender.id !== this.bot.userId) {
                        
                        this.handleMessage(channel, latestEvent)
                    }
                })
                
                channel.timeline.threads.subscribe((threads) => {
                    this.updateThreadContexts(threads)
                })
            })
        })
    }
    
    private async handleMessage(channel: Channel, event: any) {
        const message = event.content.body
        const senderId = event.sender.id
        const threadId = event.threadParentId
        
        if (threadId) {
            await this.handleThreadMessage(channel, message, senderId, threadId, event.eventId)
        } else {
            await this.handleMainMessage(channel, message, senderId, event.eventId)
        }
    }
    
    private async handleMainMessage(channel: Channel, message: string, senderId: string, eventId: string) {
        const lowerMessage = message.toLowerCase()
        
        if (lowerMessage.includes('@ai') || lowerMessage.includes('ai bot')) {
            const topic = this.extractTopic(message)
            const response = this.generateResponse(topic, message)
            
            await channel.sendMessage(response, { threadId: eventId })
            
            this.threadContexts.set(eventId, {
                parentEventId: eventId,
                topic,
                participants: new Set([senderId]),
                messageCount: 1,
                lastActivity: Date.now()
            })
        } else if (lowerMessage.includes('start thread') || lowerMessage.includes('create thread')) {
            const topic = this.extractTopic(message) || 'discussion'
            const response = `🧵 **Thread Started: ${topic}**\n\nI've started a new thread for this topic. Feel free to continue the discussion here!`
            
            await channel.sendMessage(response, { threadId: eventId })
            
            this.threadContexts.set(eventId, {
                parentEventId: eventId,
                topic,
                participants: new Set([senderId]),
                messageCount: 1,
                lastActivity: Date.now()
            })
        }
    }
    
    private async handleThreadMessage(channel: Channel, message: string, senderId: string, threadId: string, eventId: string) {
        const context = this.threadContexts.get(threadId)
        if (!context) return
        
        context.participants.add(senderId)
        context.messageCount++
        context.lastActivity = Date.now()
        
        const lowerMessage = message.toLowerCase()
        
        if (lowerMessage.includes('@ai') || lowerMessage.includes('ai bot')) {
            const response = this.generateContextualResponse(context, message)
            await channel.sendMessage(response, { threadId })
        } else if (lowerMessage.includes('summarize') || lowerMessage.includes('summary')) {
            const summary = this.generateThreadSummary(context)
            await channel.sendMessage(summary, { threadId })
        } else if (context.messageCount % 5 === 0 && Math.random() < 0.3) {
            const insight = this.generateInsight(context)
            await channel.sendMessage(insight, { threadId })
        }
    }
    
    private extractTopic(message: string): string {
        const keywords = ['coding', 'javascript', 'react', 'blockchain', 'towns', 'help', 'thread']
        const lowerMessage = message.toLowerCase()
        
        for (const keyword of keywords) {
            if (lowerMessage.includes(keyword)) {
                return keyword
            }
        }
        
        const words = message.split(' ').filter(word => word.length > 4)
        return words[0] || 'general'
    }
    
    private generateResponse(topic: string, originalMessage: string): string {
        const baseResponse = this.responses.get(topic) || 'That\'s an interesting topic! Let me think about that...'
        
        const contextualAddition = this.getContextualAddition(originalMessage)
        
        return `${baseResponse}\n\n${contextualAddition}\n\n💡 Feel free to ask follow-up questions in this thread!`
    }
    
    private generateContextualResponse(context: ThreadContext, message: string): string {
        const baseResponse = this.generateResponse(context.topic, message)
        const threadInfo = `\n\n📊 Thread Stats: ${context.messageCount} messages, ${context.participants.size} participants`
        
        return baseResponse + threadInfo
    }
    
    private getContextualAddition(message: string): string {
        const additions = [
            'This is a complex topic with many facets to explore.',
            'There are several approaches we could consider here.',
            'Let me break this down into manageable parts.',
            'This connects to several important concepts.',
            'Here are some practical examples to consider.'
        ]
        
        return additions[Math.floor(Math.random() * additions.length)]
    }
    
    private generateThreadSummary(context: ThreadContext): string {
        return `📋 **Thread Summary**\n\n` +
               `**Topic:** ${context.topic}\n` +
               `**Messages:** ${context.messageCount}\n` +
               `**Participants:** ${context.participants.size}\n` +
               `**Duration:** ${this.formatDuration(Date.now() - context.lastActivity)}\n\n` +
               `This thread has been quite active! The discussion around ${context.topic} has involved multiple participants and generated substantial conversation.`
    }
    
    private generateInsight(context: ThreadContext): string {
        const insights = [
            `🔍 **Insight:** This ${context.topic} discussion is really picking up momentum!`,
            `💭 **Observation:** Great collaborative thinking happening in this thread!`,
            `🚀 **Note:** The conversation depth here is impressive - ${context.messageCount} messages so far!`,
            `🤝 **Community:** Love seeing ${context.participants.size} people engaged in this ${context.topic} discussion!`
        ]
        
        return insights[Math.floor(Math.random() * insights.length)]
    }
    
    private formatDuration(ms: number): string {
        const seconds = Math.floor(ms / 1000)
        const minutes = Math.floor(seconds / 60)
        const hours = Math.floor(minutes / 60)
        
        if (hours > 0) return `${hours}h ${minutes % 60}m`
        if (minutes > 0) return `${minutes}m ${seconds % 60}s`
        return `${seconds}s`
    }
    
    private updateThreadContexts(threads: any) {
        Object.keys(threads).forEach(threadId => {
            const threadMessages = threads[threadId]
            if (threadMessages && threadMessages.length > 0) {
                const context = this.threadContexts.get(threadId)
                if (context) {
                    context.messageCount = threadMessages.length
                    context.lastActivity = Math.max(...threadMessages.map((msg: any) => msg.createdAtEpochMs))
                }
            }
        })
    }
}