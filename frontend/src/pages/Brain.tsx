import { useState } from 'react'
import { Save, Sparkles, MessageSquare, Clock, Smile, HelpCircle, ShoppingBag } from 'lucide-react'

export default function Brain() {
    const [prompt, setPrompt] = useState(`# PERSONA

Você é a **Sofia**, assistente virtual da nossa empresa.

Você é simpática, profissional e sempre busca ajudar o cliente da melhor forma possível.

---

# SOBRE A EMPRESA

Adicione aqui informações sobre sua empresa, produtos e serviços.

---

# TOM DE VOZ

- Seja amigável e profissional
- Use linguagem clara e acessível
- Use emojis com moderação

---

# REGRAS

## O que você PODE fazer:
✅ Responder dúvidas sobre serviços e preços
✅ Fornecer informações sobre a empresa
✅ Agendar reuniões

## O que você NÃO PODE fazer:
❌ Fazer orçamentos definitivos
❌ Prometer prazos sem análise
`)

    const [settings, setSettings] = useState({
        responseMode: 'humanized',
        useEmojis: true,
        typingDelay: 1.5,
        messageBreak: true,
        maxMessages: 4,
    })

    return (
        <div className="animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Cérebro do Bot</h1>
                    <p className="text-dark-400">Configure a personalidade e comportamento do seu assistente</p>
                </div>
                <button className="btn-primary flex items-center gap-2">
                    <Save className="w-5 h-5" />
                    Salvar Alterações
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Prompt Principal */}
                <div className="lg:col-span-2 card">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-white">Prompt Principal</h2>
                            <p className="text-dark-400 text-sm">Define a personalidade do bot</p>
                        </div>
                    </div>

                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="w-full h-96 bg-dark-800 border border-dark-600 rounded-xl p-4 text-dark-100 
                       font-mono text-sm resize-none focus:outline-none focus:border-primary-500 
                       focus:ring-1 focus:ring-primary-500/30 transition-all"
                        placeholder="Escreva o prompt do seu bot aqui..."
                    />

                    <div className="flex items-center justify-between mt-4 text-sm text-dark-400">
                        <span>{prompt.length} caracteres</span>
                        <span>Suporta Markdown</span>
                    </div>
                </div>

                {/* Configurações */}
                <div className="space-y-6">
                    {/* Modo de Resposta */}
                    <div className="card">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                                <MessageSquare className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-white">Modo de Resposta</h3>
                        </div>

                        <div className="space-y-3">
                            {[
                                { id: 'humanized', label: 'Humanizado', desc: 'Natural e amigável' },
                                { id: 'objective', label: 'Objetivo', desc: 'Direto e conciso' },
                                { id: 'commercial', label: 'Comercial', desc: 'Foco em vendas' },
                            ].map((mode) => (
                                <label
                                    key={mode.id}
                                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${settings.responseMode === mode.id
                                            ? 'bg-primary-500/20 border border-primary-500/50'
                                            : 'bg-dark-700/50 border border-transparent hover:border-dark-600'
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="responseMode"
                                        value={mode.id}
                                        checked={settings.responseMode === mode.id}
                                        onChange={(e) => setSettings({ ...settings, responseMode: e.target.value })}
                                        className="hidden"
                                    />
                                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${settings.responseMode === mode.id ? 'border-primary-500' : 'border-dark-400'
                                        }`}>
                                        {settings.responseMode === mode.id && (
                                            <div className="w-2 h-2 rounded-full bg-primary-500" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">{mode.label}</p>
                                        <p className="text-dark-400 text-sm">{mode.desc}</p>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Outras Configurações */}
                    <div className="card">
                        <h3 className="text-lg font-semibold text-white mb-4">Outras Configurações</h3>

                        <div className="space-y-4">
                            {/* Emojis */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Smile className="w-5 h-5 text-yellow-400" />
                                    <span className="text-dark-200">Usar Emojis</span>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.useEmojis}
                                        onChange={(e) => setSettings({ ...settings, useEmojis: e.target.checked })}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-dark-600 peer-focus:ring-2 peer-focus:ring-primary-500/50 rounded-full 
                                peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] 
                                after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all 
                                peer-checked:bg-primary-500" />
                                </label>
                            </div>

                            {/* Delay de Digitação */}
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <Clock className="w-5 h-5 text-blue-400" />
                                    <span className="text-dark-200">Delay de Digitação</span>
                                    <span className="text-primary-400 font-medium">{settings.typingDelay}s</span>
                                </div>
                                <input
                                    type="range"
                                    min="0.5"
                                    max="5"
                                    step="0.5"
                                    value={settings.typingDelay}
                                    onChange={(e) => setSettings({ ...settings, typingDelay: parseFloat(e.target.value) })}
                                    className="w-full h-2 bg-dark-600 rounded-lg appearance-none cursor-pointer accent-primary-500"
                                />
                            </div>

                            {/* Máx. Mensagens */}
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <MessageSquare className="w-5 h-5 text-purple-400" />
                                    <span className="text-dark-200">Máx. Mensagens por Resposta</span>
                                    <span className="text-primary-400 font-medium">{settings.maxMessages}</span>
                                </div>
                                <input
                                    type="range"
                                    min="1"
                                    max="6"
                                    step="1"
                                    value={settings.maxMessages}
                                    onChange={(e) => setSettings({ ...settings, maxMessages: parseInt(e.target.value) })}
                                    className="w-full h-2 bg-dark-600 rounded-lg appearance-none cursor-pointer accent-primary-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Links Rápidos */}
                    <div className="card">
                        <h3 className="text-lg font-semibold text-white mb-4">Base de Conhecimento</h3>
                        <div className="space-y-2">
                            <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-dark-700/50 hover:bg-dark-700 transition-colors text-left">
                                <HelpCircle className="w-5 h-5 text-cyan-400" />
                                <div>
                                    <p className="text-white font-medium">FAQs</p>
                                    <p className="text-dark-400 text-sm">12 perguntas cadastradas</p>
                                </div>
                            </button>
                            <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-dark-700/50 hover:bg-dark-700 transition-colors text-left">
                                <ShoppingBag className="w-5 h-5 text-orange-400" />
                                <div>
                                    <p className="text-white font-medium">Produtos/Serviços</p>
                                    <p className="text-dark-400 text-sm">8 itens cadastrados</p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
