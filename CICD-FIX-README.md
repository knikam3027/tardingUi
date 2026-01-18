# Simple CI/CD Setup Guide

## What I've Fixed

Your CI/CD pipeline had several issues that I've corrected:

1. **GitHub Actions Workflow** (`.github/workflows/deploy.yml`)
   - Added proper git pull before deployment
   - Fixed directory navigation issues
   - Added better error handling and logging
   - Improved health checks and container status reporting

2. **Deployment Scripts**
   - **`deploy-to-vps.sh`**: Simplified manual deployment script
   - **`auto-deploy.sh`**: New automatic deployment script for webhooks/cron jobs

3. **Docker Compose** (`docker-compose.yml`)
   - Added health checks
   - Added logging configuration
   - Added missing environment variables

## How It Works Now

### Automatic Deployment (GitHub Actions)
When you push code to `main` or `master` branch:
1. Code is linted and tested
2. Docker image is built and pushed to GitHub Container Registry
3. VPS pulls latest code from git
4. Runs: `docker-compose down`
5. Runs: `docker-compose build --no-cache` 
6. Runs: `docker-compose up -d`
7. Performs health checks

### Manual Deployment
Run on your VPS: `./deploy-to-vps.sh`

### Automatic Deployment (via webhook/cron)
Run on your VPS: `./auto-deploy.sh`

## Required GitHub Secrets

Make sure you have these secrets set in your GitHub repository settings:

- `VPS_HOST`: Your VPS IP address
- `VPS_USERNAME`: SSH username (usually `root`)
- `VPS_SSH_KEY`: Your private SSH key for the VPS

## VPS Setup Requirements

1. Your project should be cloned in one of these directories:
   - `/opt/trading-platform`
   - `/root/trading-platform` 
   - `~/trading-platform`

2. Make scripts executable:
```bash
chmod +x deploy-to-vps.sh
chmod +x auto-deploy.sh
```

3. For automatic deployments via git webhook, you can set up a simple webhook listener or use a cron job:
```bash
# Add to crontab for every 5 minutes check
*/5 * * * * cd /opt/trading-platform && ./auto-deploy.sh >/dev/null 2>&1
```

## Testing the Fix

1. **Test manual deployment:**
```bash
ssh your-vps-ip
cd /opt/trading-platform  # or your project directory
./deploy-to-vps.sh
```

2. **Test automatic deployment:**
```bash
git add .
git commit -m "test deployment"
git push origin main
```

Your deployment should now work with the simple flow you wanted:
- Push to git → Auto pull on VPS → `docker-compose down` → `docker-compose build --no-cache` → `docker-compose up -d`

## Logs and Debugging

- View container logs: `docker-compose logs -f`
- View deployment logs: `tail -f /var/log/trading-ui-deploy.log` (for auto-deploy.sh)
- Check container status: `docker-compose ps`

## Your Domain Setup

Your application will be available at:
- **Production**: https://cbamoon.com
- **Direct Access**: http://YOUR-VPS-IP:3000

The nginx configuration is already set up for SSL with your domain.

Let me know if you encounter any issues!