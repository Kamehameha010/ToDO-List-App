import { AuthProvider } from './context/auth-context'
import { Index } from './routes/tasks/index'



export function App() {
  return (
    <>
      <AuthProvider>
        <Index />
      </AuthProvider>
    </>
  )
}
