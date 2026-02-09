# 🚀 Portfolio CMS - Complete Setup Guide

## Current Status ✅

- ✅ Backend running on `http://localhost:3000`
- ✅ Frontend running on `http://localhost:8000`
- ✅ MongoDB connected
- ✅ Admin account created (username: `aayush`, password: `admin123`)

---

## 📝 Your Credentials

### CMS Admin Login (for admin.html)
- **Username:** `aayush`
- **Password:** `admin123`
- **URL:** http://localhost:8000/admin.html

### MongoDB (database connection)
- **Username:** `Aayush`
- **Password:** `Aezakmie123` ⚠️ **CHANGE THIS NOW**
- **Connection String:** In `backend/.env`

---

## 🔐 Step 1: Change MongoDB Password (IMPORTANT!)

1. Go to https://cloud.mongodb.com
2. Click **"Database Access"** (left sidebar)
3. Find user **"Aayush"** → click **"EDIT"**
4. Click **"Edit Password"**
5. Set a NEW strong password (example: `MyPortfolio2026!Secure`)
6. Click **"Update User"**
7. Copy your new password

### Update .env file:
```bash
cd "/Users/baba/Personal website /backend"
nano .env
```

Change this line:
```
MONGO_URI=mongodb+srv://Aayush:YOUR_NEW_PASSWORD@cluster0.hvplvvu.mongodb.net/portfolio-cms?appName=Cluster0
```

Save (Ctrl+O, Enter, Ctrl+X), then restart backend:
```bash
npm start
```

---

## 🔑 Step 2: Change CMS Admin Password

1. Go to http://localhost:8000/admin.html
2. Log in with:
   - Username: `aayush`
   - Password: `admin123`
3. Click **"Change Password"** button (top right)
4. Enter:
   - Current password: `admin123`
   - New password: (your choice, 8+ characters)
   - Confirm new password
5. Click **"Save"**

---

## 🎉 You're All Set! Here's What You Can Do:

### Write Blog Posts
1. Open http://localhost:8000/admin.html
2. Log in
3. Write your post (title, content, category, tags)
4. Click **"Publish"** or **"Save Draft"**
5. View live at http://localhost:8000/posts.html

### Edit/Delete Posts
- All posts shown at the bottom of admin dashboard
- Click **"Edit"** to modify
- Click **"Delete"** to remove

---

## 🌐 Deploy to Production

### Step 1: Deploy Backend to Railway

1. Go to https://railway.app → Sign up/Login
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Connect your GitHub account
4. Select your repository: `Anjaniputra15.github.io`
5. Railway will detect the Node.js app in `/backend`
6. Set **Root Directory** to `/backend`
7. Add environment variables:
   - `MONGO_URI` = your MongoDB connection string
   - `JWT_SECRET` = `ap_portfolio_super_secret_jwt_key_2026_hvplvvu`
   - `ALLOWED_ORIGIN` = `https://your-site.pages.dev`
   - `PORT` = `3000`
8. Deploy! You'll get a URL like `https://your-app.railway.app`

### Step 2: Update Frontend API URLs

In **admin.html** and **posts.html**, change:
```javascript
const API = 'http://localhost:3000/api';
```

To:
```javascript
const API = 'https://your-app.railway.app/api';
```

Commit and push:
```bash
git add admin.html posts.html
git commit -m "Update API URLs for production"
git push
```

### Step 3: Create Admin Account on Production

```bash
curl -X POST https://your-app.railway.app/api/setup \
  -H "Content-Type: application/json" \
  -d '{"username":"aayush","password":"yournewpassword"}'
```

Now go to **https://your-site.pages.dev/admin.html** and log in!

---

## 🛠 Useful Commands

### Start backend locally:
```bash
cd "/Users/baba/Personal website /backend"
npm start
```

### Start frontend locally:
```bash
cd "/Users/baba/Personal website "
python3 -m http.server 8000
```

### Check if backend is running:
```bash
lsof -i :3000
```

### Kill backend:
```bash
lsof -ti :3000 | xargs kill -9
```

---

## 📁 Files Structure

```
/Users/baba/Personal website /
├── backend/
│   ├── server.js           # Express API
│   ├── models/
│   │   ├── User.js         # Admin user schema
│   │   └── Post.js         # Blog post schema
│   ├── middleware/
│   │   └── auth.js         # JWT authentication
│   ├── package.json        # Dependencies
│   └── .env                # Database credentials (NEVER commit!)
├── admin.html              # Your CMS dashboard
├── posts.html              # Public blog page
├── index.html              # Portfolio homepage
└── styles.css              # All styles

```

---

## 🆘 Troubleshooting

### "Port 3000 already in use"
```bash
lsof -ti :3000 | xargs kill -9
npm start
```

### "Cannot connect to MongoDB"
- Check your `.env` file has correct `MONGO_URI`
- Make sure MongoDB Atlas allows connections from anywhere (Network Access → 0.0.0.0/0)
- Verify username/password are correct

### Admin login not working
- Check backend is running (`lsof -i :3000`)
- Clear browser localStorage and try again
- Make sure you ran `/api/setup` to create admin user

---

## 🎯 Next Steps

1. ✅ Change MongoDB password (STEP 1 above)
2. ✅ Change CMS admin password (STEP 2 above)
3. ✅ Write your first blog post!
4. 🚀 Deploy to Railway (when ready)

---

**Questions?** Everything is working locally. Just change those passwords and you're good to go! 🎉
