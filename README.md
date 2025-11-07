# Project Nexus - Collaborative Workspace Platform# HTF25-Team-255



> **Multi-tenant SaaS platform for collaborative workspace management** - Complete project management solution with workspaces, projects, tasks, calendar, and real-time collaboration.## GitHub submission guide



## 🚀 **ONE-COMMAND SETUP** (For Panelists/Judges)In this Readme, you will find a guide on how to fork this Repository, add files to it, and make a pull request to contribute your changes.



### **Prerequisites**<details open>

- Node.js 18+ installed ([Download](https://nodejs.org/))<summary><h3>1. Login to your GitHub Account</h3></summary>

- That's it! No Docker, no PostgreSQL, no Redis needed!<br>

<p>Go to <a href="https://github.com">github.com</a> to log in.</p>

### **Quick Start**<ul>

   <li>Open the <a href="https://github.com/cbitosc/HTF25-Team-255">current repo</a> in a new tab.</li>

```bash   <li>Perform all operations in the newly opened tab, and follow the current tab for instructions.</li>

# 1. Clone the repository</ul>

git clone https://github.com/TheAnanth/HTF25-Team-255.git</details>

cd HTF25-Team-255

<details open>

# 2. Setup Backend (installs dependencies, creates database, starts server)<summary><h3>2. Fork the Repository</h3></summary>

cd backend<br>

npm install<p align="center">

npx prisma generate  <img src="fork.jpeg" alt="Fork the Repository" height="300">

npx prisma migrate dev --name init</p>

npm run start:dev<ul>

 <li>In the newly opened tab, on the top-right corner, click on <b>Fork</b>.</li>

# Backend runs on http://localhost:4000 <li>Enter the <b>Repository Name</b> as <b>HTF25-Team-255</b>.</li>

# API Docs: http://localhost:4000/api/docs <li>Then click <b>Create Fork</b>, leaving all other fields as default.</li>

``` <li>After a few moments, you can view your forked repo.</li>

</ul>

**In a NEW terminal:**</details>

```bash

# 3. Setup Frontend<details open>

cd frontend<summary><h3>3. Clone your Repository</h3></summary>

npm install<br>

npm run dev<ul>

 <li>Click on <b>Code</b> and copy the <b>web URL</b> of your forked repository.</li>

# Frontend runs on http://localhost:3000 <li>Open terminal on your local machine.</li>

``` <li>Run this command to clone the repo:</li>

<pre><code>git clone https://github.com/your-username/HTF25-Team-255.git</code></pre>

---</ul>

</details>

## ✅ **What's Working**

<details open>

- ✅ **SQLite Database** - Auto-created, zero config<summary><h3>4. Adding files to the Repository</h3></summary>

- ✅ **REST API** with full CRUD<br>

- ✅ **Swagger Docs** at `/api/docs`<ul>

- ✅ **Authentication** - JWT with email/password <li>While doing it for the first time, create a new branch for your changes:</li>

- ✅ **User Management**<pre><code>git checkout -b branch-name</code></pre>

- ✅ **Workspaces** - Multi-tenant <li>Add files or modify existing ones.</li>

- ✅ **Projects** - Full CRUD <li>Stage your changes:</li>

- ✅ **Tasks** - Assignment, comments, status<pre><code>git add .</code></pre>

- ✅ **Calendar** - Events & meetings <li>Commit your changes:</li>

- ✅ **Real-time** - WebSocket support<pre><code>git commit -m "Descriptive commit message"</code></pre>

- ✅ **Database Persistence** - SQLite <li>Push your branch to your fork:</li>

<pre><code>git push origin branch-name</code></pre>

---</ul>

</details>

## 🔑 **Quick API Test**

<details open>

### **Swagger UI (Easiest)**<summary><h3>5. Create a Pull Request</h3></summary>

Open: `http://localhost:4000/api/docs`<br>

<ul>

### **Manual Test** <li>Click on the <b>Contribute</b> button in your fork and choose <b>Open Pull Request</b>.</li>

```bash <li>Leave all fields as default, then click <b>Create Pull Request</b>.</li>

# Register <li>Wait a few moments; your PR is now submitted.</li>

curl -X POST http://localhost:4000/api/auth/register \</ul>

  -H "Content-Type: application/json" \</details>

  -d '{"email":"test@test.com","password":"pass123","firstName":"John","lastName":"Doe"}'

## Thanks for participating!

# Login  
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"pass123"}'
```

---

## 📊 **Database**
- **Type:** SQLite (file-based)
- **Location:** `backend/prisma/dev.db`
- **View GUI:** Run `npx prisma studio` in backend folder

---

## 🛠️ **Tech Stack**
- **Backend:** NestJS 10, TypeScript, Prisma, SQLite, JWT, Argon2
- **Frontend:** Next.js 14, React 18, Tailwind CSS
- **Real-time:** Socket.io

---

## 📱 **URLs**
- Backend API: http://localhost:4000
- API Docs: http://localhost:4000/api/docs  
- Frontend: http://localhost:3000
- Database GUI: http://localhost:5555 (after `npx prisma studio`)

---

## 🎓 **HTF 2025 Submission**
Complete full-stack SaaS platform with zero-config setup, production code structure, and comprehensive API docs.

**Made with ❤️ for HTF 2025**
