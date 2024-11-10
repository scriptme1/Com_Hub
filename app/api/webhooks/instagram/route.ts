import { NextResponse } from 'next/server'
import { InstagramHandler } from '@/lib/social-media/conversation-handler'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const handler = new InstagramHandler()

    // Handle different types of Instagram webhooks
    if (body.object === 'instagram') {
      for (const entry of body.entry) {
        // Handle DMs
        if (entry.messaging) {
          for (const message of entry.messaging) {
            await handler.handleDM(message.sender.id, message.message.text)
          }
        }
        
        // Handle comments
        if (entry.changes) {
          for (const change of entry.changes) {
            if (change.value.item === 'comment') {
              await handler.handleComment(change.value.media_id, change.value.text)
            }
          }
        }
      }
    }

    return NextResponse.json({ status: 'success' })
  } catch (error) {
    console.error('Instagram webhook error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}