import { useState } from 'react'
import { Search, Filter, MessageSquare, User, Clock, ChevronRight } from 'lucide-react'

const conversations = [
    {
        id: '1',
        name: 'Maria Silva',
        phone: '(11) 99999-1234',
        avatar: 'MS',
        lastMessage: 'Olá, qual o horário de funcionamento?',
        status: 'in_progress',
        time: '2 min',
        unread: 0,
        messages: 12
    },
    {
        id: '2',
        name: 'João Santos',
        phone: '(21) 98888-5678',
        avatar: 'JS',
        lastMessage: 'Preciso falar com um atendente humano por favor',
        status: 'waiting',
        time: '5 min',
        unread: 3,
        messages: 8
    },
    {
        id: '3',
        name: 'Ana Oliveira',
        phone: '(31) 97777-9012',
        avatar: 'AO',
        lastMessage: 'Obrigada pela ajuda! Até mais 😊',
        status: 'closed',
        time: '12 min',
        unread: 0,
        messages: 24
    },
    {
        id: '4',
        name: 'Carlos Ferreira',
        phone: '(41) 96666-3456',
        avatar: 'CF',
        lastMessage: 'Quanto custa o serviço de consultoria?',
        status: 'in_progress',
        time: '15 min',
        unread: 0,
        messages: 6
    },
    {
        id: '5',
        name: 'Patrícia Lima',
        phone: '(51) 95555-7890',
        avatar: 'PL',
        lastMessage: 'Quero agendar uma reunião para amanhã',
        status: 'in_progress',
        time: '20 min',
        unread: 1,
        messages: 15
    },
]

const statusConfig = {
    in_progress: { label: 'Em Andamento', class: 'badge-info' },
    waiting: { label: 'Aguardando', class: 'badge-warning' },
    closed: { label: 'Finalizado', class: 'badge-success' },
}

const chatMessages = [
    { id: 1, role: 'user', content: 'Olá, boa tarde!', time: '14:30' },
    { id: 2, role: 'bot', content: 'Olá! 👋 Sou a Sofia, assistente virtual. Como posso te ajudar hoje?', time: '14:30' },
    { id: 3, role: 'user', content: 'Queria saber o horário de funcionamento', time: '14:31' },
    { id: 4, role: 'bot', content: 'Nosso horário de atendimento é:\n\n📅 Segunda a Sexta: 9h às 18h\n📅 Sábado: 9h às 13h\n📅 Domingo: Fechado\n\nPosso ajudar com mais alguma coisa?', time: '14:31' },
    { id: 5, role: 'user', content: 'Qual o horário de funcionamento?', time: '14:32' },
]

export default function Conversations() {
    const [selectedConversation, setSelectedConversation] = useState(conversations[0])
    const [searchTerm, setSearchTerm] = useState('')
    const [filterStatus, setFilterStatus] = useState('all')

    const filteredConversations = conversations.filter((conv) => {
        const matchesSearch = conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            conv.phone.includes(searchTerm)
        const matchesStatus = filterStatus === 'all' || conv.status === filterStatus
        return matchesSearch && matchesStatus
    })

    return (
        <div className="animate-fade-in h-[calc(100vh-4rem)]">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-white mb-2">Conversas</h1>
                <p className="text-dark-400">Gerencie e visualize todas as conversas</p>
            </div>

            <div className="flex gap-6 h-[calc(100%-5rem)]">
                {/* Conversations List */}
                <div className="w-96 flex flex-col glass rounded-xl overflow-hidden">
                    {/* Search & Filter */}
                    <div className="p-4 border-b border-dark-700/50">
                        <div className="relative mb-3">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
                            <input
                                type="text"
                                placeholder="Buscar por nome ou telefone..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="input pl-10"
                            />
                        </div>
                        <div className="flex gap-2">
                            {['all', 'in_progress', 'waiting', 'closed'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setFilterStatus(status)}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filterStatus === status
                                            ? 'bg-primary-500 text-white'
                                            : 'bg-dark-700 text-dark-300 hover:bg-dark-600'
                                        }`}
                                >
                                    {status === 'all' ? 'Todos' : statusConfig[status as keyof typeof statusConfig]?.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* List */}
                    <div className="flex-1 overflow-y-auto">
                        {filteredConversations.map((conv) => (
                            <div
                                key={conv.id}
                                onClick={() => setSelectedConversation(conv)}
                                className={`p-4 border-b border-dark-700/30 cursor-pointer transition-colors ${selectedConversation.id === conv.id
                                        ? 'bg-primary-500/10 border-l-2 border-l-primary-500'
                                        : 'hover:bg-dark-700/30'
                                    }`}
                            >
                                <div className="flex items-start gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold">
                                        {conv.avatar}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="font-medium text-white truncate">{conv.name}</span>
                                            <span className="text-dark-400 text-xs flex-shrink-0">{conv.time}</span>
                                        </div>
                                        <p className="text-dark-400 text-sm truncate mb-2">{conv.lastMessage}</p>
                                        <div className="flex items-center justify-between">
                                            <span className={`badge ${statusConfig[conv.status as keyof typeof statusConfig]?.class}`}>
                                                {statusConfig[conv.status as keyof typeof statusConfig]?.label}
                                            </span>
                                            {conv.unread > 0 && (
                                                <span className="w-5 h-5 rounded-full bg-primary-500 text-white text-xs flex items-center justify-center">
                                                    {conv.unread}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chat View */}
                <div className="flex-1 flex flex-col glass rounded-xl overflow-hidden">
                    {/* Chat Header */}
                    <div className="p-4 border-b border-dark-700/50 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold">
                                {selectedConversation.avatar}
                            </div>
                            <div>
                                <h3 className="font-medium text-white">{selectedConversation.name}</h3>
                                <p className="text-dark-400 text-sm">{selectedConversation.phone}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className={`badge ${statusConfig[selectedConversation.status as keyof typeof statusConfig]?.class}`}>
                                {statusConfig[selectedConversation.status as keyof typeof statusConfig]?.label}
                            </span>
                            <button className="btn-secondary text-sm">
                                Assumir Conversa
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {chatMessages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}
                            >
                                <div
                                    className={`max-w-md px-4 py-3 rounded-2xl ${msg.role === 'user'
                                            ? 'bg-dark-700 text-white rounded-bl-md'
                                            : 'bg-primary-500 text-white rounded-br-md'
                                        }`}
                                >
                                    <p className="whitespace-pre-wrap">{msg.content}</p>
                                    <p className={`text-xs mt-1 ${msg.role === 'user' ? 'text-dark-400' : 'text-primary-200'}`}>
                                        {msg.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Info Footer */}
                    <div className="p-4 border-t border-dark-700/50 bg-dark-800/50">
                        <div className="flex items-center justify-between text-sm text-dark-400">
                            <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1">
                                    <MessageSquare className="w-4 h-4" />
                                    {selectedConversation.messages} mensagens
                                </span>
                                <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    Iniciada há 32 min
                                </span>
                            </div>
                            <span>Atendido por: Bot Sofia</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
