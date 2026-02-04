import { MessageSquare, Users, Clock, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react'

const stats = [
    {
        name: 'Conversas Hoje',
        value: '127',
        change: '+12%',
        trend: 'up',
        icon: MessageSquare,
        color: 'from-blue-500 to-blue-600'
    },
    {
        name: 'Aguardando Atendente',
        value: '8',
        change: '-3',
        trend: 'down',
        icon: Users,
        color: 'from-yellow-500 to-orange-500'
    },
    {
        name: 'Tempo Médio Resposta',
        value: '1.2s',
        change: '-0.3s',
        trend: 'down',
        icon: Clock,
        color: 'from-green-500 to-emerald-500'
    },
    {
        name: 'Taxa de Resolução',
        value: '94%',
        change: '+2%',
        trend: 'up',
        icon: TrendingUp,
        color: 'from-purple-500 to-pink-500'
    },
]

const recentConversations = [
    { id: 1, name: 'Maria Silva', phone: '(11) 99999-1234', lastMessage: 'Olá, qual o horário de...', status: 'bot', time: '2 min' },
    { id: 2, name: 'João Santos', phone: '(21) 98888-5678', lastMessage: 'Preciso falar com aten...', status: 'waiting', time: '5 min' },
    { id: 3, name: 'Ana Oliveira', phone: '(31) 97777-9012', lastMessage: 'Obrigada pela ajuda!', status: 'closed', time: '12 min' },
    { id: 4, name: 'Carlos Ferreira', phone: '(41) 96666-3456', lastMessage: 'Quanto custa o serviço...', status: 'bot', time: '15 min' },
    { id: 5, name: 'Patrícia Lima', phone: '(51) 95555-7890', lastMessage: 'Quero agendar uma reu...', status: 'agent', time: '20 min' },
]

const statusColors = {
    bot: 'badge-info',
    waiting: 'badge-warning',
    closed: 'badge-success',
    agent: 'badge-error',
}

const statusLabels = {
    bot: 'Bot',
    waiting: 'Aguardando',
    closed: 'Finalizado',
    agent: 'Atendente',
}

export default function Dashboard() {
    return (
        <div className="animate-fade-in">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
                <p className="text-dark-400">Visão geral do seu atendimento</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => (
                    <div key={stat.name} className="card group">
                        <div className="flex items-start justify-between mb-4">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center 
                             group-hover:scale-110 transition-transform duration-300`}>
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                            <div className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                                }`}>
                                {stat.trend === 'up' ? (
                                    <ArrowUpRight className="w-4 h-4" />
                                ) : (
                                    <ArrowDownRight className="w-4 h-4" />
                                )}
                                {stat.change}
                            </div>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                        <p className="text-dark-400 text-sm">{stat.name}</p>
                    </div>
                ))}
            </div>

            {/* Recent Conversations */}
            <div className="card">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-white">Conversas Recentes</h2>
                    <button className="btn-secondary text-sm">Ver todas</button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-dark-700">
                                <th className="text-left py-3 px-4 text-dark-400 font-medium text-sm">Cliente</th>
                                <th className="text-left py-3 px-4 text-dark-400 font-medium text-sm">Última Mensagem</th>
                                <th className="text-left py-3 px-4 text-dark-400 font-medium text-sm">Status</th>
                                <th className="text-left py-3 px-4 text-dark-400 font-medium text-sm">Tempo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentConversations.map((conv) => (
                                <tr
                                    key={conv.id}
                                    className="border-b border-dark-700/50 hover:bg-dark-700/30 transition-colors cursor-pointer"
                                >
                                    <td className="py-4 px-4">
                                        <div>
                                            <p className="text-white font-medium">{conv.name}</p>
                                            <p className="text-dark-400 text-sm">{conv.phone}</p>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <p className="text-dark-300 truncate max-w-xs">{conv.lastMessage}</p>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className={`badge ${statusColors[conv.status as keyof typeof statusColors]}`}>
                                            {statusLabels[conv.status as keyof typeof statusLabels]}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className="text-dark-400 text-sm">{conv.time}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
