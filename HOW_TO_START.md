# 🚀 PROJECT NEXUS - START INSTRUCTIONS

## IMPORTANT: Run these commands in the CORRECT directories!

### Start Backend (Terminal 1):
```powershell
cd C:\Users\Ananth\Documents\GitHub\HTF25-Team-255\backend
npm run start:dev
```
**Keep this terminal open! Don't close it or press Ctrl+C**

### Start Frontend (Terminal 2 - NEW TERMINAL):
```powershell
cd C:\Users\Ananth\Documents\GitHub\HTF25-Team-255\frontend
npm run dev
```
**Keep this terminal open too!**

### Then open in browser:
http://localhost:3000

---

## OR Use the Batch Files (EASIER):

1. Double-click: `start-backend.bat`
2. Wait 10 seconds
3. Double-click: `start-frontend.bat`
4. Wait 5 seconds
5. Open: http://localhost:3000

---

## What You'll See:

✅ **Login/Register Page**
- Beautiful UI with backend status indicator
- Create account or login
- Real authentication with JWT

✅ **Dashboard (After Login)**
- 4 stat cards (Projects, Tasks, Meetings, Team)
- Active projects with progress bars
- Interactive task board
- Meeting calendar
- GitHub & Google Docs integrations
- Weekly progress reports

---

## Backend is at:
- API: http://localhost:4000/api
- Docs: http://localhost:4000/api/docs
- Health: http://localhost:4000/api/health

## The Issue You're Having:
You're running `npm run start:dev` from the ROOT directory. 
You MUST run it from the `backend` folder!

**CORRECT**: `cd backend` THEN `npm run start:dev`
**WRONG**: Running from root folder ❌
