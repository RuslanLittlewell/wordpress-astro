#!/bin/bash

# Скрипт для отладки сборки фронтенда
echo "🔍 Отладка сборки фронтенда..."

# Проверяем наличие файлов
echo "📁 Проверяем наличие файлов..."
ls -la

echo "📦 Проверяем package.json..."
cat package.json

echo "⚙️ Проверяем конфигурацию Astro..."
cat astro.config.mjs

echo "🔧 Проверяем production конфигурацию..."
cat astro.config.prod.mjs

echo "📋 Проверяем зависимости..."
npm list --depth=0

echo "🧹 Очищаем кэш..."
rm -rf node_modules/.cache
rm -rf .astro

echo "📦 Переустанавливаем зависимости..."
npm ci

echo "🔨 Пробуем собрать проект..."
npm run build

echo "✅ Сборка завершена!"
