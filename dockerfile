FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN apk add --no-cache python3 make g++
RUN npm install

COPY tsconfig*.json ./
COPY src ./src
RUN npm run build


FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN apk add --no-cache python3 make g++
RUN npm install --only=production

COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/main.js"]
