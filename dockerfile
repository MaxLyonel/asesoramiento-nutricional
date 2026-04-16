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

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodeuser -u 1001

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist

RUN chown -R nodeuser:nodejs /app

USER nodeuser

EXPOSE 3000
CMD ["node", "dist/main.js"]
