FROM node:18-alpine

WORKDIR /app

ENV VITE_API_URL=http://209.38.243.102

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "preview", "--", "--port", "3000", "--host"]