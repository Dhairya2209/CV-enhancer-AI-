from fastapi import FastAPI, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
from dotenv import load_dotenv
from resume_utils import extract_text_from_pdf, analyze_resume

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

load_dotenv()

@app.post("/analyze")
async def analyze(resume: UploadFile, job_description: str = Form(None)):
    file_location = f"temp_{resume.filename}"
    with open(file_location, "wb") as f:
        f.write(await resume.read())

    try:
        resume_text = extract_text_from_pdf(file_location)
        analysis = analyze_resume(resume_text, job_description)

        return JSONResponse(content={
            "result": analysis.get("result"),
            "score": analysis.get("score")
        })
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
    finally:
        os.remove(file_location)
