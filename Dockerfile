# ===== Builder =====
FROM node:20 AS builder
WORKDIR /src

COPY package*.json ./
RUN npm ci

COPY prisma ./prisma
RUN npx prisma generate

COPY . .
RUN npm run build

# ===== Runtime =====
FROM node:20-alpine
WORKDIR /src

COPY --from=builder /src/node_modules ./node_modules
COPY --from=builder /src/dist ./dist
COPY --from=builder /src/prisma ./prisma
COPY --from=builder /src/package.json ./

EXPOSE 3000
CMD ["npm", "start"]
