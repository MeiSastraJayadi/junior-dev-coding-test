# junior-dev-coding-test

## 🔗 Demo
Live Demo: **https://junior-dev-coding-test.vercel.app**

## 📦 Requirements
Ensure your environment meets the following requirements:

- **Node.js v22.12**
- **PostgreSQL**

---

## 🛠️ Installation Steps

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/MeiSastraJayadi/junior-dev-coding-test.git
cd junior-dev-coding-test
```

### 2️⃣ Copy Environment File
```bash
cp .env.example .env
```

### 3️⃣ Configure Environment Variables
Edit the `.env` file and set your values:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/dbname"
API_BASE_URL="http://localhost:3001"
```

Make sure the URLs match your database and API server configuration.

---

### 4️⃣ Install Dependencies
```bash
npm install
```

---

### 5️⃣ Run Database Migration
```bash
npx prisma migrate dev --name init
```

---

### 6️⃣ Generate Prisma Client
```bash
npx prisma generate
```

---

### 7️⃣ Run Frontend (Vue) and Backend (Express API) Together
This command runs both the Vue client and the Express API server:

```bash
npm run dev
```

---

### 8️⃣ Run Only the API Server
Use this if you want to run the Express API server only:

```bash
npm run dev:server
```

## 🎁 Bonus Features

### ⭐ 1. Live Search with Debouncing  

### ⭐ 2. Update & Delete Record Features  

### ⭐ 3. Dialog Form & Notification Messages  
