# Проверка URL переменных для AWS сервера

## ✅ Обновленные файлы:

### 1. `docker-compose.prod.yml`
- **WP_HOME**: `https://ec2-13-61-2-249.eu-north-1.compute.amazonaws.com`
- **WP_SITEURL**: `https://ec2-13-61-2-249.eu-north-1.compute.amazonaws.com`
- **WP_CORS_ALLOWED_ORIGIN**: `https://ec2-13-61-2-249.eu-north-1.compute.amazonaws.com`
- **PUBLIC_WP_API_BASE**: `https://ec2-13-61-2-249.eu-north-1.compute.amazonaws.com/wp-json`
- **WP_API_INTERNAL_BASE**: `http://wordpress/wp-json` (внутренний)

### 2. `env.prod.example`
- **WP_HOME**: `https://ec2-13-61-2-249.eu-north-1.compute.amazonaws.com`
- **WP_SITEURL**: `https://ec2-13-61-2-249.eu-north-1.compute.amazonaws.com`
- **WP_CORS_ALLOWED_ORIGIN**: `https://ec2-13-61-2-249.eu-north-1.compute.amazonaws.com`
- **PUBLIC_WP_API_BASE**: `https://ec2-13-61-2-249.eu-north-1.compute.amazonaws.com/wp-json`

### 3. `Caddyfile.prod`
- **Основной домен**: `ec2-13-61-2-249.eu-north-1.compute.amazonaws.com`
- **IP адрес**: `13.61.2.249`
- **Fallback домен**: `your-domain.com` (для будущего использования)

### 4. `frontend/astro.config.prod.mjs`
- **site**: `https://ec2-13-61-2-249.eu-north-1.compute.amazonaws.com`
- **base**: `/`

## 🌐 Ваши адреса:
- **IP**: `13.61.2.249`
- **DNS**: `ec2-13-61-2-249.eu-north-1.compute.amazonaws.com`
- **Регион**: `eu-north-1` (Стокгольм)

## 🔧 Проверка перед деплоем:

1. **Убедитесь, что в .env файле установлены правильные пароли:**
   ```bash
   MYSQL_PASSWORD=your_secure_password
   MYSQL_ROOT_PASSWORD=your_secure_root_password
   WP_ADMIN_PASSWORD=your_secure_admin_password
   ```

2. **Проверьте email адреса:**
   ```bash
   WP_ADMIN_EMAIL=your-email@example.com
   ```

3. **Все URL теперь указывают на ваш AWS сервер**

## 🚀 Готово к деплою!

Все URL переменные обновлены и готовы для деплоя на ваш AWS сервер.
