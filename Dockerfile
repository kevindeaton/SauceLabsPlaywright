# STAGE 1: The Builder
# Use the official Microsoft Playwright image as our foundation
FROM mcr.microsoft.com/playwright:v1.52.0-jammy AS builder

WORKDIR /app

# Copy dependency files first (for better caching)
COPY package*.json ./

# Install dependencies using 'npm ci' (clean install for CI)
RUN npm ci

# Copy the rest of your automation code
COPY . .

# STAGE 2: The Runner (Execution environment)
FROM mcr.microsoft.com/playwright:v1.52.0-jammy

WORKDIR /app

# Only copy over the node_modules and code from the builder stage
COPY --from=builder /app /app

# Set environment variables
ENV CI=1
ENV UPLOAD_REPORT=false 

# This command is just a placeholder; Cloud Build will override this
CMD ["npx", "playwright", "test"]