
# Use Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Set environment variables
ENV HOST=0.0.0.0
ENV PORT=3000
ENV WDS_SOCKET_PORT=0

# Expose port
EXPOSE 3000

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Start the development server with host flag
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0", "--port", "3000"]
