FROM node:20-alpine AS builder

WORKDIR /app

# Install bun
RUN npm install -g bun

# Copy package files (support both bun and pnpm lock files)
COPY package.json ./
COPY bun.lockb* ./
COPY pnpm-lock.yaml* ./

# Install dependencies with bun
RUN bun install --frozen-lockfile || bun install

# Copy source code
COPY . .

# Build Next.js
RUN bun run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install bun
RUN npm install -g bun

# Copy package files
COPY package.json ./
COPY bun.lockb* ./
COPY pnpm-lock.yaml* ./

# Install production dependencies only
RUN bun install --prod --frozen-lockfile || bun install --prod

# Copy built app from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["bun", "start"]
