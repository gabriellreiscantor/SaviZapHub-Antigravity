import { useState } from 'react'
import { Check, Copy, ExternalLink, AlertCircle, CheckCircle2, Wifi, WifiOff } from 'lucide-react'

export default function Integrations() {
    const [provider, setProvider] = useState('wasenderapi')
    const [apiKey, setApiKey] = useState('')
    const [copied, setCopied] = useState(false)

    const webhookUrl = `https://seu-projeto.supabase.co/functions/v1/webhook-whatsapp?tenant_id=SEU_TENANT_ID&provider=${provider}`

    const copyToClipboard = () => {
        navigator.clipboard.writeText(webhookUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const providers = [
        {
            id: 'wasenderapi',
            name: 'WASenderAPI',
            description: 'API brasileira, fácil configuração',
            status: 'popular',
            docs: 'https://wasenderapi.com.br/docs'
        },
        {
            id: 'evolution',
            name: 'Evolution API',
            description: 'Open source, auto-hospedado',
            status: 'recommended',
            docs: 'https://doc.evolution-api.com'
        },
        {
            id: 'zapi',
            name: 'Z-API',
            description: 'Alternativa brasileira confiável',
            status: null,
            docs: 'https://developer.z-api.io'
        },
    ]

    return (
        <div className="animate-fade-in">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Integrações</h1>
                <p className="text-dark-400">Configure a conexão com seu provedor de WhatsApp</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Provider Selection */}
                <div className="card">
                    <h2 className="text-xl font-semibold text-white mb-6">Escolha o Provedor</h2>

                    <div className="space-y-3">
                        {providers.map((p) => (
                            <label
                                key={p.id}
                                className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all ${provider === p.id
                                        ? 'bg-primary-500/20 border-2 border-primary-500/50'
                                        : 'bg-dark-700/30 border-2 border-transparent hover:border-dark-600'
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="provider"
                                    value={p.id}
                                    checked={provider === p.id}
                                    onChange={(e) => setProvider(e.target.value)}
                                    className="hidden"
                                />
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${provider === p.id ? 'border-primary-500 bg-primary-500' : 'border-dark-400'
                                    }`}>
                                    {provider === p.id && <Check className="w-3 h-3 text-white" />}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-white font-medium">{p.name}</span>
                                        {p.status === 'popular' && (
                                            <span className="badge badge-info text-xs">Popular</span>
                                        )}
                                        {p.status === 'recommended' && (
                                            <span className="badge badge-success text-xs">Recomendado</span>
                                        )}
                                    </div>
                                    <p className="text-dark-400 text-sm mt-1">{p.description}</p>
                                    <a
                                        href={p.docs}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-primary-400 text-sm mt-2 hover:underline"
                                    >
                                        Ver documentação <ExternalLink className="w-3 h-3" />
                                    </a>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                {/* API Configuration */}
                <div className="space-y-6">
                    {/* API Key */}
                    <div className="card">
                        <h2 className="text-xl font-semibold text-white mb-4">Credenciais</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-dark-300 text-sm font-medium mb-2">
                                    API Key / Token
                                </label>
                                <input
                                    type="password"
                                    value={apiKey}
                                    onChange={(e) => setApiKey(e.target.value)}
                                    placeholder="Cole sua API Key aqui"
                                    className="input"
                                />
                            </div>

                            {provider === 'evolution' && (
                                <div>
                                    <label className="block text-dark-300 text-sm font-medium mb-2">
                                        URL da Instância
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="https://sua-instancia.com"
                                        className="input"
                                    />
                                </div>
                            )}

                            <button className="btn-primary w-full">
                                Salvar Credenciais
                            </button>
                        </div>
                    </div>

                    {/* Webhook URL */}
                    <div className="card">
                        <h2 className="text-xl font-semibold text-white mb-4">URL do Webhook</h2>
                        <p className="text-dark-400 text-sm mb-4">
                            Configure esta URL no painel do seu provedor para receber mensagens.
                        </p>

                        <div className="relative">
                            <input
                                type="text"
                                value={webhookUrl}
                                readOnly
                                className="input pr-12 font-mono text-sm"
                            />
                            <button
                                onClick={copyToClipboard}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-dark-600 rounded-lg transition-colors"
                            >
                                {copied ? (
                                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                                ) : (
                                    <Copy className="w-5 h-5 text-dark-400" />
                                )}
                            </button>
                        </div>

                        <div className="mt-4 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30 flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                            <p className="text-yellow-200 text-sm">
                                Lembre-se de substituir <code className="bg-dark-700 px-1 rounded">SEU_TENANT_ID</code> pelo seu ID real antes de configurar.
                            </p>
                        </div>
                    </div>

                    {/* Status */}
                    <div className="card">
                        <h2 className="text-xl font-semibold text-white mb-4">Status da Conexão</h2>

                        <div className="flex items-center gap-4 p-4 rounded-xl bg-dark-700/50">
                            <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                                <WifiOff className="w-6 h-6 text-red-400" />
                            </div>
                            <div>
                                <p className="text-white font-medium">Desconectado</p>
                                <p className="text-dark-400 text-sm">Configure suas credenciais para conectar</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
