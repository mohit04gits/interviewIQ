# InterviewIQ

InterviewIQ is an AI-powered mock interview platform built to help students and job seekers practice technical and HR interviews in a realistic environment. It generates interview questions using AI, evaluates responses, tracks performance, and provides detailed feedback to help users improve over time.

The platform also includes a credit-based system with Razorpay integration, allowing users to purchase interview credits securely.

---

## Features

- AI-generated interview questions
- Technical and HR interview support
- Speech recognition for answering questions
- AI voice interviewer using Speech Synthesis
- Real-time timer for each question
- AI-based answer evaluation
- Confidence, communication and correctness scoring
- Detailed interview report
- Download report as PDF
- Interview history
- Resume analysis
- Secure authentication with Email/Password and Google Sign-In
- Credit-based interview system
- Razorpay payment integration
- Responsive UI for desktop and mobile

---

## Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- Redux Toolkit
- React Router
- Axios
- Framer Motion

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Google Gemini API
- Razorpay

---

## Project Structure

```
InterviewIQ
│
├── client
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── hooks
│   │   ├── layout
│   │   ├── pages
│   │   ├── redux
│   │   └── utils
│
├── server
│   ├── config
│   ├── controllers
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── services
│   └── utils
```

---

## Installation

Clone the repository

```bash
git clone https://github.com/mohit04gits/interviewIQ.git
```

Install frontend dependencies

```bash
cd client
npm install
```

Install backend dependencies

```bash
cd ../server
npm install
```

Run the backend

```bash
npm run dev
```

Run the frontend

```bash
cd ../client
npm run dev
```

---

## Environment Variables

### Backend

```env
PORT=
MONGO_URI=
JWT_SECRET=
GEMINI_API_KEY=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

### Frontend

```env
VITE_SERVER_URL=
VITE_RAZORPAY_KEY_ID=
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

---

## Screenshots

Add screenshots of:

- Home Page
- AI Interview
- Interview Report
- Pricing Page
- Payment Flow
- Interview History

---

## Future Improvements

- Coding interview support
- AI follow-up questions
- Interview analytics dashboard
- Company-specific interview sets
- Dark mode
- Admin dashboard

---

## Author

**Mohit Kumar**

GitHub: https://github.com/mohit04gits

