# 🚀 NeuraCMS - Modern Headless CMS with AI Support

![NeuraCMS](https://img.shields.io/badge/Next.js-15.2-blue?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-7-green?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?style=for-the-badge)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**NeuraCMS** — современная, быстрая и мощная headless CMS, разработанная с использованием Next.js 15, MongoDB и встроенным ИИ. Идеальна для автоматизированного управления контентом, SEO-оптимизации и использования в качестве API для фронтенд приложений.

> 📚 **Для полной интерактивной документации API откройте**: http://localhost:3001/api-docs

## ✨ Основные возможности

### 🎨 Dashboard & UI
- **Интуитивный dashboard** - удобное управление статьями и пользователями
- **Современный дизайн** - Sky/Cyan градиент с плавными анимациями
- **Полнофункциональный редактор** - TipTap WYSIWYG с Markdown поддержкой
- **Mobile-first** - отлично работает на всех устройствах

### 📝 Управление контентом
- ✅ CRUD операции для статей (Create, Read, Update, Delete)
- ✅ Draft & Published статусы для контроля опубликованности
- ✅ SEO-оптимизированные мета данные (title, description, slug)
- ✅ Система тегов и категоризации
- ✅ Поддержка изображений (featured image + gallery)
- ✅ Полнотекстовый поиск по статьям

### 👥 Пользователи и доступ
- ✅ Email-based регистрация и аутентификация
- ✅ Role-based access control (Admin/User)
- ✅ Безопасное хеширование паролей (bcrypt)
- ✅ Session management через NextAuth.js
- ✅ Административная панель управления пользователями

### 🤖 AI Интеграция
- 📋 Автоматическая генерация SEO-оптимизированных статей
- 🖼️ Интеграция с Unsplash для поиска изображений
- 📊 Поддержка Ollama, OpenAI и Grok APIs
- ✅ Генерация метаданных, тегов и slug автоматически

### 📡 REST API (Headless)
- ✅ Полнофункциональный REST API для всех операций
- ✅ Пагинация и фильтрация
- ✅ Поддержка поиска, фильтрации по тегам
- ✅ Используется на любом фронтенде (React, Vue, Angular и т.д.)

### ⚡ Production-Ready Features
- 🚀 **Rate Limiting** - защита от abuse (100-200 req/min)
- 💾 **Response Caching** - 10-минутный кеш для быстрого ответа (X-Cache headers)
- 🔍 **Full-Text Search** - полнотекстовый поиск с русским языком
- 📊 **Structured Logging** - цветной вывод логов запросов и ошибок
- 📋 **API Documentation** - интерактивный Swagger/OpenAPI интерфейс
- 🔐 **Security** - CSRF protection, input validation, JWT sessions

## 🛠️ Технологический стек

### Frontend & Backend
- **Next.js 15.2** - App Router, SSR, API Routes, Static Generation
- **React 18.3** - Hooks, Components
- **TypeScript 5.5** - Type safety

### Database & ORM
- **MongoDB 5.9** - документная база данных
- **Mongoose 7.0** - ODM для типизированного доступа к данным

### UI & Styles
- **TailwindCSS 3.4** - Utility-first CSS framework
- **Radix UI** - Accessible components (Dialog, Dropdown, Checkbox, Select)
- **Lucide React** - Beautiful icons

### Editor
- **TipTap 3.23** - WYSIWYG editor с поддержкой:
  - Markdown formatting
  - Bold, Italic, Underline, Strikethrough
  - Headings (h1-h6)
  - Lists (ordered, unordered)
  - Code blocks
  - Links
  - Highlights

### Auth & Security
- **NextAuth 4.24** - Session-based authentication
- **bcrypt 5.1** - Password hashing
- **JWT** - Token-based session

### Validation & Utils
- **Zod 3.23** - Runtime schema validation
- **swagger-ui-react** - Interactive API documentation
- **swagger-jsdoc** - OpenAPI spec generation

## 📦 Установка и запуск

### Требования
- Node.js 18+
- npm или yarn
- MongoDB (локально, Docker или MongoDB Atlas)

### Быстрый старт

1. **Клонировать репозиторий**
```bash
git clone <repository-url>
cd diplomka
```

2. **Установить зависимости**
```bash
npm install
```

3. **Создать файл `.env.local`**
```bash
cp .env.example .env.local
```

4. **Настроить переменные окружения** (`.env.local`)
```env
# Database
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/neuracms
MONGODB_URI=${MONGO_URI}

# NextAuth
NEXTAUTH_SECRET=your-secret-key-here-minimum-32-chars-long
NEXTAUTH_URL=http://localhost:3001

# Logging
LOG_LEVEL=info  # debug, info, warn, error

# Optional: AI & Images
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=qwen2.5:7b
UNSPLASH_ACCESS_KEY=your-unsplash-api-key
OPENAI_API_KEY=your-openai-api-key

# Build
SKIP_DB_DURING_BUILD=1
```

5. **Запустить dev сервер**
```bash
npm run dev
```

6. **Открыть в браузере**
```
http://localhost:3001
```

## 📚 Использование

### 🔐 Первый запуск - Регистрация

1. Перейти на http://localhost:3001/register
2. Создать аккаунт с email и паролем
3. Вы будете автоматически залогированы
4. Перенаправлены на `/dashboard`

### 📖 API Документация

**Интерактивный Swagger интерфейс:**
```
http://localhost:3001/api-docs
```

**Raw OpenAPI spec (JSON):**
```
http://localhost:3001/api/swagger
```

### ✍️ Создание статьи

1. **Через Dashboard:**
   - Перейти: Dashboard → Новая статья
   - Заполнить форму
   - Выбрать статус (Draft или Published)
   - Кликнуть "Создать"

2. **Через API (Admin only):**
```bash
curl -X POST http://localhost:3001/api/admin/ai/generate \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "Machine Learning Basics",
    "keywords": "ml, ai, machine learning",
    "length": "medium",
    "tone": "professional"
  }'
```

### 🔍 Просмотр статей

1. **Публичная страница:**
   - http://localhost:3001/posts - список всех статей
   - http://localhost:3001/posts/[slug] - отдельная статья

2. **Через API:**
```bash
# Список статей
curl "http://localhost:3001/api/posts?page=1&pageSize=10"

# Одна статья
curl "http://localhost:3001/api/posts/my-article-slug"

# Поиск
curl "http://localhost:3001/api/search?q=typescript"
```

## 🔌 API Endpoints

### 📖 Полная документация

Все endpoints полностью задокументированы на **http://localhost:3001/api-docs**

### Примеры основных endpoints

#### GET /api/posts (Публичный)
Получить список опубликованных статей

```bash
curl "http://localhost:3001/api/posts?page=1&pageSize=10&search=typescript&tag=programming"
```

**Query параметры:**
- `page` - номер страницы (по умолчанию: 1)
- `pageSize` - количество элементов (1-50, по умолчанию: 10)
- `search` - текст поиска
- `tag` - фильтр по тегу

#### GET /api/posts/{slug} (Публичный)
Получить одну статью

```bash
curl "http://localhost:3001/api/posts/typescript-guide"
```

#### GET /api/search (Публичный)
Полнотекстовый поиск

```bash
curl "http://localhost:3001/api/search?q=react+hooks"
```

#### POST /api/admin/ai/generate (Admin)
Генерировать статью с AI

```bash
curl -X POST http://localhost:3001/api/admin/ai/generate \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "How to Learn TypeScript",
    "keywords": "typescript, learning, guide",
    "length": "medium",
    "tone": "professional",
    "audience": "Developers"
  }'
```

**Параметры:**
- `topic` ✅ (обязателен) - тема статьи, мин 5 символов
- `keywords` (опционально) - ключевые слова через запятую
- `length` ✅ (обязателен) - `short`, `medium` или `long`
- `tone` ✅ (обязателен) - `professional`, `casual`, `academic`, `friendly`
- `audience` (опционально) - целевая аудитория

#### GET /api/admin/users (Admin)
Получить список всех пользователей

```bash
curl "http://localhost:3001/api/admin/users"
```

### Rate Limiting (Защита API)

| Endpoint | Лимит | Окно | Возвращает при превышении |
|----------|-------|------|---|
| `/api/posts` | 100 | 1 мин | 429 Too Many Requests |
| `/api/posts/[slug]` | 200 | 1 мин | 429 Too Many Requests |
| `/api/search` | 30 | 1 мин | 429 Too Many Requests |
| `/api/admin/ai/generate` | 5 | 1 час | 429 Too Many Requests |

**Response Headers на превышение лимита:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1624521600
Retry-After: 45
```

## ⚡ Performance

### Caching (Response Times)

| Endpoint | TTL | Проверка |
|----------|-----|---------|
| `/api/posts` | 10 мин | Header `X-Cache: HIT/MISS` |
| `/api/posts/[slug]` | 10 мин | Header `X-Cache: HIT/MISS` |
| `/api/search` | 5 мин | Header `X-Cache: HIT/MISS` |

**Пример:**
```bash
curl -i http://localhost:3001/api/posts

# В ответе увидите:
# X-Cache: HIT          (из кеша - быстро)
# X-Cache: MISS         (из БД - первый раз)
```

### Full-Text Search

Использует MongoDB text indexes:
- Поддержка русского языка
- Взвешивание полей (title > tags > content)
- Быстрый поиск вместо regex

### Structured Logging

```bash
# Запустить с debug логами
LOG_LEVEL=debug npm run dev

# Пример логов:
# [2024-05-21T10:30:45.123Z] INFO  [GET] /api/posts
# [2024-05-21T10:30:46.456Z] WARN  Slow API response: /api/posts { duration: 1050 }
```

## 🔐 Безопасность

### Реализованные меры
- ✅ **Password Hashing** - bcrypt с 10 rounds
- ✅ **JWT Sessions** - через NextAuth.js
- ✅ **CSRF Protection** - встроена в Next.js
- ✅ **Role-Based Access** - Admin/User роли
- ✅ **Input Validation** - Zod schemas
- ✅ **Rate Limiting** - защита от DDoS
- ✅ **Secure Headers** - Content-Security-Policy и т.д.
- ✅ **Error Handling** - безопасные сообщения об ошибках

### Для Production

- [ ] Использовать HTTPS (SSL/TLS)
- [ ] Включить хранилище переменных окружения (например, AWS Secrets Manager)
- [ ] Настроить CORS правильно
- [ ] Использовать reverse proxy (nginx)
- [ ] Добавить monitoring и logging в продакшене
- [ ] Регулярно обновлять зависимости
- [ ] Настроить backups БД
- [ ] Использовать managed MongoDB (Atlas)

## 📁 Структура проекта

```
diplomka/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── auth/                # Authentication endpoints
│   │   ├── admin/               # Admin-only endpoints
│   │   ├── posts/               # Public API for articles
│   │   ├── search/              # Full-text search
│   │   ├── swagger/             # OpenAPI spec
│   │   └── swagger/
│   ├── api-docs/                # Swagger UI page
│   ├── dashboard/               # Protected admin routes
│   ├── posts/                   # Public article pages
│   ├── signin/                  # Login page
│   ├── register/                # Registration page
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── components/                   # React components
│   ├── dashboard/               # Dashboard UI components
│   ├── site/                    # Public site components
│   ├── article/                 # Article components
│   ├── ui/                      # Reusable UI (Button, Input, etc)
│   ├── providers/               # Context providers
│   └── editor/                  # TipTap editor
├── lib/                         # Utilities & services
│   ├── auth.ts                 # NextAuth configuration
│   ├── mongodb.ts              # MongoDB client
│   ├── mongoose.ts             # Mongoose connection
│   ├── ai.ts                   # AI generation (Ollama)
│   ├── cache.ts                # In-memory caching
│   ├── rateLimit.ts            # Rate limiting
│   ├── logger.ts               # Structured logging
│   ├── errorHandler.ts         # Error handling utilities
│   ├── swagger.ts              # OpenAPI specification
│   ├── validators.ts           # Zod validation schemas
│   └── utils.ts                # Helper functions
├── models/                      # Mongoose schemas
│   └── Article.ts              # Article schema
├── styles/                      # Global CSS
├── middleware.ts                # Next.js middleware
├── package.json
├── tsconfig.json
├── next.config.mjs
├── tailwind.config.ts
└── README.md
```

## 🚀 Deployment

### Vercel (рекомендуется для Next.js)

1. Залить код на GitHub
2. Импортировать проект на Vercel
3. Настроить Environment Variables
4. Deploy автоматически при push

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
docker build -t neuracms .
docker run -p 3000:3000 -e MONGO_URI=... neuracms
```

### Self-hosted (VPS)

```bash
# SSH в VPS
ssh user@your-vps.com

# Клонировать и запустить
git clone <repo-url>
cd diplomka
npm install
npm run build
npm start

# Использовать PM2 для background процесса
npm install -g pm2
pm2 start "npm start" --name "neuracms"
pm2 startup
pm2 save
```

## 📊 Мониторинг и логи

```bash
# Debug режим (все логи)
LOG_LEVEL=debug npm run dev

# Production режим (только важные)
LOG_LEVEL=info npm start

# Смотреть логи PM2
pm2 logs neuracms
```

## 🤝 Contributing

Это учебный проект. Если хотите улучшить:

1. Fork репозиторий
2. Создать feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 Лицензия

MIT License - смотреть [LICENSE](LICENSE) файл для деталей

## 📞 Контакты

- 📧 Email: your-email@example.com
- 🐙 GitHub: [@yourname](https://github.com/yourname)
- 🌐 Website: [your-website.com](https://your-website.com)

---

**Made with ❤️ using Next.js, MongoDB, and TypeScript**
