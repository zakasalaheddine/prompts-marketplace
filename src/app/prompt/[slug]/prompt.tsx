'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Copy } from 'lucide-react'

export default function PromptText({ promptText }: { promptText: string }) {
  return (
    <Card className="relative pr-8 pt-4">
      <CardContent>{promptText}</CardContent>
      <Button
        variant="outline"
        className="absolute top-2 right-2 p-2 h-auto"
        onClick={() => navigator.clipboard.writeText(promptText)}
      >
        <Copy className="h-4 w-4" />
      </Button>
    </Card>
  )
}
