# 1. AŞAMA: Derleme (Build)
FROM node:20-slim AS builder
WORKDIR /app

# Kök dizindeki kütüphane dosyalarını kopyala
COPY package*.json ./
COPY src ./src
COPY tsconfig*.json ./

# Üst dizindeki ana kütüphane bağımlılıklarını kur ve derle
RUN npm install --legacy-peer-deps
RUN npm run build

# Örnek uygulamayı (examples) kopyala
COPY examples ./examples

# Uygulama dizinine geç, bağımlılıkları kur ve derle
WORKDIR /app/examples
RUN npm install --legacy-peer-deps
RUN npm run build

# 2. AŞAMA: Çalıştırma (Runner)
FROM node:20-slim AS runner
WORKDIR /app/examples

# Bağımlılık zincirinin ve .next klasörünün kaybolmaması için 
# builder aşamasındaki tüm çalışma alanını (/app) aynen kopyalıyoruz
COPY --from=builder /app /app

ENV NODE_ENV=production
EXPOSE 3000

# Terminalde yerelde çalıştırdığınız komutla ayağa kaldırıyoruz
CMD ["npm", "run", "start"]
