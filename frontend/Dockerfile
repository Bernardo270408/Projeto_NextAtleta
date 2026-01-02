# --- STAGE 1: Build do React ---
FROM node:20-alpine AS build
# Diretório de trabalho do spot-connect-hub
WORKDIR /spot-connect-hub

# Copie package.json e package-lock.json do spot-connect-hub
COPY spot-connect-hub/package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante dos arquivos do spot-connect-hub
COPY spot-connect-hub/ ./

# Build de produção do React
RUN npm run build

# --- STAGE 2: Servir com serve ---
FROM node:20-alpine

# Instalar serve globalmente
RUN npm install -g serve

# Diretório de trabalho
WORKDIR /app

# Copiar build do React do stage anterior
COPY --from=build /spot-connect-hub/dist /app

# Porta padrão para o Railway/produção
EXPOSE 8080

# Comando para servir o spot-connect-hub
CMD ["serve", "-s", ".", "-l", "3000"]