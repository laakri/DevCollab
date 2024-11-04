FROM node:18-alpine as builder

WORKDIR /app

ENV VITE_API_URL=http://209.38.243.102

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Use nginx to serve static files
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]