# STAGE 1: The Builder
# Use the official Microsoft Playwright image as our foundation
FROM mcr.microsoft.com/playwright:v1.52.0-jammy AS builder

WORKDIR /workspace

# Copy dependency files first for caching
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the project
COPY . .

# STAGE 2: The Runner
FROM mcr.microsoft.com/playwright:v1.52.0-jammy

WORKDIR /workspace

# Copy node_modules first
COPY --from=builder /workspace/node_modules /workspace/node_modules

# Copy everything else
COPY --from=builder /workspace /workspace

# Verify node_modules exists
RUN ls -la /workspace/node_modules/@playwright/test || (echo "node_modules missing!" && exit 1)


# Install browsers in the final image
RUN npx playwright install --with-deps chromium


# Environment variables
ENV CI=1
ENV UPLOAD_REPORT=false

CMD ["npx", "playwright", "test"]