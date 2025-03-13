# Sử dụng Node.js 20
FROM node:20 AS dev-stage

WORKDIR /app

COPY package*.json ./

# Cài đặt dependencies
# RUN npm install

COPY . .

# Mở port
EXPOSE 3000

# Chạy ứng dụng ở chế độ dev
# CMD ["npm", "run", "start:dev"]
