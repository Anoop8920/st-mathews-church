# Deployment Guide

## Option 1: Cloudflare Pages (Recommended)

Cloudflare Pages offers free hosting with automatic HTTPS, global CDN, and automatic deployments from GitHub.

### Steps

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/your-username/st-mathews-church.git
   git push -u origin main
   ```

2. **Connect to Cloudflare Pages**
   - Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Go to Pages → Create a project
   - Connect your GitHub account and select the repository
   - Configure build settings:
     - Build command: `npm run build`
     - Build output directory: `dist`
     - Node.js version: 18

3. **Add Environment Variables**
   - In Cloudflare Pages project settings → Environment variables
   - Add all `VITE_FIREBASE_*` variables from your `.env` file
   - Set for both Production and Preview environments

4. **Deploy**
   - Cloudflare will automatically build and deploy
   - Every push to `main` triggers a new deployment
   - Pull requests get preview deployments

### Custom Domain
- In Cloudflare Pages → Custom domains
- Add your domain (e.g., `stmathewsvakathanam.org`)
- Update DNS to point to Cloudflare Pages

## Option 2: GitHub Pages

### Steps

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add deploy script to package.json**
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. **Configure Vite for GitHub Pages**
   Add `base` to `vite.config.js`:
   ```js
   export default defineConfig({
     base: '/st-mathews-church/',  // your repo name
     // ... rest of config
   });
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` / `/ (root)`

## CI/CD with GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
        env:
          VITE_FIREBASE_API_KEY: ${{ secrets.VITE_FIREBASE_API_KEY }}
          VITE_FIREBASE_AUTH_DOMAIN: ${{ secrets.VITE_FIREBASE_AUTH_DOMAIN }}
          VITE_FIREBASE_PROJECT_ID: ${{ secrets.VITE_FIREBASE_PROJECT_ID }}
          VITE_FIREBASE_STORAGE_BUCKET: ${{ secrets.VITE_FIREBASE_STORAGE_BUCKET }}
          VITE_FIREBASE_MESSAGING_SENDER_ID: ${{ secrets.VITE_FIREBASE_MESSAGING_SENDER_ID }}
          VITE_FIREBASE_APP_ID: ${{ secrets.VITE_FIREBASE_APP_ID }}
      - uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: st-mathews-church
          directory: dist
```

### GitHub Secrets Required
Add these in GitHub → Settings → Secrets:
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

## SPA Routing Fix

For single-page apps on Cloudflare Pages, create `public/_redirects`:
```
/*  /index.html  200
```

This ensures React Router works correctly for all routes.

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test login functionality
- [ ] Test admin dashboard
- [ ] Verify Firebase security rules are deployed
- [ ] Check mobile responsiveness
- [ ] Test contact form submission
- [ ] Verify HTTPS is active
- [ ] Set up custom domain (if applicable)
