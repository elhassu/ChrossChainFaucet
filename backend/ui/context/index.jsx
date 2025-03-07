'use client'

import { ethersAdapter, projectId, networks } from '@/config'
import { createAppKit } from '@reown/appkit/react'
import React from 'react'

if (!projectId) {
  throw new Error('Project ID is not defined')
}

// Set up metadata
const metadata = {
  name: 'next-reown-appkit',
  description: 'next-reown-appkit',
  url: 'https://github.com/0xonerb/next-reown-appkit-ssr', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

// Create the modal
export const modal = createAppKit({
  adapters: [ethersAdapter],
  projectId,
  networks,
  metadata,
  themeMode: 'light',
  features: {
    analytics: false // Optional - defaults to your Cloud configuration
  },
  themeVariables: {
    '--w3m-accent': '#000000',
  }
})

function ContextProvider({ children }) {
  return (
    <>{children}</>
  )
}

export default ContextProvider
