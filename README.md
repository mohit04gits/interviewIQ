# InterviewIQ

AI-powered mock interview platform that talks to you, listens to your answers, and tells you exactly where you went wrong.

Built this because I was tired of practicing alone with no feedback. Now an AI interviewer asks you real questions, reads them out loud, evaluates your answers, and generates a proper performance report — all in the browser.

---

## What it does

You pick a role, set your experience level, optionally upload your resume, and the AI generates 5 personalized interview questions. It reads each question aloud, you answer by typing or speaking, and when you're done it scores every answer on confidence, communication, and correctness. At the end you get a full report with feedback on each question that you can download as a PDF.

---

## Tech Stack

**Frontend**
- React 19 + Vite
- Tailwind CSS v4
- Redux Toolkit (auth state, credits)
- React Router v7
- Firebase (Google Auth)
- Framer Motion
- Web Speech API (speech recognition + synthesis)
- @react-pdf/renderer (PDF export)
- Razorpay (payments)

**Backend**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT (HTTP-only cookies)
- Multer + PDF.js (resume parsing)
- Google Gemini 2.0 Flash (question generation, answer evaluation)
- Razorpay (order creation + payment verification)

---

## Features

- **Google Login** — one click, no passwords
- **Resume Upload** — AI reads your resume and generates questions based on your actual projects and skills
- **Voice Interview** — AI speaks each question, you can reply by typing or using the mic
- **Live Timer** — each question has a countdown (60s for easy, 90s for medium, 120s for hard)
- **Auto Submit** — timer runs out, answer gets submitted automatically
- **AI Evaluation** — Gemini scores every answer and gives written feedback
- **Full Report** — overall score, per-question breakdown, confidence/communication/correctness breakdown
- **PDF Export** — download your report as a properly formatted PDF
- **Interview History** — all your past interviews saved, revisit any report anytime
- **Credits System** — each interview costs 50 credits, buy more via Razorpay

---

## Project Structure

```
InterviewIQ/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Navbar, Timer, Step1Setup, Step2Interview, etc.
│   │   ├── pages/          # Home, Auth, InterviewReport, InterviewHistory, Pricing
│   │   ├── hooks/          # useSpeechRecognition, useSpeechSynthesis
│   │   ├── redux/          # userSlice, store
│   │   ├── pdf/            # InterviewReportPDF
│   │   └── utils/          # firebase.js
│   └── ...
│
└── server/                 # Node.js backend
    ├── controllers/        # auth, interview, payment, user
    ├── middlewares/        # isAuth, multer
    ├── models/             # userModel, interviewModel
    ├── routes/             # authRoute, interviewRoute, paymentRoute
    ├── services/           # geminiAi.js
    └── utils/              # razorpay.js
```

---

## Getting Started

Clone the repo and set up both client and server.

```bash
git clone https://github.com/mohit04gits/interviewIQ.git
cd interviewIQ
```

**Server setup**

```bash
cd server
npm install
```

Create `server/.env`:

```env
PORT=8000
MONGODB_URL=your_mongodb_atlas_url
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_gemini_api_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

```bash
npm run dev
```

**Client setup**

```bash
cd client
npm install
```

Create `client/.env`:

```env
VITE_SERVER_URL=http://localhost:8000
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

```bash
npm run dev
```

Open `http://localhost:5173`

---

## How the interview works

```
Login with Google
      ↓
Set role + experience + interview mode
      ↓
Upload resume (optional) — AI parses it
      ↓
AI generates 5 questions (Easy → Easy → Medium → Medium → Hard)
      ↓
AI reads question aloud
      ↓
Timer starts — type or speak your answer
      ↓
Submit → Gemini evaluates answer → next question
      ↓
All 5 done → Performance report generated
      ↓
Download PDF
```

---

## Deployment

- **Backend** — Render (`server/` as root directory, `node index.js` as start command)
- **Frontend** — Vercel (`client/` as root directory, `vite build` as build command)

Live: [interviewiq.ai](https://interviewiq.vercel.app) *(update this)*

---

## Environment Variables

| Variable | Where | Description |
|---|---|---|
| `MONGODB_URL` | server | MongoDB Atlas connection string |
| `JWT_SECRET` | server | Any random string for signing tokens |
| `GEMINI_API_KEY` | server | Google AI Studio API key |
| `RAZORPAY_KEY_ID` | server + client | Razorpay key ID |
| `RAZORPAY_KEY_SECRET` | server | Razorpay secret (server only) |
| `VITE_SERVER_URL` | client | Backend URL |
| `VITE_FIREBASE_*` | client | Firebase project config |

---

## Known Limitations

- Speech recognition only works on Chrome (browser limitation, not fixable on other browsers)
- Gemini free tier has a rate limit of 15 requests/minute — use a fresh API key if you hit 429 errors during testing
- Razorpay is in test mode by default — use test card `4111 1111 1111 1111` for payments

---

## Built by

Mohit Kumar — [LinkedIn](https://linkedin.com/in/mohit-kumar404/) · [GitHub](https://github.com/mohit04gits)

This started as a portfolio project and turned into something I actually use to prep for interviews. If you want to contribute or have suggestions, open an issue.
