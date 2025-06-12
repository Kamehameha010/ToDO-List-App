import { render, } from 'preact'
import './index.css'


import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import  { App } from './app'

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

render(<RouterProvider router={router} />,  document.getElementById('app')!)
