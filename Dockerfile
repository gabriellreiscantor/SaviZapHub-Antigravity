FROM node:18-alpine

# Cria diretório de trabalho
WORKDIR /usr/src/app

# Copia arquivos de dependência
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante dos arquivos do projeto
COPY . .

# Comando para iniciar o bot
CMD [ "npm", "start" ]
