# Justfile for APSU GIS Center Website

# List available recipes
default:
    @just --list

# Start the development server
run:
    pnpm dev

# Build the production site
build:
    pnpm build

# Preview the built site locally
preview:
    pnpm preview

# Run the broken link checker (requires lychee installed or use npx)
check-links:
    npx lycheeverse/lychee-action@v1.8.0 --verbose --no-progress './dist/**/*.html'

# Install dependencies
install:
    pnpm install --frozen-lockfile

# Validate pinned Node/pnpm versions
check-toolchain:
    pnpm run check:toolchain

# Run full verification (Build + Link Check)
verify: check-toolchain build check-links
