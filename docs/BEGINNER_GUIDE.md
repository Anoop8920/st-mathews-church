# Complete Beginner's Guide: Deploy & Manage Your Church Website

This guide assumes you have zero experience with deployment. Follow each step exactly as written.

---

## What You Need Before Starting

1. **A Google account** (Gmail) — for Firebase
2. **A GitHub account** — for storing your code (free at github.com)
3. **A Cloudflare account** — for hosting your website (free at cloudflare.com)
4. **Git installed** on your computer — Download from https://git-scm.com/download/win
5. **Your project code** (this folder on your computer)

---

## PHASE 1: Set Up the Database (Firebase)

Firebase is Google's free cloud service. It will store all your church data (families, announcements, events, photos, etc.) and handle user logins.

### Step 1.1: Create a Firebase Project

1. Open your browser and go to: **https://console.firebase.google.com**
2. Sign in with your Google/Gmail account
3. Click the big **"Create a project"** button (or "Add project")
4. Enter project name: `st-mathews-vakathanam`
5. Click **Continue**
6. It asks about Google Analytics — Toggle it **OFF** (you don't need it)
7. Click **Create project**
8. Wait 30 seconds... then click **Continue**

✅ You now have a Firebase project!

### Step 1.2: Register Your Web App

1. On the project home page, you'll see icons for iOS, Android, Web
2. Click the **Web icon** (looks like `</>`)
3. Enter app nickname: `Church Website`
4. ❌ Do NOT check "Firebase Hosting" — we'll use Cloudflare instead
5. Click **Register app**
6. You'll see a code block like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyB-xxxxxxxxxxxxxxxxxxxx",
  authDomain: "st-mathews-vakathanam.firebaseapp.com",
  projectId: "st-mathews-vakathanam",
  storageBucket: "st-mathews-vakathanam.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

7. **IMPORTANT:** Copy these values and save them in Notepad. You'll need them soon.
8. Click **Continue to console**

### Step 1.3: Enable Login System (Authentication)

1. In the left sidebar, click **Authentication**
2. Click **Get started**
3. Under "Sign-in method" tab, click **Email/Password**
4. Toggle the first switch to **Enable**
5. Click **Save**

### Step 1.4: Create Your Admin Account

1. Still in Authentication, click the **Users** tab
2. Click **Add user**
3. Enter:
   - Email: your personal email (e.g., `anoop@gmail.com`)
   - Password: choose a strong password (you'll use this to login to the admin panel)
4. Click **Add user**
5. You'll see a row appear with a **User UID** column — it looks like: `aB1cD2eF3gH4iJ5kL6mN7oP8`
6. **Copy this UID** — save it in your Notepad too

### Step 1.5: Set Up the Database (Firestore)

1. In the left sidebar, click **Firestore Database**
2. Click **Create database**
3. Select **Start in production mode** → Click **Next**
4. Choose location: **asia-south1 (Mumbai)** (closest to Kerala)
5. Click **Enable**
6. Wait for it to create...

Now you need to tell the database that your account is the admin:

7. Click **Start collection**
8. Collection ID: type `users` → Click **Next**
9. Document ID: **Paste the UID you copied in Step 1.4**
10. Add these fields (click "Add field" for each):
    - Field name: `role` | Type: string | Value: `admin`
    - Field name: `email` | Type: string | Value: your email
    - Field name: `name` | Type: string | Value: your name
11. Click **Save**

### Step 1.6: Set Up File Storage

1. In the left sidebar, click **Storage**
2. Click **Get started**
3. Select **Start in production mode** → Click **Next**
4. Click **Done**

### Step 1.7: Set Security Rules

**For Firestore:**
1. Go to **Firestore Database** → Click the **Rules** tab
2. Delete everything in the editor
3. Open the file `firestore.rules` from your project folder
4. Copy ALL its contents and paste into the Firebase editor
5. Click **Publish**

**For Storage:**
1. Go to **Storage** → Click the **Rules** tab
2. Delete everything in the editor
3. Open the file `storage.rules` from your project folder
4. Copy ALL its contents and paste into the Firebase editor
5. Click **Publish**

### Step 1.8: Connect Firebase to Your Website

1. In your project folder, find the file `.env.example`
2. Make a copy of it and rename the copy to `.env`
3. Open `.env` in Notepad (or your code editor)
4. Replace the placeholder values with YOUR values from Step 1.2:

```
VITE_FIREBASE_API_KEY=AIzaSyB-xxxxxxxxxxxxxxxxxxxx
VITE_FIREBASE_AUTH_DOMAIN=st-mathews-vakathanam.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=st-mathews-vakathanam
VITE_FIREBASE_STORAGE_BUCKET=st-mathews-vakathanam.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

5. Save the file

### Step 1.9: Test Locally

1. Stop the dev server if running (press `Ctrl+C` in the terminal)
2. Run: `npm run dev`
3. Open `http://localhost:5173` in your browser
4. Click **Login** → Enter the email/password from Step 1.4
5. You should be logged in and see "Admin" button in the header
6. Click **Admin** → Try adding an announcement

✅ If this works, your database is set up correctly!

---

## PHASE 2: Upload Code to GitHub

GitHub stores your code online and connects to Cloudflare for automatic deployment.

### Step 2.1: Create a GitHub Repository

1. Go to **https://github.com** and sign in (or create account)
2. Click the **+** icon (top right) → **New repository**
3. Repository name: `st-mathews-church`
4. Keep it **Public** (or Private if you prefer)
5. ❌ Do NOT check "Add a README file" (you already have one)
6. Click **Create repository**
7. You'll see a page with setup instructions — keep this page open

### Step 2.2: Push Your Code

Open a terminal/command prompt in your project folder and run these commands one by one:

```bash
git init
git add .
git commit -m "Initial commit - St Mathews Church website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/st-mathews-church.git
git push -u origin main
```

⚠️ Replace `YOUR_USERNAME` with your actual GitHub username!

It may ask for your GitHub login — enter your username and a Personal Access Token (not your password). To create a token:
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token → Check "repo" → Generate → Copy the token

After pushing, refresh your GitHub page — you should see all your files there.

✅ Your code is now on GitHub!

---

## PHASE 3: Deploy to Cloudflare Pages (Hosting)

Cloudflare Pages will take your code from GitHub and make it into a live website that anyone can visit.

### Step 3.1: Connect to Cloudflare

1. Go to **https://dash.cloudflare.com** and create a free account (or sign in)
2. In the left sidebar, click **Workers & Pages**
3. Click **Create** → Select the **Pages** tab
4. Click **Connect to Git**
5. Click **Connect GitHub** → Authorize Cloudflare to access your repos
6. Select your `st-mathews-church` repository
7. Click **Begin setup**

### Step 3.2: Configure Build Settings

On the configuration page:

| Setting | Value |
|---------|-------|
| Project name | `st-mathews-church` |
| Production branch | `main` |
| Build command | `npm run build` |
| Build output directory | `dist` |

Under **Environment variables**, click **Add variable** for each:

| Variable name | Value |
|---------------|-------|
| `VITE_FIREBASE_API_KEY` | Your API key from Step 1.2 |
| `VITE_FIREBASE_AUTH_DOMAIN` | Your auth domain |
| `VITE_FIREBASE_PROJECT_ID` | Your project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Your storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Your sender ID |
| `VITE_FIREBASE_APP_ID` | Your app ID |
| `NODE_VERSION` | `18` |

Click **Save and Deploy**

### Step 3.3: Wait for Deployment

- Cloudflare will pull your code, install dependencies, and build it
- This takes 1-3 minutes
- When it shows ✅ **Success**, your website is LIVE!

### Step 3.4: Your Website URL

After deployment, Cloudflare gives you a URL like:
**`https://st-mathews-church.pages.dev`**

This is your live website! Anyone with this link can visit it.

### Step 3.5: Add Custom Domain (Optional)

If you have a domain name (like `stmathewsvakathanam.org`):

1. In your Cloudflare project → **Custom domains** → **Set up a domain**
2. Enter your domain name
3. Follow the DNS instructions Cloudflare shows you
4. HTTPS is automatic — no extra setup needed

---

## PHASE 4: Managing Changes After Deployment

This is the most important part — how to make changes going forward.

### Option A: Content Changes (No Code Needed)

For day-to-day content like announcements, events, photos, families — **you don't touch any code**. Just use the Admin Dashboard:

1. Go to your live website (e.g., `https://st-mathews-church.pages.dev`)
2. Click **Login** → Enter your admin email/password
3. Click **Admin** in the header
4. Make changes:
   - Add announcements ✓
   - Add events ✓
   - Upload photos to gallery ✓
   - Add/edit families ✓
   - Add/edit members ✓
   - Update mass timings ✓
   - Manage priests ✓
   - Upload documents ✓

**Changes appear instantly** — no redeployment needed! The data is stored in Firebase, not in your code.

### Option B: Code/Design Changes

If you want to change the website design, add new pages, fix bugs, etc.:

**Method 1: Edit on Your Computer (Recommended)**

1. Make changes to your code locally
2. Test with `npm run dev` to make sure it works
3. When happy, push to GitHub:

```bash
git add .
git commit -m "Describe what you changed"
git push
```

4. Cloudflare **automatically detects the push** and redeploys (takes 1-2 minutes)
5. Your live website updates automatically!

**Method 2: Edit Directly on GitHub (Quick Fixes)**

1. Go to your repository on GitHub
2. Navigate to the file you want to edit
3. Click the ✏️ pencil icon
4. Make your change
5. Click **Commit changes**
6. Cloudflare auto-deploys the change

### Common Change Scenarios

| I want to... | What to do |
|--------------|-----------|
| Add a new announcement | Admin Dashboard → Announcements → Add New |
| Change contact phone number | Edit `src/components/layout/Footer.jsx` → Push to GitHub |
| Add a new page | Create new file in `src/pages/` → Add route in `App.jsx` → Push |
| Change colors/fonts | Edit `tailwind.config.js` → Push |
| Update church address | Edit `Footer.jsx` and `Contact.jsx` → Push |
| Add more gallery categories | Edit `src/pages/public/Gallery.jsx` → Push |

---

## PHASE 5: Creating Login Accounts for Parish Members

Members need accounts to view the Parish Directory.

### Create Individual Accounts

1. Go to **Firebase Console** → **Authentication** → **Users**
2. Click **Add user**
3. Enter the member's email and a temporary password
4. Share the credentials with the member
5. (Optional) Add them to Firestore `users` collection with `role: "member"`

### Bulk Tip

For many members, you can create accounts one by one. Firebase Authentication is free for unlimited users.

---

## Summary: Your Monthly Workflow

| Task | Frequency | How |
|------|-----------|-----|
| Add Sunday announcements | Weekly | Admin Dashboard |
| Upload event photos | After events | Admin Dashboard → Gallery |
| Add new family | When new family joins | Admin Dashboard → Families |
| Update mass timings | When changed | Admin Dashboard → Mass Timings |
| Code/design updates | Rarely | Edit code → `git push` |
| Create member logins | As needed | Firebase Console |

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| White screen after deploy | Check environment variables in Cloudflare settings |
| Can't login | Verify email/password in Firebase → Authentication → Users |
| Data not showing | Check Firestore rules are published correctly |
| Images not uploading | Check Storage rules are published |
| Deploy failed | Check build logs in Cloudflare Pages → Deployments |
| Changes not appearing | Clear browser cache (Ctrl+Shift+R) |

---

## Cost Summary

| Service | Monthly Cost |
|---------|-------------|
| Firebase (Database + Auth + Storage) | ₹0 (free tier) |
| Cloudflare Pages (Hosting) | ₹0 (free plan) |
| GitHub (Code storage) | ₹0 (free plan) |
| Custom domain (optional) | ₹800-1500/year |
| **Total** | **₹0/month** |

---

## Need Help?

- Firebase docs: https://firebase.google.com/docs
- Cloudflare Pages docs: https://developers.cloudflare.com/pages
- React docs: https://react.dev

Your website is designed to be maintenance-free after initial setup. All content is managed through the browser-based admin panel — no coding required for day-to-day updates.
