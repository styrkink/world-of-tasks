FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy Prisma schema first for caching
COPY prisma ./prisma/

# Generate Prisma client
RUN npx prisma generate

# Copy source
COPY . .

# Expose port
EXPOSE 4000

# Development mode with hot reload
CMD ["npm", "run", "start:dev"]
