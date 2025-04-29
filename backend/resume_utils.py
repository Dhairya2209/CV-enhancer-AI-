import os
import re
import pdfplumber
from pdf2image import convert_from_path
import pytesseract
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

def extract_text_from_pdf(pdf_path):
    text = ""
    try:
        with pdfplumber.open(pdf_path) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text
        if text.strip():
            return text.strip()
    except:
        pass
    images = convert_from_path(pdf_path)
    for img in images:
        text += pytesseract.image_to_string(img) + "\n"
    return text.strip()

def analyze_resume(resume_text, job_description=None):
    model = genai.GenerativeModel("gemini-1.5-flash")

    base_prompt = f"""
    You are an experienced HR recruiter AI assistant. Given a resume and a job description, analyze the match between them and give helpful feedback.

    Your response must include:
    - A detailed analysis of how well the resume fits the job.
    - A final fit score (out of 100) at the end in the format: "Fit Score: <number>/100".

    Resume:
    {resume_text}
    """
    if job_description:
        base_prompt += f"\nJob Description:\n{job_description}"

    response = model.generate_content(base_prompt)
    output = response.text.strip()

    score_match = re.search(r"Fit Score[:\-]?\s*(\d{1,3})\s*/\s*100", output)
    score = int(score_match.group(1)) if score_match else None

    return {
        "result": output,
        "score": score
    }
