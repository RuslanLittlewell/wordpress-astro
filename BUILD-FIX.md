# Исправление проблемы сборки фронтенда

## 🔍 Проблема
Ошибка при сборке фронтенда: `npm run build` завершается с кодом 1

## ✅ Исправления

### 1. Обновлен Dockerfile
- Убрана опция `--only=production` при установке зависимостей
- Добавлена переменная `NODE_ENV=production`
- Исправлена последовательность команд сборки

### 2. Обновлена конфигурация Astro
- Убрана опция `prefetch` из production конфигурации
- Добавлен правильный `site` URL
- Настроен `base: '/'`

### 3. Создан скрипт отладки
- `frontend/debug-build.sh` для диагностики проблем

## 🚀 Как исправить

### Вариант 1: Использовать обновленный Dockerfile
```bash
# В папке frontend
docker build -t frontend-test .
```

### Вариант 2: Локальная отладка
```bash
cd frontend
chmod +x debug-build.sh
./debug-build.sh
```

### Вариант 3: Простая сборка
```bash
cd frontend
npm ci
cp astro.config.prod.mjs astro.config.mjs
npm run build
```

## 🔧 Возможные причины ошибки

1. **Отсутствие devDependencies** - исправлено
2. **Проблемы с TypeScript** - проверьте tsconfig.json
3. **Проблемы с конфигурацией Astro** - исправлено
4. **Проблемы с путями** - проверьте алиасы в vite config

## 📋 Проверка

После исправления проверьте:
```bash
# Сборка работает
npm run build

# Файлы созданы
ls -la dist/

# Docker сборка работает
docker build -t frontend-test .
```

## 🆘 Если проблема остается

1. Проверьте логи сборки: `npm run build 2>&1 | tee build.log`
2. Запустите отладочный скрипт: `./debug-build.sh`
3. Проверьте версии зависимостей в package.json
4. Убедитесь, что все файлы на месте
