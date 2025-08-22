#!/bin/bash

# Быстрый старт для AWS сервера 13.61.2.249
# Использование: ./quick-start.sh

set -e

echo "🚀 Быстрый старт для AWS сервера 13.61.2.249"

# Проверяем подключение к серверу
echo "📡 Проверяем подключение к серверу..."
if ! ping -c 1 13.61.2.249 &> /dev/null; then
    echo "❌ Не удается подключиться к серверу 13.61.2.249"
    echo "Проверьте, что сервер запущен и доступен"
    exit 1
fi

echo "✅ Сервер доступен!"

# Инструкции для подключения
echo ""
echo "📋 Инструкции для деплоя:"
echo ""
echo "1. Подключитесь к серверу:"
echo "   ssh -i your-key.pem ec2-user@13.61.2.249"
echo ""
echo "2. Клонируйте проект:"
echo "   git clone https://github.com/your-username/party-astro.git"
echo "   cd party-astro"
echo ""
echo "3. Запустите настройку сервера:"
echo "   chmod +x aws-setup.sh"
echo "   ./aws-setup.sh"
echo ""
echo "4. После перезагрузки сервера, подключитесь снова и настройте переменные:"
echo "   cp env.prod.example .env"
echo "   nano .env  # Отредактируйте пароли и email"
echo ""
echo "5. Запустите деплой:"
echo "   chmod +x deploy.sh"
echo "   ./deploy.sh"
echo ""
echo "6. Откройте в браузере:"
echo "   https://ec2-13-61-2-249.eu-north-1.compute.amazonaws.com"
echo ""
echo "🔧 Полезные команды:"
echo "   # Просмотр логов"
echo "   docker-compose -f docker-compose.prod.yml logs -f"
echo ""
echo "   # Статус контейнеров"
echo "   docker-compose -f docker-compose.prod.yml ps"
echo ""
echo "   # Создание бэкапа"
echo "   chmod +x backup.sh"
echo "   ./backup.sh"
echo ""
echo "🌐 Ваш сервер: 13.61.2.249"
echo "🌐 AWS DNS: ec2-13-61-2-249.eu-north-1.compute.amazonaws.com"
echo "🌍 Регион: eu-north-1 (Стокгольм)"
