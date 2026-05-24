# 1. AŞAMA: Derleme (Build)
FROM node:20-slim AS builder
WORKDIR /app

# Kök dizindeki kütüphane dosyalarını kopyala
COPY package*.json ./
COPY src ./src
COPY tsconfig*.json ./

# Bağımlılıkları kur ve derle
RUN npm install --legacy-peer-deps
RUN npm run build

# Örnek uygulamayı (examples) kopyala
COPY examples ./examples

# Örnek uygulamanın dizinine geç ve derle
WORKDIR /app/examples
RUN npm install --legacy-peer-deps
RUN npm run build

# 2. AŞAMA: Çalıştırma (Runner)
FROM node:20-slim AS runner
WORKDIR /app/examples

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

EXPOSE 3000

# Next.js standalone özelliği sayesinde ihtiyacımız olan her şeyi buraya topladı:
COPY --from=builder /app/examples/.next/standalone ./
COPY --from=builder /app/examples/.next/static ./.next/static

# Eğer examples içinde public klasörünüz varsa burayı açabilirsiniz:
# COPY --from=builder /app/examples/public ./public

# Standalone modunda artık "npm run start" yerine doğrudan node ile tetikliyoruz
CMD ["node", "server.js"]
