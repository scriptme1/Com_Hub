"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

interface InvoiceGeneratorProps {
  order: any
  onGenerate: (invoice: any) => void
}

export default function InvoiceGenerator({ order, onGenerate }: InvoiceGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const generateInvoice = async () => {
    try {
      setIsGenerating(true)
      
      // Generate invoice logic here
      const invoice = {
        orderId: order.id,
        items: order.items,
        total: order.total,
        // Add more invoice details
      }
      
      onGenerate(invoice)
      toast.success('Invoice generated successfully')
    } catch (error) {
      toast.error('Failed to generate invoice')
      console.error('Invoice generation error:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Button 
      onClick={generateInvoice} 
      disabled={isGenerating}
    >
      {isGenerating ? 'Generating...' : 'Generate Invoice'}
    </Button>
  )
}