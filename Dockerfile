FROM node:16.20.2-bullseye

# Configura el directorio de trabajo
WORKDIR C:\app

# Copia los archivos de dependencias
COPY package.json .

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos
COPY . .

# Construye la aplicación
RUN npm run build

# Expone el puerto 3000
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["pnpm", "dev"]