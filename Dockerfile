FROM mcy93w/windowsservercore

# Configura el directorio de trabajo
WORKDIR C:\app

# Copia los archivos de dependencias
COPY package.json .

# Instala las dependencias
RUN pnpm install

# Copia el resto de los archivos
COPY . .

# Construye la aplicación
RUN pnpm run build

# Expone el puerto 3000
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["pnpm", "dev"]