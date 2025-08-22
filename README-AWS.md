# Деплой на Amazon AWS (Linux 2023)

Это руководство поможет вам развернуть ваше приложение на Amazon AWS с использованием Amazon Linux 2023.

## 📋 Предварительные требования

1. **AWS аккаунт** с доступом к EC2
2. **Домен** (опционально, но рекомендуется)
3. **SSH ключ** для подключения к серверу

## 🚀 Пошаговый процесс деплоя

### 1. Создание EC2 инстанса

1. Войдите в AWS Console
2. Перейдите в EC2 Dashboard
3. Нажмите "Launch Instance"
4. Выберите "Amazon Linux 2023" (AMI)
5. Выберите тип инстанса (рекомендуется t3.medium или больше)
6. Настройте Security Group:
   - SSH (22) - для вашего IP
   - HTTP (80) - для всех
   - HTTPS (443) - для всех
7. Запустите инстанс

### 2. Подключение к серверу

```bash
ssh -i your-key.pem ec2-user@13.61.2.249
# или
ssh -i your-key.pem ec2-user@ec2-13-61-2-249.eu-north-1.compute.amazonaws.com
```

### 3. Первоначальная настройка сервера

```bash
# Клонируйте ваш проект
git clone https://github.com/your-username/party-astro.git
cd party-astro

# Запустите скрипт настройки
chmod +x aws-setup.sh
./aws-setup.sh
```

**Примечание:** Сервер перезагрузится после выполнения скрипта.

### 4. Настройка переменных окружения

```bash
# Подключитесь к серверу снова после перезагрузки
ssh -i your-key.pem ec2-user@your-server-ip
cd party-astro

# Скопируйте пример переменных окружения
cp env.prod.example .env

# Отредактируйте файл .env
nano .env
```

**Важные настройки в .env:**
- Домен уже настроен на ваш AWS DNS: `ec2-13-61-2-249.eu-north-1.compute.amazonaws.com`
- Установите надежные пароли для базы данных
- Настройте email адреса
- Когда получите свой домен, замените AWS DNS на ваш домен

### 5. Запуск приложения

```bash
# Запустите скрипт деплоя
chmod +x deploy.sh
./deploy.sh
```

### 6. Настройка домена (опционально)

1. В AWS Route 53 создайте hosted zone для вашего домена
2. Добавьте A-запись, указывающую на ваш EC2 инстанс (13.61.2.249)
3. Обновите .env файл с правильным доменом
4. Обновите Caddyfile.prod, заменив AWS DNS на ваш домен
5. Перезапустите приложение: `./deploy.sh`

## 🔧 Управление приложением

### Просмотр логов
```bash
# Все сервисы
docker-compose -f docker-compose.prod.yml logs -f

# Конкретный сервис
docker-compose -f docker-compose.prod.yml logs -f wordpress
docker-compose -f docker-compose.prod.yml logs -f frontend
docker-compose -f docker-compose.prod.yml logs -f caddy
```

### Остановка приложения
```bash
docker-compose -f docker-compose.prod.yml down
```

### Перезапуск приложения
```bash
docker-compose -f docker-compose.prod.yml restart
```

### Обновление приложения
```bash
git pull
./deploy.sh
```

## 📊 Мониторинг

### Проверка статуса контейнеров
```bash
docker-compose -f docker-compose.prod.yml ps
```

### Использование ресурсов
```bash
docker stats
htop
```

### Проверка логов Caddy
```bash
tail -f /var/log/caddy/access.log
```

## 🔒 Безопасность

### Рекомендации:
1. **Регулярно обновляйте систему:**
   ```bash
   sudo yum update -y
   ```

2. **Используйте надежные пароли** в .env файле

3. **Настройте SSL сертификаты** (Caddy делает это автоматически)

4. **Ограничьте доступ к SSH** только с вашего IP

5. **Регулярно делайте бэкапы:**
   ```bash
   # Бэкап базы данных
   docker-compose -f docker-compose.prod.yml exec db mysqldump -u root -p wordpress > backup.sql
   
   # Бэкап WordPress файлов
   docker-compose -f docker-compose.prod.yml exec wordpress tar -czf /tmp/wp-backup.tar.gz /var/www/html
   ```

## 🚨 Устранение неполадок

### Проблема: Приложение не запускается
```bash
# Проверьте логи
docker-compose -f docker-compose.prod.yml logs

# Проверьте статус контейнеров
docker-compose -f docker-compose.prod.yml ps
```

### Проблема: База данных не подключается
```bash
# Проверьте переменные окружения
cat .env

# Проверьте логи базы данных
docker-compose -f docker-compose.prod.yml logs db
```

### Проблема: SSL сертификат не работает
```bash
# Проверьте логи Caddy
docker-compose -f docker-compose.prod.yml logs caddy

# Убедитесь, что домен правильно настроен
nslookup your-domain.com
```

## 📞 Поддержка

Если у вас возникли проблемы:
1. Проверьте логи: `docker-compose -f docker-compose.prod.yml logs`
2. Убедитесь, что все переменные окружения настроены правильно
3. Проверьте, что порты 80 и 443 открыты в Security Group

## 🔄 Автоматическое обновление

Для автоматического обновления приложения создайте cron задачу:

```bash
# Откройте crontab
crontab -e

# Добавьте строку для ежедневного обновления в 2:00
0 2 * * * cd /home/ec2-user/party-astro && git pull && ./deploy.sh >> /var/log/deploy.log 2>&1
```
