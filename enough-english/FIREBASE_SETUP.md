# Firebase Setup Guide for "Enough English?"

## What You Have Now

Your website is **ready to work with Firebase**! Right now it's using local dummy data, but once you complete the 5-minute setup below, **everyone who visits your website will see the same data in real-time**.

## Step-by-Step Setup (5 minutes)

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **"Add project"** or **"Create a project"**
3. Enter a project name (e.g., "enough-english" or "linguistic-landscapes")
4. Click **Continue**
5. Disable Google Analytics (not needed for this project)
6. Click **Create project**
7. Wait for it to finish, then click **Continue**

### 2. Enable Realtime Database

1. In the left sidebar, click **"Build"** > **"Realtime Database"**
2. Click **"Create Database"**
3. Choose a location (pick the one closest to Qatar, probably **"europe-west1"**)
4. For Security Rules, choose **"Start in test mode"** (we'll secure it later)
5. Click **Enable**

### 3. Get Your Configuration Values

1. Click the **gear icon** (⚙️) next to "Project Overview" in the left sidebar
2. Click **"Project settings"**
3. Scroll down to **"Your apps"**
4. Click the **web icon** (`</>`) to add a web app
5. Give it a nickname (e.g., "Enough English Web")
6. **Don't** check "Also set up Firebase Hosting"
7. Click **"Register app"**
8. You'll see a code snippet with `firebaseConfig`. **Copy these 7 values**:
   - `apiKey`
   - `authDomain`
   - `databaseURL`
   - `projectId`
   - `storageBucket`
   - `messagingSenderId`
   - `appId`

### 4. Update Your Code

1. Open `script.js` in your code editor
2. Find this section near the top (around line 468):

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

3. **Replace** the placeholder values with your actual Firebase config values
4. **Save** the file

### 5. Test It!

1. Open your website in a browser
2. Open the **browser console** (F12 or Right-click > Inspect > Console)
3. You should see: `✅ Firebase initialized successfully!`
4. Submit a test entry
5. Open the website in a **different browser or incognito window**
6. You should see the same entry appear automatically!

---

## Security Rules (Important!)

Right now, your database is in "test mode" which means **anyone can read and write**. This is fine for testing, but you should update the rules before sharing publicly.

### Recommended Rules:

1. Go to Firebase Console > Realtime Database > **Rules** tab
2. Replace the rules with this:

```json
{
  "rules": {
    "entries": {
      ".read": true,
      ".write": true,
      "$entryId": {
        ".validate": "newData.hasChildren(['x', 'y', 'floor', 'language', 'feeling'])"
      }
    }
  }
}
```

This allows:
- ✅ Anyone can read entries (public viewing)
- ✅ Anyone can write entries (anonymous submissions)
- ✅ Validates that entries have required fields
- ❌ Prevents deletion of existing entries
- ❌ Prevents modification of existing entries

Click **Publish** to save the rules.

---

## How It Works

Once configured:

1. **Real-time Updates**: When someone submits an entry, it instantly appears on everyone's screen
2. **Shared Data**: All visitors see the same heatmap, charts, and entries
3. **No Refresh Needed**: The page updates automatically when new data arrives
4. **Persistent**: Data is stored in Firebase's cloud database, not just in browsers

---

## Troubleshooting

### "Firebase not configured yet" in console
- You haven't replaced the placeholder values in `firebaseConfig`
- Double-check that you copied all 7 values correctly

### "Permission denied" error
- Your database rules might be too restrictive
- Make sure you're in "test mode" or using the recommended rules above

### Data not appearing
- Check the browser console for errors
- Make sure your `databaseURL` is correct (should end with `.firebaseio.com`)
- Verify the database is enabled in Firebase Console

---

## Need Help?

If you run into issues:
1. Check the browser console for error messages
2. Verify all config values are correct (no typos!)
3. Make sure Realtime Database is enabled in Firebase Console
4. Try refreshing the page

---

**That's it!** Once you paste in your Firebase config, your website will be fully collaborative and real-time. 🎉
