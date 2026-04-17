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

# Only copy over the node_modules and code from the builder stage
COPY --from=builder /workspace /workspace

# Install browsers in the final image
RUN npx playwright install --with-deps chromium



# Environment variables
ENV CI=1
ENV UPLOAD_REPORT=false

CMD ["npx", "playwright", "test"]