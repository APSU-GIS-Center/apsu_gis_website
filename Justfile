# Justfile for APSU GIS Center Website

# List available recipes
default:
    @just --list

# Start the development server
dev:
    npm run dev

# Build the production site
build:
    npm run build

# Preview the built site locally
preview:
    npm run preview

# Run the broken link checker (requires lychee installed or use npx)
check-links:
    npx lycheeverse/lychee-action@v1.8.0 --verbose --no-progress './dist/**/*.html'

# Install dependencies
install:
    npm install

# Run full verification (Build + Link Check)
verify: build check-links
