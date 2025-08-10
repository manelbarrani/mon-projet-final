# Étape 1 : build Angular avec node
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npx ng build --configuration production --stats-json=false



# Étape 2 : serveur nginx pour servir l'app
FROM nginx:alpine

COPY --from=build /app/dist/gestion-produit /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
