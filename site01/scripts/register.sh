#!/bin/bash

# Load environment variables
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

# Check required environment variables
if [ -z "$DOMAIN" ] || [ -z "$LETSENCRYPT_EMAIL" ]; then
    echo "Error: DOMAIN and LETSENCRYPT_EMAIL must be set in .env file"
    exit 1
fi

echo "### Initializing Let's Encrypt for $DOMAIN..."

# Create certificate volume if it doesn't exist
docker volume create ${ECOSYSTEM:-portal}certs
docker volume create ${ECOSYSTEM:-portal}challenges

echo "### Starting nginx for initial certificate generation..."

# Start nginx without SSL first (for initial certificate generation)
# Nginx server_name directive handles space-separated lists of domains
cat > ./config/nginx/portal-temp.conf << EOF
server {
    listen 80;
    server_name ${DOMAIN};
    
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }
    
    location / {
        return 200 'OK';
        add_header Content-Type text/plain;
    }
}
EOF

# Start temporary nginx container
docker run -d --rm \
    --name ${ECOSYSTEM:-portal}-nginx-temp \
    -p 80:80 \
    -v "$PWD/config/nginx/portal-temp.conf:/etc/nginx/conf.d/default.conf" \
    -v ${ECOSYSTEM:-portal}challenges:/var/www/certbot \
    nginx:latest

echo "### Requesting certificate for $DOMAIN..."

# Build domain arguments for certbot
domain_args=""
for d in $DOMAIN; do
  domain_args="$domain_args -d $d"
done

# Request certificate
docker run --rm \
    -v ${ECOSYSTEM:-portal}certs:/etc/letsencrypt \
    -v ${ECOSYSTEM:-portal}challenges:/var/www/certbot \
    certbot/certbot:latest \
    certonly --webroot \
    --webroot-path=/var/www/certbot \
    --email "$LETSENCRYPT_EMAIL" \
    --agree-tos \
    --no-eff-email \
    --expand \
    --keep-until-expiring \
    $domain_args

if [ $? -eq 0 ]; then
    echo "### Certificate obtained or updated successfully!"
    # Stop temporary nginx
    docker stop ${ECOSYSTEM:-portal}-nginx-temp
    # Clean up temp config
    rm ./config/nginx/portal-temp.conf
    echo "### You can now start your services with docker-compose up -d"
else
    echo "### Certificate generation/update failed!"
    docker stop ${ECOSYSTEM:-portal}-nginx-temp
    rm ./config/nginx/portal-temp.conf
    exit 1
fi
