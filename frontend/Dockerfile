# Stage 1: Builder
FROM node:20 AS builder

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install --production

# Stage 2: Final
FROM node:20-slim

WORKDIR /app

COPY --from=builder /app .

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]