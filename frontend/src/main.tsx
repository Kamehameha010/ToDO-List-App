import { render, } from 'preact'
import './index.css'


// import { createRouter, RouterProvider } from '@tanstack/react-router'
// import { routeTree } from './routeTree.gen'

import * as Sentry from "@sentry/react";
import { App } from './app';
import { sentry_dsn, sentry_env } from './config';

Sentry.init({
  dsn: sentry_dsn,
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration()
  ],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  environment: sentry_env
});

// // Create a new router instance
// const router = createRouter({ routeTree })

// // Register the router instance for type safety
// declare module '@tanstack/react-router' {
//     interface Register {
//         router: typeof router
//     }
// }

render(/*<RouterProvider router={router} />*/ <App />, document.getElementById('app')!)
