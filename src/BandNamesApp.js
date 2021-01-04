import React from 'react'
import HomePage from './pages/HomePage'
import { SocketProvider } from './context/SocketContext'

const BandNamesApp = () => {
  return (
    <SocketProvider>
      <HomePage />
    </SocketProvider>
  )
}

export default BandNamesApp
