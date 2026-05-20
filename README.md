# 🚀 NeuraCMS - Modern Headless CMS with AI Support

![NeuraCMS](https://img.shields.io/badge/Next.js-15.2-blue?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-7-green?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?style=for-the-badge)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=for-the-badge)

NeuraCMS - это современная, быстрая и мощная headless CMS, разработанная с использованием Next.js, MongoDB и AI. Она предоставляет удобный интерфейс управления контентом, SEO-оптимизацию и поддержку интеграции с AI-инструментами.

## ✨ Основные возможности

### 🎨 Интерфейс управления
- **Интуитивный dashboard** - простое управление контентом и статьями
- **Современный дизайн** - Sky/Cyan градиент с мягкими тенями
- **Отзывчивая верстка** - работает на всех устройствах (mobile-first)
- **TipTap редактор** - полнофункциональный Markdown-редактор с форматированием

### 📝 Управление контентом
- ✅ Создание, редактирование и удаление статей
- ✅ Draft & Published статусы
- ✅ SEO-оптимизированные мета данные (title, description, slug)
- ✅ Теги и категории
- ✅ Избранные изображения (featured images)
- ✅ Расширенные изображения (galleries)
- ✅ Поиск и фильтрация по статьям

### 👥 Аутентификация и управление пользователями
- ✅ Email-based регистрация и вход
- ✅ NextAuth для управления сессиями
- ✅ Ролевое управление доступом (Admin/User)
- ✅ Администраторская панель управления пользователями

### 🤖 AI Интеграция (готовая архитектура)
- 📋 Структура для AI-генерации контента
- 🖼️ Интеграция Unsplash для поиска изображений
- 📊 OpenAI/Grok API поддержка

### 📡 Headless API
- ✅ REST API для получения статей (`/api/posts`)
- ✅ Фильтрация по тегам и поиск
- ✅ Пагинация
- ✅ Для использования на фронтенде (Next.js, React, Vue, и т.д.)

## 🛠️ Технологический стек

### Backend & Frontend
- **Next.js 15.2** - App Router, SSR, API Routes
- **React 18.3** - компоненты с hooks
- **TypeScript 5.5** - типизация

### Базы данных
- **MongoDB 5.9** - база данных
- **Mongoose 7.0** - ODM для MongoDB

### UI & Стили
- **TailwindCSS 3.4** - утилит-first CSS framework
- **Radix UI** - доступные компоненты (Dialog, Dropdown, Label, Select, Checkbox)
- **Lucide React** - иконки

### Редактирование контента
- **TipTap 3.23** - WYSIWYG редактор
  - Поддержка Markdown
  - Bold, Italic, Headings
  - Lists
  - Links
  - Highlights

### Аутентификация
- **NextAuth 4.24** - авторизация
- **bcrypt 5.1** - хеширование паролей

### Валидация
- **Zod 3.23** - валидация схем

## 📦 Установка

### Требования
- Node.js 18+
- npm или yarn
- MongoDB (локально или облачный сервис)

### Шаги установки

1. **Клонировать репозиторий**
```bash
git clone <repository-url>
cd diplomka
```

2. **Установить зависимости**
```bash
npm install
```

3. **Настроить переменные окружения**
Создать файл `.env.local` (или скопировать из `.env.example`):
```env
# MongoDB
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/neuracms

# NextAuth
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_DEBUG=true

# AI Features (опционально)
OPENAI_API_KEY=your-openai-key
UNSPLASH_ACCESS_KEY=your-unsplash-key

# Build
SKIP_DB_DURING_BUILD=1
```

4. **Запустить разработку**
```bash
npm run dev
```

5. **Открыть в браузере**
```
http://localhost:3001
```

## 📚 Использование

### Регистрация и вход

1. Перейти на http://localhost:3001/register
2. Создать аккаунт с email и паролем
3. Вы будете автоматически залогированы
4. Перенаправлены на dashboard

### Создание статьи

1. Перейти в **Dashboard** → **Новая статья**
2. Заполнить форму:
   - **Заголовок** - основной заголовок
   - **Slug** - URL-friendly идентификатор
   - **Meta заголовок** - SEO meta title
   - **Meta описание** - SEO description (150-160 символов)
   - **Краткое описание** - excerpt для списка
   - **Контент** - основной текст (используйте TipTap редактор)
   - **Теги** - через запятую
   - **Изображение** - URL избранного изображения
3. Выбрать статус: **Draft** или **Published**
4. Кликнуть **Создать статью**

### Просмотр опубликованных статей

- Перейти на **http://localhost:3001/posts**
- Просмотреть все опубликованные статьи
- Кликнуть на статью для полного просмотра

### Управление пользователями (Admin)

1. Перейти в **Dashboard** → **Пользователи**
2. Создать нового пользователя с ролью
3. Редактировать роли или отключать пользователей

## 🔌 API Endpoints

### Публичные endpoints

#### GET /api/posts
Получить список опубликованных статей

**Query параметры:**
- `search` - поиск по заголовку, описанию
- `tag` - фильтр по тегу
- `page` - номер страницы (по умолчанию 1)
- `pageSize` - размер страницы (по умолчанию 10, макс 50)

**Пример:**
```bash
curl "http://localhost:3001/api/posts?search=ai&page=1&pageSize=10"
```

#### GET /api/posts/[slug]
Получить отдельную статью по slug

```bash
curl "http://localhost:3001/api/posts/my-article-slug"
```

### Защищенные endpoints (Admin)

#### POST /api/admin/users
Создать нового пользователя

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secure-password",
  "role": "user"
}
```

#### PATCH /api/admin/users/[id]
Обновить пользователя

**Body:**
```json
{
  "role": "admin",
  "disabled": false
}
```

#### DELETE /api/admin/users/[id]
Удалить пользователя

#### POST /api/admin/ai/generate
Генерировать контент с помощью AI (требует OpenAI API key)

**Body:**
```json
{
  "topic": "How to Learn TypeScript",
  "keywords": "typescript,learning,guide",
  "length": "1500 words",
  "tone": "Professional",
  "audience": "Developers"
}
```

## 📁 Структура проекта

```
diplomka/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── auth/                # NextAuth
│   │   ├── admin/               # Admin endpoints
│   │   └── posts/               # Public API
│   ├── dashboard/               # Protected routes
│   ├── posts/                   # Public pages
│   ├── profile/                 # User profile
│   ├── signin/                  # Auth pages
│   └── register/
├── components/                   # React components
│   ├── dashboard/               # Dashboard components
│   ├── ui/                      # UI components (Button, Input, etc)
│   └── article/                 # Article components
├── lib/                         # Utilities
│   ├── auth.ts                 # NextAuth config
│   ├── mongodb.ts              # MongoDB client
│   ├── mongoose.ts             # Mongoose connection
│   ├── ai.ts                   # AI utilities
│   └── validators.ts           # Zod schemas
├── models/                      # Mongoose schemas
│   └── Article.ts
├── styles/                      # Global styles
├── middleware.ts                # Next.js middleware
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

## 🔐 Безопасность

### Реализованные меры
- ✅ Password hashing с bcrypt (10 rounds)
- ✅ JWT sessions через NextAuth
- ✅ CSRF protection встроена в Next.js
- ✅ Role-based access control (RBAC)
- ✅ Environment variables для секретов
- ✅ Sanitized user inputs

### Рекомендации для production
- [ ] Включить HTTPS
- [ ] Использовать более сложные пароли
- [ ] Регулярно обновлять зависимости
- [ ] Добавить rate limiting
- [ ] Использовать environment-specific конфиги
- [ ] Настроить CORS если нужно
- [ ] Добавить логирование и мониторинг

## 🚀 Deployment

### Vercel (рекомендуется)

1. Залить код на GitHub
2. Импортировать проект на Vercel
3. Настроить environment variables
4. Deploy автоматически при push

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📊 Performance

- ⚡ **Реневалидация** - ISR (incremental static regeneration) для статей
- 🗂️ **Кэширование** - оптимизированные запросы к MongoDB
- 📸 **Изображения** - поддержка Unsplash URL с оптимизацией
- 🔍 **Индексы** - правильно настроены на `slug` поле

## 🔧 Разработка

### Локальное тестирование

```bash
# Запустить с debug логами
NEXTAUTH_DEBUG=true npm run dev

# Запустить linter
npm run lint

# Build для production
npm run build
npm start
```

### Тестирование MongoDB

```bash
# Используем встроенные скрипты
node test-mongo.js
node test-mongo-nonsrv.js
```

## 📖 Документация компонентов

### TipTap Editor
- Встроен в форму создания/редактирования статьи
- Поддерживает: Bold, Italic, H2, Lists, Links, Highlights
- Сохраняет в JSON формате для хранения

### ArticleTable
- Отображает список статей в dashboard
- Поддерживает поиск по названию и slug
- Empty state когда нет статей

### EmptyState
- Универсальный компонент для пустых состояний
- Кастомизируемые иконки и действия

## 🐛 Известные проблемы и TODO

- [ ] AI интеграция требует активации OpenAI API key
- [ ] Unsplash интеграция требует API key
- [ ] Нужны unit тесты
- [ ] Нужны e2e тесты (Cypress/Playwright)
- [ ] Улучшить обработку ошибок
- [ ] Добавить webhooks для интеграций
- [ ] Добавить версионирование контента

## 📞 Поддержка

Для вопросов и issues создавайте issues в репозитории.

## 📄 Лицензия

MIT

---

**Создано с ❤️ для управления контентом**
