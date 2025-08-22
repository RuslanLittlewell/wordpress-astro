#!/bin/bash

# Скрипт для создания бэкапов
# Использование: ./backup.sh

set -e

BACKUP_DIR="/home/ec2-user/backups"
DATE=$(date +%Y%m%d_%H%M%S)

echo "💾 Начинаем создание бэкапа..."

# Создаем директорию для бэкапов если её нет
mkdir -p $BACKUP_DIR

# Бэкап базы данных
echo "🗄️ Создаем бэкап базы данных..."
docker-compose -f docker-compose.prod.yml exec -T db mysqldump -u root -p${MYSQL_ROOT_PASSWORD:-root} wordpress > $BACKUP_DIR/db_backup_$DATE.sql

# Бэкап WordPress файлов
echo "📁 Создаем бэкап WordPress файлов..."
docker-compose -f docker-compose.prod.yml exec wordpress tar -czf /tmp/wp_backup_$DATE.tar.gz -C /var/www/html .
docker cp $(docker-compose -f docker-compose.prod.yml ps -q wordpress):/tmp/wp_backup_$DATE.tar.gz $BACKUP_DIR/

# Бэкап переменных окружения
echo "⚙️ Создаем бэкап конфигурации..."
cp .env $BACKUP_DIR/env_backup_$DATE

# Создаем архив всех бэкапов
echo "📦 Создаем архив бэкапов..."
cd $BACKUP_DIR
tar -czf full_backup_$DATE.tar.gz db_backup_$DATE.sql wp_backup_$DATE.tar.gz env_backup_$DATE

# Удаляем временные файлы
rm db_backup_$DATE.sql wp_backup_$DATE.tar.gz env_backup_$DATE

# Удаляем старые бэкапы (оставляем последние 7)
echo "🧹 Удаляем старые бэкапы..."
ls -t full_backup_*.tar.gz | tail -n +8 | xargs -r rm

echo "✅ Бэкап создан: $BACKUP_DIR/full_backup_$DATE.tar.gz"

# Показываем размер бэкапа
echo "📊 Размер бэкапа:"
du -h $BACKUP_DIR/full_backup_$DATE.tar.gz

# Показываем список всех бэкапов
echo "📋 Список всех бэкапов:"
ls -lh $BACKUP_DIR/full_backup_*.tar.gz
