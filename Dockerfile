# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install --only=production  # Install only production dependencies

# Copy application files (excluding unnecessary ones via .dockerignore)
COPY . .

# Expose port 3000
EXPOSE 3000
    
# Use non-root user for security
RUN useradd -m appuser && chown -R appuser /app
USER appuser

# Start the application
CMD ["node", "app.js"]
