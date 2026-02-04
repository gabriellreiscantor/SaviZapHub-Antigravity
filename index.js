const { makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const pino = require('pino');
const qrcode = require('qrcode-terminal');

async function connectToWhatsApp() {
    // Define o estado de autenticação para salvar a sessão (não pedir QR code toda vez)
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');

    const sock = makeWASocket({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: true, // Isso garante que o QR Code apareça no log do Container/Codespaces
        auth: state,
    });

    // Escuta atualizações de conexão
    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;

        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('Conexão fechada devido a ', lastDisconnect.error, ', reconectando ', shouldReconnect);
            // Reconecta se não tiver sido deslogado
            if (shouldReconnect) {
                connectToWhatsApp();
            }
        } else if (connection === 'open') {
            console.log('Conexão aberta com sucesso!');
        }
    });

    // Salva as credenciais sempre que houver atualização
    sock.ev.on('creds.update', saveCreds);

    // Exemplo de resposta a mensagens
    sock.ev.on('messages.upsert', async ({ messages }) => {
        const m = messages[0];

        if (!m.message) return; // Se não tem mensagem, ignora

        // Verifica se é uma mensagem de texto de outro usuário (não do próprio bot)
        if (!m.key.fromMe && m.message.conversation) {
            console.log('Recebi uma mensagem:', m.message.conversation);

            // Exemplo de resposta simples
            if (m.message.conversation.toLowerCase() === 'oi') {
                await sock.sendMessage(m.key.remoteJid, { text: 'Olá! Sou um bot rodando na nuvem!' });
            }
        }
    });
}

// Inicia o bot
connectToWhatsApp();
