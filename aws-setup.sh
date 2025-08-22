#!/bin/bash

# Скрипт первоначальной настройки Amazon AWS (Linux 2023)
# Использование: ./aws-setup.sh

set -e

echo "🔧 Начинаем настройку AWS сервера..."

# Обновляем систему
echo "📦 Обновляем систему..."
sudo yum update -y

# Устанавливаем Docker
echo "🐳 Устанавливаем Docker..."
sudo yum install -y docker
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -a -G docker ec2-user

# Устанавливаем Docker Compose
echo "📋 Устанавливаем Docker Compose..."
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Устанавливаем дополнительные утилиты
echo "🛠️ Устанавливаем дополнительные утилиты..."
sudo yum install -y git htop tree

# Настраиваем firewall (если используется)
echo "🔥 Настраиваем firewall..."
sudo yum install -y firewalld
sudo systemctl start firewalld
sudo systemctl enable firewalld
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --permanent --add-service=ssh
sudo firewall-cmd --reload

# Создаем директории для логов
echo "📁 Создаем директории для логов..."
sudo mkdir -p /var/log/caddy
sudo chown ec2-user:ec2-user /var/log/caddy

# Настраиваем swap файл (если нужно)
echo "💾 Настраиваем swap файл..."
if [ ! -f /swapfile ]; then
    sudo dd if=/dev/zero of=/swapfile bs=1M count=2048
    sudo chmod 600 /swapfile
    sudo mkswap /swapfile
    sudo swapon /swapfile
    echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
fi

# Настраиваем лимиты системы
echo "⚙️ Настраиваем системные лимиты..."
echo 'ec2-user soft nofile 65536' | sudo tee -a /etc/security/limits.conf
echo 'ec2-user hard nofile 65536' | sudo tee -a /etc/security/limits.conf

# Перезагружаемся для применения изменений
echo "🔄 Перезагружаемся для применения изменений..."
echo "⚠️  Сервер будет перезагружен через 10 секунд. Подключитесь снова после перезагрузки."
sleep 10
sudo reboot
