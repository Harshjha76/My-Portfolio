# Harsh Jha — Personal Portfolio Website

A premium, modern, authentic personal portfolio website designed and engineered for **Harsh Jha**, second-year B.Tech student specializing in Artificial Intelligence and Machine Learning at St. John College of Engineering and Management (SJCEM), Palghar, Maharashtra.

This website is a **personal portfolio**, not a SaaS product, CRM, or multi-user application. The public website is the main presentation product, and a private single-owner editing area is available at `/owner` for Harsh to manage and update his credentials independently.

---

## 🌿 Natural, Earthy Visual Identity & Subtle 3D Depth

- **Palette Direction:**
  - Warm Ivory (`#F5F1E8`) & Soft Cream (`#EAE3D5`)
  - Sage Green (`#87947A`) & Deep Forest Green (`#263B32`)
  - Muted Olive (`#A4A58A`) & Subtle Bronze (`#B18A5A`)
  - Warm Charcoal (`#292D29`)
- **Restrained 3D Depth:**
  - Soft realistic card elevation and natural layered perspective.
  - Interactive hover tilt on selected project cards (`.tilt-card`).
  - Subtle entrance transitions and smooth hero composition with Harsh's real portrait.
  - Full `prefers-reduced-motion` support and mobile optimization.
- **Evidence-Backed Skills Framework:**
  - Skills are organized into structured technical categories without arbitrary percentages.
  - Every skill displays its real proof badge linked directly to a verified Certificate, Project, Academic Grade Card, or confirmed Experience.

---

## 📜 Verified Certificates & Academic Records

The portfolio includes high-resolution previews, zoom controls, and conditional downloads for Harsh's actual verified credentials:

1. **Course Certificate in Programming Skills in C/C++**
   - *Issuer:* St. John College of Engineering & Management & IT HUB Live
   - *Credential ID:* `2025_26_PL1064` (Grade A+)
   - *Skills Supported:* C, C++, Object-Oriented Programming (OOP), Data Structures
2. **Certificate of Data Analytics Internship**
   - *Issuer:* InAmigos Foundation
   - *Credential ID:* `U85300CT2020NPL010641`
   - *Skills Supported:* Data Analytics, Google Sheets, Dataset Research, Data Cleaning
3. **Resume Writing with AI Support Job Simulation**
   - *Issuer:* Forage Foundations
   - *Credential ID:* `4zY4ZReRZSJbHaGqJ`
   - *Skills Supported:* AI Prompting, ATS Analysis, Technical Writing
4. **Academic Marksheets & Grade Cards:**
   - **Semester 1 Grade Card:** 9.15 SGPI (Mumbai University PRN: `MU0341120250241691`)
   - **Semester 2 Grade Card:** 9.25 SGPI (Mumbai University PRN: `MU0341120250241691`)
   - **Semester 3 SGPI:** 9.14
   - **12th Standard HSC:** 83.17% (Maharashtra State Board — Computer Science: 184/200)
   - **10th Standard SSC:** 87.60% (Maharashtra State Board — Mathematics: 94/100)

---

## 🚀 Projects (Confirmed & Verified)

1. **FinTrack — Smart Finance Manager**
   - *Tech:* Flask, Python, MySQL, REST API, HTML5/CSS3 (React reference export)
   - *Problem Solved:* Eliminates manual expense tracking friction with automated categorical budgeting and financial summaries.
2. **CareerPilot AI**
   - *Tech:* React, Vite, Node/Express, PostgreSQL, Gemini API
   - *Problem Solved:* Bridges student resume gaps with ATS keyword optimization and AI-assisted cover letter suggestions.
3. **DSA Streak Tracker**
   - *Tech:* Python OOP, File I/O, Requests, GitHub API
   - *Problem Solved:* Automates daily competitive programming habit consistency and logs streak data to personal repositories.

---

## 🛠️ Tech Stack & Architecture

- **Framework:** Next.js 14 App Router
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS with custom natural aesthetic color tokens
- **Icons:** Lucide React
- **Storage:** Dual-mode architecture:
  - *Local Mode (Default):* File-system JSON database in `./data/portfolio-db.json` and static previews in `./public/uploads/`.
  - *Cloud Mode (Optional):* Fully prepared for Supabase PostgreSQL and Supabase Storage via standard environment variables.
- **Authentication:** Private single-owner session using secure, HTTP-only JWT cookies (`OWNER_JWT_SECRET`) and bcrypt password hashing.

---

## 📦 Deployment Guide

### Option 1: Deploy to Vercel (Recommended for Next.js)

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Harsh Jha Portfolio"
   git branch -M main
   git remote add origin https://github.com/Harshjha76/portfolio.git
   git push -u origin main
   ```

2. **Import Project into Vercel:**
   - Go to [vercel.com](https://vercel.com) and log in.
   - Click **Add New...** → **Project**.
   - Select your `portfolio` repository from GitHub.
   - Framework Preset will automatically detect **Next.js**.

3. **Configure Environment Variables in Vercel:**
   In the **Environment Variables** section, add:
   | Variable | Value | Description |
   | :--- | :--- | :--- |
   | `NODE_ENV` | `production` | Production environment flag |
   | `OWNER_JWT_SECRET` | *32+ random characters* | Used to encrypt owner session tokens |
   | `OWNER_PASSWORD` | `harshjha@portfolio2025` | Your private owner login password |
   | `NEXT_PUBLIC_SUPABASE_URL` | *(Optional)* | Your Supabase project URL (if using cloud DB) |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | *(Optional)* | Your Supabase anon key |
   | `SUPABASE_SERVICE_ROLE_KEY` | *(Optional)* | Your Supabase service role key |

4. **Deploy:**
   - Click **Deploy**. Vercel will build and deploy the portfolio in under 2 minutes.
   - You will receive a live URL (e.g., `https://harsh-jha-portfolio.vercel.app`).
   - You can also attach your custom domain under **Project Settings → Domains**.

---

### Option 2: Deploy to Render (Web Service)

This repository includes a `render.yaml` blueprint for 1-click deployment on Render.

1. **Push repository to GitHub.**
2. **Open Render Dashboard:**
   - Go to [dashboard.render.com](https://dashboard.render.com).
   - Click **New** → **Web Service** (or **Blueprint** and select `render.yaml`).
   - Connect your GitHub repository.
3. **Configure Service:**
   - **Environment:** Node
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run start`
   - **Instance Type:** Free (or Starter)
4. **Environment Variables:**
   - `NODE_ENV`: `production`
   - `OWNER_JWT_SECRET`: *Auto-generated by render.yaml or entered manually*
   - `OWNER_PASSWORD`: `harshjha@portfolio2025`
5. **Click Create Web Service.**
   - Render will build the Next.js app and assign a URL like `https://harsh-jha-portfolio.onrender.com`.

---

## 🔒 Private Owner Access & Maintenance

To update your portfolio at any time:

1. Visit `/owner` on your deployed site (e.g., `https://your-domain.com/owner` or click the lock icon in the footer).
2. Enter your password:
   - **Default Password:** `harshjha@portfolio2025`
3. In the private owner interface:
   - **Quick Add Form:** Matches your uploaded screenshot with `TITLE`, `ISSUER / ORGANIZATION`, `DATE EARNED`, and `DESCRIPTION / LINK`. When you upload a certificate, it automatically extracts metadata, dates, and suggests skills!
   - **Certificates Gallery:** Manage visibility (public/private), view full documents, toggle public downloading, and update supported skills.
   - **Academics & Marksheets:** Update SGPI, semester subjects, and marksheets.
   - **Projects:** Update case studies, problem statements, and GitHub demo links.
   - **Appearance:** Select between Sage Green, Deep Forest, Bronze, and Muted Olive accents, or switch between Dark and Light palette modes.
   - **Password Security:** Change your private login password at any time.

---

## 💻 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Open in browser
http://localhost:3000

# 4. Access private owner editing area
http://localhost:3000/owner
```
