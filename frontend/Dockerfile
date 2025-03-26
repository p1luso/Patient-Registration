# Usar imagen base de Node.js
FROM node:18-alpine

# Establecer el directorio de trabajo
WORKDIR /frontend

# Copiar archivos de dependencias
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto del frontend
EXPOSE 3000

# Comando de inicio
CMD ["npm", "start"]
