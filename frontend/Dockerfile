FROM node:18-alpine as builder

WORKDIR /app

ENV VITE_API_URL=http://209.38.243.102

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Use nginx to serve static files
FROM nginx:alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy static files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD sed -i 's/listen\(.*\)80;/listen 3000;/' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'