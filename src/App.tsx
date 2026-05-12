import { AppRouter } from './router/AppRouter'
import { AuthProvider } from '@/context'
import './styles/globals.css'

export function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}

export default App