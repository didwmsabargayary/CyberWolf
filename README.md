# DIDWMSA BARGAYARY - Cybersecurity Portfolio & Mobile App Hub

A modern, clean, mobile-first **static website** ready to host directly on **GitHub Pages** (or any static web host such as Netlify, Cloudflare Pages, or Vercel).

## 📁 Project Structure

```text
/
├── index.html              # Modern Homepage with Hero, Featured App & Services
├── about.html              # Professional Biography, Skills, Certs & Background
├── projects.html           # Open-Source Tools & Projects Directory
├── pdf.html                # PDF Library with Live Search, Categories & Modal Preview
├── mobile.html             # Dedicated Android Mobile App Showcase & Downloads Hub
├── list-all-pdfs.html      # Complete Alphabetical PDF Directory
├── css/
│   └── style.css           # Modern Dark-Tech Design System & Responsive Styles
├── js/
│   ├── main.js             # Mobile Menu, Typing Animation, Interactivity
│   ├── audio.js            # Background Music Player with Volume Control
│   ├── background-animation.js # Particle Network Canvas Animation
│   ├── pdf-script.js       # PDF Search, Filtering, and Pagination
│   └── pdf-data.js         # PDF Metadata Database
├── images/
│   ├── 1.jpeg - 6.jpeg     # CricZ TV Application Screenshots & Live Previews
│   ├── logo.svg            # Modern Tech Logo
│   ├── app-icon.svg        # Featured Sports Android App Icon
│   └── profile.jpg         # Profile Avatar
└── downloads/
    └── CricZ_TV_v6.0.apk   # Static Android Application APK File (17.9 MB)
```

## 📱 How to Update the Android Mobile App (.APK)

1. Place your compiled release `.apk` file into the `/downloads/` directory.
2. If your filename is `CricZ_TV_v6.0.apk`, you can directly download it!
3. To change the filename, version, or size in the future:
   - Update the `href="downloads/your-app-name.apk"` in `index.html`, `mobile.html`, and `projects.html`.
   - Update the Version, Size, and Date text in the App Meta Specs bar.

## 📄 How to Add More PDFs

1. Copy your `.pdf` file into the root folder or a `pdfs/` folder.
2. Open `js/pdf-data.js` (and `pdf-data.js`).
3. Add a new entry to the `pdfData` array:
   ```javascript
   {
     id: 'pdf-new',
     title: 'Your PDF Document Title',
     description: 'A brief description of this resource.',
     category: 'Security', // e.g., General, CEH, Networking, Linux, Security
     path: 'your-document-name.pdf'
   }
   ```

## 🚀 Deploying to GitHub Pages

1. Commit and push all files to your GitHub repository (e.g. `main` branch).
2. On GitHub, navigate to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
4. Select the `main` branch and `/ (root)` folder, then click **Save**.
5. Your modern static website is live!

---
© 2024 DIDWMSA BARGAYARY. All rights reserved.
