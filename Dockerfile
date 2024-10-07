# Escolha a imagem base (Node.js)
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/

# Copia o package.json e o package-lock.json
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Instala o nodemon globalmente
RUN npm install -g nodemon

# Copia o código da aplicação para o container
COPY . .

# Exponha a porta em que o backend será executado
EXPOSE 3000

# Comando para rodar o servidor com nodemon
CMD ["nodemon", "index.js"]
