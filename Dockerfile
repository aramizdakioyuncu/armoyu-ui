# 1. AŞAMA: Derleme (Build)
FROM node:20-slim AS builder
WORKDIR /app

# Kök dizindeki kütüphane dosyalarını kopyala
COPY package*.json ./
COPY src ./src
COPY tsconfig*.json ./

# Kütüphane bağımlılıklarını kur ve derle
RUN npm install --legacy-peer-deps
RUN npm run build

# Örnek uygulamayı (examples) kopyala
COPY examples ./examples

# Uygulama dizinine geç ve bağımlılıkları kur
WORKDIR /app/examples
RUN npm install --legacy-peer-deps
RUN npm run build

# 2. AŞAMA: Çalıştırma (Runner)
FROM node:20-slim AS runner
WORKDIR /app

# Sadece çalışması için gereken dosyaları builder aşamasından kopyala
COPY --from=builder /app/examples/.next ./examples/.next
COPY --from=builder /app/examples/node_modules ./examples/node_modules
COPY --from=builder /app/examples/package.json ./examples/package.json
# Eğer ileride public klasörü eklerseniz burayı açabilirsiniz:
# COPY --from=builder /app/examples/public ./examples/public

# Çalışma dizini
WORKDIR /app/examples

ENV NODE_ENV=production
EXPOSE 3000

# Uygulamayı başlat
CMD ["npm", "run", "start"]
