# Deploy to Render (Free) - Step by Step

## 🎯 What You'll Get
- Free backend hosting (750 hours/month = 24/7)
- Auto-deploy from GitHub
- HTTPS included
- Environment variables dashboard

---

## 📋 Prerequisites
✅ GitHub repo pushed (done!)
✅ MongoDB Atlas set up (done!)

---

## 🚀 Deployment Steps

### Step 1: Sign Up for Render
1. Go to https://render.com
2. Click **"Get Started"**
3. Sign up with GitHub (easiest option)

### Step 2: Create New Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub account if needed
3. Find your repo: **`Anjaniputra15/Anjaniputra15.github.io`**
4. Click **"Connect"**

### Step 3: Configure the Service

Fill in these settings:

| Field | Value |
|-------|-------|
| **Name** | `portfolio-cms-backend` (or anything you like) |
| **Root Directory** | `backend` |
| **Environment** | `Node` |
| **Region** | Choose closest to you (Singapore/Oregon) |
| **Branch** | `main` |
| **Build Command** | `npm install` |
| **Start Command** | `node server.js` |
| **Instance Type** | **Free** |

### Step 4: Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

Add these 4 variables:

```
MONGO_URI = mongodb+srv://Aayush:YOUR_PASSWORD@cluster0.hvplvvu.mongodb.net/portfolio-cms?appName=Cluster0

JWT_SECRET = ap_portfolio_super_secret_jwt_key_2026_hvplvvu

ALLOWED_ORIGIN = https://anjaniputra15.github.io

PORT = 3000
```

⚠️ **Use your NEW MongoDB password** (not the old one!)

### Step 5: Deploy!

1. Click **"Create Web Service"**
2. Wait 2-3 minutes for build
3. You'll get a URL like: `https://portfolio-cms-backend.onrender.com`

---

## ✅ After Deployment

### Test the API:
```bash
curl https://YOUR-RENDER-URL.onrender.com/api/posts
```

Should return `[]` or your posts.

### Create Admin Account:
```bash
curl -X POST https://YOUR-RENDER-URL.onrender.com/api/setup \
  -H "Content-Type: application/json" \
  -d '{"username":"aayush","password":"yournewpassword"}'
```

### Update Frontend URLs:

In **admin.html** and **posts.html**, change:
```javascript
const API = 'http://localhost:3000/api';
```

To:
```javascript
const API = 'https://YOUR-RENDER-URL.onrender.com/api';
```

Commit and push:
```bash
git add admin.html posts.html
git commit -m "Update API URLs for Render deployment"
git push
```

---

## 🎉 Done!

Your blog is now live at:
- **Admin:** https://anjaniputra15.github.io/admin.html
- **Blog:** https://anjaniputra15.github.io/posts.html

---

## ⚠️ Important Notes

### Free Tier Limitations:
- Spins down after **15 minutes** of inactivity
- First request after spin-down takes ~30 seconds
- 750 hours/month (enough for 24/7, but will sleep if unused)

### To Keep It Awake:
Use a free ping service like **UptimeRobot** (https://uptimerobot.com):
- Pings your API every 5 minutes
- Keeps it from spinning down
- Free for up to 50 monitors

---

## 🆘 Troubleshooting

### "Build Failed"
- Check Root Directory is set to `backend`
- Verify Build Command is `npm install`

### "Application failed to respond"
- Check environment variables are set correctly
- Verify `PORT` is set to `3000`
- Check logs in Render dashboard

### "MongoDB connection failed"
- Verify `MONGO_URI` is correct
- Check MongoDB Atlas allows all IPs (0.0.0.0/0)

---

## 📊 Monitor Your App

- **Logs:** Render dashboard → your service → Logs
- **Restart:** Render dashboard → Manual Deploy → Clear build cache & deploy

---

**That's it!** Your CMS is now live on Render for free. 🚀
