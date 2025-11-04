# 1️⃣ Imagen base de Node (ligera)
FROM node:22-alpine

# 2️⃣ Directorio de trabajo dentro del contenedor
WORKDIR /app

# 3️⃣ Copiar package.json y package-lock.json
COPY package*.json ./

# 4️⃣ Instalar dependencias
RUN npm install --production

# 5️⃣ Copiar el resto del proyecto
COPY . .

# 6️⃣ Exponer el puerto que usa tu servidor (ej: 3000)
EXPOSE 3000

# 7️⃣ Comando para arrancar la app
CMD ["node", "index.js"]
