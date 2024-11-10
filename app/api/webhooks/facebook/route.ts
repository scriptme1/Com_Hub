import { NextResponse } from 'next/server'
import { FacebookHandler } from '@/lib/social-media/conversation-handler'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const handler = new FacebookHandler()

    // Handle different types of Facebook webhooks
    if (body.object === 'page') {
      for (const entry of body.entry) {
        // Handle messages
        if (entry.messaging) {
          for (const message of entry.messaging) {
            await handler.handleMessenger(message.sender.id, message.message.text)
          }
        }
        
        // Handle comments
        if (entry.changes) {
          for (const change of entry.changes) {
            if (change.value.item === 'comment') {
              await handler.handleComment(change.value.post_id, change.value.message)
            }
          }
        }
      }
    }

    return NextResponse.json({ status: 'success' })
  } catch (error) {
    console.error('Facebook webhook error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}