# Usar imagen base de Node.js
FROM node:18-alpine

# Establecer el directorio de trabajo
WORKDIR /backend

# Copiar archivos de dependencias
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto del backend
EXPOSE 5000

# Comando de inicio
CMD ["node", "server.js"]
