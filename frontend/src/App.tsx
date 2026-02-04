import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Brain from './pages/Brain'
import Integrations from './pages/Integrations'
import Conversations from './pages/Conversations'

function App() {
    return (
        <BrowserRouter>
            <div className="flex min-h-screen">
                <Sidebar />
                <main className="flex-1 ml-64 p-8">
                    <Routes>
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/brain" element={<Brain />} />
                        <Route path="/integrations" element={<Integrations />} />
                        <Route path="/conversations" element={<Conversations />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    )
}

export default App
