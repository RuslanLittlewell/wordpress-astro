#!/bin/bash

# Скрипт деплоя для Amazon AWS (Linux 2023)
# Использование: ./deploy.sh

set -e

echo "🚀 Начинаем деплой на AWS..."

# Проверяем наличие Docker и Docker Compose
if ! command -v docker &> /dev/null; then
    echo "❌ Docker не установлен. Установите Docker сначала."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose не установлен. Установите Docker Compose сначала."
    exit 1
fi

# Проверяем наличие .env файла
if [ ! -f .env ]; then
    echo "⚠️  Файл .env не найден. Копируем пример..."
    cp env.prod.example .env
    echo "📝 Отредактируйте файл .env с вашими настройками и запустите скрипт снова."
    exit 1
fi

# Останавливаем существующие контейнеры
echo "🛑 Останавливаем существующие контейнеры..."
docker-compose -f docker-compose.prod.yml down --remove-orphans

# Удаляем старые образы (опционально)
echo "🧹 Очищаем старые образы..."
docker system prune -f

# Собираем и запускаем production контейнеры
echo "🔨 Собираем production образы..."
docker-compose -f docker-compose.prod.yml build --no-cache

echo "🚀 Запускаем production контейнеры..."
docker-compose -f docker-compose.prod.yml up -d

# Ждем запуска сервисов
echo "⏳ Ждем запуска сервисов..."
sleep 30

# Проверяем статус контейнеров
echo "📊 Проверяем статус контейнеров..."
docker-compose -f docker-compose.prod.yml ps

# Проверяем логи
echo "📋 Логи последних 20 строк:"
docker-compose -f docker-compose.prod.yml logs --tail=20

echo "✅ Деплой завершен!"
echo "🌐 Ваше приложение должно быть доступно по адресу: https://ec2-13-61-2-249.eu-north-1.compute.amazonaws.com"
echo "📝 Для просмотра логов используйте: docker-compose -f docker-compose.prod.yml logs -f"
