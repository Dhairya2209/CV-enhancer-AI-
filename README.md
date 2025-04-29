# 💼 AI Resume Enhancer & Analyzer

An intelligent web application that parses resumes, analyzes them using **Google Gemini AI**, and provides personalized feedback to improve your CV — all in real time.

![Tech Stack](https://img.shields.io/badge/Frontend-React-blue) ![Backend](https://img.shields.io/badge/Backend-FastAPI-green) ![AI](https://img.shields.io/badge/AI-Google%20Gemini-orange)

---

## 🚀 Live Demo

🌐 [Frontend (React)](https://your-frontend.netlify.app)  
🔗 [Backend (Render)](https://cv-enhancer-ai-2.onrender.com)

---

## 📸 How It Works

**Step 1: Resume Parsing**  
→ Uses `pdfplumber` for text-based PDFs  
→ Falls back to `pytesseract` (OCR) for image-based resumes

**Step 2: AI Analysis**  
→ Sends extracted text to **Google Gemini** for intelligent evaluation  
→ Compares resume with job descriptions (optional)

**Step 3: Personalized Feedback**  
→ Returns insights on strengths, weaknesses, and improvement tips  
→ Optionally generates an updated resume (in future version)

---

## 🧠 Tech Stack

| Layer       | Technology                  |
|------------|------------------------------|
| Frontend   | React, HTML, CSS             |
| Backend    | FastAPI, Python              |
| AI Model   | Google Generative AI (Gemini)|
| Parsing    | pdfplumber, pytesseract      |
| Deployment | Netlify (frontend), Render (backend) |

---

## ⚙️ Features

- 🧾 Upload any resume in PDF format  
- 📄 Job Description matching (optional input)  
- 🤖 AI-powered resume analysis  
- 📊 Real-time feedback and suggestions  
- 🔐 Google API key integration using `dotenv`

---

## 📁 Folder Structure

```
/frontend       → React app
/backend        → FastAPI server
/resume_utils.py→ PDF parsing & Gemini interaction
.env            → API keys
```

---

## 🛠️ Setup Instructions

### 🔧 Backend (FastAPI + Gemini)
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
Make sure your `.env` includes:
```
GOOGLE_API_KEY=your_key_here
```

### 💻 Frontend (React)
```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 Deployment

- **Frontend**: Hosted on [Netlify](https://netlify.com)  
- **Backend**: Hosted on [Render](https://render.com)  
  > Ensure `python-multipart` is installed in your `requirements.txt`

---

## ✅ To-Do / Improvements

- [ ] Export AI-edited resume as downloadable PDF  
- [ ] Job-role-specific resume scoring  
- [ ] User login system and resume history

---

## 👨‍💻 Developed By

**Dhairya Maisuriya**  
[Portfolio](https://dhairya-portfolio-omega.vercel.app) | [GitHub](https://github.com/Dhairya2209) | [LinkedIn](https://www.linkedin.com/in/dhairya-maisuriya-5b7039245/)