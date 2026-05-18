FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci 

COPY . .

RUN npm run build

FROM node:18-alpine
WORKDIR /app

RUN adduser -D abdurahman

COPY --from=builder /app .

RUN chown -R abdurahman:abdurahman /app
USER abdurahman

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

CMD ["npm", "start"]