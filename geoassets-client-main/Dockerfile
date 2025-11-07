# Etapa 1: build
FROM node:22-alpine AS build

# Directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el proyecto
COPY . .

# Construir la app
RUN npx vite build

# Etapa 2: producción con Nginx
FROM nginx:alpine

# Borrar contenido por defecto
RUN rm -rf /usr/share/nginx/html/*

# Copiar dist desde la etapa de build
COPY --from=build /app/dist /usr/share/nginx/html

# Cnfigurar rutas nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto 80
EXPOSE 80

# Comando para correr Nginx
CMD ["nginx", "-g", "daemon off;"]