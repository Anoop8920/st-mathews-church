# Firebase Setup Guide

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Name it `st-mathews-vakathanam` (or similar)
4. Disable Google Analytics (optional)
5. Click "Create project"

## Step 2: Register Web App

1. In the project overview, click the web icon (`</>`)
2. Register the app with nickname "St Mathews Church Web"
3. Copy the Firebase config values

## Step 3: Set Up Environment Variables

Create a `.env` file in the project root:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Step 4: Enable Authentication

1. In Firebase Console, go to Authentication → Sign-in method
2. Enable "Email/Password" provider
3. Create initial admin user in Authentication → Users
4. Note the UID of the admin user

## Step 5: Set Up Firestore

1. Go to Firestore Database → Create database
2. Start in **production mode**
3. Choose a location close to your users (asia-south1 for India)
4. Deploy security rules from `firestore.rules` file

### Create Admin User Document

In Firestore, create a document:
- Collection: `users`
- Document ID: (use the UID from Authentication)
- Fields:
  - `role`: "admin"
  - `email`: "admin@email.com"
  - `name`: "Admin Name"

## Step 6: Set Up Storage

1. Go to Storage → Get started
2. Start in production mode
3. Deploy storage rules from `storage.rules` file

## Step 7: Deploy Security Rules

Using Firebase CLI:

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize (select Firestore and Storage)
firebase init

# Deploy rules
firebase deploy --only firestore:rules,storage
```

Or manually copy rules from `firestore.rules` and `storage.rules` into the Firebase Console.

## Step 8: Create Member Accounts

For parish members to access the directory:
1. Go to Authentication → Users
2. Click "Add user"
3. Enter member's email and a temporary password
4. Create a corresponding document in `users` collection with `role: "member"`

## Firestore Indexes

The app uses composite indexes for queries. If you see index errors in the console, click the provided link to create them automatically, or create these indexes:

- Collection: `announcements` - Fields: `createdAt` (Descending)
- Collection: `events` - Fields: `date` (Ascending), `date` (Descending)
- Collection: `families` - Fields: `familyName` (Ascending)
- Collection: `gallery` - Fields: `createdAt` (Descending)

## Free Tier Limits

Firebase Spark plan (free) includes:
- Firestore: 1 GiB storage, 50K reads/day, 20K writes/day
- Storage: 5 GB storage, 1 GB/day download
- Authentication: Unlimited users
- This is more than enough for a parish website with ~157 families.
