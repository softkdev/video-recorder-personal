import React from 'react'
import { useMyHook } from 'test-hook-custom'

const App = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
export default App