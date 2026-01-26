FROM node:24-slim AS builder

RUN apt-get update && apt-get install -y bash openssl
WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build


# ================== RUNTIME ==================
FROM node:24-slim

# INSTALL FFMPEG HERE (THIS IS THE FIX)
RUN apt-get update && apt-get install -y bash openssl

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

EXPOSE 5000

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]
