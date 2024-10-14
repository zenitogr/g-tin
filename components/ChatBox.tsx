'use client'

import { useEffect, useState } from 'react'

export default function ChatBox() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    console.log('ChatBox mounted')
    setIsClient(true)
  }, [])

  console.log('ChatBox rendering, isClient:', isClient)

  return (
    <div className="chat-box">
      {isClient ? (
        // Your ChatBox component JSX
        <p>Chat Box Content</p>
      ) : (
        <p>Loading Chat Box...</p>
      )}
    </div>
  )
}
