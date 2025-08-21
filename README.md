# WP (админка) + Astro/React фронт + Tailwind — Docker

## Быстрый старт
1. Установите Docker и Docker Compose.
2. Создайте `.env` в корне (см. пример) — отредактируйте пароли по желанию.
3. Запуск:
   ```bash
   docker compose up -d --build
   ```
4. Откройте:
   - WordPress: http://localhost:8080
   - Фронт (Astro dev): http://localhost:4321
   - phpMyAdmin: http://localhost:8081 (логин под пользователем/паролем БД из `.env`)

## Дефолтные учётные данные админа WP
- Логин: `admin`
- Пароль: `adminpass`
- E-mail: `admin@example.com`

(Можно поменять перед первым запуском через переменные: `WP_ADMIN_USER`, `WP_ADMIN_PASSWORD`, `WP_ADMIN_EMAIL`.)

## Переменные окружения (корень `.env`)
- `MYSQL_DATABASE`, `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_ROOT_PASSWORD`
- `WP_HOME`, `WP_SITEURL`
- `WP_CORS_ALLOWED_ORIGIN` — домен фронта (по умолчанию `http://localhost:4321`).
- `PUBLIC_WP_API_BASE` — базовый URL REST для фронта (по умолчанию `http://localhost:8080/wp-json`).

## Что внутри
- WordPress в контейнере Apache + MariaDB.
- MU-плагин для CORS только на REST.
- Авто-инициализация WP (пермалинки + привет-пост) через wp-cli.
- Astro 4 + React 18 + Tailwind 3, TypeScript включён.
- Компонент `PostList.tsx` тянет посты через REST.
- **phpMyAdmin** для управления БД (порт 8081).

## Прод-сборка фронта
Для предпросмотра статики после билда:
```bash
docker compose build frontend
docker compose run --service-ports frontend npm run preview -- --host --port 4321
```
