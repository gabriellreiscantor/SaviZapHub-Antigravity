import { NavLink } from 'react-router-dom'
import {
    LayoutDashboard,
    Brain,
    Plug,
    MessageSquare,
    Settings,
    Zap
} from 'lucide-react'

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Cérebro do Bot', href: '/brain', icon: Brain },
    { name: 'Integrações', href: '/integrations', icon: Plug },
    { name: 'Conversas', href: '/conversations', icon: MessageSquare },
    { name: 'Configurações', href: '/settings', icon: Settings },
]

export default function Sidebar() {
    return (
        <aside className="fixed left-0 top-0 h-full w-64 glass border-r border-dark-700/50 z-50">
            {/* Logo */}
            <div className="flex items-center gap-3 px-6 py-6 border-b border-dark-700/50">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center animate-pulse-glow">
                    <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h1 className="text-lg font-bold text-white">Savini</h1>
                    <p className="text-xs text-dark-400">HubZap</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="px-4 py-6 space-y-2">
                {navigation.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.href}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                                : 'text-dark-300 hover:bg-dark-700/50 hover:text-white'
                            }`
                        }
                    >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            {/* Status */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-dark-700/50">
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-dark-800/50">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm text-dark-300">Bot Online</span>
                </div>
            </div>
        </aside>
    )
}
