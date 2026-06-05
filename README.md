# Eshaan Mayekar | AI Engineer & Interactive Developer Portfolio

This is a production-grade, 3D-interactive portfolio built with Next.js, React Three Fiber, and Firebase. It features a fully custom Content Management System (CMS) built into an Admin Dashboard, allowing you to manage projects, certifications, and resumes dynamically without hardcoding assets.

## 🏗️ Architecture

- **Frontend:** Next.js (App Router), React, TailwindCSS, GSAP (Animations).
- **3D Engine:** Three.js, React Three Fiber, React Three Drei.
- **Backend/CMS:** Firebase Auth, Firestore (NoSQL Database), Firebase Storage.
- **Strictness:** 100% strict TypeScript, zero ESLint warnings.

---

## 🚀 Getting Started

### 1. Prerequisites

Make sure you have the following installed on your machine:
- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node.js)

### 2. Environment Variables

To connect the application to Firebase, you need to set up your environment variables. 
Create a `.env.local` file in the root of your project and add your Firebase config keys:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```
*(You can find these in your Firebase Console under Project Settings > General > Your apps).*

### 3. Installation

Install all project dependencies:

```bash
npm install
```

### 4. Running the Development Server

Start the local development server on port 3001:

```bash
npm run dev -p 3001
```

Open [http://localhost:3001](http://localhost:3001) in your browser to view the portfolio.

---

## 🔐 Admin Dashboard (CMS)

This portfolio is not hardcoded. All projects, experiences, skills, and certifications are pulled dynamically from Firestore. 

To manage your content:
1. Navigate to [http://localhost:3001/admin](http://localhost:3001/admin).
2. Log in using your authorized Firebase Admin credentials.
3. Use the sidebar to navigate to different managers:
   - **Projects Manager:** Upload project thumbnails, architecture diagrams, demo videos, and manage text content.
   - **Resume Manager:** Upload PDF resumes and toggle the "Active" resume that visitors will download.
   - **Certifications Manager:** Add new credentials and upload verification badges.
   - **Analytics Monitor:** View real-time visitor stats and traffic timelines.

> **Note:** Any images or PDFs uploaded through the Admin Dashboard are automatically sent to **Firebase Storage**, and the public URL is saved to **Firestore**.

---

## 🛡️ Security Rules

Before deploying to production or allowing public access, ensure your Firestore Security Rules are up to date. The rules are located in `firestore.rules`. 

To deploy them to your Firebase project:
```bash
npx firebase deploy --only firestore:rules
```

---

## 🌐 Production Deployment

The easiest way to deploy this portfolio is via **Vercel**.

1. Push your code to a GitHub repository.
2. Go to [Vercel](https://vercel.com/) and import the repository.
3. Add all the Environment Variables from your `.env.local` file into the Vercel deployment settings.
4. Click **Deploy**.

To run a production build locally to test performance and accessibility:
```bash
npm run build
npm start
```
