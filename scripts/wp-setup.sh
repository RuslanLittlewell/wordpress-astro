#!/usr/bin/env bash
set -euo pipefail
: "${WP_HOME:=http://localhost:8080}"
: "${WP_SITEURL:=$WP_HOME}"
: "${WP_ADMIN_USER:=admin}"
: "${WP_ADMIN_PASSWORD:=adminpass}"
: "${WP_ADMIN_EMAIL:=admin@example.com}"

echo "Installing/Configuring WordPress at $WP_HOME"

if ! wp core is-installed >/dev/null 2>&1; then
  wp core install \
    --url="$WP_HOME" \
    --title="Docker WP" \
    --admin_user="$WP_ADMIN_USER" \
    --admin_password="$WP_ADMIN_PASSWORD" \
    --admin_email="$WP_ADMIN_EMAIL" \
    --skip-email || true
fi

wp option update permalink_structure '/%postname%/' || true
wp rewrite structure '/%postname%/' --hard || true
wp rewrite flush --hard || true

# Create a hello post if none exist
if ! wp post list --post_type=post --fields=ID | grep -qE '^[0-9]+$'; then
  wp post create \
    --post_type=post \
    --post_status=publish \
    --post_title="Привет, мир" \
    --post_content="Проект готов. Это пост из WordPress REST." || true
fi
