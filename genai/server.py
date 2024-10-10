from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import os

# Modeules
from arti import enhance_and_generate_mcqs_from_pdf  # Your custom module

app = FastAPI()

# CORS settings (allowing React frontend to interact with FastAPI)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the allowed origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.post("/generate")
async def generate_mcqs(file: UploadFile = File(...), num_questions: int = Form(5)):
    try:
        pdf_file_path = os.path.join(UPLOAD_FOLDER, file.filename)
        # Save the uploaded file
        with open(pdf_file_path, "wb") as pdf_file:
            pdf_file.write(await file.read())
        
        # Generate MCQs from the uploaded PDF
        mcqs = enhance_and_generate_mcqs_from_pdf(pdf_file_path, num_questions)

        return JSONResponse(content=mcqs)

    except Exception as e:
        print(f"Error: {e}")
        return JSONResponse(content={"error": "Error extracting MCQs"}, status_code=500)
