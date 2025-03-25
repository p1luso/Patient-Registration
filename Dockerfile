# Usar la imagen oficial de Node.js
FROM node:18-alpine

# Establecer el directorio de trabajo
WORKDIR /backend
COPY . .
CMD ["node", "server.js"]

# Copiar archivos necesarios
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto de la API
EXPOSE 5000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
